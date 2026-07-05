import { Briefcase, Landmark, Globe, Trophy, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { useLanguage } from "../LanguageContext";

export default function AboutAlShammari() {
  const { t } = useLanguage();

  const stats = [
    { value: "20+", label: t("statYears") },
    { value: "400+", label: t("statLaunched") },
    { value: "50M$+", label: t("statFunds") },
    { value: "15+", label: t("statCountries") },
  ];

  const expertises = [
    {
      icon: Briefcase,
      title: t("aboutFocusTitle1"),
      desc: t("aboutFocusDesc1")
    },
    {
      icon: Landmark,
      title: t("aboutFocusTitle2"),
      desc: t("aboutFocusDesc2")
    },
    {
      icon: Globe,
      title: t("aboutFocusTitle3"),
      desc: t("aboutFocusDesc3")
    }
  ];

  return (
    <section className="py-24 bg-[#0a0a0a]/80 backdrop-blur-xs border-y border-[#D4AF37]/10 relative overflow-hidden">
      {/* Visual Accents */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[400px] h-[400px] bg-[#D4AF37]/3 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#D4AF37] font-sans-ui">
            {t("aboutFounder")}
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mt-2 uppercase tracking-tight italic font-serif">
            AL-SHAMMARI
          </h2>
          <div className="w-16 h-[1px] bg-[#D4AF37]/40 mx-auto mt-4" />
          <p className="max-w-2xl mx-auto text-[#F5E6D3]/60 mt-4 text-xs sm:text-sm font-serif italic leading-relaxed">
            {t("aboutIntroText")}
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Portrait Column */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative p-3 border border-[#D4AF37]/15 bg-[#050505] shadow-[0_0_35px_rgba(212,175,55,0.05)] group max-w-[380px] w-full"
            >
              {/* Corner Accents */}
              <div className="absolute -top-1 -left-1 w-4 h-4 border-t border-l border-[#D4AF37]" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b border-r border-[#D4AF37]" />
              
              <div className="relative overflow-hidden aspect-square bg-[#0a0a0a]">
                <img
                  src="/src/assets/images/advisor_portrait_1783280314130.jpg"
                  alt="Conseiller Al-Shammari"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60" />
              </div>
              
              <div className="mt-4 text-center pb-2">
                <h4 className="text-[#D4AF37] font-bold text-lg tracking-wider uppercase font-serif italic">Al-Shammari</h4>
                <p className="text-neutral-500 text-[10px] uppercase tracking-widest mt-0.5 font-sans-ui font-bold">{t("aboutRole")}</p>
              </div>
            </motion.div>
          </div>

          {/* Details Column */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h3 className="text-3xl sm:text-4xl font-bold text-neutral-100 tracking-tight font-serif leading-tight">
                {t("aboutTitleUpper")} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#F5E6D3] to-[#8B7355] italic">{t("aboutTitleLower")}</span>
              </h3>
              
              <p className="text-[#F5E6D3]/70 text-sm leading-relaxed font-serif">
                {t("aboutDesc")}
              </p>

              <blockquote className="border-l border-[#D4AF37]/50 pl-4 py-1.5 italic text-[#F5E6D3]/80 text-sm bg-[#D4AF37]/3">
                "{t("aboutQuote")}"
              </blockquote>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-[#D4AF37]/10 my-6 font-serif">
                {stats.map((stat, idx) => (
                  <div key={idx} className="text-center">
                    <div className="text-2xl sm:text-3xl font-black text-[#D4AF37] tracking-tight">{stat.value}</div>
                    <div className="text-[10px] text-neutral-500 uppercase tracking-widest mt-1 font-sans-ui font-bold">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Skill items */}
              <div className="space-y-4 pt-2">
                {expertises.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3.5 group">
                    <div className="p-2.5 bg-[#D4AF37]/5 border border-[#D4AF37]/10 group-hover:bg-[#D4AF37]/15 transition-all text-[#D4AF37]">
                      <item.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-neutral-200 group-hover:text-[#D4AF37] transition-colors font-serif uppercase tracking-wider">
                        {item.title}
                      </h4>
                      <p className="text-xs text-neutral-500 mt-1 leading-relaxed font-sans-ui">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
