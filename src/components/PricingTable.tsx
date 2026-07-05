import { useState } from "react";
import { Route, User } from "../types";
import { Check, ShieldCheck, Sparkles, AlertCircle, Coins, CreditCard } from "lucide-react";

interface PricingTableProps {
  setCurrentRoute: (route: Route) => void;
  user: User | null;
  setPaymentAmount: (amount: number) => void;
}

export default function PricingTable({ setCurrentRoute, user, setPaymentAmount }: PricingTableProps) {
  const [selectedAmount, setSelectedAmount] = useState<number>(150); // Default custom premium level
  const [error, setError] = useState("");

  const tiers = [
    {
      title: "Diagnostic Standard",
      price: 50,
      description: "L'accompagnement minimal d'entrée pour valider la faisabilité d'un projet.",
      features: [
        "Accès à l'outil de simulation de faisabilité d'affaires",
        "Téléchargement du Guide d'Implantation Offshore",
        "Dépôt d'un dossier préliminaire d'affaires",
        "Support standard sous 7 jours"
      ],
      popular: false
    },
    {
      title: "Conseil Exécutif",
      price: 150,
      description: "Le forfait recommandé pour structurer un véritable montage d'affaires international.",
      features: [
        "Planification et soumission d'une consultation 1-à-1 privée",
        "Accès illimité à tous les calculateurs stratégiques",
        "Téléchargement de l'ensemble des guides et canevas légaux",
        "Revue critique de votre dossier par l'équipe d'Al-Shammari",
        "Réponse garantie sous 48 heures ouvrées"
      ],
      popular: true
    },
    {
      title: "Liaison d'Élite",
      price: 500,
      description: "Pour les projets d'affaires complexes nécessitant des introductions stratégiques.",
      features: [
        "Priorité absolue sur l'agenda d'Al-Shammari pour la consultation",
        "Introduction personnalisée auprès d'un agent de liaison local",
        "Analyse fiscale comparée de 3 juridictions cibles",
        "Messagerie privée directe et canal d'urgence",
        "Accès administrateur aux outils de syndication immobilière"
      ],
      popular: false
    }
  ];

  const handleSubscribe = async (amount: number) => {
    if (amount < 50) {
      setError("Le montant minimum pour débloquer l'expertise est de 50$.");
      return;
    }

    setPaymentAmount(amount);

    if (!user) {
      // Store intended amount in localStorage so we can retrieve it after registration/login
      localStorage.setItem("intended_payment_amount", amount.toString());
      setCurrentRoute("register");
      return;
    }

    try {
      const res = await fetch("/api/payment/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.id}`
        },
        body: JSON.stringify({ amount })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Impossible d'initier la session.");
      }

      // Route to our high-fidelity Stripe payment checkout simulator page
      setCurrentRoute("payment");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Une erreur s'est produite. Veuillez réessayer.");
    }
  };

  return (
    <section className="py-24 bg-[#050505] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37]/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#D4AF37] font-sans-ui">
            Investissement requis
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mt-2 uppercase tracking-tight italic font-serif">
            Accès Expertises & Espace Membre
          </h2>
          <div className="w-16 h-[1px] bg-[#D4AF37]/40 mx-auto mt-4" />
          <p className="max-w-2xl mx-auto text-[#F5E6D3]/60 mt-4 text-xs sm:text-sm font-serif italic leading-relaxed">
            Débloquez instantanément l'ensemble des modules analytiques, la planification de consultation privée, et la documentation d'élite d'Al-Shammari.
          </p>
        </div>

        {/* Dynamic customizable interactive tier selector */}
        <div className="max-w-3xl mx-auto mb-16 p-8 bg-[#0a0a0a] border border-[#D4AF37]/15 shadow-[0_0_25px_rgba(212,175,55,0.03)] text-center">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] font-bold block mb-3 font-sans-ui">🎚️ Tarification Sur-Mesure / Ajustable</span>
          <h3 className="text-xl font-bold text-neutral-200 mb-2 font-serif">Sélectionnez votre niveau d'accompagnement</h3>
          <p className="text-xs text-[#F5E6D3]/60 font-serif italic max-w-lg mx-auto mb-6 leading-relaxed">
            Vous pouvez ajuster librement le montant de votre adhésion à partir du seuil minimal obligatoire de <span className="text-[#D4AF37] font-semibold not-italic font-sans-ui">50$</span>. Plus le montant est élevé, plus le niveau d'assistance s'étend.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-8">
            <div className="flex items-center space-x-2 bg-[#050505] px-5 py-3 border border-[#D4AF37]/10 font-serif">
              <Coins className="w-5 h-5 text-[#D4AF37]" />
              <span className="text-3xl font-black text-white">{selectedAmount}</span>
              <span className="text-[#D4AF37] text-sm font-bold font-sans-ui">USD</span>
            </div>

            <div className="w-full max-w-[280px]">
              <input
                id="pricing-slider"
                type="range"
                min="50"
                max="1000"
                step="25"
                value={selectedAmount}
                onChange={(e) => {
                  setSelectedAmount(Number(e.target.value));
                  setError("");
                }}
                className="w-full accent-[#D4AF37] h-1.5 bg-neutral-900 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-neutral-600 font-bold uppercase mt-2 font-sans-ui">
                <span>Minimum 50$</span>
                <span>Max 1000$</span>
              </div>
            </div>

            <button
              id="btn-custom-subscribe"
              onClick={() => handleSubscribe(selectedAmount)}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#D4AF37] hover:bg-[#F5E6D3] text-[#050505] font-bold text-xs uppercase tracking-widest shadow-[0_0_15px_rgba(212,175,55,0.1)] transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer font-sans-ui"
            >
              <CreditCard className="w-4 h-4 text-black" />
              <span>Souscrire à ce montant</span>
            </button>
          </div>

          {error && (
            <div className="p-3 bg-red-950/20 border border-red-500/20 rounded-lg text-red-400 text-xs inline-flex items-center space-x-2 font-sans-ui">
              <AlertCircle className="w-4 h-4" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Standard Preset Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {tiers.map((tier, idx) => (
            <div
              key={idx}
              id={`pricing-tier-card-${idx}`}
              className={`p-8 border relative flex flex-col justify-between transition-all duration-300 ${
                tier.popular
                  ? "bg-[#0a0a0a] border-[#D4AF37] shadow-[0_0_25px_rgba(212,175,55,0.05)]"
                  : "bg-[#080808]/40 border-[#D4AF37]/10 hover:border-[#D4AF37]/20"
              }`}
            >
              {tier.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-[#D4AF37] text-[#050505] text-[9px] font-black uppercase tracking-widest shadow-md font-sans-ui">
                  Recommandé
                </span>
              )}

              <div>
                <h3 className="text-neutral-100 font-bold text-lg tracking-tight uppercase font-serif">{tier.title}</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-black text-[#D4AF37] tracking-tight font-serif">{tier.price}$</span>
                  <span className="text-neutral-500 text-[10px] ml-2 uppercase font-bold tracking-wider font-sans-ui">Adhésion Unique</span>
                </div>
                <p className="text-[#F5E6D3]/60 text-xs mt-3 leading-relaxed font-serif min-h-[40px] italic">{tier.description}</p>
                
                <div className="w-full h-[1px] bg-[#D4AF37]/10 my-6" />

                <ul className="space-y-3.5 mb-8">
                  {tier.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start space-x-2.5 text-xs text-[#F5E6D3]/85 leading-relaxed font-serif">
                      <Check className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                id={`btn-pricing-subscribe-preset-${idx}`}
                onClick={() => handleSubscribe(tier.price)}
                className={`w-full py-3 text-xs font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer font-sans-ui ${
                  tier.popular
                    ? "bg-[#D4AF37] hover:bg-[#F5E6D3] text-[#050505]"
                    : "border border-[#D4AF37]/30 hover:border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/5"
                }`}
              >
                Sélectionner
              </button>
            </div>
          ))}
        </div>

        {/* Security Declaration */}
        <div className="mt-16 text-center max-w-xl mx-auto flex flex-col items-center space-y-2 font-sans-ui">
          <ShieldCheck className="w-8 h-8 text-[#D4AF37]" />
          <h4 className="text-sm font-bold text-neutral-300 uppercase tracking-widest">Protocoles de Paiement Chiffrés</h4>
          <p className="text-[11px] text-neutral-500 leading-relaxed font-light">
            Les transactions sont initiées via une session de paiement Stripe chiffrée SSL de bout en bout. Aucune coordonnée bancaire n'est sauvegardée sur nos serveurs.
          </p>
        </div>
      </div>
    </section>
  );
}
