import { useState, useEffect } from "react";
import { Route, User } from "./types";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeHero from "./components/HomeHero";
import AboutGlobalPuente from "./components/AboutGlobalPuente";
import ServicesList from "./components/ServicesList";
import TestimonialsList from "./components/TestimonialsList";
import ContactForm from "./components/ContactForm";
import PricingTable from "./components/PricingTable";
import StripeSimulation from "./components/StripeSimulation";
import MemberDashboard from "./components/MemberDashboard";
import AdminPanel from "./components/AdminPanel";
import LoginView from "./components/LoginView";
import RegisterView from "./components/RegisterView";
import { Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { safeJson } from "./utils";

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<Route>("home");
  const [user, setUser] = useState<User | null>(null);
  const [paymentAmount, setPaymentAmount] = useState<number>(150);
  const [checkingSession, setCheckingSession] = useState(true);

  // Authenticate session on load
  useEffect(() => {
    // Parse success query params from real Stripe Redirect Callback
    const urlParams = new URLSearchParams(window.location.search);
    const paymentSuccess = urlParams.get("payment_success");
    const paymentToken = urlParams.get("token");

    let initialToken = localStorage.getItem("global_puente_token");

    if (paymentSuccess === "true" && paymentToken) {
      localStorage.setItem("global_puente_token", paymentToken);
      initialToken = paymentToken;
      // Clean up the URL query parameters so the address bar looks clean and polished
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    const verifySession = async () => {
      const storedToken = initialToken || localStorage.getItem("global_puente_token");
      if (!storedToken) {
        setCheckingSession(false);
        return;
      }

      try {
        const res = await fetch("/api/auth/me", {
          headers: {
            "Authorization": `Bearer ${storedToken}`
          }
        });
        const data = await safeJson(res);
        if (res.ok) {
          setUser(data.user);
          // If user paid and is active, direct them straight to the private dashboard
          if (data.user.membershipStatus === "active") {
            setCurrentRoute("member");
          }
        } else {
          // Token stale
          localStorage.removeItem("global_puente_token");
        }
      } catch (err) {
        console.error("Session verification failed:", err);
      } finally {
        setCheckingSession(false);
      }
    };

    verifySession();
  }, []);

  const handleLoginSuccess = (loggedInUser: User, token: string) => {
    localStorage.setItem("global_puente_token", token);
    setUser(loggedInUser);

    // Check if there was an intended payment amount prior to logging in
    const intended = localStorage.getItem("intended_payment_amount");
    if (intended) {
      setPaymentAmount(Number(intended));
      localStorage.removeItem("intended_payment_amount");
      
      if (loggedInUser.membershipStatus === "active") {
        setCurrentRoute("member");
      } else {
        setCurrentRoute("payment");
      }
    } else {
      if (loggedInUser.membershipStatus === "active") {
        setCurrentRoute("member");
      } else if (loggedInUser.role === "admin") {
        setCurrentRoute("admin");
      } else {
        setCurrentRoute("home");
      }
    }
  };

  const handleRegisterSuccess = (newUser: User, token: string) => {
    localStorage.setItem("global_puente_token", token);
    setUser(newUser);

    const intended = localStorage.getItem("intended_payment_amount");
    if (intended) {
      setPaymentAmount(Number(intended));
      localStorage.removeItem("intended_payment_amount");
      setCurrentRoute("payment");
    } else {
      setCurrentRoute("pricing");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("global_puente_token");
    setUser(null);
    setCurrentRoute("home");
  };

  const handlePaymentSuccess = (updatedUser: User) => {
    setUser(updatedUser);
    setCurrentRoute("member");
  };

  if (checkingSession) {
    return (
      <div className="min-h-screen bg-[#060606] flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-10 h-10 animate-spin text-[#d4af37] mx-auto" />
          <p className="text-xs uppercase tracking-widest text-[#d4af37] font-bold">Sécurisation de la liaison...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#050505] text-[#F5E6D3] min-h-screen font-serif antialiased selection:bg-[#D4AF37]/30 selection:text-[#D4AF37] flex flex-col justify-between">
      
      {/* Top sticky navigation header */}
      <Header
        currentRoute={currentRoute}
        setCurrentRoute={setCurrentRoute}
        user={user}
        onLogout={handleLogout}
      />

      {/* Main viewport with entering transition effects */}
      <main className="flex-grow pt-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentRoute}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
          >
            {/* HOME VIEW: Combines hero, about, services, testimonials, contact */}
            {currentRoute === "home" && (
              <>
                <HomeHero setCurrentRoute={setCurrentRoute} user={user} />
                <div id="about-section">
                  <AboutGlobalPuente />
                </div>
                <div id="services-section">
                  <ServicesList setCurrentRoute={setCurrentRoute} />
                </div>
                <TestimonialsList />
                <ContactForm />
              </>
            )}

            {/* ABOUT VIEW (Direct link from header or hero) */}
            {currentRoute === "about" && (
              <>
                <AboutGlobalPuente />
                <ContactForm />
              </>
            )}

            {/* SERVICES VIEW (Direct link) */}
            {currentRoute === "services" && (
              <>
                <ServicesList setCurrentRoute={setCurrentRoute} />
                <ContactForm />
              </>
            )}

            {/* PRICING TABLE / SUBSCRIPTION UPGRADES */}
            {currentRoute === "pricing" && (
              <PricingTable
                setCurrentRoute={setCurrentRoute}
                user={user}
                setPaymentAmount={setPaymentAmount}
              />
            )}

            {/* SECURE STRIPE CHECKOUT SIMULATOR */}
            {currentRoute === "payment" && (
              <StripeSimulation
                setCurrentRoute={setCurrentRoute}
                user={user}
                paymentAmount={paymentAmount}
                onPaymentSuccess={handlePaymentSuccess}
              />
            )}

            {/* EXCLUSIVE PAID-MEMBER DASHBOARD */}
            {currentRoute === "member" && (
              <MemberDashboard
                user={user}
                setCurrentRoute={setCurrentRoute}
              />
            )}

            {/* ADMINISTRATION CABINET DASHBOARD */}
            {currentRoute === "admin" && (
              <AdminPanel
                user={user}
              />
            )}

            {/* LOGIN PORTAL */}
            {currentRoute === "login" && (
              <LoginView
                setCurrentRoute={setCurrentRoute}
                onLoginSuccess={handleLoginSuccess}
              />
            )}

            {/* REGISTRATION PORTAL */}
            {currentRoute === "register" && (
              <RegisterView
                setCurrentRoute={setCurrentRoute}
                onRegisterSuccess={handleRegisterSuccess}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Global premium footer */}
      <Footer setCurrentRoute={setCurrentRoute} />

    </div>
  );
}
