import React, { useState } from "react";
import { Route } from "../types";
import { LogIn, Mail, Lock, RefreshCw, AlertCircle } from "lucide-react";
import { motion } from "motion/react";
import { safeJson } from "../utils";

interface LoginViewProps {
  setCurrentRoute: (route: Route) => void;
  onLoginSuccess: (user: any, token: string) => void;
}

export default function LoginView({ setCurrentRoute, onLoginSuccess }: LoginViewProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Veuillez saisir votre adresse courriel d'affaires.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await safeJson(res);
      if (!res.ok) {
        throw new Error(data.error || "Une erreur s'est produite lors de l'authentification.");
      }

      onLoginSuccess(data.user, data.token);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Identifiants incorrects ou indisponibilité du serveur.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] py-24 bg-[#050505] flex items-center justify-center relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#D4AF37]/2 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-md w-full mx-auto px-4 z-10">
        
        <div className="bg-[#0a0a0a] border border-[#D4AF37]/15 p-8 shadow-[0_0_25px_rgba(212,175,55,0.02)] space-y-6">
          <div className="text-center space-y-1">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] font-bold font-sans-ui">Identification</span>
            <h2 className="text-2xl font-bold text-white uppercase tracking-tight font-serif italic">Accès Membre</h2>
            <p className="text-xs text-[#F5E6D3]/60 font-serif italic">Cabinet d'Affaires International GLOBAL-PUENTE</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="flex flex-col space-y-1.5">
              <label htmlFor="login-email" className="text-[#F5E6D3]/70 font-bold text-[10px] uppercase tracking-widest font-sans-ui">
                Adresse email d'affaires
              </label>
              <div className="relative">
                <input
                  id="login-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  placeholder="Ex: patron@entreprise.com"
                  className="w-full bg-[#050505] border border-[#D4AF37]/15 focus:border-[#D4AF37]/50 rounded-none pl-10 pr-4 py-3 text-neutral-200 text-xs sm:text-sm focus:outline-none placeholder:text-neutral-700 font-serif"
                />
                <Mail className="w-4 h-4 text-[#D4AF37]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col space-y-1.5">
              <div className="flex justify-between items-center">
                <label htmlFor="login-pass" className="text-[#F5E6D3]/70 font-bold text-[10px] uppercase tracking-widest font-sans-ui">
                  Mot de passe / Code d'accès
                </label>
                <span className="text-[10px] text-[#D4AF37]/60 hover:text-[#D4AF37] cursor-pointer font-sans-ui font-bold uppercase">Code perdu ?</span>
              </div>
              <div className="relative">
                <input
                  id="login-pass"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#050505] border border-[#D4AF37]/15 focus:border-[#D4AF37]/50 rounded-none pl-10 pr-4 py-3 text-neutral-200 text-xs sm:text-sm focus:outline-none placeholder:text-neutral-700 font-serif"
                />
                <Lock className="w-4 h-4 text-[#D4AF37]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-950/20 border border-red-500/20 rounded-lg text-red-400 text-xs flex items-center space-x-2 font-sans-ui">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              id="btn-login-submit"
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-[#D4AF37] hover:bg-[#F5E6D3] text-[#050505] font-bold tracking-widest text-xs uppercase flex items-center justify-center space-x-2 cursor-pointer transition-all duration-300 font-sans-ui"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-black" />
                  <span>Vérification...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4 text-black" />
                  <span>S'identifier et Accéder</span>
                </>
              )}
            </button>
          </form>

          <div className="text-center text-xs pt-4 border-t border-[#D4AF37]/10 flex flex-col space-y-2">
            <p className="text-neutral-500 font-serif italic">Vous ne disposez pas d'un espace accrédité ?</p>
            <button
              id="btn-login-register-redirect"
              onClick={() => setCurrentRoute("register")}
              className="text-[#D4AF37] hover:text-[#F5E6D3] font-bold uppercase text-[10px] tracking-[0.15em] cursor-pointer font-sans-ui"
            >
              Créer un compte d'affaires
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
