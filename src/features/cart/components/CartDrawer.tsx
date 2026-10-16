// src/features/cart/components/CartDrawer.tsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  X, Plus, Minus, Trash2, MessageCircle, MapPin, 
  User, Clock, Bell, FileText, ArrowLeft, ArrowRight, 
  Banknote, CreditCard, Bike, AlertTriangle
} from 'lucide-react';
import { useCartStore } from '@/features/cart/store/useCartStore';

const BUCKET_URL = "https://jclzrvizljglhhndkmvo.supabase.co/storage/v1/object/public/platos";
const RESTAURANT_PHONE = "393513290178"; 

// Costo fijo de envío delivery
const DELIVERY_FEE = 5.00;

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

type ServiceMode = 'delivery' | 'llevar' | 'mesa';
type PaymentMethod = 'contanti' | 'carta';
type DrawerStep = 'cart' | 'checkout';

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, updateQuantity, clearCart, getTotalAmount } = useCartStore();

  const [currentStep, setCurrentStep] = useState<DrawerStep>('cart');
  const [serviceType, setServiceType] = useState<ServiceMode>('delivery');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('contanti');

  // Estados de restricción / confirmación de borrado
  const [itemToDelete, setItemToDelete] = useState<{ id: string; name: string } | null>(null);
  const [isClearingCart, setIsClearingCart] = useState(false);

  // Campos de formulario
  const [customerName, setCustomerName] = useState('');
  const [tableNumber, setTableNumber] = useState('');
  const [address, setAddress] = useState('');
  const [civicNumber, setCivicNumber] = useState('');
  const [intercom, setIntercom] = useState('');
  const [requestedTime, setRequestedTime] = useState('');
  const [deliveryNotes, setDeliveryNotes] = useState('');

  if (!isOpen) return null;

  // Cálculos de importes
  const dishesTotal = getTotalAmount();
  const deliveryFee = serviceType === 'delivery' ? DELIVERY_FEE : 0;
  const finalTotal = dishesTotal + deliveryFee;

  const handleProceedToCheckout = () => {
    if (items.length === 0) return;
    setCurrentStep('checkout');
  };

  const handleBackToCart = () => {
    setCurrentStep('cart');
  };

  // Confirmar eliminación del plato
  const handleConfirmDeleteItem = () => {
    if (!itemToDelete) return;
    updateQuantity(itemToDelete.id, 0);
    if (items.length <= 1) {
      setCurrentStep('cart');
    }
    setItemToDelete(null);
  };

  // Confirmar vaciado total del carrito
  const handleConfirmClearCart = () => {
    clearCart();
    setCurrentStep('cart');
    setIsClearingCart(false);
  };

  const handleCheckoutWhatsApp = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (items.length === 0) return;

    if (serviceType === 'mesa' && !tableNumber.trim()) {
      alert('Por favor indica el número de tu mesa.');
      return;
    }

    if (serviceType === 'llevar' && !customerName.trim()) {
      alert('Por favor indica el nombre para el retiro.');
      return;
    }

    if (serviceType === 'delivery') {
      if (!customerName.trim()) {
        alert('Por favor ingresa el nombre del destinatario.');
        return;
      }
      if (!address.trim() || !civicNumber.trim()) {
        alert('Por favor indica la calle y el número cívico.');
        return;
      }
    }

    const lines: string[] = [
      `*🍽️ NUEVO PEDIDO - MANTAS MILANO*`,
      `──────────────────────`
    ];

    if (serviceType === 'mesa') {
      lines.push(`📍 *Modalidad:* En Mesa`);
      lines.push(`🪑 *Mesa:* ${tableNumber}`);
      if (customerName) lines.push(`👤 *Cliente:* ${customerName}`);
      lines.push(`💳 *Pago:* ${paymentMethod === 'contanti' ? 'Efectivo' : 'Tarjeta / POS'}`);
    } else if (serviceType === 'llevar') {
      lines.push(`🥡 *Modalidad:* Retiro en Local (Para Llevar)`);
      lines.push(`👤 *Cliente:* ${customerName}`);
      if (requestedTime) lines.push(`⏰ *Hora de retiro:* ${requestedTime}`);
      lines.push(`💳 *Pago:* ${paymentMethod === 'contanti' ? 'Efectivo en caja' : 'Tarjeta en caja'}`);
      if (deliveryNotes) lines.push(`📝 *Notas:* ${deliveryNotes}`);
    } else {
      lines.push(`🛵 *Modalidad:* A Domicilio (Delivery)`);
      lines.push(`👤 *Cliente:* ${customerName}`);
      lines.push(`📍 *Dirección:* ${address}, N° ${civicNumber}`);
      if (intercom) lines.push(`🔔 *Timbre / Intercomunicador:* ${intercom}`);
      if (requestedTime) lines.push(`⏰ *Hora de entrega:* ${requestedTime}`);
      lines.push(`💳 *Pago:* ${paymentMethod === 'contanti' ? '💵 Efectivo al entregar' : '💳 Tarjeta (Llevar POS a domicilio)'}`);
      if (deliveryNotes) lines.push(`📝 *Notas de entrega:* ${deliveryNotes}`);
    }

    lines.push(`──────────────────────`);
    lines.push(`*DETALLE DEL PEDIDO:*`);

    items.forEach(item => {
      const price = item.dish.price.table || item.dish.price.standard;
      const subtotal = (price * item.quantity).toFixed(2);
      const noteText = item.notes ? ` _(${item.notes})_` : '';
      lines.push(`• *${item.quantity}x* ${item.dish.name}${noteText} — €${subtotal}`);
    });

    lines.push(`──────────────────────`);
    lines.push(`Subtotal platos: €${dishesTotal.toFixed(2)}`);
    if (serviceType === 'delivery') {
      lines.push(`Envío a domicilio: €${DELIVERY_FEE.toFixed(2)}`);
    }
    lines.push(`💰 *TOTAL FINAL: €${finalTotal.toFixed(2)}*`);
    lines.push(`──────────────────────`);
    lines.push(`_Enviado desde Mantas Web App_`);

    const message = encodeURIComponent(lines.join('\n'));
    const url = `https://wa.me/${RESTAURANT_PHONE}?text=${message}`;

    window.open(url, '_blank');
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="w-full sm:max-w-md bg-[#0a0a0f] rounded-t-[2.2rem] sm:rounded-[2.2rem] border border-zinc-800/90 overflow-hidden shadow-2xl flex flex-col h-[90dvh] max-h-[90dvh] touch-pan-y relative"
        onClick={(e) => e.stopPropagation()}
      >
         
        {/* ============================================================== */}
        {/* MODAL 1: CONFIRMAR ELIMINACIÓN DE PLATO INDIVIDUAL              */}
        {/* ============================================================== */}
        {itemToDelete && (
          <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-5 animate-in fade-in duration-150">
            <div className="w-full max-w-xs bg-zinc-950 border border-zinc-800 rounded-3xl p-5 shadow-2xl flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 mb-3 shadow-[0_0_12px_rgba(239,68,68,0.2)]">
                <Trash2 size={22} />
              </div>
              <h3 className="text-sm font-black font-serif text-white">
                ¿Eliminar plato?
              </h3>
              <p className="text-xs text-zinc-400 mt-1 mb-5 font-medium leading-relaxed">
                ¿Estás seguro de que deseas eliminar <strong className="text-zinc-100">"{itemToDelete.name}"</strong> del pedido?
              </p>
              <div className="grid grid-cols-2 gap-2.5 w-full">
                <button
                  type="button"
                  onClick={() => setItemToDelete(null)}
                  className="py-2.5 px-3 rounded-xl text-xs font-bold bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white active:scale-95 transition-all"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleConfirmDeleteItem}
                  className="py-2.5 px-3 rounded-xl text-xs font-black bg-red-500 hover:bg-red-600 text-white shadow-[0_0_12px_rgba(239,68,68,0.4)] active:scale-95 transition-all"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* MODAL 2: CONFIRMAR VACIADO COMPLETO DEL CARRITO                */}
        {/* ============================================================== */}
        {isClearingCart && (
          <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-5 animate-in fade-in duration-150">
            <div className="w-full max-w-xs bg-zinc-950 border border-zinc-800 rounded-3xl p-5 shadow-2xl flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-3 shadow-[0_0_12px_rgba(245,158,11,0.2)]">
                <AlertTriangle size={22} />
              </div>
              <h3 className="text-sm font-black font-serif text-white">
                ¿Vaciar todo el carrito?
              </h3>
              <p className="text-xs text-zinc-400 mt-1 mb-5 font-medium leading-relaxed">
                Todos los platos seleccionados serán eliminados de tu pedido.
              </p>
              <div className="grid grid-cols-2 gap-2.5 w-full">
                <button
                  type="button"
                  onClick={() => setIsClearingCart(false)}
                  className="py-2.5 px-3 rounded-xl text-xs font-bold bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white active:scale-95 transition-all"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleConfirmClearCart}
                  className="py-2.5 px-3 rounded-xl text-xs font-black bg-red-500 hover:bg-red-600 text-white shadow-[0_0_12px_rgba(239,68,68,0.4)] active:scale-95 transition-all"
                >
                  Vaciar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Cinta textil andina */}
        <div className="relative w-full h-3 shrink-0 overflow-hidden shadow-sm">
          <Image
            src={`${BUCKET_URL}/cintaexplorarcarta.png`}
            alt="Borde Mantas"
            fill
            className="object-cover"
            unoptimized
          />
        </div>

        {/* Cabecera Inteligente */}
        <div className="px-5 py-3 border-b border-zinc-900 flex items-center justify-between shrink-0 bg-[#0a0a0f]">
          {currentStep === 'cart' ? (
            <div>
              <h2 className="text-base font-black font-serif text-white tracking-wide">
                Tu Pedido
              </h2>
              <p className="text-[11px] text-zinc-400">
                {items.length} {items.length === 1 ? 'plato seleccionado' : 'platos seleccionados'}
              </p>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleBackToCart}
              className="flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 active:scale-95 transition-all"
            >
              <ArrowLeft size={16} />
              <span>Volver al Carrito</span>
            </button>
          )}

          <div className="flex items-center gap-2">
            {currentStep === 'checkout' && items.length > 0 && (
              <button
                type="button"
                onClick={() => handleCheckoutWhatsApp()}
                className="bg-emerald-500 hover:bg-emerald-400 text-black font-black text-[11px] px-3 py-1.5 rounded-full flex items-center gap-1 active:scale-95 transition-transform shadow-[0_0_10px_rgba(16,185,129,0.35)]"
              >
                <MessageCircle size={13} strokeWidth={2.5} />
                <span>Enviar (€{finalTotal.toFixed(2)})</span>
              </button>
            )}

            {currentStep === 'cart' && items.length > 0 && (
              <button
                type="button"
                onClick={() => setIsClearingCart(true)}
                className="text-xs text-zinc-400 hover:text-red-400 px-2 py-1 rounded-lg transition-colors"
              >
                Vaciar
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white flex items-center justify-center active:scale-90 transition-transform"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* ============================================================== */}
        {/* PASO 1: REVISIÓN DE PLATOS                                     */}
        {/* ============================================================== */}
        {currentStep === 'cart' && (
          <>
            <div className="p-4 sm:p-5 overflow-y-auto flex-1 space-y-3">
              {items.length === 0 ? (
                <div className="py-16 text-center text-zinc-500">
                  <span className="text-4xl block mb-2">🛒</span>
                  <p className="text-sm font-semibold text-zinc-300">El carrito está vacío.</p>
                  <p className="text-xs text-zinc-600 mt-1">Elige tus platos de la carta para continuar.</p>
                </div>
              ) : (
                <div className="space-y-2.5">
                  <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block px-1">
                    Platos Agregados
                  </span>
                  {items.map((item) => {
                    const price = item.dish.price.table || item.dish.price.standard;
                    return (
                      <div
                        key={item.dish.id}
                        className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-3 flex items-center justify-between gap-3"
                      >
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-bold text-white truncate font-serif">
                            {item.dish.name}
                          </h3>
                          <span className="text-xs font-mono font-semibold text-amber-400">
                            €{(price * item.quantity).toFixed(2)}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 bg-zinc-950 border border-zinc-800 rounded-full px-2 py-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => {
                              if (item.quantity === 1) {
                                setItemToDelete({ id: item.dish.id, name: item.dish.name });
                              } else {
                                updateQuantity(item.dish.id, item.quantity - 1);
                              }
                            }}
                            className="w-6 h-6 rounded-full flex items-center justify-center text-zinc-400 hover:text-white active:scale-90"
                          >
                            {item.quantity === 1 ? <Trash2 size={12} className="text-red-400" /> : <Minus size={12} />}
                          </button>
                          <span className="text-xs font-black text-white font-mono w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.dish.id, item.quantity + 1)}
                            className="w-6 h-6 rounded-full flex items-center justify-center text-zinc-400 hover:text-white active:scale-90"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-4 bg-zinc-950 border-t border-zinc-900 flex flex-col gap-3 shrink-0">
                <div className="flex justify-between items-center px-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Subtotal Platos</span>
                  <span className="text-xl font-black text-amber-400 font-mono">
                    €{dishesTotal.toFixed(2)}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleProceedToCheckout}
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-black font-black text-xs py-3.5 px-4 rounded-full active:scale-95 transition-transform flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(245,158,11,0.3)]"
                >
                  <span className="tracking-wider uppercase">Continuar con los Datos de Entrega</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            )}
          </>
        )}

        {/* ============================================================== */}
        {/* PASO 2: DATOS DE ENVÍO + DESGLOSE CON SCROLL Y CONFIRMACIÓN     */}
        {/* ============================================================== */}
        {currentStep === 'checkout' && (
          <form 
            onSubmit={handleCheckoutWhatsApp} 
            className="p-4 overflow-y-auto flex-1 space-y-3.5 overscroll-contain"
          >
            {/* 1. Selector de Modalidad */}
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block mb-1.5 px-1">
                Modalidad de Recepción
              </span>
              <div className="grid grid-cols-3 gap-1.5 p-1 bg-zinc-950 rounded-2xl border border-zinc-900">
                <button
                  type="button"
                  onClick={() => setServiceType('delivery')}
                  className={`py-2 rounded-xl text-xs font-black transition-all ${
                    serviceType === 'delivery'
                      ? 'bg-amber-400 text-black shadow-md'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  Delivery
                </button>
                <button
                  type="button"
                  onClick={() => setServiceType('llevar')}
                  className={`py-2 rounded-xl text-xs font-black transition-all ${
                    serviceType === 'llevar'
                      ? 'bg-amber-400 text-black shadow-md'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  Para Llevar
                </button>
                <button
                  type="button"
                  onClick={() => setServiceType('mesa')}
                  className={`py-2 rounded-xl text-xs font-black transition-all ${
                    serviceType === 'mesa'
                      ? 'bg-amber-400 text-black shadow-md'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  En Mesa
                </button>
              </div>
            </div>

            {/* 2. Selector de Método de Pago */}
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block mb-1.5 px-1">
                Método de Pago
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('contanti')}
                  className={`p-3 rounded-2xl border flex items-center gap-2.5 transition-all text-left ${
                    paymentMethod === 'contanti'
                      ? 'bg-zinc-900 border-amber-400 text-white shadow-sm'
                      : 'bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                    paymentMethod === 'contanti' ? 'bg-amber-400 text-black' : 'bg-zinc-900 text-zinc-400'
                  }`}>
                    <Banknote size={18} />
                  </div>
                  <div>
                    <span className="text-xs font-black block leading-tight">Efectivo</span>
                    <span className="text-[9px] text-zinc-500">Al entregar</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('carta')}
                  className={`p-3 rounded-2xl border flex items-center gap-2.5 transition-all text-left ${
                    paymentMethod === 'carta'
                      ? 'bg-zinc-900 border-amber-400 text-white shadow-sm'
                      : 'bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                    paymentMethod === 'carta' ? 'bg-amber-400 text-black' : 'bg-zinc-900 text-zinc-400'
                  }`}>
                    <CreditCard size={18} />
                  </div>
                  <div>
                    <span className="text-xs font-black block leading-tight">Tarjeta / POS</span>
                    <span className="text-[9px] text-zinc-500">Portátil a domicilio</span>
                  </div>
                </button>
              </div>
            </div>

            {/* 3. TARJETA DE RESUMEN CON SCROLL Y RESTRICCIÓN DE BORRADO */}
            <div className="bg-zinc-950/90 border border-zinc-900 rounded-2xl p-3.5 space-y-2.5 shadow-md">
              <div className="flex justify-between items-center border-b border-zinc-900 pb-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-400">
                  Detalle de Platos ({items.length})
                </span>
                <span className="text-[9px] text-zinc-500 font-medium">
                  Desliza para ver todos
                </span>
              </div>

              {/* LISTA DE PLATOS CON SCROLL INDEPENDIENTE */}
              <div className="max-h-28 overflow-y-auto space-y-1.5 pr-1 divide-y divide-zinc-900/60 overscroll-contain">
                {items.map((item) => {
                  const price = item.dish.price.table || item.dish.price.standard;
                  return (
                    <div 
                      key={item.dish.id} 
                      className="pt-1.5 first:pt-0 flex items-center justify-between gap-2 text-xs group"
                    >
                      <div className="flex items-center gap-1.5 min-w-0 flex-1">
                        <span className="text-amber-400 font-mono font-bold shrink-0 text-[11px]">
                          {item.quantity}x
                        </span>
                        <span className="text-zinc-200 font-serif font-medium truncate text-xs">
                          {item.dish.name}
                        </span>
                      </div>
                       
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="font-mono text-zinc-300 text-xs font-semibold">
                          €{(price * item.quantity).toFixed(2)}
                        </span>
                        <button
                          type="button"
                          onClick={() => setItemToDelete({ id: item.dish.id, name: item.dish.name })}
                          title="Eliminar plato"
                          className="w-6 h-6 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 active:bg-red-500/20 flex items-center justify-center transition-colors active:scale-90"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* DESGLOSE FINANCIERO */}
              <div className="pt-2 border-t border-zinc-900 space-y-1.5">
                <div className="flex justify-between items-center text-xs text-zinc-400">
                  <span>Subtotal Platos</span>
                  <span className="font-mono font-semibold text-zinc-200">€{dishesTotal.toFixed(2)}</span>
                </div>

                {serviceType === 'delivery' && (
                  <div className="flex justify-between items-center text-xs text-amber-400/90 font-medium pt-1 border-t border-zinc-900/80">
                    <span className="flex items-center gap-1.5">
                      <Bike size={13} className="text-amber-400" />
                      Costo de Envío Delivery
                    </span>
                    <span className="font-mono font-bold">+ €{DELIVERY_FEE.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between items-center text-sm font-black text-white pt-1.5 border-t border-zinc-800">
                  <span>Total a Pagar</span>
                  <span className="text-base text-amber-400 font-mono">€{finalTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* 4. Formulario de Datos Delivery */}
            {serviceType === 'delivery' && (
              <div className="space-y-3 bg-zinc-950/80 p-3.5 rounded-2xl border border-zinc-900">
                <div>
                  <label 
                    htmlFor="delivery-name" 
                    className="text-xs font-bold text-zinc-300 mb-1 cursor-pointer flex items-center gap-1.5"
                  >
                    <User size={13} className="text-amber-400" />
                    Nombre y Apellido *
                  </label>
                  <input
                    id="delivery-name"
                    type="text"
                    autoComplete="name"
                    enterKeyHint="next"
                    placeholder="ej. Mario Rossi"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-base sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 transition-all"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-2">
                    <label 
                      htmlFor="delivery-address" 
                      className="text-xs font-bold text-zinc-300 mb-1 cursor-pointer flex items-center gap-1.5"
                    >
                      <MapPin size={13} className="text-amber-400" />
                      Calle / Dirección *
                    </label>
                    <input
                      id="delivery-address"
                      type="text"
                      autoComplete="street-address"
                      enterKeyHint="next"
                      placeholder="ej. Via Grassi"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-base sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 transition-all"
                    />
                  </div>
                  <div>
                    <label 
                      htmlFor="delivery-civic" 
                      className="block text-xs font-bold text-zinc-300 mb-1 cursor-pointer"
                    >
                      N° Cívico *
                    </label>
                    <input
                      id="delivery-civic"
                      type="text"
                      enterKeyHint="next"
                      placeholder="ej. 5"
                      value={civicNumber}
                      onChange={(e) => setCivicNumber(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-base sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label 
                      htmlFor="delivery-intercom" 
                      className="text-xs font-bold text-zinc-300 mb-1 cursor-pointer flex items-center gap-1.5"
                    >
                      <Bell size={13} className="text-zinc-400" />
                      Timbre / Intercomunicador
                    </label>
                    <input
                      id="delivery-intercom"
                      type="text"
                      enterKeyHint="next"
                      placeholder="ej. Rossi int. 4"
                      value={intercom}
                      onChange={(e) => setIntercom(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-base sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-all"
                    />
                  </div>
                  <div>
                    <label 
                      htmlFor="delivery-time" 
                      className="text-xs font-bold text-zinc-300 mb-1 cursor-pointer flex items-center gap-1.5"
                    >
                      <Clock size={13} className="text-zinc-400" />
                      Hora deseada
                    </label>
                    <input
                      id="delivery-time"
                      type="text"
                      enterKeyHint="next"
                      placeholder="ej. 20:30"
                      value={requestedTime}
                      onChange={(e) => setRequestedTime(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-base sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label 
                    htmlFor="delivery-notes" 
                    className="text-xs font-bold text-zinc-300 mb-1 cursor-pointer flex items-center gap-1.5"
                  >
                    <FileText size={13} className="text-zinc-400" />
                    Notas de entrega (Escalera, Piso...)
                  </label>
                  <input
                    id="delivery-notes"
                    type="text"
                    enterKeyHint="send"
                    placeholder="ej. Escalera B, 2° piso..."
                    value={deliveryNotes}
                    onChange={(e) => setDeliveryNotes(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-base sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-all"
                  />
                </div>
              </div>
            )}

            {/* Formulario Para Llevar (Asporto) */}
            {serviceType === 'llevar' && (
              <div className="space-y-3 bg-zinc-950/80 p-3.5 rounded-2xl border border-zinc-900">
                <div>
                  <label 
                    htmlFor="asporto-name" 
                    className="text-xs font-bold text-zinc-300 mb-1 cursor-pointer flex items-center gap-1.5"
                  >
                    <User size={13} className="text-amber-400" />
                    Nombre para el retiro *
                  </label>
                  <input
                    id="asporto-name"
                    type="text"
                    enterKeyHint="next"
                    placeholder="ej. Mario"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-base sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-all"
                  />
                </div>
                <div>
                  <label 
                    htmlFor="asporto-time" 
                    className="text-xs font-bold text-zinc-300 mb-1 cursor-pointer flex items-center gap-1.5"
                  >
                    <Clock size={13} className="text-zinc-400" />
                    Hora de retiro
                  </label>
                  <input
                    id="asporto-time"
                    type="text"
                    enterKeyHint="send"
                    placeholder="ej. en 25 minutos / 19:45"
                    value={requestedTime}
                    onChange={(e) => setRequestedTime(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-base sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-all"
                  />
                </div>
              </div>
            )}

            {/* Formulario En Mesa */}
            {serviceType === 'mesa' && (
              <div className="space-y-3 bg-zinc-950/80 p-3.5 rounded-2xl border border-zinc-900">
                <div>
                  <label 
                    htmlFor="tavolo-num" 
                    className="block text-xs font-bold text-zinc-300 mb-1 cursor-pointer"
                  >
                    Número de Mesa *
                  </label>
                  <input
                    id="tavolo-num"
                    type="text"
                    enterKeyHint="send"
                    placeholder="ej. Mesa 5"
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-base sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-all"
                  />
                </div>
              </div>
            )}

            {/* BOTÓN PRINCIPAL INTEGRADO AL FINAL DEL FORMULARIO */}
            <div className="pt-2 pb-8">
              <button
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs py-3.5 px-4 rounded-2xl active:scale-95 transition-transform flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.45)]"
              >
                <MessageCircle size={18} strokeWidth={2.5} />
                <span className="tracking-wider uppercase">Enviar Pedido por WhatsApp (€{finalTotal.toFixed(2)})</span>
              </button>
              <p className="text-[10px] text-zinc-500 text-center mt-2">
                Confirmación vía WhatsApp • Pago: {paymentMethod === 'contanti' ? 'Efectivo al entregar' : 'Tarjeta con POS a domicilio'}
              </p>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}