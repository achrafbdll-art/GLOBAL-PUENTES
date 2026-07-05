import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, RefreshCw } from "lucide-react";
import { motion } from "motion/react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (status === 'error') setStatus('idle');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setStatus('error');
      setErrorMessage("Veuillez remplir tous les champs obligatoires (*) pour soumettre.");
      return;
    }

    setLoading(true);
    setStatus('idle');

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Une erreur s'est produite lors de la transmission.");
      }

      setStatus('success');
      setFormData({
        name: "",
        email: "",
        company: "",
        subject: "",
        message: ""
      });
    } catch (err: any) {
      console.error("Submission error:", err);
      setStatus('error');
      setErrorMessage(err.message || "Impossible de joindre le serveur. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 bg-[#050505]/80 backdrop-blur-xs relative overflow-hidden">
      <div className="absolute inset-y-0 right-0 w-1/3 bg-[#D4AF37]/1 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#D4AF37] font-sans-ui">
            Entrer en relation
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mt-2 uppercase tracking-tight italic font-serif">
            Cabinet de Liaison
          </h2>
          <div className="w-16 h-[1px] bg-[#D4AF37]/40 mx-auto mt-4" />
          <p className="max-w-2xl mx-auto text-[#F5E6D3]/60 mt-4 text-xs sm:text-sm font-serif italic leading-relaxed">
            Une question stratégique ? Un dossier de montage international à présenter ? Soumettez votre requête directement et recevez un retour sous 24 à 48 heures.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-[#0a0a0a] border border-[#D4AF37]/10 overflow-hidden p-6 sm:p-12 shadow-[0_0_30px_rgba(212,175,55,0.02)]">
          {/* Info Card - 5 cols */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-12">
            <div>
              <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-tight font-serif">
                Canaux de communication
              </h3>
              <p className="text-xs sm:text-sm text-[#F5E6D3]/60 font-serif italic leading-relaxed mb-8">
                Pour assurer une totale confidentialité de vos données corporatives, l'intégralité de nos transmissions de fichiers et correspondances écrites est chiffrée de bout en bout.
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-[#D4AF37]/5 border border-[#D4AF37]/10 text-[#D4AF37]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-neutral-300 font-bold text-xs uppercase tracking-wider font-sans-ui">Adresse Principale</h4>
                    <p className="text-[#F5E6D3]/60 text-xs mt-1 leading-relaxed font-serif">
                      Downtown Boulevard, Al-Shammari Tower<br />
                      Émirats Arabes Unis (EAU)
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-[#D4AF37]/5 border border-[#D4AF37]/10 text-[#D4AF37]">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-neutral-300 font-bold text-xs uppercase tracking-wider font-sans-ui">Téléphone Exécutif</h4>
                    <p className="text-[#F5E6D3]/60 text-xs mt-1 font-serif">
                      +971 4 230 0000 (Lundi - Vendredi, 9h - 18h GST)
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-[#D4AF37]/5 border border-[#D4AF37]/10 text-[#D4AF37]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-neutral-300 font-bold text-xs uppercase tracking-wider font-sans-ui">Courriel Général</h4>
                    <p className="text-[#F5E6D3]/60 text-xs mt-1 font-serif">
                      office@globalpuentes.com
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 border border-[#D4AF37]/15 bg-[#D4AF37]/3 text-xs text-[#D4AF37]/90 leading-relaxed font-serif italic">
              <span className="font-bold uppercase tracking-wider block mb-1 font-sans-ui not-italic text-[10px]">🔐 Note Légale de Confidentialité :</span>
              Les correspondances reçues par ce cabinet sont protégées par le secret professionnel fiduciaire et bancaire applicable en Émirats Arabes Unis et en Suisse.
            </div>
          </div>

          {/* Form Card - 7 cols */}
          <div className="lg:col-span-7">
            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col justify-center items-center text-center p-8 border border-[#D4AF37]/20 bg-[#D4AF37]/3 rounded-none min-h-[400px]"
              >
                <CheckCircle2 className="w-16 h-16 text-[#D4AF37] mb-6" />
                <h3 className="text-2xl font-bold text-white mb-2 uppercase tracking-tight font-serif">Transmission Réussie</h3>
                <p className="text-[#F5E6D3]/70 text-xs sm:text-sm font-serif italic max-w-md mb-8 leading-relaxed">
                  Votre message stratégique a été chiffré et consigné en toute sécurité. L'expert Al-Shammari ou l'un de ses associés prendra contact avec vous sous 24 à 48 heures ouvrées.
                </p>
                <button
                  id="btn-contact-reset"
                  onClick={() => setStatus('idle')}
                  className="px-8 py-3 border border-[#D4AF37]/40 hover:border-[#D4AF37] text-xs text-[#D4AF37] font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer font-sans-ui"
                >
                  Envoyer un autre message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="flex flex-col space-y-1.5">
                    <label htmlFor="contact-name" className="text-[#F5E6D3]/70 font-bold text-[10px] uppercase tracking-widest font-sans-ui">
                      Nom Complet *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Ex: Alexandre Bernard"
                      required
                      className="w-full bg-[#050505] border border-[#D4AF37]/15 focus:border-[#D4AF37]/50 rounded-none px-4 py-3.5 text-neutral-200 text-xs sm:text-sm focus:outline-none transition-all placeholder:text-neutral-700 font-serif"
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col space-y-1.5">
                    <label htmlFor="contact-email" className="text-[#F5E6D3]/70 font-bold text-[10px] uppercase tracking-widest font-sans-ui">
                      Adresse Courriel *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Ex: alexandre@societe.com"
                      required
                      className="w-full bg-[#050505] border border-[#D4AF37]/15 focus:border-[#D4AF37]/50 rounded-none px-4 py-3.5 text-neutral-200 text-xs sm:text-sm focus:outline-none transition-all placeholder:text-neutral-700 font-serif"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Company */}
                  <div className="flex flex-col space-y-1.5">
                    <label htmlFor="contact-company" className="text-[#F5E6D3]/70 font-bold text-[10px] uppercase tracking-widest font-sans-ui">
                      Société / Organisation
                    </label>
                    <input
                      id="contact-company"
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Ex: Bernard Industries SAS"
                      className="w-full bg-[#050505] border border-[#D4AF37]/15 focus:border-[#D4AF37]/50 rounded-none px-4 py-3.5 text-neutral-200 text-xs sm:text-sm focus:outline-none transition-all placeholder:text-neutral-700 font-serif"
                    />
                  </div>

                  {/* Subject */}
                  <div className="flex flex-col space-y-1.5">
                    <label htmlFor="contact-subject" className="text-[#F5E6D3]/70 font-bold text-[10px] uppercase tracking-widest font-sans-ui">
                      Objet de la requête *
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Ex: Montage fiscal et holding à Dubaï"
                      required
                      className="w-full bg-[#050505] border border-[#D4AF37]/15 focus:border-[#D4AF37]/50 rounded-none px-4 py-3.5 text-neutral-200 text-xs sm:text-sm focus:outline-none transition-all placeholder:text-neutral-700 font-serif"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col space-y-1.5">
                  <label htmlFor="contact-message" className="text-[#F5E6D3]/70 font-bold text-[10px] uppercase tracking-widest font-sans-ui">
                    Détails du projet / Message d'explication *
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Veuillez décrire brièvement l'objet de votre démarche, les juridictions visées et les montants d'actifs concernés si applicable..."
                    required
                    className="w-full bg-[#050505] border border-[#D4AF37]/15 focus:border-[#D4AF37]/50 rounded-none px-4 py-3.5 text-neutral-200 text-xs sm:text-sm focus:outline-none transition-all placeholder:text-neutral-700 resize-none leading-relaxed font-serif"
                  />
                </div>

                {status === 'error' && (
                  <div className="p-3 bg-red-950/20 border border-red-500/20 rounded-lg text-red-400 text-xs flex items-center space-x-2 font-sans-ui">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <button
                  id="btn-contact-submit"
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-10 py-3.5 bg-[#D4AF37] hover:bg-[#F5E6D3] text-[#050505] font-bold text-xs uppercase tracking-widest shadow-md transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-55 disabled:cursor-not-allowed font-sans-ui"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Transmission...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Transmettre le dossier</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
