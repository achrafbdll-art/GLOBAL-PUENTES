import React, { useState, useEffect } from "react";
import { User, ConsultationRequest, FeasibilityResult } from "../types";
import { 
  Lock, 
  Calendar, 
  BookOpen, 
  Calculator, 
  Download, 
  CheckCircle, 
  AlertCircle,
  FileText,
  Clock,
  Sparkles,
  Send,
  RefreshCw,
  HelpCircle,
  UserCheck
} from "lucide-react";
import { motion } from "motion/react";
import { safeJson } from "../utils";

interface MemberDashboardProps {
  user: User | null;
  setCurrentRoute: (route: any) => void;
}

export default function MemberDashboard({ user, setCurrentRoute }: MemberDashboardProps) {
  const [activeTab, setActiveTab] = useState<'calculator' | 'consultation' | 'library'>('calculator');
  const [consultations, setConsultations] = useState<ConsultationRequest[]>([]);
  const [loadingConsultations, setLoadingConsultations] = useState(false);

  // Consultation Form state
  const [topic, setTopic] = useState("Offshore Structuring");
  const [description, setDescription] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [schedulingStatus, setSchedulingStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [schedulingError, setSchedulingError] = useState("");

  // Calculator Form state
  const [calcSector, setCalcSector] = useState("Import/Export");
  const [calcRegion, setCalcRegion] = useState("Middle-East/UAE");
  const [calcCapital, setCalcCapital] = useState(150000);
  const [calcRegulation, setCalcRegulation] = useState(4);
  const [calcExperience, setCalcExperience] = useState(3);
  const [calcResult, setCalcResult] = useState<FeasibilityResult | null>(null);
  const [calculating, setCalculating] = useState(false);

  useEffect(() => {
    if (user) {
      fetchConsultations();
    }
  }, [user]);

  const fetchConsultations = async () => {
    if (!user) return;
    setLoadingConsultations(true);
    try {
      const res = await fetch("/api/member/consultations", {
        headers: {
          "Authorization": `Bearer ${user.id}`
        }
      });
      const data = await safeJson(res);
      if (res.ok) {
        setConsultations(data.consultations || []);
      }
    } catch (err) {
      console.error("Error fetching consultations:", err);
    } finally {
      setLoadingConsultations(false);
    }
  };

  const handleScheduleConsultation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (!description || !preferredDate) {
      setSchedulingStatus('error');
      setSchedulingError("Veuillez renseigner la description de votre projet et votre date préférentielle.");
      return;
    }

    setSchedulingStatus('submitting');
    try {
      const res = await fetch("/api/member/consultation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.id}`
        },
        body: JSON.stringify({
          topic,
          description,
          preferredDate
        })
      });

      const data = await safeJson(res);
      if (!res.ok) {
        throw new Error(data.error || "Échec de l'enregistrement de la consultation.");
      }

      setSchedulingStatus('success');
      setDescription("");
      setPreferredDate("");
      fetchConsultations(); // reload log
    } catch (err: any) {
      console.error(err);
      setSchedulingStatus('error');
      setSchedulingError(err.message || "Erreur serveur.");
    }
  };

  const runFeasibilityCalculator = (e: React.FormEvent) => {
    e.preventDefault();
    setCalculating(true);
    setCalcResult(null);

    setTimeout(() => {
      // Calculate scores based on user parameters
      let baseScore = 40;
      
      // Capital impact
      if (calcCapital >= 250000) baseScore += 20;
      else if (calcCapital >= 100000) baseScore += 15;
      else if (calcCapital >= 50000) baseScore += 10;
      else baseScore += 5;

      // Sector-Region alignment
      if (calcSector === "Import/Export" && calcRegion === "Middle-East/UAE") baseScore += 15;
      else if (calcSector === "Luxury Real Estate" && calcRegion === "Europe/Switzerland") baseScore += 15;
      else if (calcSector === "Logistics" && calcRegion === "Middle-East/UAE") baseScore += 10;
      else baseScore += 5;

      // Stars impact
      baseScore += calcRegulation * 3;
      baseScore += calcExperience * 4;

      // Cap at 98%
      const score = Math.min(Math.round(baseScore), 98);

      let status: 'excellent' | 'viable' | 'challenging' | 'high_risk' = 'viable';
      if (score >= 85) status = 'excellent';
      else if (score >= 65) status = 'viable';
      else if (score >= 45) status = 'challenging';
      else status = 'high_risk';

      const breakdown = {
        marketDemand: Math.round(Math.min(99, score * 1.02)),
        financialFeasibility: Math.round(Math.min(99, (calcCapital / 300000) * 40 + score * 0.6)),
        operationalCapacity: calcExperience * 20,
        regulatoryClarity: calcRegulation * 20
      };

      const recs = [];
      if (calcRegion === "Middle-East/UAE") {
        recs.push("Constituez une société en Free-Zone à Dubaï (ex: DMCC ou Meydan) pour bénéficier de l'exonération totale d'impôt sur les sociétés sous réserve de conformité.");
        recs.push("Envisagez l'introduction bancaire auprès de banques d'État locales (Emirates NBD ou FAB) pour sécuriser vos transferts multi-devises.");
      } else if (calcRegion === "Europe/Switzerland") {
        recs.push("Structurez une holding de droit suisse (S.A.) dans un canton fiscalement attractif comme Zoug ou Lucerne.");
        recs.push("Réduisez l'exposition réglementaire en désignant un administrateur résident obligatoire de premier ordre.");
      } else {
        recs.push("Configurez des contrats d'approvisionnement exclusifs assortis de garanties d'arbitrage international à Singapour.");
      }

      if (calcCapital < 100000) {
        recs.push("Le capital d'amorçage est modeste. Utilisez des structures simplifiées de LLC (Limited Liability Company) pour économiser sur les frais de gestion initiaux.");
      }

      setCalcResult({
        score,
        status,
        breakdown,
        recommendations: recs
      });
      setCalculating(false);
    }, 1200);
  };

  const libraryFiles = [
    {
      title: "Manuel de Structuration Holding & S.A. à Dubaï",
      type: "PDF (3.4 Mo)",
      description: "Un guide d'expert complet détaillant les démarches, les barèmes fiscaux récents, et la sélection des meilleures zones franches en Émirats Arabes Unis.",
    },
    {
      title: "Matrice d'Audit & Due Diligence Marchés Émergents",
      type: "Excel Workbook (1.2 Mo)",
      description: "Canevas analytique utilisé par notre cabinet pour évaluer les barrières tarifaires, les contraintes douanières et l'attractivité fiscale d'une juridiction.",
    },
    {
      title: "Guide Pratique de Trade Finance & Lettres de Crédit",
      type: "PDF (2.1 Mo)",
      description: "Tout ce qu'il faut savoir sur les Incoterms v2020, l'émission des lettres de crédit documentaires et la couverture des risques de change logistiques.",
    }
  ];

  if (!user || user.membershipStatus !== 'active') {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-[#050505] text-center px-4 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#D4AF37]/2 rounded-full blur-[90px] pointer-events-none" />
        <div className="max-w-md p-8 bg-[#0a0a0a] border border-[#D4AF37]/15 rounded-none shadow-[0_0_25px_rgba(212,175,55,0.02)] z-10">
          <Lock className="w-12 h-12 text-[#D4AF37] mx-auto mb-5" />
          <h3 className="text-xl font-bold text-white uppercase tracking-tight font-serif italic">Accès Privé Restreint</h3>
          <p className="text-[#F5E6D3]/60 text-xs sm:text-sm font-serif italic mt-3 leading-relaxed">
            Cet espace exclusif regroupe nos simulateurs d'affaires, nos manuels stratégiques, et l'agenda de GLOBAL-PUENTE. Un abonnement d'expertise actif est requis.
          </p>
          <button
            onClick={() => setCurrentRoute("pricing")}
            className="mt-6 px-8 py-3.5 bg-[#D4AF37] hover:bg-[#F5E6D3] text-[#050505] font-bold text-xs uppercase tracking-widest cursor-pointer rounded-none transition-all duration-300 font-sans-ui"
          >
            S'abonner à l'Expertise
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[90vh] py-24 bg-[#050505] relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 w-[500px] h-[500px] bg-[#D4AF37]/2 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Welcome Premium Header */}
        <div className="bg-[#0a0a0a] border border-[#D4AF37]/15 p-6 sm:p-8 rounded-none mb-12 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 shadow-[0_0_20px_rgba(212,175,55,0.02)]">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-[#D4AF37]/5 border border-[#D4AF37]/15 text-[#D4AF37]">
              <UserCheck className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-[10px] bg-[#D4AF37]/10 text-[#D4AF37] px-2.5 py-0.5 rounded-none font-bold uppercase tracking-widest border border-[#D4AF37]/20 font-sans-ui">Membre Accrédité</span>
                {user.paidAmount && <span className="text-[10px] text-neutral-500 font-mono">Contribution: ${user.paidAmount}</span>}
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white uppercase tracking-tight font-serif italic">{user.fullName}</h2>
              <p className="text-xs text-[#F5E6D3]/60 font-serif italic">Espace d'accompagnement de direction d'affaires - GLOBAL-PUENTE</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab('calculator')}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-300 rounded-none cursor-pointer font-sans-ui ${
                activeTab === 'calculator' 
                  ? "bg-[#D4AF37] text-[#050505]" 
                  : "bg-[#050505] border border-[#D4AF37]/10 text-neutral-400 hover:text-white hover:border-[#D4AF37]/35"
              }`}
            >
              <div className="flex items-center space-x-1.5">
                <Calculator className="w-3.5 h-3.5" />
                <span>Calculateur</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('consultation')}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-300 rounded-none cursor-pointer font-sans-ui ${
                activeTab === 'consultation' 
                  ? "bg-[#D4AF37] text-[#050505]" 
                  : "bg-[#050505] border border-[#D4AF37]/10 text-neutral-400 hover:text-white hover:border-[#D4AF37]/35"
              }`}
            >
              <div className="flex items-center space-x-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>Consultation</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('library')}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-300 rounded-none cursor-pointer font-sans-ui ${
                activeTab === 'library' 
                  ? "bg-[#D4AF37] text-[#050505]" 
                  : "bg-[#050505] border border-[#D4AF37]/10 text-neutral-400 hover:text-white hover:border-[#D4AF37]/35"
              }`}
            >
              <div className="flex items-center space-x-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Bibliothèque</span>
              </div>
            </button>
          </div>
        </div>

        {/* Tab Contents */}
        <div className="bg-[#0a0a0a] border border-[#D4AF37]/10 rounded-none p-6 sm:p-10 shadow-[0_0_20px_rgba(212,175,55,0.01)] min-h-[500px]">
          
          {/* TAB 1: Feasibility Calculator */}
          {activeTab === 'calculator' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* Left Form (5 cols) */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white uppercase tracking-tight flex items-center space-x-2 font-serif italic">
                    <Calculator className="w-5 h-5 text-[#D4AF37]" />
                    <span>Évaluateur de Faisabilité</span>
                  </h3>
                  <p className="text-xs text-[#F5E6D3]/60 font-serif italic mt-1">
                    Simulez la viabilité de votre projet d'affaires à l'international grâce aux barèmes exclusifs de notre cabinet.
                  </p>
                </div>

                <form onSubmit={runFeasibilityCalculator} className="space-y-4">
                  {/* Sector */}
                  <div className="flex flex-col space-y-1.5">
                    <label htmlFor="calc-sector" className="text-[#F5E6D3]/70 font-bold text-[10px] uppercase tracking-widest font-sans-ui mb-1">
                      Secteur d'activité
                    </label>
                    <select
                      id="calc-sector"
                      value={calcSector}
                      onChange={(e) => setCalcSector(e.target.value)}
                      className="w-full bg-[#050505] border border-[#D4AF37]/15 focus:border-[#D4AF37]/50 rounded-none px-3 py-2.5 text-neutral-200 text-xs focus:outline-none cursor-pointer font-serif"
                    >
                      <option value="Import/Export">Négoce & Import/Export de commodités</option>
                      <option value="Luxury Real Estate">Immobilier de prestige</option>
                      <option value="Tech">Technologie & Services d'ingénierie</option>
                      <option value="Logistics">Infrastructures logistiques & Fret</option>
                    </select>
                  </div>

                  {/* Region */}
                  <div className="flex flex-col space-y-1.5">
                    <label htmlFor="calc-region" className="text-[#F5E6D3]/70 font-bold text-[10px] uppercase tracking-widest font-sans-ui mb-1">
                      Juridiction d'Implantation visée
                    </label>
                    <select
                      id="calc-region"
                      value={calcRegion}
                      onChange={(e) => setCalcRegion(e.target.value)}
                      className="w-full bg-[#050505] border border-[#D4AF37]/15 focus:border-[#D4AF37]/50 rounded-none px-3 py-2.5 text-neutral-200 text-xs focus:outline-none cursor-pointer font-serif"
                    >
                      <option value="Middle-East/UAE">Moyen-Orient (Dubaï, Émirats Arabes Unis)</option>
                      <option value="Europe/Switzerland">Europe (Genève, Suisse)</option>
                      <option value="Asia/Singapore">Asie (Singapour)</option>
                      <option value="Americas">Americas (Delaware, États-Unis)</option>
                    </select>
                  </div>

                  {/* Capital */}
                  <div className="flex flex-col space-y-1.5">
                    <div className="flex justify-between text-[#F5E6D3]/70 font-bold text-[10px] uppercase tracking-widest font-sans-ui mb-1">
                      <span>Capital initial alloué</span>
                      <span className="text-[#D4AF37] font-mono">${calcCapital.toLocaleString()} USD</span>
                    </div>
                    <input
                      id="calc-capital"
                      type="range"
                      min="10000"
                      max="1000000"
                      step="10000"
                      value={calcCapital}
                      onChange={(e) => setCalcCapital(Number(e.target.value))}
                      className="w-full accent-[#D4AF37] h-1.5 bg-[#0a0a0a] border border-[#D4AF37]/10 appearance-none cursor-pointer"
                    />
                  </div>

                  {/* Regulation Slider */}
                  <div className="flex flex-col space-y-1.5">
                    <div className="flex justify-between text-[#F5E6D3]/70 font-bold text-[10px] uppercase tracking-widest font-sans-ui mb-1">
                      <span>Clarté réglementaire locale</span>
                      <span className="text-[#D4AF37] font-mono">{calcRegulation} / 5</span>
                    </div>
                    <input
                      id="calc-regulation"
                      type="range"
                      min="1"
                      max="5"
                      step="1"
                      value={calcRegulation}
                      onChange={(e) => setCalcRegulation(Number(e.target.value))}
                      className="w-full accent-[#D4AF37] h-1.5 bg-[#0a0a0a] border border-[#D4AF37]/10 appearance-none cursor-pointer"
                    />
                  </div>

                  {/* Experience Slider */}
                  <div className="flex flex-col space-y-1.5">
                    <div className="flex justify-between text-[#F5E6D3]/70 font-bold text-[10px] uppercase tracking-widest font-sans-ui mb-1">
                      <span>Niveau d'expérience de votre équipe</span>
                      <span className="text-[#D4AF37] font-mono">{calcExperience} / 5</span>
                    </div>
                    <input
                      id="calc-experience"
                      type="range"
                      min="1"
                      max="5"
                      step="1"
                      value={calcExperience}
                      onChange={(e) => setCalcExperience(Number(e.target.value))}
                      className="w-full accent-[#D4AF37] h-1.5 bg-[#0a0a0a] border border-[#D4AF37]/10 appearance-none cursor-pointer"
                    />
                  </div>

                  <button
                    id="btn-run-calc"
                    type="submit"
                    disabled={calculating}
                    className="w-full py-3.5 bg-[#D4AF37] hover:bg-[#F5E6D3] text-[#050505] font-bold text-xs uppercase tracking-widest flex items-center justify-center space-x-2 cursor-pointer transition-all duration-300 rounded-none font-sans-ui disabled:opacity-50"
                  >
                    {calculating ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin text-[#050505]" />
                        <span>Analyses en cours...</span>
                      </>
                    ) : (
                      <>
                        <Calculator className="w-4 h-4 text-[#050505]" />
                        <span>Lancer la Simulation</span>
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Right Output results (7 cols) */}
              <div className="lg:col-span-7 bg-[#080808]/50 p-6 sm:p-8 rounded-none border border-[#D4AF37]/15 min-h-[400px] flex flex-col justify-center">
                {calcResult ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6"
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-[#D4AF37]/10">
                      <div>
                        <span className="text-[9px] uppercase tracking-widest text-[#F5E6D3]/40 font-bold font-sans-ui block">Indice de Faisabilité Global</span>
                        <div className="flex items-baseline mt-1">
                          <span className="text-4xl font-bold text-[#D4AF37] font-serif italic">{calcResult.score}%</span>
                          <span className="text-[#F5E6D3]/60 text-[10px] ml-2 uppercase font-bold tracking-widest font-sans-ui">de réussite simulée</span>
                        </div>
                      </div>

                      <div className="px-4 py-1.5 rounded-none border text-[10px] font-bold uppercase tracking-widest font-sans-ui" style={{
                        borderColor: calcResult.status === 'excellent' ? '#22c55e' : calcResult.status === 'viable' ? '#D4AF37' : '#ef4444',
                        color: calcResult.status === 'excellent' ? '#22c55e' : calcResult.status === 'viable' ? '#D4AF37' : '#ef4444',
                        backgroundColor: calcResult.status === 'excellent' ? 'rgba(34, 197, 94, 0.05)' : calcResult.status === 'viable' ? 'rgba(212, 175, 55, 0.05)' : 'rgba(239, 68, 68, 0.05)'
                      }}>
                        {calcResult.status === 'excellent' ? "Excellent Viable" : calcResult.status === 'viable' ? "Favorable" : calcResult.status === 'challenging' ? "Complexe" : "Risque Élevé"}
                      </div>
                    </div>

                    {/* Score Progress Bars */}
                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div>
                        <div className="flex justify-between text-[#F5E6D3]/60 font-bold text-[9px] uppercase tracking-widest font-sans-ui mb-1">
                          <span>Attractivité Marché</span>
                          <span className="font-mono text-white">{calcResult.breakdown.marketDemand}%</span>
                        </div>
                        <div className="w-full h-1 bg-neutral-900 overflow-hidden">
                          <div className="h-full bg-[#D4AF37]" style={{ width: `${calcResult.breakdown.marketDemand}%` }} />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-[#F5E6D3]/60 font-bold text-[9px] uppercase tracking-widest font-sans-ui mb-1">
                          <span>Équilibre Financier</span>
                          <span className="font-mono text-white">{calcResult.breakdown.financialFeasibility}%</span>
                        </div>
                        <div className="w-full h-1 bg-neutral-900 overflow-hidden">
                          <div className="h-full bg-[#D4AF37]" style={{ width: `${calcResult.breakdown.financialFeasibility}%` }} />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-[#F5E6D3]/60 font-bold text-[9px] uppercase tracking-widest font-sans-ui mb-1">
                          <span>Capacité Opérationnelle</span>
                          <span className="font-mono text-white">{calcResult.breakdown.operationalCapacity}%</span>
                        </div>
                        <div className="w-full h-1 bg-neutral-900 overflow-hidden">
                          <div className="h-full bg-[#D4AF37]" style={{ width: `${calcResult.breakdown.operationalCapacity}%` }} />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-[#F5E6D3]/60 font-bold text-[9px] uppercase tracking-widest font-sans-ui mb-1">
                          <span>Clarté Réglementaire</span>
                          <span className="font-mono text-white">{calcResult.breakdown.regulatoryClarity}%</span>
                        </div>
                        <div className="w-full h-1 bg-neutral-900 overflow-hidden">
                          <div className="h-full bg-[#D4AF37]" style={{ width: `${calcResult.breakdown.regulatoryClarity}%` }} />
                        </div>
                      </div>
                    </div>

                    <div className="pt-2">
                      <div className="flex items-center space-x-1 text-[#D4AF37] text-xs font-bold uppercase tracking-wider mb-2 font-sans-ui">
                        <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                        <span>Recommandations de GLOBAL-PUENTE :</span>
                      </div>
                      <ul className="space-y-2.5">
                        {calcResult.recommendations.map((rec, rIdx) => (
                          <li key={rIdx} className="text-xs text-neutral-400 flex items-start space-x-2 leading-relaxed font-serif">
                            <span className="text-[#D4AF37] font-bold">•</span>
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-[#D4AF37]/10 text-[10px] text-neutral-500 flex items-center justify-between font-sans-ui">
                      <span className="flex items-center text-[#F5E6D3]/40">
                        <FileText className="w-3.5 h-3.5 text-[#D4AF37] mr-1.5" /> Dossier analytique n°GP-CALC-{Math.floor(Math.random() * 9000 + 1000)}
                      </span>
                      <span className="text-neutral-600 font-mono">Calculateur v2.4</span>
                    </div>
                  </motion.div>
                ) : (
                  <div className="text-center space-y-3 p-8">
                    <Calculator className="w-12 h-12 text-[#D4AF37]/20 mx-auto" />
                    <h4 className="text-[#F5E6D3]/60 font-bold uppercase tracking-widest text-xs font-sans-ui">Simulateur en attente</h4>
                    <p className="text-[11px] text-neutral-500 max-w-sm mx-auto leading-relaxed font-serif italic">
                      Ajustez les curseurs dans le formulaire de gauche selon les critères réels de votre projet d'affaires, puis cliquez sur "Lancer la Simulation" pour obtenir vos indicateurs d'adéquation et recommandations exclusives.
                    </p>
                  </div>
                )}
              </div>

            </div>
          )}

          {/* TAB 2: Private Consultation */}
          {activeTab === 'consultation' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* Left Column Form (5 cols) */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white uppercase tracking-tight flex items-center space-x-2 font-serif italic">
                    <Calendar className="w-5 h-5 text-[#D4AF37]" />
                    <span>Planifier une Consultation</span>
                  </h3>
                  <p className="text-xs text-[#F5E6D3]/60 font-serif italic mt-1">
                    Soumettez un dossier stratégique pour programmer une séance de conseil d'affaires exclusive en 1-à-1 de 90 minutes.
                  </p>
                </div>

                {schedulingStatus === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-6 border border-[#D4AF37]/15 bg-[#D4AF37]/5 rounded-none text-center space-y-4"
                  >
                    <CheckCircle className="w-12 h-12 text-[#D4AF37] mx-auto" />
                    <h4 className="text-white font-bold text-sm uppercase font-serif italic">Demande Enregistrée</h4>
                    <p className="text-xs text-[#F5E6D3]/70 leading-relaxed font-serif italic">
                      Votre dossier a été transmis personnellement à l'expert GLOBAL-PUENTE. Notre cabinet de secrétariat d'affaires vous contactera sous 24 heures pour convenir de l'heure exacte et vous envoyer l'invitation vidéo sécurisée.
                    </p>
                    <button
                      onClick={() => setSchedulingStatus('idle')}
                      className="px-5 py-2.5 border border-[#D4AF37]/30 hover:border-[#D4AF37] text-[#D4AF37] text-xs font-bold uppercase tracking-wider rounded-none font-sans-ui cursor-pointer transition-all duration-300"
                    >
                      Planifier une autre session
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleScheduleConsultation} className="space-y-4">
                    {/* Topic */}
                    <div className="flex flex-col space-y-1.5">
                      <label htmlFor="topic-selector" className="text-[#F5E6D3]/70 font-bold text-[10px] uppercase tracking-widest font-sans-ui">
                        Sujet de la consultation
                      </label>
                      <select
                        id="topic-selector"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className="w-full bg-[#050505] border border-[#D4AF37]/15 focus:border-[#D4AF37]/50 rounded-none px-3 py-2.5 text-neutral-200 text-xs focus:outline-none cursor-pointer font-serif"
                      >
                        <option value="Offshore Structuring">Montages Offshore & Juridictions fiscales</option>
                        <option value="Trade Finance Sourcing">Sourcing Logistique & Trade Finance</option>
                        <option value="Asset Diversification">Diversification d'actifs (Immobilier, Or)</option>
                        <option value="Business Strategy Coaching">Accompagnement de Direction & Mentorat</option>
                      </select>
                    </div>

                    {/* Date */}
                    <div className="flex flex-col space-y-1.5">
                      <label htmlFor="pref-date" className="text-[#F5E6D3]/70 font-bold text-[10px] uppercase tracking-widest font-sans-ui">
                        Date préférentielle
                      </label>
                      <input
                        id="pref-date"
                        type="date"
                        required
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                        className="w-full bg-[#050505] border border-[#D4AF37]/15 focus:border-[#D4AF37]/50 rounded-none px-3 py-2.5 text-neutral-200 text-xs focus:outline-none font-serif"
                      />
                    </div>

                    {/* Description */}
                    <div className="flex flex-col space-y-1.5">
                      <label htmlFor="proj-desc" className="text-[#F5E6D3]/70 font-bold text-[10px] uppercase tracking-widest font-sans-ui">
                        Dossier d'affaires & Objectifs de l'entretien
                      </label>
                      <textarea
                        id="proj-desc"
                        rows={5}
                        required
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Veuillez résumer brièvement les enjeux actuels de votre société, les objectifs de cet entretien et les obstacles bloquants..."
                        className="w-full bg-[#050505] border border-[#D4AF37]/15 focus:border-[#D4AF37]/50 rounded-none px-3 py-2.5 text-neutral-200 text-xs focus:outline-none resize-none placeholder:text-neutral-700 font-serif"
                      />
                    </div>

                    {schedulingStatus === 'error' && (
                      <div className="p-3 bg-red-950/20 border border-red-500/20 rounded-none text-red-400 text-xs flex items-center space-x-2 font-sans-ui">
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <span>{schedulingError}</span>
                      </div>
                    )}

                    <button
                      id="btn-schedule-submit"
                      type="submit"
                      disabled={schedulingStatus === 'submitting'}
                      className="w-full py-3.5 bg-[#D4AF37] hover:bg-[#F5E6D3] text-[#050505] font-bold text-xs uppercase tracking-widest flex items-center justify-center space-x-2 cursor-pointer transition-all duration-300 rounded-none font-sans-ui disabled:opacity-50"
                    >
                      {schedulingStatus === 'submitting' ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin text-[#050505]" />
                          <span>Transmission en cours...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-[#050505]" />
                          <span>Soumettre mon dossier</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>

              {/* Right Column Consultation log (7 cols) */}
              <div className="lg:col-span-7 bg-[#080808]/50 p-6 sm:p-8 rounded-none border border-[#D4AF37]/15 min-h-[400px]">
                <h3 className="text-xs font-bold text-[#F5E6D3]/70 uppercase tracking-widest mb-6 border-b border-[#D4AF37]/10 pb-3 font-sans-ui">Historique des Sessions de Consultation</h3>

                {loadingConsultations ? (
                  <div className="flex justify-center items-center h-48">
                    <RefreshCw className="w-8 h-8 text-[#D4AF37] animate-spin" />
                  </div>
                ) : consultations.length > 0 ? (
                  <div className="space-y-4">
                    {consultations.map((item) => (
                      <div key={item.id} className="p-4 border border-[#D4AF37]/10 bg-[#050505] space-y-3 rounded-none">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-[9px] text-[#F5E6D3]/40 font-bold uppercase block font-sans-ui">Thème retenu</span>
                            <h4 className="text-neutral-200 font-bold text-xs uppercase mt-0.5 font-serif">{item.topic}</h4>
                          </div>
                          
                          <span className="px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest border flex items-center space-x-1 rounded-none font-sans-ui" style={{
                            borderColor: item.status === 'pending' ? 'rgba(212, 175, 55, 0.3)' : 'rgba(34, 197, 94, 0.3)',
                            color: item.status === 'pending' ? '#D4AF37' : '#22c55e',
                            backgroundColor: item.status === 'pending' ? 'rgba(212, 175, 55, 0.05)' : 'rgba(34, 197, 94, 0.05)'
                          }}>
                            <Clock className="w-3 h-3 mr-1" />
                            <span>{item.status === 'pending' ? "En attente" : "Confirmé"}</span>
                          </span>
                        </div>

                        <p className="text-xs text-neutral-400 font-serif italic leading-relaxed max-w-xl">
                          "{item.description}"
                        </p>

                        <div className="flex justify-between items-center text-[9px] text-neutral-500 pt-2 border-t border-[#D4AF37]/10 font-sans-ui">
                          <span>📅 Date préférentielle : {item.preferredDate}</span>
                          <span className="font-mono">ID: {item.id}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 space-y-2">
                    <Calendar className="w-12 h-12 text-[#D4AF37]/20 mx-auto" />
                    <p className="text-xs text-[#F5E6D3]/60 font-bold uppercase tracking-widest font-sans-ui">Aucune demande planifiée</p>
                    <p className="text-[11px] text-neutral-600 max-w-xs mx-auto leading-relaxed font-serif italic">
                      Planifiez votre première consultation avec GLOBAL-PUENTE en remplissant le dossier d'affaires à gauche.
                    </p>
                  </div>
                )}
              </div>

            </div>
          )}

          {/* TAB 3: Documents Library */}
          {activeTab === 'library' && (
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-bold text-white uppercase tracking-tight flex items-center space-x-2 font-serif italic">
                  <BookOpen className="w-5 h-5 text-[#D4AF37]" />
                  <span>Matériels Stratégiques & Documents</span>
                </h3>
                <p className="text-xs text-[#F5E6D3]/60 font-serif italic mt-1">
                  Accédez en libre téléchargement aux guides juridiques exclusifs et aux ressources financières édités par l'équipe de GLOBAL-PUENTE.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {libraryFiles.map((file, idx) => (
                  <div
                    key={idx}
                    id={`library-file-card-${idx}`}
                    className="p-6 bg-[#080808]/50 border border-[#D4AF37]/10 hover:border-[#D4AF37]/35 rounded-none transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="p-3 bg-[#D4AF37]/5 border border-[#D4AF37]/15 text-[#D4AF37] w-fit mb-4">
                        <FileText className="w-6 h-6" />
                      </div>
                      
                      <span className="text-[10px] font-bold text-[#D4AF37] tracking-widest uppercase block mb-1 font-sans-ui">
                        Document Privé
                      </span>
                      
                      <h4 className="text-sm font-bold text-neutral-200 tracking-tight leading-snug mb-2 font-serif">
                        {file.title}
                      </h4>
                      
                      <p className="text-xs text-[#F5E6D3]/50 leading-relaxed font-serif italic mb-6">
                        {file.description}
                      </p>
                    </div>

                    <div className="border-t border-[#D4AF37]/10 pt-4 mt-auto flex items-center justify-between text-xs font-bold">
                      <span className="text-neutral-500 text-[9px] uppercase tracking-wider font-mono">{file.type}</span>
                      
                      <button
                        id={`btn-download-file-${idx}`}
                        onClick={() => alert(`Téléchargement initié : ${file.title}. Ce fichier chiffré est réservé à l'usage confidentiel du membre.`)}
                        className="text-[#D4AF37] hover:text-[#F5E6D3] flex items-center space-x-1.5 cursor-pointer font-sans-ui text-xs"
                      >
                        <Download className="w-4 h-4" />
                        <span>Télécharger</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Secure note */}
              <div className="p-4 rounded-none border border-[#D4AF37]/20 bg-[#D4AF37]/2 text-[11px] text-[#F5E6D3]/60 font-serif italic flex items-start space-x-2.5 max-w-3xl mx-auto">
                <Lock className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <span>
                  L'intégralité des documents téléchargés depuis cette bibliothèque comporte un tatouage numérique invisible (watermark) propre à votre compte pour empêcher toute redistribution publique illégale de la propriété intellectuelle du cabinet.
                </span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
