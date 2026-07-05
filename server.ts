import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { User, ContactMessage, ConsultationRequest } from "./src/types";

const app = express();
const PORT = 3000;

app.use(express.json());

// Simple local database storage path
const DB_PATH = path.join(process.cwd(), "db.json");

// Helper to load database
function loadDb() {
  if (!fs.existsSync(DB_PATH)) {
    const initialDb = {
      users: [
        {
          id: "admin-1",
          email: "admin@globalpuentes.com",
          fullName: "Admin Global Puentes",
          role: "admin",
          membershipStatus: "active",
          createdAt: new Date().toISOString(),
        }
      ],
      messages: [
        {
          id: "msg-1",
          name: "Jean Dupont",
          email: "jean.dupont@corp.com",
          company: "Dupont Logistics",
          subject: "Expansion Moyen-Orient",
          message: "Bonjour, nous souhaitons implanter notre filiale logistique à Dubaï. Votre expertise nous intéresse vivement.",
          createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
        }
      ],
      consultations: []
    };
    fs.writeFileSync(DB_PATH, JSON.stringify(initialDb, null, 2), "utf8");
    return initialDb;
  }
  try {
    const content = fs.readFileSync(DB_PATH, "utf8");
    return JSON.parse(content);
  } catch (error) {
    console.error("Error reading database file, resetting:", error);
    return { users: [], messages: [], consultations: [] };
  }
}

// Helper to save database
function saveDb(data: any) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), "utf8");
  } catch (error) {
    console.error("Error saving database file:", error);
  }
}

// Middleware for auth verification
function getAuthenticatedUser(req: express.Request): User | null {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }
  const token = authHeader.substring(7);
  const db = loadDb();
  // For safety, the token is simply the user ID for this robust custom prototype
  const user = db.users.find((u: any) => u.id === token);
  return user || null;
}

// API Routes
// 1. Auth Registration
app.post("/api/auth/register", (req, res) => {
  const { email, password, fullName } = req.body;
  if (!email || !fullName) {
    res.status(400).json({ error: "L'adresse email et le nom complet sont requis." });
    return;
  }

  const db = loadDb();
  const existing = db.users.find((u: any) => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    res.status(400).json({ error: "Cet email est déjà enregistré." });
    return;
  }

  const newUser: User = {
    id: "usr-" + Math.random().toString(36).substring(2, 11),
    email: email.toLowerCase(),
    fullName,
    role: "user",
    membershipStatus: "free",
    createdAt: new Date().toISOString()
  };

  db.users.push(newUser);
  saveDb(db);

  res.status(201).json({ user: newUser, token: newUser.id });
});

// 2. Auth Login
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    res.status(400).json({ error: "L'adresse email est requise." });
    return;
  }

  const db = loadDb();
  const user = db.users.find((u: any) => u.email.toLowerCase() === email.toLowerCase());
  
  if (!user) {
    res.status(404).json({ error: "Utilisateur non trouvé avec cette adresse email." });
    return;
  }

  res.status(200).json({ user, token: user.id });
});

// 3. Current User Session
app.get("/api/auth/me", (req, res) => {
  const user = getAuthenticatedUser(req);
  if (!user) {
    res.status(401).json({ error: "Non autorisé" });
    return;
  }
  res.status(200).json({ user });
});

// 4. Submit Contact Message
app.post("/api/contact", (req, res) => {
  const { name, email, company, subject, message } = req.body;
  if (!name || !email || !subject || !message) {
    res.status(400).json({ error: "Tous les champs obligatoires doivent être remplis." });
    return;
  }

  const db = loadDb();
  const newMessage: ContactMessage = {
    id: "msg-" + Math.random().toString(36).substring(2, 11),
    name,
    email: email.toLowerCase(),
    company,
    subject,
    message,
    createdAt: new Date().toISOString()
  };

  db.messages.unshift(newMessage);
  saveDb(db);

  res.status(201).json({ success: true, message: "Message transmis avec succès à l'expert." });
});

