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
      sectionDesc: "Découvrez les retours de grands décideurs, industriels et investisseurs privés qui s'appuient au quotidien sur l'expertise d'Al-Shammari.",
      list: [
        {
          id: "t1",
          clientName: "Omar Al-Mansoori",
          clientTitle: "Président, Al-Mansoori Logistics (Dubaï)",
          content: "Grâce aux conseils structurels d'Al-Shammari, nous avons pu implanter notre holding logistique de fret en zone franche à Dubaï et optimiser nos flux de trésorerie de manière totalement légale et fluide. Son réseau bancaire s'est avéré inestimable.",
          rating: 5,
        },
        {
          id: "t2",
          clientName: "Catherine Lehmann",
          clientTitle: "Directrice Associée, Lehmann Wealth (Genève)",
          content: "Al-Shammari est un négociateur d'affaires redoutable. Lors de notre acquisition immobilière transfrontalière, il a su dénouer des blocages administratifs majeurs en moins de 48 heures grâce à ses contacts d'influence. Un accompagnement exceptionnel.",
          rating: 5,
        },
        {
          id: "t3",
          clientName: "Tan Sri Lim",
          clientTitle: "Fondateur, Lim Commodities (Singapour)",
          content: "L'assistance d'Al-Shammari sur nos accords de Trade Finance pour l'importation de métaux précieux a réduit nos délais logistiques de 35%. Ses analyses chirurgicales sur la faisabilité des marchés asiatiques sont inégalées.",
          rating: 5,
        }
      ]
    },
    es: {
      sectionBadge: "Testimonios de Prestigio",
      sectionTitle: "Recomendaciones de Clientes",
      sectionDesc: "Descubra las opiniones de destacados líderes de opinión, industriales e inversores privados que confían a diario en la experiencia de Al-Shammari.",
      list: [
        {
          id: "t1",
          clientName: "Omar Al-Mansoori",
          clientTitle: "Presidente, Al-Mansoori Logistics (Dubái)",
          content: "Gracias a los consejos de estructuración de Al-Shammari, pudimos establecer nuestro holding de logística de carga en la zona franca de Dubái y optimizar nuestros flujos de caja de forma totalmente legal y fluida. Su red bancaria resultó invaluable.",
          rating: 5,
        },
        {
          id: "t2",
          clientName: "Catherine Lehmann",
          clientTitle: "Directora Asociada, Lehmann Wealth (Ginebra)",
          content: "Al-Shammari es un negociador de negocios formidable. Durante nuestra adquisición inmobiliaria transfronteriza, logró resolver importantes obstáculos administrativos en menos de 48 horas gracias a sus contactos influyentes. Un acompañamiento excepcional.",
          rating: 5,
        },
        {
          id: "t3",
          clientName: "Tan Sri Lim",
          clientTitle: "Fundador, Lim Commodities (Singapur)",
          content: "La asistencia de Al-Shammari en nuestros acuerdos de Trade Finance para la importación de metales preciosos redujo nuestros tiempos logísticos en un 35%. Sus análisis quirúrgicos sobre la viabilidad de los mercados asiáticos son inigualables.",
          rating: 5,
        }
      ]
    },
    ar: {
      sectionBadge: "شهادات مرموقة",
      sectionTitle: "توصيات العملاء",
      sectionDesc: "اكتشف آراء كبار صناع القرار والصناعيين والمستثمرين الخواص الذين يعتمدون يومياً على خبرة الشمري.",
      list: [
        {
          id: "t1",
          clientName: "عمر المنصوري",
          clientTitle: "رئيس مجلس الإدارة، المنصوري للخدمات اللوجستية (دبي)",
          content: "بفضل التوجيهات الهيكلية للخبير الشمري، تمكنا من تأسيس شركتنا اللوجستية القابضة في المنطقة الحرة في دبي وتحسين تدفقاتنا النقدية بشكل قانوني وسلس تماماً. لقد كانت شبكته المصرفية لا تقدر بثمن.",
          rating: 5,
        },
        {
          id: "t2",
          clientName: "كاثرين ليمان",
          clientTitle: "شريكة مديرة، ليمان لإدارة الثروات (جنيف)",
          content: "الشمري مفاوض تجاري بارع. خلال عملية الاستحواذ العقاري العابرة للحدود التي قمنا بها، تمكن من حل عقبات إدارية كبرى في أقل من 48 ساعة بفضل علاقاته المؤثرة. دعم استثنائي بكل المقاييس.",
          rating: 5,
        },
        {
          id: "t3",
          clientName: "تان سري ليم",
          clientTitle: "مؤسس، ليم للسلع والمواد الأساسية (سنغافورة)",
          content: "مساعدة الشمري في اتفاقيات تمويل التجارة الخاصة بنا لاستيراد المعادن الثمينة قلصت أوقاتنا اللوجستية بنسبة 35٪. تحليلاته الدقيقة للغاية حول جدوى الأسواق الآسيوية لا يعلى عليها.",
          rating: 5,
        }
      ]
    }
  };

  const activeLangData = langData[language] || langData["fr"];

  return (
    <section className="py-24 bg-[#0a0a0a]/80 backdrop-blur-xs border-t border-[#D4AF37]/10 relative overflow-hidden">
      {/* Light glows */}
      <div className="absolute top-1/4 left-10 w-[300px] h-[300px] bg-[#D4AF37]/2 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#D4AF37] font-sans-ui">
            {activeLangData.sectionBadge}
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mt-2 uppercase tracking-tight italic font-serif">
            {activeLangData.sectionTitle}
          </h2>
          <div className="w-16 h-[1px] bg-[#D4AF37]/40 mx-auto mt-4" />
          <p className="max-w-2xl mx-auto text-[#F5E6D3]/60 mt-4 text-xs sm:text-sm font-serif italic leading-relaxed">
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
