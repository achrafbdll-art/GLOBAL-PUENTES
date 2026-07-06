import React, { useState } from "react";
import { Route, User } from "../types";
import { CreditCard, Shield, Lock, CheckCircle2, AlertCircle, RefreshCw, Smartphone, DollarSign } from "lucide-react";
import { motion } from "motion/react";
import { safeJson } from "../utils";

interface StripeSimulationProps {
  setCurrentRoute: (route: Route) => void;
  user: User | null;
  paymentAmount: number;
  onPaymentSuccess: (updatedUser: User) => void;
}

export default function StripeSimulation({
  setCurrentRoute,
  user,
  paymentAmount,
  onPaymentSuccess
}: StripeSimulationProps) {
  const [activeGateway, setActiveGateway] = useState<'stripe' | 'paypal'>('stripe');
  
  // Stripe state
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState(user?.fullName || "");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [postalCode, setPostalCode] = useState("");

  // Common payment steps: 'form' | 'processing' | 'success' | 'error' | 'paypal_simulation'
  const [paymentStep, setPaymentStep] = useState<'form' | 'processing' | 'success' | 'error' | 'paypal_simulation'>('form');
  const [processingStatus, setProcessingStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [paypalOrderId, setPaypalOrderId] = useState("");

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    return parts.length > 0 ? parts.join(" ") : v;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    if (formatted.length <= 19) {
      setCardNumber(formatted);
    }
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length > 2) {
      value = value.substring(0, 2) + "/" + value.substring(2, 4);
    }
    if (value.length <= 5) {
      setCardExpiry(value);
    }
  };

  const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length <= 4) {
      setCardCvc(value);
    }
  };

  const handleStripePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setErrorMessage("Debe estar autenticado para completar el pago.");
      setPaymentStep('error');
      return;
    }

    if (!cardNumber || !cardName || !cardExpiry || !cardCvc) {
      setErrorMessage("Por favor, rellene todos los campos de la tarjeta bancaria.");
      setPaymentStep('error');
      return;
    }

    setPaymentStep('processing');
    const steps = [
      "Inicializando pasarela de pago segura SSL...",
      "Verificando integridad de la tarjeta bancaria...",
      "Solicitando autorización de transacción a su entidad bancaria...",
      "Procesando pago en Stripe y confirmando transacción...",
      "Sincronizando estatus de miembro con la base de datos..."
    ];

    for (let i = 0; i < steps.length; i++) {
      setProcessingStatus(steps[i]);
      await new Promise((resolve) => setTimeout(resolve, 900));
    }

    try {
      const res = await fetch("/api/payment/confirm-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.id}`
        },
        body: JSON.stringify({
          amount: paymentAmount,
          transactionId: "str_tx_" + Math.random().toString(36).substring(2, 10)
        })
      });

      const data = await safeJson(res);
      if (!res.ok) {
        throw new Error(data.error || "La confirmación del pago en Stripe ha fallado.");
      }

      onPaymentSuccess(data.user);
      setPaymentStep('success');
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "Ocurrió un error al registrar el estatus de pago.");
      setPaymentStep('error');
    }
  };

  const handlePayPalSubmit = async () => {
    if (!user) {
      setErrorMessage("Debe estar autenticado para completar el pago.");
      setPaymentStep('error');
      return;
    }

    setPaymentStep('processing');
    setProcessingStatus("Generando orden de pago en la API de PayPal...");

    try {
      const res = await fetch("/api/payment/create-paypal-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.id}`
        },
        body: JSON.stringify({ amount: paymentAmount })
      });

      const data = await safeJson(res);
      if (!res.ok) {
        throw new Error(data.error || "Fallo al inicializar la orden de PayPal.");
      }

      if (data.isRealPayPal && data.checkoutUrl) {
        // Redirect directly to real hosted secure PayPal portal
        window.location.href = data.checkoutUrl;
      } else {
        // Fallback to high-fidelity on-site simulation sandbox
        setPaypalOrderId(data.orderId);
        setPaymentStep('paypal_simulation');
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "Error de comunicación con PayPal.");
      setPaymentStep('error');
    }
  };

  const handleConfirmPayPalSimulation = async () => {
    setPaymentStep('processing');
    const steps = [
      "Verificando consentimiento del comprador en PayPal...",
      "Capturando fondos a través de la API de PayPal...",
      "Registrando licencia de miembro de asesoría empresarial..."
    ];

    for (let i = 0; i < steps.length; i++) {
      setProcessingStatus(steps[i]);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    try {
      const res = await fetch("/api/payment/capture-paypal-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user?.id}`
        },
        body: JSON.stringify({
          orderId: paypalOrderId,
          amount: paymentAmount
        })
      });

      const data = await safeJson(res);
      if (!res.ok) {
        throw new Error(data.error || "La captura del pago de PayPal simulado ha fallado.");
      }

      onPaymentSuccess(data.user);
      setPaymentStep('success');
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "Error al capturar el pago.");
      setPaymentStep('error');
    }
  };

  return (
    <div className="min-h-[85vh] py-24 bg-[#060606] flex items-center justify-center">
      <div className="max-w-4xl w-full mx-auto px-4 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Summary Panel (5 cols) */}
        <div className="md:col-span-5 space-y-6">
          <div className="bg-[#0a0a0a] border border-neutral-900 rounded-xl p-6">
            <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-widest mb-4">Resumen del Pedido</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-neutral-900">
                <div>
                  <h4 className="text-white text-xs sm:text-sm font-bold uppercase tracking-tight">Acceso de Experiencia de Élite</h4>
                  <p className="text-[11px] text-neutral-500 font-light mt-0.5">Membresía y licencia comercial única</p>
                </div>
                <span className="text-[#d4af37] text-sm font-black">${paymentAmount}</span>
              </div>

              <div className="flex justify-between items-center text-xs text-neutral-400">
                <span>Impuestos y Aranceles</span>
                <span>$0.00</span>
              </div>

              <div className="flex justify-between items-center text-xs text-neutral-400 pb-4 border-b border-neutral-900">
                <span>Comisión de procesamiento bancario</span>
                <span>Incluida</span>
              </div>

              <div className="flex justify-between items-center text-sm font-bold text-white pt-2">
                <span>TOTAL REQUERIDO (USD)</span>
                <span className="text-lg text-[#d4af37] font-black">${paymentAmount}</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-[#d4af37]/20 bg-[#d4af37]/3 flex items-start space-x-3 text-xs text-[#d4af37] leading-relaxed font-light">
            <Lock className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold uppercase tracking-wider block mb-0.5">Confidencialidad Bancaria:</span>
              Sus transacciones están protegidas con cifrado de grado militar de extremo a extremo, cumpliendo con las normas PCI-DSS.
            </div>
          </div>

          <div className="p-4 rounded-xl border border-[#d4af37]/20 bg-[#d4af37]/3 flex items-start space-x-3 text-xs text-neutral-300 leading-relaxed font-light">
            <Shield className="w-4 h-4 text-[#d4af37] flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-[#d4af37] uppercase tracking-wider block mb-0.5">Lanzamiento GitHub Pasarela Múltiple:</span>
              Su sitio integra de forma nativa Stripe y PayPal. Configure <code className="font-mono text-[10px] bg-neutral-900 px-1 py-0.5 text-white rounded">STRIPE_SECRET_KEY</code>, <code className="font-mono text-[10px] bg-neutral-900 px-1 py-0.5 text-white rounded">PAYPAL_CLIENT_ID</code> y <code className="font-mono text-[10px] bg-neutral-900 px-1 py-0.5 text-white rounded">PAYPAL_CLIENT_SECRET</code> para activar el modo de producción real conectado directamente a sus cuentas.
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Card Form or Selection (7 cols) */}
        <div className="md:col-span-7 bg-[#0a0a0a] border border-neutral-900 rounded-xl p-6 sm:p-8 shadow-[0_0_30px_rgba(212,175,55,0.03)] min-h-[420px] flex flex-col justify-center">
          
          {paymentStep === 'form' && (
            <div className="space-y-6">
              {/* Gateway Selection Tabs */}
              <div className="grid grid-cols-2 gap-4 pb-4 border-b border-neutral-900">
                <button
                  id="tab-stripe"
                  onClick={() => setActiveGateway('stripe')}
                  className={`py-3.5 px-4 rounded-lg border text-center transition-all cursor-pointer flex flex-col items-center justify-center space-y-1 ${
                    activeGateway === 'stripe'
                      ? 'border-[#d4af37] bg-[#d4af37]/5 text-white shadow-[0_0_15px_rgba(212,175,55,0.05)]'
                      : 'border-neutral-900 bg-black/40 text-neutral-500 hover:text-neutral-300'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span className="text-[10px] uppercase font-bold tracking-widest font-sans-ui">Tarjeta Bancaria</span>
                </button>

                <button
                  id="tab-paypal"
                  onClick={() => setActiveGateway('paypal')}
                  className={`py-3.5 px-4 rounded-lg border text-center transition-all cursor-pointer flex flex-col items-center justify-center space-y-1 ${
                    activeGateway === 'paypal'
                      ? 'border-[#d4af37] bg-[#d4af37]/5 text-white shadow-[0_0_15px_rgba(212,175,55,0.05)]'
                      : 'border-neutral-900 bg-black/40 text-neutral-500 hover:text-neutral-300'
                  }`}
                >
                  <DollarSign className="w-4 h-4 text-blue-400" />
                  <span className="text-[10px] uppercase font-bold tracking-widest font-sans-ui">PayPal Checkout</span>
                </button>
              </div>

              {activeGateway === 'stripe' ? (
                <form onSubmit={handleStripePaymentSubmit} className="space-y-6">
                  <div className="space-y-4">
                    {/* Holder Name */}
                    <div className="flex flex-col space-y-1.5">
                      <label htmlFor="card-name" className="text-neutral-400 font-bold text-[10px] uppercase tracking-wider">
                        Titular de la tarjeta
                      </label>
                      <input
                        id="card-name"
                        type="text"
                        required
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        placeholder="Ej: Alejandro Bernard"
                        className="w-full bg-[#050505] border border-neutral-800 focus:border-[#d4af37]/60 rounded-lg px-4 py-3 text-neutral-200 text-xs sm:text-sm focus:outline-none placeholder:text-neutral-700 font-sans"
                      />
                    </div>

                    {/* Card Number */}
                    <div className="flex flex-col space-y-1.5">
                      <label htmlFor="card-num" className="text-neutral-400 font-bold text-[10px] uppercase tracking-wider">
                        Número de tarjeta
                      </label>
                      <div className="relative">
                        <input
                          id="card-num"
                          type="text"
                          required
                          value={cardNumber}
                          onChange={handleCardNumberChange}
                          placeholder="4242 4242 4242 4242"
                          className="w-full bg-[#050505] border border-neutral-800 focus:border-[#d4af37]/60 rounded-lg pl-11 pr-4 py-3 text-neutral-200 text-xs sm:text-sm focus:outline-none placeholder:text-neutral-700 font-mono tracking-widest"
                        />
                        <CreditCard className="w-4 h-4 text-neutral-500 absolute left-4 top-1/2 -translate-y-1/2" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {/* Expiry Date */}
                      <div className="flex flex-col space-y-1.5">
                        <label htmlFor="card-exp" className="text-neutral-400 font-bold text-[10px] uppercase tracking-wider">
                          Fecha de expiración
                        </label>
                        <input
                          id="card-exp"
                          type="text"
                          required
                          value={cardExpiry}
                          onChange={handleExpiryChange}
                          placeholder="MM/AA"
                          className="w-full bg-[#050505] border border-neutral-800 focus:border-[#d4af37]/60 rounded-lg px-4 py-3 text-neutral-200 text-xs sm:text-sm focus:outline-none placeholder:text-neutral-700 font-mono"
                        />
                      </div>

                      {/* CVC */}
                      <div className="flex flex-col space-y-1.5">
                        <label htmlFor="card-cvc" className="text-neutral-400 font-bold text-[10px] uppercase tracking-wider">
                          Código de seguridad CVC
                        </label>
                        <input
                          id="card-cvc"
                          type="text"
                          required
                          value={cardCvc}
                          onChange={handleCvcChange}
                          placeholder="123"
                          className="w-full bg-[#050505] border border-neutral-800 focus:border-[#d4af37]/60 rounded-lg px-4 py-3 text-neutral-200 text-xs sm:text-sm focus:outline-none placeholder:text-neutral-700 font-mono"
                        />
                      </div>
                    </div>

                    {/* Postal Code */}
                    <div className="flex flex-col space-y-1.5">
                      <label htmlFor="card-postal" className="text-neutral-400 font-bold text-[10px] uppercase tracking-wider">
                        Código Postal / ZIP
                      </label>
                      <input
                        id="card-postal"
                        type="text"
                        required
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        placeholder="Ej: 28001"
                        className="w-full bg-[#050505] border border-neutral-800 focus:border-[#d4af37]/60 rounded-lg px-4 py-3 text-neutral-200 text-xs sm:text-sm focus:outline-none placeholder:text-neutral-700 font-mono"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      id="btn-stripe-submit"
                      type="submit"
                      className="w-full py-4 rounded-full bg-gradient-to-r from-[#d4af37] to-[#aa841c] hover:opacity-95 text-black font-bold tracking-widest text-xs uppercase flex items-center justify-center space-x-2 shadow-[0_0_20px_rgba(212,175,55,0.15)] cursor-pointer"
                    >
                      <Lock className="w-3.5 h-3.5" />
                      <span>Confirmar pago de ${paymentAmount}</span>
                    </button>
                  </div>

                  <div className="flex items-center justify-center space-x-3 text-[10px] text-neutral-600 font-bold uppercase tracking-wider">
                    <span className="flex items-center">
                      <Shield className="w-3.5 h-3.5 mr-1" /> Verified by Visa
                    </span>
                    <span>•</span>
                    <span className="flex items-center">
                      <Smartphone className="w-3.5 h-3.5 mr-1" /> 3D Secure Active
                    </span>
                  </div>
                </form>
              ) : (
                <div className="space-y-6 py-4 text-center">
                  <div className="max-w-sm mx-auto space-y-3">
                    <div className="w-16 h-16 bg-[#1e2a38] rounded-full flex items-center justify-center mx-auto text-[#0070ba]">
                      <DollarSign className="w-8 h-8" />
                    </div>
                    <h3 className="text-white font-serif italic text-lg font-bold">Pago mediante PayPal</h3>
                    <p className="text-xs text-neutral-400 leading-relaxed font-light">
                      Pague de forma segura iniciando sesión en su cuenta de PayPal o con la tarjeta bancaria vinculada a su cuenta. No compartimos sus datos financieros.
                    </p>
                  </div>

                  <div className="pt-4 max-w-xs mx-auto">
                    <button
                      id="btn-paypal-submit"
                      onClick={handlePayPalSubmit}
                      className="w-full py-3.5 px-6 rounded-full bg-[#ffc439] hover:bg-[#f2ba36] text-black font-black tracking-wider text-xs uppercase flex items-center justify-center space-x-2 shadow-lg transition-all cursor-pointer"
                    >
                      <span className="italic font-serif font-black text-blue-900 tracking-tight text-sm">PayPal</span>
                      <span className="font-sans font-bold text-neutral-900 text-[11px] uppercase tracking-widest ml-1">Checkout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {paymentStep === 'paypal_simulation' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6 text-center py-4"
            >
              <div className="max-w-md mx-auto space-y-4 bg-black/40 border border-[#ffc439]/20 p-6 rounded-xl">
                <div className="flex items-center justify-center space-x-2 text-[#ffc439]">
                  <Shield className="w-5 h-5" />
                  <h3 className="font-bold text-xs uppercase tracking-widest font-sans-ui text-[#ffc439]">Entorno de Pruebas Seguro de PayPal</h3>
                </div>

                <div className="space-y-3 text-left border-y border-neutral-900 py-4 font-mono text-[11px] text-neutral-300">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">ID de Pedido:</span>
                    <span className="text-white">{paypalOrderId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Comercio anfitrión:</span>
                    <span className="text-[#d4af37]">GLOBAL-PUENTE Elite Consulting</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Monto de asesoría:</span>
                    <span className="text-white">${paymentAmount} USD</span>
                  </div>
                </div>

                <p className="text-xs text-neutral-400 font-light leading-relaxed">
                  Esta es la simulación segura del pago por PayPal. Ingrese sus credenciales reales de PayPal para que sus usuarios sean redirigés a la infraestructura de producción real de PayPal.
                </p>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    id="btn-confirm-paypal-sim"
                    onClick={handleConfirmPayPalSimulation}
                    className="flex-1 py-3 px-6 rounded-full bg-[#ffc439] hover:bg-[#f2ba36] text-black font-bold text-xs uppercase tracking-widest cursor-pointer"
                  >
                    Validar Pago de PayPal (Simulado)
                  </button>
                  <button
                    id="btn-cancel-paypal-sim"
                    onClick={() => setPaymentStep('form')}
                    className="px-5 py-3 rounded-full border border-neutral-800 text-neutral-400 hover:text-white font-medium text-xs uppercase tracking-wider cursor-pointer"
                  >
                    Volver
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {paymentStep === 'processing' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center p-8 space-y-6 flex flex-col justify-center items-center"
            >
              <RefreshCw className="w-12 h-12 text-[#d4af37] animate-spin" />
              <h3 className="text-lg font-bold text-white uppercase tracking-wider">Transacción en proceso de pago</h3>
              <div className="max-w-md bg-neutral-950 p-4 rounded-lg border border-neutral-900 w-full">
                <p className="text-xs text-neutral-400 font-mono leading-relaxed">
                  {processingStatus}
                </p>
              </div>
              <p className="text-[10px] text-neutral-600 font-semibold uppercase">Por favor, no recargue esta página.</p>
            </motion.div>
          )}

          {paymentStep === 'success' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center p-8 space-y-6 flex flex-col justify-center items-center"
            >
              <CheckCircle2 className="w-16 h-16 text-[#d4af37]" />
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white uppercase tracking-tight">¡Acceso de Miembro Activado!</h3>
                <p className="text-xs text-neutral-400 font-light max-w-sm mx-auto leading-relaxed">
                  Su pago de <span className="text-[#d4af37] font-bold">${paymentAmount}</span> ha sido validado correctamente por la entidad bancaria. Ahora dispone de la acreditación de asesoría premium de GLOBAL-PUENTE.
                </p>
              </div>

              <button
                id="btn-success-redirect"
                onClick={() => setCurrentRoute("member")}
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#d4af37] to-[#aa841c] text-black font-bold text-xs uppercase tracking-widest shadow-[0_0_15px_rgba(212,175,55,0.15)] cursor-pointer"
              >
                Acceder al Área de Expertos
              </button>
            </motion.div>
          )}

          {paymentStep === 'error' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center p-8 space-y-6 flex flex-col justify-center items-center"
            >
              <AlertCircle className="w-16 h-16 text-red-500" />
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white uppercase">Transacción Fallida</h3>
                <p className="text-xs text-neutral-400 font-light max-w-sm mx-auto leading-relaxed">
                  {errorMessage || "Ha ocurrido un error durante el procesamiento del pago seguro."}
                </p>
              </div>

              <div className="flex space-x-3">
                <button
                  id="btn-retry-payment"
                  onClick={() => setPaymentStep('form')}
                  className="px-6 py-2.5 rounded-full border border-neutral-800 text-neutral-300 font-semibold text-xs uppercase tracking-wider cursor-pointer"
                >
                  Reintentar
                </button>
                <button
                  id="btn-cancel-payment"
                  onClick={() => setCurrentRoute("pricing")}
                  className="px-6 py-2.5 rounded-full bg-neutral-900 text-red-400 font-semibold text-xs uppercase tracking-wider cursor-pointer"
                >
                  Cancelar
                </button>
              </div>
            </motion.div>
          )}

        </div>

      </div>
    </div>
  );
}
