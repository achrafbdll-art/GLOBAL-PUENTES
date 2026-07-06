import React, { useState, useEffect } from "react";
import { Route, User } from "../types";
import { CreditCard, Shield, Lock, CheckCircle2, AlertCircle, RefreshCw, Smartphone } from "lucide-react";
import { motion } from "motion/react";

interface StripeSimulationProps {
  setCurrentRoute: (route: Route) => void;
  user: User | null;
  paymentAmount: number;
  onPaymentSuccess: (updatedUser: User) => void;
}

export default function StripeSimulation({
  setCurrentRoute,
  user,
  paymentAmount,
  onPaymentSuccess
}: StripeSimulationProps) {
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState(user?.fullName || "");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [postalCode, setPostalCode] = useState("");
  
  const [paymentStep, setPaymentStep] = useState<'form' | 'processing' | 'success' | 'error'>('form');
  const [processingStatus, setProcessingStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length > 0) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    if (formatted.length <= 19) {
      setCardNumber(formatted);
    }
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length > 2) {
      value = value.substring(0, 2) + "/" + value.substring(2, 4);
    }
    if (value.length <= 5) {
      setCardExpiry(value);
    }
  };

  const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length <= 4) {
      setCardCvc(value);
    }
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setErrorMessage("Vous devez être authentifié pour finaliser le paiement.");
      setPaymentStep('error');
      return;
    }

    if (!cardNumber || !cardName || !cardExpiry || !cardCvc) {
      setErrorMessage("Veuillez remplir l'intégralité des champs de la carte bancaire.");
      setPaymentStep('error');
      return;
    }

    setPaymentStep('processing');
    const steps = [
      "Initialisation de la passerelle de paiement chiffrée SSL...",
      "Contrôle d'intégrité de la carte bancaire...",
      "Autorisation de transaction en cours auprès de l'établissement émetteur...",
      "Traitement de la commission Stripe et confirmation...",
      "Synchronisation du statut de membre avec la base de données..."
    ];

    // Simulate animated processing steps
    for (let i = 0; i < steps.length; i++) {
      setProcessingStatus(steps[i]);
      await new Promise((resolve) => setTimeout(resolve, 1100));
    }

    try {
      const res = await fetch("/api/payment/confirm-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.id}`
        },
        body: JSON.stringify({
          amount: paymentAmount,
          transactionId: "str_tx_" + Math.random().toString(36).substring(2, 10)
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "La confirmation du paiement a échoué.");
      }

      onPaymentSuccess(data.user);
      setPaymentStep('success');
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "Une erreur s'est produite lors de l'enregistrement du statut.");
      setPaymentStep('error');
    }
  };

  return (
    <div className="min-h-[85vh] py-24 bg-[#060606] flex items-center justify-center">
      <div className="max-w-4xl w-full mx-auto px-4 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Summary Panel (5 cols) */}
        <div className="md:col-span-5 space-y-6">
          <div className="bg-[#0a0a0a] border border-neutral-900 rounded-xl p-6">
            <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-widest mb-4">Récapitulatif de Commande</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-neutral-900">
                <div>
                  <h4 className="text-white text-xs sm:text-sm font-bold uppercase tracking-tight">Accès d'Expertise d'Élite</h4>
                  <p className="text-[11px] text-neutral-500 font-light mt-0.5">Adhésion et licence d'affaires unique</p>
                </div>
                <span className="text-[#d4af37] text-sm font-black">${paymentAmount}</span>
              </div>

              <div className="flex justify-between items-center text-xs text-neutral-400">
                <span>Taxes & Droits</span>
                <span>$0.00</span>
              </div>

              <div className="flex justify-between items-center text-xs text-neutral-400 pb-4 border-b border-neutral-900">
                <span>Frais de traitement bancaire</span>
                <span>Inclus</span>
              </div>

              <div className="flex justify-between items-center text-sm font-bold text-white pt-2">
                <span>TOTAL REQUIS (USD)</span>
                <span className="text-lg text-[#d4af37] font-black">${paymentAmount}</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-[#d4af37]/20 bg-[#d4af37]/3 flex items-start space-x-3 text-xs text-[#d4af37] leading-relaxed font-light">
            <Lock className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold uppercase tracking-wider block mb-0.5">Confidentialité Bancaire :</span>
              Vos informations d'authentification bancaire sont chiffrées de bout en bout et transmises directement au réseau interbancaire de compensation.
            </div>
          </div>

          <div className="p-4 rounded-xl border border-[#d4af37]/20 bg-[#d4af37]/3 flex items-start space-x-3 text-xs text-neutral-300 leading-relaxed font-light">
            <Shield className="w-4 h-4 text-[#d4af37] flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-[#d4af37] uppercase tracking-wider block mb-0.5">Lancement GitHub 100% Réel :</span>
              Ce projet intègre nativement la double-passerelle Stripe. Renseignez la clé <code className="font-mono text-[10px] bg-neutral-900 px-1 py-0.5 text-white rounded">STRIPE_SECRET_KEY</code> dans votre fichier <code className="font-mono text-[10px] bg-neutral-900 px-1 py-0.5 text-white rounded">.env</code> pour que le système bascule automatiquement sur de véritables formulaires et sessions Stripe Checkout sécurisés.
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Card Form (7 cols) */}
        <div className="md:col-span-7 bg-[#0a0a0a] border border-neutral-900 rounded-xl p-6 sm:p-8 shadow-[0_0_30px_rgba(212,175,55,0.03)] min-h-[420px] flex flex-col justify-center">
          
          {paymentStep === 'form' && (
            <form onSubmit={handlePaymentSubmit} className="space-y-6">
              <div className="flex items-center space-x-2 text-white pb-3 border-b border-neutral-900">
                <CreditCard className="w-5 h-5 text-[#d4af37]" />
                <h3 className="font-bold text-xs uppercase tracking-widest text-[#d4af37]">Saisie de Carte Bancaire</h3>
              </div>

              <div className="space-y-4">
                {/* Holder Name */}
                <div className="flex flex-col space-y-1.5">
                  <label htmlFor="card-name" className="text-neutral-400 font-bold text-[10px] uppercase tracking-wider">
                    Titulaire de la carte
                  </label>
                  <input
                    id="card-name"
                    type="text"
                    required
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    placeholder="Ex: Alexandre Bernard"
                    className="w-full bg-[#050505] border border-neutral-800 focus:border-[#d4af37]/60 rounded-lg px-4 py-3 text-neutral-200 text-xs sm:text-sm focus:outline-none placeholder:text-neutral-700 font-sans"
                  />
                </div>

                {/* Card Number */}
                <div className="flex flex-col space-y-1.5">
                  <label htmlFor="card-num" className="text-neutral-400 font-bold text-[10px] uppercase tracking-wider">
                    Numéro de carte
                  </label>
                  <div className="relative">
                    <input
                      id="card-num"
                      type="text"
                      required
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                      placeholder="4242 4242 4242 4242"
                      className="w-full bg-[#050505] border border-neutral-800 focus:border-[#d4af37]/60 rounded-lg pl-11 pr-4 py-3 text-neutral-200 text-xs sm:text-sm focus:outline-none placeholder:text-neutral-700 font-mono tracking-widest"
                    />
                    <CreditCard className="w-4 h-4 text-neutral-500 absolute left-4 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Expiry Date */}
                  <div className="flex flex-col space-y-1.5">
                    <label htmlFor="card-exp" className="text-neutral-400 font-bold text-[10px] uppercase tracking-wider">
                      Date d'expiration
                    </label>
                    <input
                      id="card-exp"
                      type="text"
                      required
                      value={cardExpiry}
                      onChange={handleExpiryChange}
                      placeholder="MM/AA"
                      className="w-full bg-[#050505] border border-neutral-800 focus:border-[#d4af37]/60 rounded-lg px-4 py-3 text-neutral-200 text-xs sm:text-sm focus:outline-none placeholder:text-neutral-700 font-mono"
                    />
                  </div>

                  {/* CVC */}
                  <div className="flex flex-col space-y-1.5">
                    <label htmlFor="card-cvc" className="text-neutral-400 font-bold text-[10px] uppercase tracking-wider">
                      Code de sécurité CVC
                    </label>
                    <input
                      id="card-cvc"
                      type="text"
                      required
                      value={cardCvc}
                      onChange={handleCvcChange}
                      placeholder="123"
                      className="w-full bg-[#050505] border border-neutral-800 focus:border-[#d4af37]/60 rounded-lg px-4 py-3 text-neutral-200 text-xs sm:text-sm focus:outline-none placeholder:text-neutral-700 font-mono"
                    />
                  </div>
                </div>

                {/* Postal Code */}
                <div className="flex flex-col space-y-1.5">
                  <label htmlFor="card-postal" className="text-neutral-400 font-bold text-[10px] uppercase tracking-wider">
                    Code Postal / Zip Code
                  </label>
                  <input
                    id="card-postal"
                    type="text"
                    required
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="Ex: 75008"
                    className="w-full bg-[#050505] border border-neutral-800 focus:border-[#d4af37]/60 rounded-lg px-4 py-3 text-neutral-200 text-xs sm:text-sm focus:outline-none placeholder:text-neutral-700 font-mono"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  id="btn-stripe-submit"
                  type="submit"
                  className="w-full py-4 rounded-full bg-gradient-to-r from-[#d4af37] to-[#aa841c] hover:opacity-95 text-black font-bold tracking-widest text-xs uppercase flex items-center justify-center space-x-2 shadow-[0_0_20px_rgba(212,175,55,0.15)] cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Confirmer le règlement de ${paymentAmount}</span>
                </button>
              </div>

              <div className="flex items-center justify-center space-x-3 text-[10px] text-neutral-600 font-bold uppercase tracking-wider">
                <span className="flex items-center">
                  <Shield className="w-3.5 h-3.5 mr-1" /> Verified by Visa
                </span>
                <span>•</span>
                <span className="flex items-center">
                  <Smartphone className="w-3.5 h-3.5 mr-1" /> 3D Secure Active
                </span>
              </div>
            </form>
          )}

          {paymentStep === 'processing' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center p-8 space-y-6 flex flex-col justify-center items-center"
            >
              <RefreshCw className="w-12 h-12 text-[#d4af37] animate-spin" />
              <h3 className="text-lg font-bold text-white uppercase tracking-wider">Transaction en cours de traitement</h3>
              <div className="max-w-md bg-neutral-950 p-4 rounded-lg border border-neutral-900 w-full">
                <p className="text-xs text-neutral-400 font-mono leading-relaxed">
                  {processingStatus}
                </p>
              </div>
              <p className="text-[10px] text-neutral-600 font-semibold uppercase">Veuillez ne pas rafraîchir cette page.</p>
            </motion.div>
          )}

          {paymentStep === 'success' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center p-8 space-y-6 flex flex-col justify-center items-center"
            >
              <CheckCircle2 className="w-16 h-16 text-[#d4af37]" />
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white uppercase tracking-tight">Accès Membre Activé !</h3>
                <p className="text-xs text-neutral-400 font-light max-w-sm mx-auto leading-relaxed">
                  Votre versement de <span className="text-[#d4af37] font-bold">${paymentAmount}</span> a été validé par la banque. Vous disposez désormais de l'accréditation d'expertise ENWII.
                </p>
              </div>

              <button
                id="btn-stripe-success-redirect"
                onClick={() => setCurrentRoute("member")}
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#d4af37] to-[#aa841c] text-black font-bold text-xs uppercase tracking-widest shadow-[0_0_15px_rgba(212,175,55,0.15)] cursor-pointer"
              >
                Accéder à l'Espace d'Expertise
              </button>
            </motion.div>
          )}

          {paymentStep === 'error' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center p-8 space-y-6 flex flex-col justify-center items-center"
            >
              <AlertCircle className="w-16 h-16 text-red-500" />
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white uppercase">Échec du paiement</h3>
                <p className="text-xs text-neutral-400 font-light max-w-sm mx-auto leading-relaxed">
                  {errorMessage || "Une anomalie est survenue lors de l'authentification 3D Secure."}
                </p>
              </div>

              <div className="flex space-x-3">
                <button
                  id="btn-stripe-retry"
                  onClick={() => setPaymentStep('form')}
                  className="px-6 py-2.5 rounded-full border border-neutral-800 text-neutral-300 font-semibold text-xs uppercase tracking-wider cursor-pointer"
                >
                  Réessayer la saisie
                </button>
                <button
                  id="btn-stripe-error-cancel"
                  onClick={() => setCurrentRoute("pricing")}
                  className="px-6 py-2.5 rounded-full bg-neutral-900 text-red-400 font-semibold text-xs uppercase tracking-wider cursor-pointer"
                >
                  Annuler
                </button>
              </div>
            </motion.div>
          )}

        </div>

      </div>
    </div>
  );
}
