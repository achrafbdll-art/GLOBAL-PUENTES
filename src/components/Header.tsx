import { Route, User } from "../types";
import { useState } from "react";
import { Menu, X, LogOut, User as UserIcon, ShieldAlert, Globe, Mail, Sparkles } from "lucide-react";
import { useLanguage } from "../LanguageContext";

interface HeaderProps {
  currentRoute: Route;
  setCurrentRoute: (route: Route) => void;
  user: User | null;
  onLogout: () => void;
}

export default function Header({ currentRoute, setCurrentRoute, user, onLogout }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const navItems = [
    { label: t("navHome"), route: "home" as Route },
    { label: t("navAbout"), route: "about" as Route },
    { label: t("navServices"), route: "services" as Route },
    { label: t("navPricing"), route: "pricing" as Route },
  ];

  const handleNavClick = (route: Route) => {
    setCurrentRoute(route);
    setMobileMenuOpen(false);
  };

  const prestigeStatus = {
    fr: "PRESTIGE & SÉCURITÉ STANDARD",
    es: "ESTÁNDAR DE PRESTIGIO Y SEGURIDAD",
    ar: "معايير الهيبة والأمان المعتمدة"
  };

  // Authentic high-visibility Moroccan Zellige star repeating pattern (geometric octagram stars)
  const zelligePattern = `data:image/svg+xml;utf8,<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><defs><g id="star"><path d="M 50 20 L 56.1 35.4 L 71.2 28.8 L 64.6 43.9 L 80 50 L 64.6 56.1 L 71.2 71.2 L 56.1 64.6 L 50 80 L 43.9 64.6 L 28.8 71.2 L 35.4 56.1 L 20 50 L 35.4 43.9 L 28.8 28.8 L 43.9 35.4 Z" fill="%23D4AF37" fill-opacity="0.08" stroke="%23D4AF37" stroke-width="0.95" stroke-opacity="0.45"/><circle cx="50" cy="50" r="10" fill="none" stroke="%23D4AF37" stroke-width="0.8" stroke-opacity="0.28"/><circle cx="50" cy="50" r="3" fill="%23D4AF37" fill-opacity="0.55"/></g></defs><rect x="0" y="0" width="100" height="100" fill="none" stroke="%23D4AF37" stroke-width="0.8" stroke-opacity="0.28"/><rect x="15" y="15" width="70" height="70" transform="rotate(45 50 50)" fill="none" stroke="%23D4AF37" stroke-width="0.8" stroke-opacity="0.33"/><path d="M50 0 L50 100 M0 50 L100 50" stroke="%23D4AF37" stroke-width="0.65" stroke-opacity="0.28"/><path d="M0 0 L100 100 M0 100 L100 0" stroke="%23D4AF37" stroke-width="0.55" stroke-opacity="0.25"/><use href="%23star" x="0" y="0"/><use href="%23star" x="-100" y="-100"/><use href="%23star" x="-100" y="0"/><use href="%23star" x="100" y="0"/><use href="%23star" x="0" y="-100"/><use href="%23star" x="0" y="100"/><use href="%23star" x="-100" y="100"/><use href="%23star" x="100" y="-100"/><use href="%23star" x="100" y="100"/></svg>`;

  return (
    <header 
      className="fixed top-0 left-0 w-full z-50 flex flex-col transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.6)]"
      style={{ backgroundImage: `url('${zelligePattern}')` }}
    >
      {/* Top Utility Bar (Replicating Upper Right/Left styling from reference) */}
      <div className="w-full border-b border-[#D4AF37]/15 bg-[#050505]/95 py-2 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-[9px] sm:text-[10px] uppercase tracking-[0.25em] font-sans-ui font-semibold">
          {/* Status Indicator (Left in reference) */}
          <div className="flex items-center space-x-2 text-[#D4AF37]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4AF37]"></span>
            </span>
            <span className="font-bold tracking-[0.3em]">
              {prestigeStatus[language] || prestigeStatus["fr"]}
            </span>
          </div>

          {/* Email and Circular Language Badges (Right in reference) */}
          <div className="flex items-center space-x-6">
            <span className="hidden sm:inline-flex items-center space-x-1.5 text-neutral-500 font-serif lowercase tracking-normal italic text-[11px]">
              <Mail className="w-3.5 h-3.5 text-[#D4AF37]/75" />
              <span>contact@globalpuentes.com</span>
            </span>
            
            {/* Elegant Circular Language Badge Selectors (Matching FR | GB | MA style) */}
            <div className="flex items-center space-x-1.5">
              <button
                onClick={() => setLanguage("fr")}
                className={`w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-sans-ui font-black uppercase transition-all duration-200 border cursor-pointer ${
                  language === "fr"
                    ? "bg-[#D4AF37] text-black border-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.4)]"
                    : "border-[#D4AF37]/20 text-[#F5E6D3]/40 hover:border-[#D4AF37]/50 hover:text-[#D4AF37]"
                }`}
                title="Français"
              >
                FR
              </button>
              <button
                onClick={() => setLanguage("es")}
                className={`w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-sans-ui font-black uppercase transition-all duration-200 border cursor-pointer ${
                  language === "es"
                    ? "bg-[#D4AF37] text-black border-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.4)]"
                    : "border-[#D4AF37]/20 text-[#F5E6D3]/40 hover:border-[#D4AF37]/50 hover:text-[#D4AF37]"
                }`}
                title="Español"
              >
                ES
              </button>
              <button
                onClick={() => setLanguage("ar")}
                className={`w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-sans-ui font-black uppercase transition-all duration-200 border cursor-pointer ${
                  language === "ar"
                    ? "bg-[#D4AF37] text-black border-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.4)]"
                    : "border-[#D4AF37]/20 text-[#F5E6D3]/40 hover:border-[#D4AF37]/50 hover:text-[#D4AF37]"
                }`}
                title="العربية"
              >
                العربية
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="w-full bg-[#050505]/90 backdrop-blur-md border-b border-[#D4AF37]/10 py-3 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo and Luxury Seal Crest (Matching Left Seal layout) */}
            <div 
              id="nav-brand"
              className="flex items-center space-x-3.5 cursor-pointer group"
              onClick={() => handleNavClick("home")}
            >
              {/* Gold Circular Crest/Seal */}
              <div className="relative flex items-center justify-center w-12 h-12 bg-black rounded-full border border-[#D4AF37]/40 shadow-[0_0_15px_rgba(212,175,55,0.15)] group-hover:border-[#D4AF37]/80 transition-all duration-300">
                <svg className="w-9 h-9 text-[#D4AF37]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="50" cy="50" r="44" stroke="#D4AF37" strokeWidth="1.5" strokeOpacity="0.8" />
                  <circle cx="50" cy="50" r="40" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.4" strokeDasharray="3 3" />
                  <path d="M35 65 L35 45 C35 37 42 35 50 35 C58 35 65 37 65 45 L65 65" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M42 65 L42 48 C42 43 45 41 50 41 C55 41 58 43 58 48 L58 65" stroke="#D4AF37" strokeWidth="1" />
                  <circle cx="50" cy="50" r="3.5" fill="#D4AF37" />
                  <path d="M50 21 L52 25 L56 25 L53 27 L54 31 L50 29 L46 31 L47 27 L44 25 L48 25 Z" fill="#D4AF37" />
                  <path d="M28 65 L72 65" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <div className="flex flex-col text-left">
                <span className="text-sm sm:text-base font-black tracking-[0.25em] bg-gradient-to-r from-[#D4AF37] via-[#F5E6D3] to-[#8B7355] bg-clip-text text-transparent uppercase font-serif">
                  {t("brandName")}
                </span>
                <span className="text-[7px] text-[#D4AF37]/70 tracking-[0.45em] uppercase font-sans-ui font-extrabold -mt-1">
                  AL-SHAMMARI
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-10">
              {navItems.map((item) => (
                <button
                  key={item.route}
                  id={`nav-link-${item.route}`}
                  onClick={() => handleNavClick(item.route)}
                  className={`text-[11px] uppercase tracking-[0.2em] font-sans-ui font-black transition-all duration-200 cursor-pointer relative py-1.5 ${
                    currentRoute === item.route
                      ? "text-[#D4AF37]"
                      : "text-[#F5E6D3]/75 hover:text-[#D4AF37]"
                  }`}
                >
                  {item.label}
                  {currentRoute === item.route && (
                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#D4AF37] shadow-[0_0_8px_#D4AF37]" />
                  )}
                </button>
              ))}
            </div>

            {/* Desktop Account & CTA Section (With matching red-gold and sparkling active dot) */}
            <div className="hidden md:flex items-center space-x-6">
              {user ? (
                <div className="flex items-center space-x-4">
                  {user.role === "admin" && (
                    <button
                      id="btn-nav-admin"
                      onClick={() => handleNavClick("admin")}
                      className={`flex items-center space-x-1 px-3 py-1.5 rounded-md border border-red-500/30 bg-red-950/20 text-red-400 text-[10px] font-bold uppercase tracking-wider hover:bg-red-950/40 transition-colors cursor-pointer ${
                        currentRoute === "admin" ? "border-red-500/80 text-red-200" : ""
                      }`}
                    >
                      <ShieldAlert className="w-3.5 h-3.5" />
                      <span>{t("navAdmin")}</span>
                    </button>
                  )}
                  
                  {/* Expert Area Access decorated with active green pulsing indicator (Like Mes Devis status dot) */}
                  {user.membershipStatus === "active" ? (
                    <button
                      id="btn-nav-member-active"
                      onClick={() => handleNavClick("member")}
                      className="inline-flex items-center px-6 py-2.5 border border-[#D4AF37] bg-gradient-to-r from-[#D4AF37] to-[#C59B27] text-[#050505] hover:from-transparent hover:to-transparent hover:text-[#D4AF37] font-black text-[11px] uppercase tracking-widest transition-all duration-300 cursor-pointer font-sans-ui shadow-[0_0_20px_rgba(212,175,55,0.25)] rounded-sm"
                    >
                      <Sparkles className="w-3.5 h-3.5 mr-2 text-black" />
                      <span>{t("navExpertArea")}</span>
                      
                      {/* Pulsing Active Status Dot */}
                      <span className="relative flex h-2 w-2 ml-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                    </button>
                  ) : (
                    <button
                      id="btn-nav-pricing-redirect"
                      onClick={() => handleNavClick("pricing")}
                      className="px-6 py-2.5 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black font-black text-[11px] uppercase tracking-widest transition-all cursor-pointer font-sans-ui rounded-sm shadow-[0_0_15px_rgba(212,175,55,0.1)]"
                    >
                      {t("navSubscribe")}
                    </button>
                  )}
                  
                  {/* Logged in User Indicator */}
                  <div className="flex items-center space-x-2 text-neutral-300 border-l border-[#D4AF37]/15 pl-4 font-sans-ui">
                    <UserIcon className="w-4 h-4 text-[#D4AF37]" />
                    <span className="text-xs max-w-[120px] truncate text-[#F5E6D3]/80 font-serif italic" title={user.fullName}>
                      {user.fullName}
                    </span>
                    <button
                      id="btn-nav-logout"
                      onClick={onLogout}
                      className="text-neutral-500 hover:text-red-400 p-1 rounded-md transition-colors cursor-pointer"
                      title={t("navLogout")}
                    >
                      <LogOut className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-3 font-sans-ui">
                  <button
                    id="btn-nav-login"
                    onClick={() => handleNavClick("login")}
                    className="px-4 py-2 text-[#F5E6D3]/70 hover:text-[#D4AF37] text-[11px] uppercase tracking-widest font-black transition-colors cursor-pointer"
                  >
                    {t("navLogin")}
                  </button>
                  
                  {/* High-visibility Gold Border CTA Button (Matching Réserver un Devis format) */}
                  <button
                    id="btn-nav-register"
                    onClick={() => handleNavClick("register")}
                    className="inline-flex items-center px-6 py-2.5 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all text-[11px] uppercase tracking-widest font-black cursor-pointer rounded-sm shadow-[0_0_15px_rgba(212,175,55,0.15)] bg-black/40 group"
                  >
                    <Sparkles className="w-3.5 h-3.5 mr-1.5 text-[#D4AF37] group-hover:text-black transition-colors" />
                    <span>{t("navRegister")}</span>
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Trigger */}
            <div className="flex md:hidden items-center space-x-2">
              {user && user.role === "admin" && (
                <button
                  onClick={() => handleNavClick("admin")}
                  className="p-1 rounded-md border border-red-500/20 bg-red-950/10 text-red-400"
                >
                  <ShieldAlert className="w-4 h-4" />
                </button>
              )}
              <button
                id="btn-mobile-menu-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-neutral-400 hover:text-[#D4AF37] p-2"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#050505] border-t border-[#D4AF37]/15 px-4 pt-4 pb-8 space-y-5" style={{ backgroundImage: `url('${zelligePattern}')` }}>
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <button
                  key={item.route}
                  id={`mobile-nav-link-${item.route}`}
                  onClick={() => handleNavClick(item.route)}
                  className={`text-left py-2.5 px-3 rounded-sm text-xs font-black tracking-widest uppercase transition-colors ${
                    currentRoute === item.route
                      ? "text-[#D4AF37] bg-[#D4AF37]/10 border-l border-[#D4AF37]"
                      : "text-neutral-400 hover:text-[#F5E6D3]"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="pt-3 flex flex-col space-y-4">
              {user ? (
                <>
                  <div className="flex items-center px-3 text-neutral-300 border-b border-[#D4AF37]/10 pb-3">
                    <UserIcon className="w-4 h-4 text-[#D4AF37] mr-2" />
                    <span className="text-xs truncate font-serif italic">{user.fullName}</span>
                  </div>
                  {user.membershipStatus === "active" ? (
                    <button
                      id="mobile-btn-member"
                      onClick={() => handleNavClick("member")}
                      className="w-full text-center py-3 bg-gradient-to-r from-[#D4AF37] to-[#C59B27] text-black font-black text-xs uppercase tracking-widest font-sans-ui rounded-sm shadow-md"
                    >
                      {t("navExpertArea")}
                    </button>
                  ) : (
                    <button
                      id="mobile-btn-pricing"
                      onClick={() => handleNavClick("pricing")}
                      className="w-full text-center py-3 border border-[#D4AF37] text-[#D4AF37] font-black text-xs uppercase tracking-widest font-sans-ui rounded-sm"
                    >
                      {t("navSubscribe")}
                    </button>
                  )}
                  <button
                    id="mobile-btn-logout"
                    onClick={() => {
                      onLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-center py-3 bg-neutral-950 hover:bg-neutral-900 text-red-400 font-black text-xs uppercase tracking-widest border border-red-500/20 font-sans-ui rounded-sm"
                  >
                    {t("navLogout")}
                  </button>
                </>
              ) : (
                <div className="flex flex-col space-y-2.5">
                  <button
                    id="mobile-btn-login"
                    onClick={() => handleNavClick("login")}
                    className="w-full text-center py-3 border border-[#D4AF37]/20 text-neutral-300 font-black text-xs uppercase tracking-widest font-sans-ui rounded-sm"
                  >
                    {t("navLogin")}
                  </button>
                  <button
                    id="mobile-btn-register"
                    onClick={() => handleNavClick("register")}
                    className="w-full text-center py-3 bg-gradient-to-r from-[#D4AF37] to-[#C59B27] text-black font-black text-xs uppercase tracking-widest font-sans-ui rounded-sm shadow-md"
                  >
                    {t("navRegister")}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
