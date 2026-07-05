import { Route } from "../types";
import { useState } from "react";
import { 
  Building2, 
  Compass, 
  BadgeDollarSign, 
  TrendingUp, 
  Shuffle, 
  HelpCircle,
  ChevronRight,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { motion } from "motion/react";
import { useLanguage } from "../LanguageContext";

interface ServicesListProps {
  setCurrentRoute: (route: Route) => void;
}

export default function ServicesList({ setCurrentRoute }: ServicesListProps) {
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const { language, t } = useLanguage();

  const servicesData = {
    fr: {
      sectionBadge: "Portefeuille d'Accompagnement",
      sectionTitle: "Services d'Expertise",
      sectionDesc: "Une gamme de prestations d'élite conçue pour répondre de manière chirurgicale aux défis de la mondialisation des affaires.",
      deliverablesLabel: "Livrables de l'Expert :",
      learnMore: "En savoir plus",
      ctaTitle: "Besoin d'un diagnostic d'affaires sur-mesure ?",
      ctaDesc: "Accédez à notre espace membre exclusif pour soumettre votre dossier d'affaires directement à l'expert Al-Shammari et programmer votre session d'audit stratégique privée.",
      ctaBtn: "Débloquer l'Accès",
      list: [
        {
          icon: Building2,
          title: "Montage Offshore & Juridictionnel",
          tagline: "Sécurisation fiscale internationale",
          description: "Conception et immatriculation de structures sociétaires complexes. Nous analysons les accords de non-double imposition, configurons des holdings solides et administrons l'ouverture de comptes bancaires multi-devises dans des places financières réputées.",
          details: [
            "Sélection de la juridiction optimale (Dubaï, Singapour, Delaware, Suisse)",
            "Rédaction des statuts de holdings et trusts de protection",
            "Introduction bancaire auprès d'établissements de premier ordre",
            "Conformité réglementaire totale avec le CRS et FATCA"
          ],
          pricing: "À partir de 1,200$"
        },
        {
          icon: Compass,
          title: "Expansion Globale & Relocalisation",
          tagline: "Corridors de croissance",
          description: "Planification d'entrée sur les marchés émergents à forte croissance. Nous réalisons les études de faisabilité réglementaires et opérationnelles nécessaires pour implanter vos opérations physiques et vos équipes à l'étranger.",
          details: [
            "Études de marché et cartographies concurrentielles avancées",
            "Partenariats locaux et réseaux de sponsors accrédités",
            "Accompagnement aux visas d'investisseurs (Golden Visa, Green Card)",
            "Recrutement de cadres exécutifs qualifiés sur place"
          ],
          pricing: "À partir de 2,500$"
        },
        {
          icon: BadgeDollarSign,
          title: "Ingénierie Patrimoniale & Investissement",
          tagline: "Préservation d'actifs tangibles",
          description: "Conseil indépendant en diversification et acquisition d'actifs d'élite. Nous identifions des opportunités hors-marché dans l'immobilier résidentiel et commercial de prestige, les énergies, la logistique et les métaux précieux.",
          details: [
            "Due Diligence juridique et financière rigoureuse",
            "Négociation de transactions immobilières off-market",
            "Financement et syndication de projets d'infrastructure",
            "Planification successorale transfrontalière"
          ],
          pricing: "À partir de 3,000$"
        },
        {
          icon: TrendingUp,
          title: "Logistique & Trade Finance",
          tagline: "Optimisation de l'import-export",
          description: "Facilitation et structuration d'opérations de négoce de marchandises internationales. Nous aidons à émettre et négocier des instruments financiers complexes pour sécuriser vos flux et rationaliser vos chaînes de logistique globale.",
          details: [
            "Financement de créances commerciales et lettres de crédit (L/C)",
            "Audit des clauses Incoterms et contrats de fret maritime",
            "Mise en relation avec des agents de douane et transitaires agréés",
            "Atténuation des risques de change par contrats à terme"
          ],
          pricing: "À partir de 1,800$"
        },
        {
          icon: Shuffle,
          title: "Négociation & Représentation d'Affaires",
          tagline: "Influence et arbitrages stratégiques",
          description: "Défense exclusive de vos intérêts lors de négociations transactionnelles complexes. Al-Shammari intervient personnellement comme intermédiaire neutre ou représentant engagé pour débloquer des transactions majeures.",
          details: [
            "Représentation exclusive lors d'arbitrages de conflits d'associés",
            "Négociation d'achats ou ventes d'actifs corporatifs majeurs",
            "Audit de contrats de licences d'exploitation exclusives",
            "Introduction auprès de ministères et cercles d'influence"
          ],
          pricing: "Sur devis uniquement"
        },
        {
          icon: HelpCircle,
          title: "Mentorat de Direction & Consultations",
          tagline: "Clarté décisionnelle absolue",
          description: "Un accès direct et régulier aux conseils stratégiques d'Al-Shammari. Séance intensive de cadrage de 90 minutes ou suivi mensuel sur-mesure pour optimiser vos performances et accélérer votre leadership.",
          details: [
            "Séance de diagnostic critique et revue de plan stratégique",
            "Simulation de pitchs d'investissements et plans de financement",
            "Assistance téléphonique directe en cas d'urgence opérationnelle",
            "Aide à la prise de décision sous forte incertitude"
          ],
          pricing: "Session : 350$ (ou via l'accès membre à 50$)"
        }
      ]
    },
    es: {
      sectionBadge: "Cartera de Asistencia",
      sectionTitle: "Servicios de Especialización",
      sectionDesc: "Una gama de servicios de élite diseñada para responder con precisión quirúrgica a los desafíos de la globalización empresarial.",
      deliverablesLabel: "Resultados del Experto:",
      learnMore: "Saber más",
      ctaTitle: "¿Necesita un diagnóstico empresarial a medida?",
      ctaDesc: "Acceda a nuestra área exclusiva de miembros para enviar su expediente comercial directamente al experto Al-Shammari y programar su sesión de auditoría estratégica privada.",
      ctaBtn: "Desbloquear Acceso",
      list: [
        {
          icon: Building2,
          title: "Creación de Sociedades Offshore y Jurisdiccionales",
          tagline: "Seguridad fiscal internacional",
          description: "Concepción y registro de estructuras societarias complejas. Analizamos acuerdos de doble imposición, configuramos holdings sólidas y administramos la apertura de cuentas bancarias multidivisa en centros financieros de primer nivel.",
          details: [
            "Selección de la jurisdicción óptima (Dubái, Singapur, Delaware, Suiza)",
            "Redacción de estatutos de holdings y fideicomisos de protección",
            "Introducción bancaria en instituciones financieras líderes",
            "Cumplimiento normativo total con CRS y FATCA"
          ],
          pricing: "A partir de $1,200"
        },
        {
          icon: Compass,
          title: "Expansión Global y Relocalización",
          tagline: "Corredores de crecimiento",
          description: "Planificación de ingreso en mercados emergentes de rápido crecimiento. Realizamos los estudios de viabilidad regulatoria y operativa necesarios para establecer sus operaciones físicas y sus equipos en el extranjero.",
          details: [
            "Estudios de mercado y análisis de competencia avanzados",
            "Alianzas locales y redes de patrocinadores acreditados",
            "Apoyo para visas de inversionista (Golden Visa, Green Card)",
            "Reclutamiento de cuadros ejecutivos calificados en el sitio"
          ],
          pricing: "A partir de $2,500"
        },
        {
          icon: BadgeDollarSign,
          title: "Ingeniería Patrimonial e Inversión",
          tagline: "Preservación de activos tangibles",
          description: "Asesoramiento independiente en diversificación y adquisición de activos de élite. Identificamos oportunidades fuera del mercado en inmuebles residenciales y comerciales de prestigio, energía, logística y metales preciosos.",
          details: [
            "Debida diligencia legal y financiera rigurosa",
            "Negociación de transacciones inmobiliarias fuera del mercado",
            "Financiación y sindicación de proyectos de infraestructura",
            "Planificación sucesoria transfronteriza"
          ],
          pricing: "A partir de $3,000"
        },
        {
          icon: TrendingUp,
          title: "Logística y Financiación del Comercio",
          tagline: "Optimización de importación y exportación",
          description: "Facilitación y estructuración de operaciones de comercio internacional de mercancías. Ayudamos a emitir y negociar instrumentos financieros complejos para asegurar sus flujos y racionalizar sus cadenas de suministro globales.",
          details: [
            "Financiamiento de cuentas por cobrar comerciales y cartas de crédito (L/C)",
            "Auditoría de cláusulas Incoterms y contratos de flete marítimo",
            "Conexión con agentes de aduana y transitarios autorizados",
            "Mitigación de riesgos cambiarios mediante contratos a plazo"
          ],
          pricing: "A partir de $1,800"
        },
        {
          icon: Shuffle,
          title: "Negociación y Representación Comercial",
          tagline: "Influencia y arbitraje estratégico",
          description: "Defensa exclusiva de sus intereses durante negociaciones transaccionales complejas. Al-Shammari interviene personalmente como intermediario neutral o representante comprometido para desbloquear transacciones importantes.",
          details: [
            "Representación exclusiva en arbitrajes de disputas de socios",
            "Negociación de compras o ventas de activos corporativos importantes",
            "Auditoría de contratos de licencias de explotación exclusivas",
            "Introducción a ministerios y círculos de influencia"
          ],
          pricing: "Solo bajo cotización"
        },
        {
          icon: HelpCircle,
          title: "Mentoría Ejecutiva y Consultas",
          tagline: "Claridad de decisión absoluta",
          description: "Acceso directo y regular a la asesoría estratégica de Al-Shammari. Sesión intensiva de diagnóstico de 90 minutos o seguimiento mensual a medida para optimizar su desempeño y acelerar su liderazgo.",
          details: [
            "Sesión de diagnóstico crítico y revisión de planes estratégicos",
            "Simulación de pitches de inversión y planes de financiación",
            "Asistencia telefónica directa para emergencias operativas",
            "Apoyo en la toma de decisiones bajo alta incertidumbre"
          ],
          pricing: "Sesión: $350 (o mediante el acceso de miembro de $50)"
        }
      ]
    },
    ar: {
      sectionBadge: "محفظة المرافقة والدعم",
      sectionTitle: "خدمات الخبرة والاستشارات",
      sectionDesc: "مجموعة من الخدمات النخبوية المصممة للاستجابة بشكل دقيق للتحديات التي تفرضها عولمة الأعمال.",
      deliverablesLabel: "مخرجات الخبير:",
      learnMore: "معرفة المزيد",
      ctaTitle: "هل تحتاج إلى تشخيص أعمال مخصص؟",
      ctaDesc: "ادخل إلى منطقة الأعضاء الحصرية لتقديم ملف عملك مباشرة إلى الخبير الشمري وتحديد موعد جلسة التدقيق الاستراتيجي الخاصة بك.",
      ctaBtn: "فتح إمكانية الوصول",
      list: [
        {
          icon: Building2,
          title: "تأسيس الشركات الخارجية والقضائية",
          tagline: "تأمين الضرائب الدولية وتجنب الازدواج",
          description: "تصميم وتسجيل الهياكل المؤسسية المعقدة. نقوم بتحليل اتفاقيات منع الازدواج الضريبي، وتهيئة الشركات القابضة القوية، وإدارة فتح الحسابات المصرفية متعددة العملات في المراكز المالية المرموقة.",
          details: [
            "اختيار الولاية القضائية المثالية (دبي، سنغافورة، ديلاوير، سويسرا)",
            "صياغة اللوائح الأساسية للشركات القابضة وصناديق الحماية",
            "تقديم الدعم لفتح حسابات بنكية لدى مؤسسات الدرجة الأولى",
            "الامتثال التنظيمي الكامل مع معايير الإبلاغ المشترك CRS وقانون فاتكا FATCA"
          ],
          pricing: "ابتداءً من 1,200 دولار"
        },
        {
          icon: Compass,
          title: "التوسع العالمي وإعادة التوطين",
          tagline: "ممرات وقنوات النمو الدولي",
          description: "تخطيط الدخول إلى الأسواق الناشئة ذات النمو المرتفع. نقوم بإجراء دراسات الجدوى التنظيمية والتشغيلية اللازمة لتأسيس عملياتك المادية وفرق عملك في الخارج.",
          details: [
            "أبحاث ودراسات السوق المتقدمة وتحليل المشهد التنافسي",
            "الشراكات المحلية والوصول لشبكات الرعاة المعتمدين",
            "المساعدة في استخراج تأشيرات المستثمر (التأشيرة الذهبية، البطاقة الخضراء)",
            "توظيف وتعيين الكوادر التنفيذية المؤهلة محلياً"
          ],
          pricing: "ابتداءً من 2,500 دولار"
        },
        {
          icon: BadgeDollarSign,
          title: "إدارة الثروات وهيكلة الاستثمار",
          tagline: "الحفاظ على الأصول الملموسة وتنميتها",
          description: "تقديم الاستشارات المستقلة في تنويع واكتساب الأصول المتميزة. نحدد الفرص غير المتاحة علناً في السوق في العقارات السكنية والتجارية الفاخرة والطاقة والخدمات اللوجستية والمعادن الثمينة.",
          details: [
            "العناية الواجبة والتحقق القانوني والمالي الصارم للمشاريع",
            "المفاوضات العقارية الاستثمارية الخاصة غير المعروضة بالعلن",
            "تمويل وتجميع وتأسيس مشاريع البنية التحتية الدولية",
            "تخطيط انتقال وحماية الثروات العابرة للحدود"
          ],
          pricing: "ابتداءً من 3,000 دولار"
        },
        {
          icon: TrendingUp,
          title: "الخدمات اللوجستية وتمويل التجارة الدولية",
          tagline: "تحسين عمليات الاستيراد والتصدير",
          description: "تسهيل وهيكلة العمليات التجارية للسلع الدولية. نساعد في إصدار وتفاوض الأدوات المالية المعقدة لتأمين تدفقاتك النقدية وتحسين كفاءة الخدمات اللوجستية وسلاسل الإمداد العالمية.",
          details: [
            "تمويل المستحقات التجارية وخطابات الاعتماد المستندية (L/C)",
            "تدقيق شروط الإنكوتيرمز Incoterms وعقود الشحن البحري والجوي",
            "الربط المباشر مع المخلصين الجمركيين ووكلاء الشحن المعتمدين",
            "الحد من مخاطر تقلبات أسعار الصرف عبر العقود الآجلة"
          ],
          pricing: "ابتداءً من 1,800 دولار"
        },
        {
          icon: Shuffle,
          title: "التفاوض والتمثيل التجاري للأعمال",
          tagline: "التأثير والوساطة والتحكيم الاستراتيجي",
          description: "الدفاع الحصري عن مصالحك خلال المفاوضات التجارية المعقدة وعالية الأهمية. يتدخل الشمري شخصياً كوسيط محايد أو ممثل لشركتك لإتمام الصفقات الكبرى وتجاوز العقبات.",
          details: [
            "التمثيل الحصري أثناء التحكيم في نزاعات الشركاء",
            "التفاوض لشراء أو بيع الأصول المؤسسية والشركات الكبرى",
            "تدقيق وتوثيق عقود تراخيص الاستغلال التجاري الحصرية",
            "التعريف والربط بالوزارات الحكومية ودوائر التأثير والقرار"
          ],
          pricing: "بناءً على طلب عرض أسعار فقط"
        },
        {
          icon: HelpCircle,
          title: "التوجيه التنفيذي واستشارات القيادة",
          tagline: "وضوح وصنع القرار المطلق",
          description: "الوصول المباشر والمنتظم للاستشارات الاستراتيجية للخبير الشمري. جلسة تشخيص مكثفة لمدة 90 دقيقة أو متابعة شهرية مخصصة لتحسين أدائك الريادي والقيادي.",
          details: [
            "جلسة تشخيص نقدي ومراجعة الخطة الاستراتيجية للشركة",
            "محاكاة عروض الاستثمار ومراجعة خطط التمويل",
            "الدعم الهاتفي المباشر في حالات الطوارئ التشغيلية والمخاطر",
            "المساعدة في اتخاذ القرارات المصيرية في ظروف عدم اليقين"
          ],
          pricing: "الجلسة: 350 دولار (أو عبر اشتراك العضوية بـ 50 دولار)"
        }
      ]
    }
  };

  const activeLangData = servicesData[language] || servicesData["fr"];

  return (
    <section className="py-24 bg-[#050505]/80 backdrop-blur-xs relative overflow-hidden">
      {/* Lights background */}
      <div className="absolute bottom-0 right-10 w-[500px] h-[500px] bg-[#D4AF37]/2 rounded-full blur-[130px] pointer-events-none" />

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

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeLangData.list.map((service, idx) => {
            const Icon = service.icon;
            const isExpanded = selectedService === idx;

            return (
              <div
                key={idx}
                id={`service-card-${idx}`}
                className={`p-8 border transition-all duration-300 relative overflow-hidden group cursor-pointer ${
                  isExpanded 
                    ? "bg-[#0a0a0a] border-[#D4AF37] shadow-[0_0_25px_rgba(212,175,55,0.05)]" 
                    : "bg-[#080808]/40 border-[#D4AF37]/10 hover:border-[#D4AF37]/30 hover:bg-[#0a0a0a] hover:shadow-[0_0_20px_rgba(212,175,55,0.02)]"
                }`}
                onClick={() => setSelectedService(isExpanded ? null : idx)}
              >
                {/* Gold Top Light Line */}
                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-[#D4AF37]/5 border border-[#D4AF37]/10 text-[#D4AF37] group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[9px] uppercase tracking-widest text-[#D4AF37] font-bold bg-[#050505] px-2.5 py-1.5 border border-[#D4AF37]/10 font-sans-ui">
                    {service.pricing}
                  </span>
                </div>

                <span className="text-[10px] font-bold text-[#D4AF37] tracking-[0.2em] uppercase block mb-1.5 font-sans-ui">
                  {service.tagline}
                </span>
                
                <h3 className="text-lg font-bold text-neutral-100 group-hover:text-white mb-3 tracking-tight font-serif">
                  {service.title}
                </h3>
                
                <p className="text-xs text-[#F5E6D3]/60 leading-relaxed font-serif mb-4">
                  {service.description}
                </p>

                {/* Expanded Details */}
                {isExpanded ? (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                    className="pt-4 border-t border-[#D4AF37]/10 mt-4 space-y-2"
                  >
                    <p className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold font-sans-ui">{activeLangData.deliverablesLabel}</p>
                    <ul className="space-y-1.5">
                      {service.details.map((detail, dIdx) => (
                        <li key={dIdx} className="text-xs text-[#F5E6D3]/75 flex items-start space-x-2 font-serif">
                          <span className="text-[#D4AF37] text-xs leading-none mt-0.5">•</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ) : (
                  <div className="flex items-center text-xs text-[#D4AF37] font-bold uppercase tracking-widest mt-4 group-hover:translate-x-1 transition-transform font-sans-ui">
                    <span>{activeLangData.learnMore}</span>
                    <ChevronRight className="w-3.5 h-3.5 ml-1 rtl:rotate-180 rtl:mr-1 rtl:ml-0" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Dynamic Consultation CTA Banner */}
        <div className="mt-16 bg-[#0a0a0a] border border-[#D4AF37]/20 p-8 flex flex-col md:flex-row justify-between items-center gap-6 shadow-[0_0_25px_rgba(212,175,55,0.03)]">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-[#D4AF37]/5 border border-[#D4AF37]/15 text-[#D4AF37] hidden sm:block">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-neutral-200 font-bold tracking-tight font-serif text-lg">{activeLangData.ctaTitle}</h4>
              <p className="text-xs text-[#F5E6D3]/60 font-serif mt-1 max-w-xl leading-relaxed">
                {activeLangData.ctaDesc}
              </p>
            </div>
          </div>
          <button
            id="btn-services-cta-pricing"
            onClick={() => setCurrentRoute("pricing")}
            className="w-full md:w-auto px-8 py-3 bg-[#D4AF37] hover:bg-[#F5E6D3] text-[#050505] font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-[0_0_15px_rgba(212,175,55,0.15)] flex items-center justify-center space-x-2 cursor-pointer font-sans-ui"
          >
            <span>{activeLangData.ctaBtn}</span>
            <ArrowRight className="w-4 h-4 text-black rtl:rotate-180" />
          </button>
        </div>
      </div>
    </section>
  );
}
