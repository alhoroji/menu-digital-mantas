// src/features/cart/components/CartDrawer.tsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, Plus, Minus, Trash2, MessageCircle, MapPin, User, Clock, Bell, FileText } from 'lucide-react';
import { useCartStore } from '@/features/cart/store/useCartStore';

const BUCKET_URL = "https://jclzrvizljglhhndkmvo.supabase.co/storage/v1/object/public/platos";

// Número de WhatsApp oficial de Mantas Milano
const RESTAURANT_PHONE = "393513290178";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

type ServiceMode = 'mesa' | 'llevar' | 'delivery';

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, updateQuantity, clearCart, getTotalAmount } = useCartStore();

  const [serviceType, setServiceType] = useState<ServiceMode>('delivery');

  // Campos de formulario
  const [customerName, setCustomerName] = useState('');
  const [tableNumber, setTableNumber] = useState('');
  const [address, setAddress] = useState('');
  const [civicNumber, setCivicNumber] = useState('');
  const [intercom, setIntercom] = useState('');
  const [requestedTime, setRequestedTime] = useState('');
  const [deliveryNotes, setDeliveryNotes] = useState('');

  if (!isOpen) return null;

  const totalAmount = getTotalAmount();

  const handleCheckoutWhatsApp = () => {
    if (items.length === 0) return;

    // Validaciones según el tipo de servicio
    if (serviceType === 'mesa' && !tableNumber.trim()) {
      alert('Por favor indica tu número de mesa.');
      return;
    }

    if (serviceType === 'llevar' && !customerName.trim()) {
      alert('Por favor indica el nombre de quien retira el pedido.');
      return;
    }

    if (serviceType === 'delivery') {
      if (!customerName.trim()) {
        alert('Por favor indica el nombre de quien recibe el delivery.');
        return;
      }
      if (!address.trim() || !civicNumber.trim()) {
        alert('Por favor indica la dirección y el número cívico para la entrega.');
        return;
      }
    }

    // Construcción del mensaje para WhatsApp
    const lines: string[] = [
      `*🍽️ NUEVO PEDIDO - MANTAS RESTAURANTE*`,
      `──────────────────────`
    ];

    if (serviceType === 'mesa') {
      lines.push(`📍 *Modalidad:* Consumo en Mesa`);
      lines.push(`🪑 *Mesa:* ${tableNumber}`);
      if (customerName) lines.push(`👤 *Cliente:* ${customerName}`);
    } else if (serviceType === 'llevar') {
      lines.push(`🥡 *Modalidad:* Para Llevar (Asporto)`);
      lines.push(`👤 *Cliente:* ${customerName}`);
      if (requestedTime) lines.push(`⏰ *Hora de retiro:* ${requestedTime}`);
      if (deliveryNotes) lines.push(`📝 *Nota:* ${deliveryNotes}`);
    } else {
      lines.push(`🛵 *Modalidad:* A Domicilio (Delivery)`);
      lines.push(`👤 *Cliente:* ${customerName}`);
      lines.push(`📍 *Dirección:* ${address}, N° ${civicNumber}`);
      if (intercom) lines.push(`🔔 *Citófono:* ${intercom}`);
      if (requestedTime) lines.push(`⏰ *Hora de entrega:* ${requestedTime}`);
      if (deliveryNotes) lines.push(`📝 *Nota entrega:* ${deliveryNotes}`);
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
    lines.push(`💰 *TOTAL A PAGAR: €${totalAmount.toFixed(2)}*`);
    lines.push(`──────────────────────`);
    lines.push(`_Enviado desde el Menú Digital Mantas_`);

    const message = encodeURIComponent(lines.join('\n'));
    const url = `https://wa.me/${RESTAURANT_PHONE}?text=${message}`;

    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Contenedor del Drawer */}
      <div className="w-full sm:max-w-md bg-[#0a0a0f] rounded-t-[2.2rem] sm:rounded-[2.2rem] border border-zinc-800/80 overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        
        {/* 1. Corona textil andina */}
        <div className="relative w-full h-3 shrink-0 overflow-hidden shadow-sm">
          <Image
            src={`${BUCKET_URL}/cintaexplorarcarta.png`}
            alt="Borde Mantas"
            fill
            className="object-cover"
            unoptimized
          />
        </div>

        {/* 2. Cabecera */}
        <div className="px-5 py-3.5 border-b border-zinc-900 flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-base font-black font-serif text-white tracking-wide">
              Tu Pedido
            </h2>
            <p className="text-[11px] text-zinc-400">
              {items.length} {items.length === 1 ? 'producto seleccionado' : 'productos seleccionados'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {items.length > 0 && (
              <button
                onClick={clearCart}
                className="text-[11px] text-zinc-400 hover:text-red-400 px-2 py-1 rounded-lg transition-colors"
              >
                Vaciar
              </button>
            )}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white flex items-center justify-center active:scale-90 transition-transform"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* 3. Contenido Scrollable */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4">
          
          {/* Lista de Platos */}
          {items.length === 0 ? (
            <div className="py-14 text-center text-zinc-500">
              <span className="text-4xl block mb-2">🛒</span>
              <p className="text-xs font-semibold">Tu carrito está vacío.</p>
              <p className="text-[11px] text-zinc-600 mt-1">Explora la carta y agrega tus platos favoritos.</p>
            </div>
          ) : (
            <div className="space-y-2.5">
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
                      {item.notes && (
                        <p className="text-[10px] text-zinc-400 italic truncate">
                          Nota: {item.notes}
                        </p>
                      )}
                      <span className="text-xs font-mono font-semibold text-amber-400">
                        €{(price * item.quantity).toFixed(2)}
                      </span>
                    </div>

                    {/* Controles de Cantidad */}
                    <div className="flex items-center gap-2 bg-zinc-950 border border-zinc-800 rounded-full px-2 py-1 shrink-0">
                      <button
                        onClick={() => updateQuantity(item.dish.id, item.quantity - 1)}
                        className="w-6 h-6 rounded-full flex items-center justify-center text-zinc-400 hover:text-white active:scale-90"
                      >
                        {item.quantity === 1 ? <Trash2 size={12} className="text-red-400" /> : <Minus size={12} />}
                      </button>
                      <span className="text-xs font-black text-white font-mono w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
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

          {/* Formulario de Entrega / Despacho */}
          {items.length > 0 && (
            <div className="pt-3 border-t border-zinc-900 space-y-3">
              
              {/* Selector de Modalidad (3 Botones) */}
              <div className="grid grid-cols-3 gap-1.5 p-1 bg-zinc-950 rounded-2xl border border-zinc-900">
                <button
                  type="button"
                  onClick={() => setServiceType('mesa')}
                  className={`py-2 rounded-xl text-xs font-black transition-all ${
                    serviceType === 'mesa'
                      ? 'bg-white text-black shadow-md'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  En Mesa
                </button>
                <button
                  type="button"
                  onClick={() => setServiceType('llevar')}
                  className={`py-2 rounded-xl text-xs font-black transition-all ${
                    serviceType === 'llevar'
                      ? 'bg-white text-black shadow-md'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  Para Llevar
                </button>
                <button
                  type="button"
                  onClick={() => setServiceType('delivery')}
                  className={`py-2 rounded-xl text-xs font-black transition-all ${
                    serviceType === 'delivery'
                      ? 'bg-white text-black shadow-md'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  Delivery
                </button>
              </div>

              {/* CAMPOS: EN MESA */}
              {serviceType === 'mesa' && (
                <div className="space-y-2">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-wider text-zinc-400 mb-1">
                      Número de Mesa *
                    </label>
                    <input
                      type="text"
                      placeholder="Ej: Mesa 4"
                      value={tableNumber}
                      onChange={(e) => setTableNumber(e.target.value)}
                      className="w-full bg-zinc-900/90 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500/50"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-wider text-zinc-400 mb-1">
                      Nombre (Opcional)
                    </label>
                    <input
                      type="text"
                      placeholder="Tu nombre"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-zinc-900/90 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500/50"
                    />
                  </div>
                </div>
              )}

              {/* CAMPOS: PARA LLEVAR (ASPORTO) */}
              {serviceType === 'llevar' && (
                <div className="space-y-2">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-wider text-zinc-400 mb-1">
                      Nombre de quien retira *
                    </label>
                    <input
                      type="text"
                      placeholder="Ej: Alex"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-zinc-900/90 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500/50"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-wider text-zinc-400 mb-1">
                      Hora estimada de retiro
                    </label>
                    <input
                      type="text"
                      placeholder="Ej: 19:30 o en 20 minutos"
                      value={requestedTime}
                      onChange={(e) => setRequestedTime(e.target.value)}
                      className="w-full bg-zinc-900/90 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500/50"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-wider text-zinc-400 mb-1">
                      Notas adicionales
                    </label>
                    <input
                      type="text"
                      placeholder="Ej: Cubiertos descartables por favor..."
                      value={deliveryNotes}
                      onChange={(e) => setDeliveryNotes(e.target.value)}
                      className="w-full bg-zinc-900/90 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500/50"
                    />
                  </div>
                </div>
              )}

              {/* CAMPOS: DELIVERY (A DOMICILIO) */}
              {serviceType === 'delivery' && (
                <div className="space-y-2.5">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-wider text-zinc-400 mb-1">
                      Nombre de quien pide *
                    </label>
                    <input
                      type="text"
                      placeholder="Ej: Marco Rossi"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-zinc-900/90 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500/50"
                    />
                  </div>

                  {/* Fila: Dirección y N° Cívico */}
                  <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-2">
                      <label className="block text-[10px] font-black uppercase tracking-wider text-zinc-400 mb-1">
                        Indirizzo (Calle / Via) *
                      </label>
                      <input
                        type="text"
                        placeholder="Ej: Via Roma"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full bg-zinc-900/90 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500/50"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-wider text-zinc-400 mb-1">
                        N° Civico *
                      </label>
                      <input
                        type="text"
                        placeholder="Ej: 14/B"
                        value={civicNumber}
                        onChange={(e) => setCivicNumber(e.target.value)}
                        className="w-full bg-zinc-900/90 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500/50"
                      />
                    </div>
                  </div>

                  {/* Fila: Citófono y Hora deseada */}
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-wider text-zinc-400 mb-1">
                        Citofono / Campanello
                      </label>
                      <input
                        type="text"
                        placeholder="Ej: Rossi - Int. 3"
                        value={intercom}
                        onChange={(e) => setIntercom(e.target.value)}
                        className="w-full bg-zinc-900/90 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500/50"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-wider text-zinc-400 mb-1">
                        Hora entrega deseada
                      </label>
                      <input
                        type="text"
                        placeholder="Ej: 20:30 o antes"
                        value={requestedTime}
                        onChange={(e) => setRequestedTime(e.target.value)}
                        className="w-full bg-zinc-900/90 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500/50"
                      />
                    </div>
                  </div>

                  {/* Nota adicional */}
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-wider text-zinc-400 mb-1">
                      Nota para entrega (Scala, Piano, etc.)
                    </label>
                    <input
                      type="text"
                      placeholder="Ej: Scala B, 2° piano, portone rosso..."
                      value={deliveryNotes}
                      onChange={(e) => setDeliveryNotes(e.target.value)}
                      className="w-full bg-zinc-900/90 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500/50"
                    />
                  </div>

                </div>
              )}

            </div>
          )}

        </div>

        {/* 4. Footer con Total y Botón de WhatsApp */}
        {items.length > 0 && (
          <div className="p-4 bg-zinc-950 border-t border-zinc-900 flex flex-col gap-3 shrink-0">
            <div className="flex justify-between items-center px-1">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Total</span>
              <span className="text-xl font-black text-amber-400 font-mono">
                €{totalAmount.toFixed(2)}
              </span>
            </div>

            <button
              onClick={handleCheckoutWhatsApp}
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs py-3.5 px-4 rounded-full active:scale-95 transition-transform flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.35)]"
            >
              <MessageCircle size={17} strokeWidth={2.5} />
              <span className="tracking-wider uppercase">Confirmar por WhatsApp</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
}