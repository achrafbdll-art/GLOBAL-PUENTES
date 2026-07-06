import { useState, useEffect } from "react";
import { User, ContactMessage, ConsultationRequest } from "../types";
import { ShieldCheck, Mail, Users, Calendar, Clock, RefreshCw, AlertCircle, Coins } from "lucide-react";
import { motion } from "motion/react";
import { safeJson } from "../utils";

interface AdminPanelProps {
  user: User | null;
}

export default function AdminPanel({ user }: AdminPanelProps) {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [usersList, setUsersList] = useState<User[]>([]);
  const [consults, setConsults] = useState<ConsultationRequest[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [adminTab, setAdminTab] = useState<'messages' | 'users' | 'consults'>('messages');

  const fetchData = async () => {
    if (!user || user.role !== "admin") return;
    setLoading(true);
    setError("");

    try {
      // 1. Fetch messages
      const mRes = await fetch("/api/admin/messages", {
        headers: { "Authorization": `Bearer ${user.id}` }
      });
      const mData = await safeJson(mRes);

      // 2. Fetch users
      const uRes = await fetch("/api/admin/users", {
        headers: { "Authorization": `Bearer ${user.id}` }
      });
      const uData = await safeJson(uRes);

      // 3. Fetch consultations
      const cRes = await fetch("/api/member/consultations", {
        headers: { "Authorization": `Bearer ${user.id}` }
      });
      const cData = await safeJson(cRes);

      if (mRes.ok && uRes.ok && cRes.ok) {
        setMessages(mData.messages || []);
        setUsersList(uData.users || []);
        setConsults(cData.consultations || []);
      } else {
        throw new Error(mData.error || uData.error || cData.error || "Erreur de chargement");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Erreur serveur de communication");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-[#060606] text-center px-4">
        <div className="max-w-md p-8 rounded-2xl border border-red-500/20 bg-red-950/5 text-red-400">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold uppercase tracking-tight">Accès Administrateur Refusé</h3>
          <p className="text-xs font-light mt-3 leading-relaxed">
            Seuls les profils d'administration du cabinet d'affaires GLOBAL-PUENTE sont autorisés à visualiser les fichiers clients et correspondances reçues.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[90vh] py-24 bg-[#060606]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Admin Header */}
        <div className="bg-red-950/10 border border-red-500/25 p-6 rounded-2xl mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div className="flex items-center space-x-3.5">
            <div className="p-3 bg-red-950/20 text-red-400 rounded-xl border border-red-500/30">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] bg-red-500/10 text-red-400 px-2.5 py-0.5 rounded-full font-black uppercase tracking-widest border border-red-500/20 w-fit">
                CONSOLE SECURE ADMINISTRATION
              </div>
              <h2 className="text-xl font-bold text-white mt-1 uppercase tracking-tight">Supervision Cabinet</h2>
              <p className="text-xs text-neutral-500 font-light">Accès confidentiel réservé aux directeurs associés</p>
            </div>
          </div>

          <div className="flex gap-2 w-full sm:w-auto">
            <button
              onClick={() => setAdminTab('messages')}
              className={`flex-1 sm:flex-initial px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                adminTab === 'messages' ? "bg-red-500 text-white" : "bg-neutral-900 text-neutral-400 hover:text-neutral-200"
              }`}
            >
              Messages ({messages.length})
            </button>
            <button
              onClick={() => setAdminTab('users')}
              className={`flex-1 sm:flex-initial px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                adminTab === 'users' ? "bg-red-500 text-white" : "bg-neutral-900 text-neutral-400 hover:text-neutral-200"
              }`}
            >
              Utilisateurs ({usersList.length})
            </button>
            <button
              onClick={() => setAdminTab('consults')}
              className={`flex-1 sm:flex-initial px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                adminTab === 'consults' ? "bg-red-500 text-white" : "bg-neutral-900 text-neutral-400 hover:text-neutral-200"
              }`}
            >
              Consultations ({consults.length})
            </button>
            <button
              onClick={fetchData}
              title="Rafraîchir les données"
              className="p-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {error && (
          <div className="p-3 bg-red-950/20 border border-red-500/20 rounded-lg text-red-400 text-xs mb-6 flex items-center space-x-2">
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </div>
        )}

        {/* Supervision tab contents */}
        <div className="bg-[#0a0a0a] border border-neutral-900 rounded-2xl p-6 sm:p-10 min-h-[400px]">
          
          {loading ? (
            <div className="flex flex-col justify-center items-center h-48 space-y-3">
              <RefreshCw className="w-8 h-8 text-[#d4af37] animate-spin" />
              <span className="text-neutral-500 text-xs uppercase tracking-wider font-semibold">Chargement des registres confidentiels...</span>
            </div>
          ) : (
            <>
              {/* TAB A: Submitted contact Messages */}
              {adminTab === 'messages' && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-2 pb-4 border-b border-neutral-900">
                    <Mail className="w-5 h-5 text-[#d4af37]" />
                    <h3 className="font-bold text-neutral-200 text-sm uppercase tracking-wider">Correspondances et Dossiers reçus</h3>
                  </div>

                  {messages.length > 0 ? (
                    <div className="space-y-4">
                      {messages.map((msg) => (
                        <div key={msg.id} className="p-5 rounded-xl border border-neutral-900 bg-[#060606] space-y-3">
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                            <div>
                              <span className="text-[10px] text-neutral-500 font-bold uppercase">Expéditeur</span>
                              <div className="text-neutral-200 font-bold text-xs uppercase mt-0.5">
                                {msg.name} {msg.company ? `(${msg.company})` : ""}
                              </div>
                            </div>
                            <span className="text-[10px] text-neutral-500 font-mono">📅 Reçu le: {new Date(msg.createdAt).toLocaleString()}</span>
                          </div>

                          <div>
                            <span className="text-[10px] text-neutral-500 font-bold uppercase block">Objet de la requête</span>
                            <span className="text-neutral-300 font-semibold text-xs">{msg.subject}</span>
                          </div>

                          <div className="bg-neutral-950 p-3 rounded-lg border border-neutral-900/50 text-xs text-neutral-400 font-light leading-relaxed">
                            "{msg.message}"
                          </div>

                          <div className="flex justify-between items-center text-[10px] text-neutral-600 pt-2 border-t border-neutral-900/50">
                            <span>📧 Email: {msg.email}</span>
                            <span>ID Dossier: {msg.id}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16 text-neutral-600 text-xs uppercase font-semibold">Aucun message de contact dans le registre</div>
                  )}
                </div>
              )}

              {/* TAB B: Registered users */}
              {adminTab === 'users' && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-2 pb-4 border-b border-neutral-900">
                    <Users className="w-5 h-5 text-[#d4af37]" />
                    <h3 className="font-bold text-neutral-200 text-sm uppercase tracking-wider">Répertoire des comptes clients</h3>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-light text-neutral-400">
                      <thead className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider border-b border-neutral-900 bg-neutral-950">
                        <tr>
                          <th className="py-3 px-4">Utilisateur</th>
                          <th className="py-3 px-4">Rôle</th>
                          <th className="py-3 px-4">Statut d'Accès</th>
                          <th className="py-3 px-4">Adhésion versée</th>
                          <th className="py-3 px-4">Date de Création</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-900 bg-[#060606]">
                        {usersList.map((usr) => (
                          <tr key={usr.id} className="hover:bg-neutral-950 transition-colors">
                            <td className="py-4 px-4 font-bold text-neutral-200">
                              <div>{usr.fullName}</div>
                              <div className="text-[10px] text-neutral-500 font-mono mt-0.5">{usr.email}</div>
                            </td>
                            <td className="py-4 px-4 uppercase text-[10px] font-mono tracking-wider">
                              <span className={`px-2 py-0.5 rounded ${usr.role === "admin" ? "bg-red-950/40 text-red-400 border border-red-500/20" : "bg-neutral-900 text-neutral-400"}`}>
                                {usr.role}
                              </span>
                            </td>
                            <td className="py-4 px-4 uppercase text-[10px] font-black tracking-widest">
                              <span className={`px-2 py-0.5 rounded ${
                                usr.membershipStatus === "active" 
                                  ? "bg-green-950/40 text-green-400 border border-green-500/20" 
                                  : usr.membershipStatus === "pending_payment"
                                  ? "bg-yellow-950/40 text-yellow-400 border border-yellow-500/20"
                                  : "bg-neutral-900 text-neutral-500"
                              }`}>
                                {usr.membershipStatus === "active" ? "Expertise débloquée" : usr.membershipStatus === "pending_payment" ? "Paiement requis" : "Visiteur standard"}
                              </span>
                            </td>
                            <td className="py-4 px-4 text-[#d4af37] font-black">
                              {usr.paidAmount ? `$${usr.paidAmount}` : "—"}
                            </td>
                            <td className="py-4 px-4 font-mono text-[10px] text-neutral-500">
                              {new Date(usr.createdAt).toLocaleDateString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB C: Consultation requests */}
              {adminTab === 'consults' && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-2 pb-4 border-b border-neutral-900">
                    <Calendar className="w-5 h-5 text-[#d4af37]" />
                    <h3 className="font-bold text-neutral-200 text-sm uppercase tracking-wider">Demandes d'audiences et consultations</h3>
                  </div>

                  {consults.length > 0 ? (
                    <div className="space-y-4">
                      {consults.map((cst) => (
                        <div key={cst.id} className="p-5 rounded-xl border border-neutral-900 bg-[#060606] space-y-3">
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                            <div>
                              <span className="text-[10px] text-neutral-500 font-bold uppercase">Membre d'affaires</span>
                              <div className="text-neutral-200 font-bold text-xs uppercase mt-0.5">
                                {cst.fullName} ({cst.email})
                              </div>
                            </div>
                            <span className="text-[10px] text-neutral-500 font-mono">📅 Demandé le: {new Date(cst.createdAt).toLocaleDateString()}</span>
                          </div>

                          <div>
                            <span className="text-[10px] text-neutral-500 font-bold uppercase block">Thématique d'entretien</span>
                            <span className="text-neutral-300 font-bold text-xs uppercase">{cst.topic}</span>
                          </div>

                          <div className="bg-neutral-950 p-3 rounded-lg border border-neutral-900/50 text-xs text-neutral-400 font-light leading-relaxed">
                            "{cst.description}"
                          </div>

                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-2 border-t border-neutral-900/50 text-xs">
                            <span className="text-[#d4af37] font-bold text-[11px]">🎯 Date préconisée: {cst.preferredDate}</span>
                            <div className="flex space-x-2">
                              <button
                                onClick={() => alert(`La consultation ${cst.id} a été confirmée. Une notification de réunion sécurisée a été simulée vers ${cst.email}.`)}
                                className="px-3 py-1 bg-green-950 text-green-400 hover:bg-green-900 border border-green-500/20 text-[10px] font-bold uppercase tracking-wider rounded transition-colors cursor-pointer"
                              >
                                Confirmer séance
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16 text-neutral-600 text-xs uppercase font-semibold">Aucune demande de consultation d'affaires active</div>
                  )}
                </div>
              )}

            </>
          )}

        </div>

      </div>
    </div>
  );
}
