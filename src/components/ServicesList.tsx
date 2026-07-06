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
    en: {
      sectionBadge: "Support Portfolio",
      sectionTitle: "Expert Services",
      sectionDesc: "A range of elite services designed to surgically respond to the challenges of business globalization.",
      deliverablesLabel: "Expert Deliverables:",
      learnMore: "Learn more",
      ctaTitle: "Need a custom business diagnosis?",
      ctaDesc: "Access our exclusive member area to submit your business case directly to expert GLOBAL-PUENTE and schedule your private strategic audit session.",
      ctaBtn: "Unlock Access",
      list: [
        {
          icon: Building2,
          title: "Offshore Setup & Jurisdictional Structuring",
          tagline: "International tax securitization",
          description: "Design and registration of complex corporate structures. We analyze double taxation treaties, set up solid holdings, and manage the opening of multi-currency bank accounts in reputable financial centers.",
          details: [
            "Selection of the optimal jurisdiction (Dubai, Singapore, Delaware, Switzerland)",
            "Drafting of articles of incorporation for holdings and asset protection trusts",
            "Bank introductions with top-tier financial institutions",
            "Full regulatory compliance with CRS and FATCA"
          ],
          pricing: "Starting at $1,200"
        },
        {
          icon: Compass,
          title: "Global Expansion & Relocation",
          tagline: "Growth corridors",
          description: "Planning entry into high-growth emerging markets. We conduct the regulatory and operational feasibility studies required to set up your physical operations and teams abroad.",
          details: [
            "Market research and advanced competitive analysis",
            "Local partnerships and accredited sponsor networks",
            "Support with investor visas (Golden Visa, Green Card)",
            "Recruitment of qualified executive talent on-site"
          ],
          pricing: "Starting at $2,500"
        },
        {
          icon: BadgeDollarSign,
          title: "Wealth Engineering & Investment",
          tagline: "Preservation of tangible assets",
          description: "Independent advisory on diversification and acquisition of elite assets. We identify off-market opportunities in premium residential and commercial real estate, energy, logistics, and precious metals.",
          details: [
            "Rigorous legal and financial Due Diligence",
            "Negotiation of off-market real estate transactions",
            "Financing and syndication of infrastructure projects",
            "Cross-border succession planning"
          ],
          pricing: "Starting at $3,000"
        },
        {
          icon: TrendingUp,
          title: "Logistics & Trade Finance",
          tagline: "Import-export optimization",
          description: "Facilitation and structuring of international commodity trade operations. We help issue and negotiate complex financial instruments to secure your cash flows and streamline your global supply chain.",
          details: [
            "Trade accounts receivable financing and letters of credit (L/C)",
            "Audit of Incoterms clauses and maritime freight contracts",
            "Connections with licensed customs brokers and freight forwarders",
            "Currency risk mitigation through forward contracts"
          ],
          pricing: "Starting at $1,800"
        },
        {
          icon: Shuffle,
          title: "Negotiation & Business Representation",
          tagline: "Strategic influence and arbitration",
          description: "Exclusive defense of your interests during complex transactional negotiations. GLOBAL-PUENTE personally intervenes as a neutral intermediary or committed representative to unlock major deals.",
          details: [
            "Exclusive representation during partner dispute arbitrations",
            "Negotiation of purchases or sales of major corporate assets",
            "Audit of exclusive operating licensing agreements",
            "Introductions to ministries and circles of influence"
          ],
          pricing: "On quote only"
        },
        {
          icon: HelpCircle,
          title: "Executive Mentorship & Consultations",
          tagline: "Absolute decision clarity",
          description: "Direct and regular access to the strategic advice of GLOBAL-PUENTE. Intensive 90-minute scoping session or tailored monthly follow-up to optimize your performance and accelerate your leadership.",
          details: [
            "Critical diagnostic session and strategic plan review",
            "Simulation of investment pitches and financing plans",
            "Direct telephone assistance for operational emergencies",
            "Decision support under high uncertainty"
          ],
          pricing: "Session: $350 (or via $50 member access)"
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
      ctaDesc: "Acceda a nuestra área exclusiva de miembros para enviar su expediente comercial directamente al experto GLOBAL-PUENTE y programar su sesión de auditoría estratégica privada.",
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
          description: "Defensa exclusiva de sus intereses durante negociaciones transaccionales complejas. GLOBAL-PUENTE interviene personalmente como intermediario neutral o representante comprometido para desbloquear transacciones importantes.",
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
          description: "Acceso directo y regular a la asesoría estratégica de GLOBAL-PUENTE. Sesión intensiva de diagnóstico de 90 minutos o seguimiento mensual a medida para optimizar su desempeño y acelerar su liderazgo.",
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
      ctaDesc: "ادخل إلى منطقة الأعضاء الحصرية لتقديم ملف عملك مباشرة إلى الخبير GLOBAL-PUENTE وتحديد موعد جلسة التدقيق الاستراتيجي الخاصة بك.",
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
          description: "الدفاع الحصري عن مصالحك خلال المفاوضات التجارية المعقدة وعالية الأهمية. يتدخل GLOBAL-PUENTE شخصياً كوسيط محايد أو ممثل لشركتك لإتمام الصفقات الكبرى وتجاوز العقبات.",
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
          description: "الوصول المباشر والمنتظم للاستشارات الاستراتيجية للخبير GLOBAL-PUENTE. جلسة تشخيص مكثفة لمدة 90 دقيقة أو متابعة شهرية مخصصة لتحسين أدائك الريادي والقيادي.",
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

  const activeLangData = servicesData[language] || servicesData["es"];

  return (
    <section className="py-24 bg-[#050505]/80 backdrop-blur-xs relative overflow-hidden">
      {/* Lights background */}
      <div className="absolute bottom-0 right-10 w-[500px] h-[500px] bg-[#D4AF37]/2 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Luxury Ornate Gold Frame */}
        <div className="relative p-6 sm:p-10 md:p-16 border border-[#D4AF37]/50 rounded-2xl bg-[#060606]/95 shadow-lg shadow-[#D4AF37]/10 shadow-[0_0_60px_rgba(212,175,55,0.08),inset_0_0_40px_rgba(212,175,55,0.04)] overflow-hidden">
          {/* Luxury Inner double frame border */}
          <div className="absolute inset-2 border border-[#D4AF37]/15 rounded-xl pointer-events-none" />
          
          {/* Ornate Traditional Moroccan Star Corners */}
          {/* Top-Left Corner */}
          <div className="absolute top-4 left-4 w-8 h-8 pointer-events-none flex items-center justify-center text-[#D4AF37] z-10">
            <svg viewBox="0 0 100 100" className="w-5 h-5 fill-current opacity-85">
              <path d="M 50 15 L 58 35 L 78 28 L 68 45 L 85 50 L 68 55 L 78 72 L 58 65 L 50 85 L 42 65 L 22 72 L 32 55 L 15 50 L 32 45 L 22 28 L 42 35 Z" />
              <circle cx="50" cy="50" r="10" fill="none" stroke="#050505" strokeWidth="4" />
            </svg>
          </div>
          <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-[#D4AF37] rounded-tl-2xl pointer-events-none" />

          {/* Top-Right Corner */}
          <div className="absolute top-4 right-4 w-8 h-8 pointer-events-none flex items-center justify-center text-[#D4AF37] z-10">
            <svg viewBox="0 0 100 100" className="w-5 h-5 fill-current opacity-85">
              <path d="M 50 15 L 58 35 L 78 28 L 68 45 L 85 50 L 68 55 L 78 72 L 58 65 L 50 85 L 42 65 L 22 72 L 32 55 L 15 50 L 32 45 L 22 28 L 42 35 Z" />
              <circle cx="50" cy="50" r="10" fill="none" stroke="#050505" strokeWidth="4" />
            </svg>
          </div>
          <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-[#D4AF37] rounded-tr-2xl pointer-events-none" />

          {/* Bottom-Left Corner */}
          <div className="absolute bottom-4 left-4 w-8 h-8 pointer-events-none flex items-center justify-center text-[#D4AF37] z-10">
            <svg viewBox="0 0 100 100" className="w-5 h-5 fill-current opacity-85">
              <path d="M 50 15 L 58 35 L 78 28 L 68 45 L 85 50 L 68 55 L 78 72 L 58 65 L 50 85 L 42 65 L 22 72 L 32 55 L 15 50 L 32 45 L 22 28 L 42 35 Z" />
              <circle cx="50" cy="50" r="10" fill="none" stroke="#050505" strokeWidth="4" />
            </svg>
          </div>
          <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-[#D4AF37] rounded-bl-2xl pointer-events-none" />

          {/* Bottom-Right Corner */}
          <div className="absolute bottom-4 right-4 w-8 h-8 pointer-events-none flex items-center justify-center text-[#D4AF37] z-10">
            <svg viewBox="0 0 100 100" className="w-5 h-5 fill-current opacity-85">
              <path d="M 50 15 L 58 35 L 78 28 L 68 45 L 85 50 L 68 55 L 78 72 L 58 65 L 50 85 L 42 65 L 22 72 L 32 55 L 15 50 L 32 45 L 22 28 L 42 35 Z" />
              <circle cx="50" cy="50" r="10" fill="none" stroke="#050505" strokeWidth="4" />
            </svg>
          </div>
          <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-[#D4AF37] rounded-br-2xl pointer-events-none" />
          
          {/* Subtle slow spinning ambient glow light behind corners or borders */}
          <div className="absolute -top-12 -left-12 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-2xl pointer-events-none animate-pulse" />
          <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-2xl pointer-events-none animate-pulse" />

          <div className="text-center mb-16 relative z-10">
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
        {/* End of Luxury Ornate Gold Frame */}
        </div>
      </div>
    </section>
  );
}
