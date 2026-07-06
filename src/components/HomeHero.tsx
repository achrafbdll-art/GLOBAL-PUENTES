import { Route, User } from "../types";
import { ArrowRight, Sparkles, Globe, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";
import { useLanguage } from "../LanguageContext";
import FlagAnimation3D from "./FlagAnimation3D";

export default function HomeHero({ setCurrentRoute, user }: HomeHeroProps) {
  const { language, t } = useLanguage();

  const handleCtaClick = () => {
    if (!user) {
      setCurrentRoute("register");
    } else if (user.membershipStatus === "active") {
      setCurrentRoute("member");
    } else {
      setCurrentRoute("pricing");
    }
  };

  // Correction des chemins pour qu'ils soient relatifs au dossier public ou gérés par le bundler
  // Note: En React/Vite, les images dans src/assets doivent être importées ou appelées via des chemins relatifs corrects
  const photos = [
    {
      src: "src/assets/images/eee.webp",
      title: "Dubai — Global Business Hub",
      tag: "Dubai"
    },
    {
      src: "src/assets/images/cargo_ship_trade_1783282445365.jpg",
      title: "Logistics & Global Trade Finance",
      tag: "Logistics"
    },
    {
      src: "src/assets/images/geneva_wealth_room_1783282456159.jpg",
      title: "Geneva — Private Wealth Management",
      tag: "Geneva"
    },
    {
      src: "src/assets/images/executive_negotiation_1783282468019.jpg",
      title: "Elite Structuring & Negotiations",
      tag: "Executive"
    }
  ];

  const scrollingPhotos = [...photos, ...photos, ...photos, ...photos];

  return (
    <section className="relative min-h-[110vh] lg:min-h-[118vh] flex flex-col justify-between overflow-hidden bg-[#050505] pt-24 pb-8">
      <div className="absolute inset-0 z-0">
        <img
          src="src/assets/images/hero_background_1783280300050.jpg"
          alt="Chiaroscuro Gold Luxury Background"
          className="w-full h-full object-cover opacity-20 filter brightness-[0.35] contrast-[1.15]"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-[#050505]" />
        <div className="absolute inset-0 bg-zellige opacity-[0.26] pointer-events-none mix-blend-screen" />
      </div>

      <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] bg-[#D4AF37] opacity-10 rounded-full blur-[120px] pointer-events-none z-1" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[600px] h-[600px] bg-[#8B7355] opacity-20 rounded-full blur-[150px] pointer-events-none z-1" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex-grow flex flex-col justify-center w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full">
          <div className="lg:col-span-7 text-center lg:text-left flex flex-col items-center lg:items-start justify-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center space-x-2 px-5 py-1.5 bg-[#D4AF37]/5 border border-[#D4AF37]/20 text-[#D4AF37] text-[10px] font-bold tracking-[0.4em] uppercase mb-8 font-sans-ui"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t("heroSubtitleUpper")}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-5xl sm:text-7xl lg:text-8xl font-black italic tracking-tighter text-white uppercase mb-6 leading-[0.85] font-serif w-full"
            >
              <span className="block text-[#F5E6D3]/60 font-light text-2xl sm:text-3xl tracking-[0.2em] mb-4 not-italic uppercase font-serif">
                {t("heroTitleUpper")}
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#F5E6D3] to-[#8B7355] drop-shadow-sm">
                {t("heroTitleLower")}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="max-w-2xl text-base sm:text-lg text-[#F5E6D3]/70 font-serif italic mb-10 leading-relaxed"
            >
              {t("heroDesc")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-6 w-full"
            >
              <button
                id="btn-hero-primary-action"
                onClick={handleCtaClick}
                className="w-full sm:w-auto px-10 py-4 bg-[#D4AF37] text-[#050505] font-bold text-xs uppercase tracking-widest hover:bg-[#F5E6D3] transition-all duration-300 shadow-[0_0_40px_rgba(212,175,55,0.2)] flex items-center justify-center space-x-2 cursor-pointer font-sans-ui rounded-sm"
              >
                <span>
                  {user && user.membershipStatus === "active"
                    ? t("heroCtaMember")
                    : t("heroCtaUnlock")}
                </span>
                <ArrowRight className="w-4 h-4 text-black rtl:rotate-180" />
              </button>

              <button
                id="btn-hero-secondary-action"
                onClick={() => setCurrentRoute("about")}
                className="w-full sm:w-auto px-10 py-4 border border-[#D4AF37]/40 hover:border-[#D4AF37] hover:bg-[#D4AF37]/5 text-[#D4AF37] font-semibold tracking-widest uppercase text-xs transition-all duration-300 cursor-pointer font-sans-ui rounded-sm"
              >
                {t("heroCtaDiscover")}
              </button>
            </motion.div>
          </div>

          <div className="lg:col-span-5 w-full flex justify-center items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="relative w-full max-w-[360px] aspect-[3/4] rounded-sm overflow-hidden border border-[#D4AF37]/25 shadow-[0_0_50px_rgba(212,175,55,0.15)] bg-black p-2 group"
            >
              <div className="relative w-full h-full overflow-hidden border border-[#D4AF37]/15 rounded-xs">
                <img
                  src="src/assets/images/al_shammari_portrait_1783283014114.jpg"
                  alt="GLOBAL-PUENTE Business Expert"
                  className="w-full h-full object-cover opacity-90 transition-transform duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <div className="absolute top-4 right-4 w-10 h-10 bg-black/60 rounded-full border border-[#D4AF37]/35 flex items-center justify-center pointer-events-none backdrop-blur-xs">
                  <svg className="w-6 h-6 text-[#D4AF37]/80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="50" cy="50" r="44" stroke="#D4AF37" strokeWidth="1.5" />
                    <circle cx="50" cy="50" r="38" stroke="#D4AF37" strokeWidth="0.5" strokeDasharray="2 2" />
                    <path d="M35 65 L35 45 C35 37 42 35 50 35 C58 35 65 37 65 45 L65 65" stroke="#D4AF37" strokeWidth="1.5" />
                    <circle cx="50" cy="50" r="3" fill="#D4AF37" />
                  </svg>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-[#050505]/95 border-t border-[#D4AF37]/20 px-5 py-4 backdrop-blur-md">
                  <div className="flex items-center justify-between">
                    <div className="text-left">
                      <p className="text-[#D4AF37] text-[10px] font-black tracking-[0.2em] uppercase font-sans-ui">
                        GLOBAL-PUENTE
                      </p>
                      <p className="text-white text-xs font-serif italic mt-0.5">
                        Certified International Business Advisor
                      </p>
                    </div>
                    <div className="flex items-center space-x-1 text-emerald-400">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                      <span className="text-[7px] tracking-widest font-black uppercase font-sans-ui">VERIFIED</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 max-w-7xl mx-auto mt-20 pt-8 border-t border-[#D4AF37]/10 text-[#8B7355] text-[10px] tracking-[0.2em] uppercase font-sans-ui"
        >
          <div className="flex items-center justify-center space-x-2.5">
            <Globe className="w-5 h-5 text-[#D4AF37]/50" />
            <span>{t("heroScale")}</span>
          </div>
          <div className="flex items-center justify-center space-x-2.5 border-y sm:border-y-0 sm:border-x border-neutral-900/50 py-3 sm:py-0">
            <ShieldCheck className="w-5 h-5 text-[#D4AF37]/50" />
            <span>{t("heroLegal")}</span>
          </div>
          <div className="flex items-center justify-center space-x-2.5">
            <Sparkles className="w-5 h-5 text-[#D4AF37]/50" />
            <span>{t("heroStartingPrice")}</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-12 w-full"
        >
          <FlagAnimation3D />
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
        className="w-full border-t border-b border-[#D4AF37]/10 bg-[#070707]/90 py-6 overflow-hidden mt-16 relative z-10"
      >
        <div className="animate-marquee flex gap-6 pl-6">
          {scrollingPhotos.map((photo, idx) => (
            <div 
              key={idx} 
              className="relative w-64 sm:w-80 h-36 sm:h-44 flex-shrink-0 group overflow-hidden border border-[#D4AF37]/15 bg-black transition-all duration-300 rounded-sm"
            >
              <img
                src={photo.src}
                alt={photo.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-75 group-hover:opacity-100"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-90" />
              <div className="absolute top-2.5 left-2.5 bg-black/85 border border-[#D4AF37]/35 text-[#D4AF37] px-2 py-0.5 text-[8px] uppercase tracking-widest font-sans-ui font-bold">
                {photo.tag}
              </div>
              <div className="absolute bottom-3 left-3 right-3 text-left">
                <p className="text-white font-serif italic text-xs tracking-wide font-medium drop-shadow-md">
                  {photo.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