// 5. Payment Session Creation (Simulated or Real)
app.post("/api/payment/create-checkout-session", (req, res) => {
  const user = getAuthenticatedUser(req);
  if (!user) {
    res.status(401).json({ error: "Authentification requise pour initier un paiement." });
    return;
  }

  // Minimum payment check
  const amount = Number(req.body.amount) || 50;
  if (amount < 50) {
    res.status(400).json({ error: "Le montant minimum pour l'accompagnement d'expertise est de 50$." });
    return;
  }

  // Update status in local storage to pending
  const db = loadDb();
  const userIdx = db.users.findIndex((u: any) => u.id === user.id);
  if (userIdx !== -1) {
    db.users[userIdx].membershipStatus = 'pending_payment';
    saveDb(db);
  }

  res.status(200).json({
    success: true,
    sessionId: "stripe_sess_" + Math.random().toString(36).substring(2, 15),
    checkoutUrl: `/payment?amount=${amount}&sessionId=stripe_sess_` + Math.random().toString(36).substring(2, 15)
  });
});

// 6. Complete / Confirm payment simulated callback
app.post("/api/payment/confirm-payment", (req, res) => {
  const user = getAuthenticatedUser(req);
  if (!user) {
    res.status(401).json({ error: "Non autorisé" });
    return;
  }

  const { amount, transactionId } = req.body;
  const paymentAmount = Number(amount) || 50;

  const db = loadDb();
  const userIdx = db.users.findIndex((u: any) => u.id === user.id);
  if (userIdx !== -1) {
    db.users[userIdx].membershipStatus = "active";
    db.users[userIdx].paidAmount = paymentAmount;
    db.users[userIdx].paymentDate = new Date().toISOString();
    saveDb(db);
    res.status(200).json({ success: true, user: db.users[userIdx] });
  } else {
    res.status(404).json({ error: "Utilisateur introuvable" });
  }
});

// 7. Request Private Consultation
app.post("/api/member/consultation", (req, res) => {
  const user = getAuthenticatedUser(req);
  if (!user) {
    res.status(401).json({ error: "Authentification requise." });
    return;
  }

  if (user.membershipStatus !== "active" && user.role !== "admin") {
    res.status(403).json({ error: "Accès refusé. Un abonnement actif de membre d'expertise est requis." });
    return;
  }

  const { topic, description, preferredDate } = req.body;
  if (!topic || !description || !preferredDate) {
    res.status(400).json({ error: "Tous les détails de la consultation sont requis." });
    return;
  }

  const db = loadDb();
  const newConsultation: ConsultationRequest = {
    id: "cst-" + Math.random().toString(36).substring(2, 11),
    userId: user.id,
    email: user.email,
    fullName: user.fullName,
    topic,
    description,
    preferredDate,
    status: "pending",
    createdAt: new Date().toISOString()
  };

  db.consultations.unshift(newConsultation);
  saveDb(db);

  res.status(201).json({ success: true, consultation: newConsultation });
});

// 8. Get Member Consultations
app.get("/api/member/consultations", (req, res) => {
  const user = getAuthenticatedUser(req);
  if (!user) {
    res.status(401).json({ error: "Non autorisé." });
    return;
  }

  const db = loadDb();
  let list = [];
  if (user.role === "admin") {
    list = db.consultations;
  } else {
    list = db.consultations.filter((c: any) => c.userId === user.id);
  }

  res.status(200).json({ consultations: list });
});

// 9. Admin view messages
app.get("/api/admin/messages", (req, res) => {
  const user = getAuthenticatedUser(req);
  if (!user || user.role !== "admin") {
    res.status(403).json({ error: "Accès réservé aux administrateurs." });
    return;
  }
  const db = loadDb();
  res.status(200).json({ messages: db.messages });
});

// 10. Admin view users
app.get("/api/admin/users", (req, res) => {
  const user = getAuthenticatedUser(req);
  if (!user || user.role !== "admin") {
    res.status(403).json({ error: "Accès réservé aux administrateurs." });
    return;
  }
  const db = loadDb();
  res.status(200).json({ users: db.users });
});


// Express and Vite setups
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Server] running on http://localhost:${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
