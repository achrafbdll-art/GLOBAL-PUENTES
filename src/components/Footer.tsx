import { Route } from "../types";
import { Mail, Phone, MapPin, Award, Shield, Check } from "lucide-react";
import { useLanguage } from "../LanguageContext";

interface FooterProps {
  setCurrentRoute: (route: Route) => void;
}

export default function Footer({ setCurrentRoute }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const { language, t } = useLanguage();

  const footerTranslations = {
    en: {
      brandDesc: "International strategic consulting excellence by GLOBAL-PUENTE. Business creation, investment diversification, and structuring of global import-export networks.",
      brandTagline: "Elite International Expertise",
      navHeader: "Navigation",
      navHome: "Home",
      navAbout: "About GLOBAL-PUENTE",
      navServices: "Our Services",
      navPricing: "Pricing & Expertise",
      focusHeader: "Areas of Intervention",
      focusItem1: "Offshore Setup & Structuring",
      focusItem2: "Real Estate Investment & Markets",
      focusItem3: "Logistics Networks Import-Export",
      focusItem4: "Private Mentoring & Negotiation",
      officeHeader: "International Office",
      officeAddress: "Downtown Boulevard, GLOBAL-PUENTE Tower, United Arab Emirates (UAE) & International Office",
      copyright: "GLOBAL-PUENTE. All rights reserved. International Business Consulting Firm.",
      stripeLabel: "SSL Encrypted Payments - Stripe",
      terms: "Terms & Conditions",
      privacy: "Privacy Policy"
    },
    es: {
      brandDesc: "La excelencia de la consultoría estratégica internacional por GLOBAL-PUENTE. Creación de empresas, diversificación de inversiones y estructuración de redes globales de importación y exportación.",
      brandTagline: "Experiencia de Élite Internacional",
      navHeader: "Navegación",
      navHome: "Inicio",
      navAbout: "Sobre GLOBAL-PUENTE",
      navServices: "Nuestros Servicios",
      navPricing: "Tarifas y Experiencia",
      focusHeader: "Áreas de Intervención",
      focusItem1: "Creación y Estructura Offshore",
      focusItem2: "Inversión Inmobiliaria y Mercados",
      focusItem3: "Redes Logísticas de Importación y Exportación",
      focusItem4: "Mentoría Privada y Negociación",
      officeHeader: "Oficina Internacional",
      officeAddress: "Downtown Boulevard, GLOBAL-PUENTE Tower, Emiratos Árabes Unidos (EAU) y Oficina Internacional",
      copyright: "GLOBAL-PUENTE. Todos los derechos reservados. Consultoría de Negocios Internacionales.",
      stripeLabel: "Pagos Encriptados SSL - Stripe",
      terms: "Términos y Condiciones",
      privacy: "Política de Privacidad"
    },
    ar: {
      brandDesc: "التميز في الاستشارات الاستراتيجية الدولية على يد الخبير GLOBAL-PUENTE. تأسيس الشركات، تنويع الاستثمارات، وهيكلة الشبكات العالمية للاستيراد والتصدير.",
      brandTagline: "نخبة الخبرة الدولية",
      navHeader: "التنقل",
      navHome: "الرئيسية",
      navAbout: "من نحن",
      navServices: "خدماتنا",
      navPricing: "الأسعار والخبرة",
      focusHeader: "مجالات العمل الرئيسية",
      focusItem1: "التأسيس والهيكلة الخارجية (Offshore)",
      focusItem2: "الاستثمار العقاري والأسواق",
      focusItem3: "الشبكات اللوجستية والاستيراد والتصدير",
      focusItem4: "التوجيه الخاص والمفاوضات",
      officeHeader: "المكتب الدولي",
      officeAddress: "داون تاون بوليفارد، برج GLOBAL-PUENTE، الإمارات العربية المتحدة والمكتب الدولي",
      copyright: "GLOBAL-PUENTE. جميع الحقوق محفوظة. مكتب الاستشارات التجارية الدولية.",
      stripeLabel: "مدفوعات مشفرة آمنة SSL - سترايب",
      terms: "الشروط والأحكام",
      privacy: "سياسة الخصوصية"
    }
  };

  const f = footerTranslations[language] || footerTranslations["es"];

  return (
    <footer className="bg-[#050505] border-t border-[#D4AF37]/15 pt-16 pb-12 text-neutral-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-1">
            <h3 className="text-[#D4AF37] text-xl font-medium tracking-widest mb-4 uppercase font-serif">
              {t("brandName")}
            </h3>
            <p className="text-sm text-neutral-500 mb-6 leading-relaxed font-serif italic">
              {f.brandDesc}
            </p>
            <div className="flex space-x-3 text-neutral-500 text-xs font-sans-ui uppercase tracking-wider">
              <Award className="w-4 h-4 text-[#D4AF37]" />
              <span>{f.brandTagline}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-neutral-200 font-bold text-sm uppercase tracking-wider mb-4 border-b border-[#D4AF37]/10 pb-2 font-sans-ui">
              {f.navHeader}
            </h4>
            <ul className="space-y-2.5 text-sm">
              {["home", "about", "services", "pricing"].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => setCurrentRoute(item as Route)}
                    className="hover:text-[#D4AF37] transition-colors uppercase tracking-widest text-xs text-left cursor-pointer font-sans-ui text-[#F5E6D3]/60 font-bold"
                  >
                    {item === "home"
                      ? f.navHome
                      : item === "about"
                      ? f.navAbout
                      : item === "services"
                      ? f.navServices
                      : f.navPricing}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Core Focus Areas */}
          <div>
            <h4 className="text-neutral-200 font-bold text-sm uppercase tracking-wider mb-4 border-b border-[#D4AF37]/10 pb-2 font-sans-ui">
              {f.focusHeader}
            </h4>
            <ul className="space-y-2 text-xs font-serif italic">
              <li className="flex items-center space-x-2">
                <Check className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0" />
                <span>{f.focusItem1}</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0" />
                <span>{f.focusItem2}</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0" />
                <span>{f.focusItem3}</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0" />
                <span>{f.focusItem4}</span>
              </li>
            </ul>
          </div>

          {/* Direct Contact Details */}
          <div>
            <h4 className="text-neutral-200 font-bold text-sm uppercase tracking-wider mb-4 border-b border-[#D4AF37]/10 pb-2 font-sans-ui">
              {f.officeHeader}
            </h4>
            <ul className="space-y-3.5 text-xs text-neutral-500 font-serif">
              <li className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <span>
                  {f.officeAddress}
                </span>
              </li>
              <li className="flex items-center space-x-2.5 font-mono">
                <Phone className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                <span>+971 4 230 0000</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                <span>office@global-puente.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-[#D4AF37]/10 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center text-xs text-neutral-600 font-sans-ui">
          <p className="font-serif italic text-center md:text-left">
            &copy; {currentYear} {f.copyright}
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mt-4 md:mt-0 uppercase tracking-wider text-[10px]">
            <span className="flex items-center space-x-1">
              <Shield className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{f.stripeLabel}</span>
            </span>
            <span className="hover:text-neutral-500 cursor-pointer">{f.terms}</span>
            <span className="hover:text-neutral-500 cursor-pointer">{f.privacy}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
