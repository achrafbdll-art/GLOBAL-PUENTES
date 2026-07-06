import { Quote, Star } from "lucide-react";
import { Testimonial } from "../types";
import { motion } from "motion/react";
import { useLanguage } from "../LanguageContext";

export default function TestimonialsList() {
  const { language, t } = useLanguage();

  const langData = {
    fr: {
      sectionBadge: "Témoignages de Prestige",
      sectionTitle: "Recommandations Clients",
      sectionDesc: "Découvrez les retours de grands décideurs, industriels et investisseurs privés qui s'appuient au quotidien sur l'expertise de GLOBAL-PUENTE.",
      list: [
        {
          id: "t1",
          clientName: "Omar Al-Mansoori",
          clientTitle: "Président, Al-Mansoori Logistics (Dubaï)",
          content: "Grâce aux conseils structurels de GLOBAL-PUENTE, nous avons pu implanter notre holding logistique de fret en zone franche à Dubaï et optimiser nos flux de trésorerie de manière totalement légale et fluide. Son réseau bancaire s'est avéré inestimable.",
          rating: 5,
        },
        {
          id: "t2",
          clientName: "Catherine Lehmann",
          clientTitle: "Directrice Associée, Lehmann Wealth (Genève)",
          content: "GLOBAL-PUENTE est un négociateur d'affaires redoutable. Lors de notre acquisition immobilière transfrontalière, il a su dénouer des blocages administratifs majeurs en moins de 48 heures grâce à ses contacts d'influence. Un accompagnement exceptionnel.",
          rating: 5,
        },
        {
          id: "t3",
          clientName: "Tan Sri Lim",
          clientTitle: "Fondateur, Lim Commodities (Singapour)",
          content: "L'assistance de GLOBAL-PUENTE sur nos accords de Trade Finance pour l'importation de métaux précieux a réduit nos délais logistiques de 35%. Ses analyses chirurgicales sur la faisabilité des marchés asiatiques sont inégalées.",
          rating: 5,
        }
      ]
    },
    es: {
      sectionBadge: "Testimonios de Prestigio",
      sectionTitle: "Recomendaciones de Clientes",
      sectionDesc: "Descubra las opiniones de destacados líderes de opinión, industriales e inversores privados que confían a diario en la experiencia de GLOBAL-PUENTE.",
      list: [
        {
          id: "t1",
          clientName: "Omar Al-Mansoori",
          clientTitle: "Presidente, Al-Mansoori Logistics (Dubái)",
          content: "Gracias a los consejos de estructuración de GLOBAL-PUENTE, pudimos establecer nuestro holding de logística de carga en la zona franca de Dubái y optimizar nuestros flujos de caja de forma totalmente legal y fluida. Su red bancaria resultó invaluable.",
          rating: 5,
        },
        {
          id: "t2",
          clientName: "Catherine Lehmann",
          clientTitle: "Directora Asociada, Lehmann Wealth (Ginebra)",
          content: "GLOBAL-PUENTE es un negociador de negocios formidable. Durante nuestra adquisición inmobiliaria transfronteriza, logró resolver importantes obstáculos administrativos en menos de 48 horas gracias a sus contactos influyentes. Un acompañamiento excepcional.",
          rating: 5,
        },
        {
          id: "t3",
          clientName: "Tan Sri Lim",
          clientTitle: "Fundador, Lim Commodities (Singapur)",
          content: "La asistencia de GLOBAL-PUENTE en nuestros acuerdos de Trade Finance para la importación de metales preciosos redujo nuestros tiempos logísticos en un 35%. Sus análisis quirúrgicos sobre la viabilidad de los mercados asiáticos son inigualables.",
          rating: 5,
        }
      ]
    },
    ar: {
      sectionBadge: "شهادات مرموقة",
      sectionTitle: "توصيات العملاء",
      sectionDesc: "اكتشف آراء كبار صناع القرار والصناعيين والمستثمرين الخواص الذين يعتمدون يومياً على خبرة GLOBAL-PUENTE.",
      list: [
        {
          id: "t1",
          clientName: "عمر المنصوري",
          clientTitle: "رئيس مجلس الإدارة، المنصوري للخدمات اللوجستية (دبي)",
          content: "بفضل التوجيهات الهيكلية للخبير GLOBAL-PUENTE، تمكنا من تأسيس شركتنا اللوجستية القابضة في المنطقة الحرة في دبي وتحسين تدفقاتنا النقدية بشكل قانوني وسلس تماماً. لقد كانت شبكته المصرفية لا تقدر بثمن.",
          rating: 5,
        },
        {
          id: "t2",
          clientName: "كاثرين ليمان",
          clientTitle: "شريكة مديرة، ليمان لإدارة الثروات (جنيف)",
          content: "GLOBAL-PUENTE مفاوض تجاري بارع. خلال عملية الاستحواذ العقاري العابرة للحدود التي قمنا بها، تمكن من حل عقبات إدارية كبرى في أقل من 48 ساعة بفضل علاقاته المؤثرة. دعم استثنائي بكل المقاييس.",
          rating: 5,
        },
        {
          id: "t3",
          clientName: "تان سري ليم",
          clientTitle: "مؤسس، ليم للسلع والمواد الأساسية (سنغافورة)",
          content: "مساعدة GLOBAL-PUENTE في اتفاقيات تمويل التجارة الخاصة بنا لاستيراد المعادن الثمينة قلصت أوقاتنا اللوجستية بنسبة 35٪. تحليلاته الدقيقة للغاية حول جدوى الأسواق الآسيوية لا يعلى عليها.",
          rating: 5,
        }
      ]
    }
  };

  const activeLangData = langData[language] || langData["es"];

  return (
    <section className="py-28 bg-[#050505] border-t border-[#D4AF37]/20 relative overflow-hidden">
      {/* Premium Luminous Gold Background Motifs and Patterns */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        {/* Repeating fine-line geometric luxury grid motif */}
        <div className="absolute inset-0 opacity-[0.07]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg stroke='%23D4AF37' stroke-width='0.5' stroke-opacity='0.6'%3E%3Cpath d='M40 0 L80 40 L40 80 L0 40 Z' /%3E%3Cpath d='M40 10 L70 40 L40 70 L10 40 Z' /%3E%3Ccircle cx='40' cy='40' r='3' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }} />

        {/* Ambient luminous gold radial glows */}
        <div className="absolute -top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-b from-[#D4AF37]/10 to-transparent rounded-full blur-[120px] opacity-80" />
        <div className="absolute bottom-0 right-10 w-[400px] h-[400px] bg-[#D4AF37]/4 rounded-full blur-[100px] opacity-60" />
        <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-[#8B7355]/4 rounded-full blur-[100px] opacity-60" />

        {/* Beautiful large centerpiece glowing gold motif vector behind the header */}
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] opacity-[0.06] flex items-center justify-center animate-pulse" style={{ animationDuration: "8s" }}>
          <svg viewBox="0 0 200 200" className="w-full h-full text-[#D4AF37]">
            <circle cx="100" cy="100" r="95" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4,4" />
            <circle cx="100" cy="100" r="75" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <circle cx="100" cy="100" r="55" fill="none" stroke="currentColor" strokeWidth="0.75" />
            <polygon points="100,20 120,80 180,100 120,120 100,180 80,120 20,100 80,80" fill="none" stroke="currentColor" strokeWidth="0.75" />
            <polygon points="100,40 112,88 160,100 112,112 100,160 88,112 40,100 88,88" fill="none" stroke="currentColor" strokeWidth="0.5" />
            {[...Array(12)].map((_, i) => {
              const angle = (i * 30 * Math.PI) / 180;
              const x1 = 100 + 75 * Math.sin(angle);
              const y1 = 100 - 75 * Math.cos(angle);
              const x2 = 100 + 95 * Math.sin(angle);
              const y2 = 100 - 95 * Math.cos(angle);
              return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="0.5" />;
            })}
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <span className="text-xs font-bold uppercase tracking-[0.35em] text-[#D4AF37] bg-[#D4AF37]/5 px-4 py-1.5 rounded-full border border-[#D4AF37]/15 inline-block font-sans-ui">
            {activeLangData.sectionBadge}
          </span>
          <h2 className="text-4xl sm:text-5xl font-serif text-white mt-4 uppercase tracking-wide italic">
            {activeLangData.sectionTitle}
          </h2>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent mx-auto mt-5" />
          <p className="max-w-2xl mx-auto text-[#F5E6D3]/75 mt-5 text-xs sm:text-sm font-serif italic leading-relaxed">
            {activeLangData.sectionDesc}
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {activeLangData.list.map((testimonial, idx) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="p-8 bg-[#080808]/40 border border-[#D4AF37]/10 shadow-[0_0_20px_rgba(212,175,55,0.01)] hover:border-[#D4AF37]/30 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <Quote className="w-8 h-8 text-[#D4AF37]/10 mb-6" />
                
                {/* Stars */}
                <div className="flex space-x-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, sIdx) => (
                    <Star key={sIdx} className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
                  ))}
                </div>

                <p className="text-[#F5E6D3]/80 text-xs sm:text-sm font-serif italic leading-relaxed mb-8">
                  "{testimonial.content}"
                </p>
              </div>

              <div className="border-t border-[#D4AF37]/10 pt-4 mt-auto">
                <h4 className="text-[#D4AF37] text-xs sm:text-sm font-bold uppercase tracking-wider font-serif">
                  {testimonial.clientName}
                </h4>
                <p className="text-neutral-500 text-[9px] uppercase tracking-widest mt-1 font-sans-ui font-bold">
                  {testimonial.clientTitle}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
