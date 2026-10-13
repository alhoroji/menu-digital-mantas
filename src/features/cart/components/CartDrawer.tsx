// src/features/cart/components/CartDrawer.tsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, Plus, Minus, Trash2, MessageCircle, MapPin, User, Clock, Bell, FileText, ChevronRight } from 'lucide-react';
import { useCartStore } from '@/features/cart/store/useCartStore';

const BUCKET_URL = "https://jclzrvizljglhhndkmvo.supabase.co/storage/v1/object/public/platos";

// Número oficial de WhatsApp de Mantas Milano
const RESTAURANT_PHONE = "393513290178"; 

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

type ServiceMode = 'delivery' | 'llevar' | 'mesa';

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

    if (serviceType === 'mesa' && !tableNumber.trim()) {
      alert('Per favore indica il numero del tuo tavolo.');
      return;
    }

    if (serviceType === 'llevar' && !customerName.trim()) {
      alert('Per favore indica il nome per il ritiro.');
      return;
    }

    if (serviceType === 'delivery') {
      if (!customerName.trim()) {
        alert('Per favore inserisci il nome del destinatario.');
        return;
      }
      if (!address.trim() || !civicNumber.trim()) {
        alert('Per favore indica la via e il numero civico.');
        return;
      }
    }

    const lines: string[] = [
      `*🍽️ NUOVO ORDINE - MANTAS MILANO*`,
      `──────────────────────`
    ];

    if (serviceType === 'mesa') {
      lines.push(`📍 *Modalità:* Al Tavolo`);
      lines.push(`🪑 *Tavolo:* ${tableNumber}`);
      if (customerName) lines.push(`👤 *Cliente:* ${customerName}`);
    } else if (serviceType === 'llevar') {
      lines.push(`🥡 *Modalità:* Ritiro in Locale (Asporto)`);
      lines.push(`👤 *Cliente:* ${customerName}`);
      if (requestedTime) lines.push(`⏰ *Orario ritiro:* ${requestedTime}`);
      if (deliveryNotes) lines.push(`📝 *Note:* ${deliveryNotes}`);
    } else {
      lines.push(`🛵 *Modalità:* A Domicilio (Delivery)`);
      lines.push(`👤 *Cliente:* ${customerName}`);
      lines.push(`📍 *Indirizzo:* ${address}, N° ${civicNumber}`);
      if (intercom) lines.push(`🔔 *Citofono:* ${intercom}`);
      if (requestedTime) lines.push(`⏰ *Orario consegna:* ${requestedTime}`);
      if (deliveryNotes) lines.push(`📝 *Note consegna:* ${deliveryNotes}`);
    }

    lines.push(`──────────────────────`);
    lines.push(`*DETTAGLIO ORDINE:*`);

    items.forEach(item => {
      const price = item.dish.price.table || item.dish.price.standard;
      const subtotal = (price * item.quantity).toFixed(2);
      const noteText = item.notes ? ` _(${item.notes})_` : '';
      lines.push(`• *${item.quantity}x* ${item.dish.name}${noteText} — €${subtotal}`);
    });

    lines.push(`──────────────────────`);
    lines.push(`💰 *TOTALE: €${totalAmount.toFixed(2)}*`);
    lines.push(`──────────────────────`);
    lines.push(`_Inviato da Mantas Web App_`);

    const message = encodeURIComponent(lines.join('\n'));
    const url = `https://wa.me/${RESTAURANT_PHONE}?text=${message}`;

    window.open(url, '_blank');
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-md animate-in fade-in duration-200 overscroll-contain"
      onClick={onClose}
    >
      {/* Contenedor del Drawer - Limitado a 88dvh y 100% responsivo */}
      <div 
        className="w-full sm:max-w-md bg-[#0a0a0f] rounded-t-[2.2rem] sm:rounded-[2.2rem] border border-zinc-800/90 overflow-hidden shadow-2xl flex flex-col max-h-[88dvh] touch-pan-y"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* 1. Corona textil andina */}
        <div className="relative w-full h-3 shrink-0 overflow-hidden shadow-sm">
          <Image
            src={`${BUCKET_URL}/cintaexplorarcarta.png`}
            alt="Bordo Mantas"
            fill
            className="object-cover"
            unoptimized
          />
        </div>

        {/* 2. Cabecera */}
        <div className="px-5 py-3.5 border-b border-zinc-900 flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-base font-black font-serif text-white tracking-wide">
              Il Tuo Ordine
            </h2>
            <p className="text-[11px] text-zinc-400">
              {items.length} {items.length === 1 ? 'piatto selezionato' : 'piatti selezionati'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {items.length > 0 && (
              <button
                type="button"
                onClick={clearCart}
                className="text-xs text-zinc-400 hover:text-red-400 px-2 py-1 rounded-lg transition-colors"
              >
                Svuota
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

        {/* 3. Área de Scroll Interno */}
        <div className="p-4 sm:p-5 overflow-y-auto flex-1 space-y-4 overscroll-contain">
          
          {/* LISTA DE PLATOS */}
          {items.length === 0 ? (
            <div className="py-12 text-center text-zinc-500">
              <span className="text-4xl block mb-2">🛒</span>
              <p className="text-sm font-semibold">Il carrello è vuoto.</p>
              <p className="text-xs text-zinc-600 mt-1">Scegli i tuoi piatti dalla carta per continuare.</p>
            </div>
          ) : (
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block px-1">
                Riepilogo Piatti
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

                    {/* Controles de Cantidad */}
                    <div className="flex items-center gap-2 bg-zinc-950 border border-zinc-800 rounded-full px-2 py-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.dish.id, item.quantity - 1)}
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

          {/* FORMULARIO DE ENTREGA (OPTIMIZADO PARA MÓVILES - SIN ZOOM) */}
          {items.length > 0 && (
            <div className="pt-3 border-t border-zinc-900 space-y-3.5">
              
              {/* Selector de Modalidad */}
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block mb-1.5 px-1">
                  Modalità di Ricezione
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
                    Asporto
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
                    Al Tavolo
                  </button>
                </div>
              </div>

              {/* CAMPOS DELIVERY */}
              {serviceType === 'delivery' && (
                <div className="space-y-3 bg-zinc-950/60 p-3.5 rounded-2xl border border-zinc-900">
                  <div>
                    <label 
                      htmlFor="delivery-name" 
                      className="block text-xs font-bold text-zinc-300 mb-1 cursor-pointer flex items-center gap-1.5"
                    >
                      <User size={13} className="text-amber-400" />
                      Nome e Cognome *
                    </label>
                    <input
                      id="delivery-name"
                      type="text"
                      autoComplete="name"
                      placeholder="es. Mario Rossi"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-base sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-2">
                      <label 
                        htmlFor="delivery-address" 
                        className="block text-xs font-bold text-zinc-300 mb-1 cursor-pointer flex items-center gap-1.5"
                      >
                        <MapPin size={13} className="text-amber-400" />
                        Via / Indirizzo *
                      </label>
                      <input
                        id="delivery-address"
                        type="text"
                        autoComplete="street-address"
                        placeholder="es. Via Grassi"
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
                        N° Civico *
                      </label>
                      <input
                        id="delivery-civic"
                        type="text"
                        placeholder="es. 5"
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
                        className="block text-xs font-bold text-zinc-300 mb-1 cursor-pointer flex items-center gap-1.5"
                      >
                        <Bell size={13} className="text-zinc-400" />
                        Citofono
                      </label>
                      <input
                        id="delivery-intercom"
                        type="text"
                        placeholder="es. Rossi int. 4"
                        value={intercom}
                        onChange={(e) => setIntercom(e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-base sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-all"
                      />
                    </div>
                    <div>
                      <label 
                        htmlFor="delivery-time" 
                        className="block text-xs font-bold text-zinc-300 mb-1 cursor-pointer flex items-center gap-1.5"
                      >
                        <Clock size={13} className="text-zinc-400" />
                        Orario desiderato
                      </label>
                      <input
                        id="delivery-time"
                        type="text"
                        placeholder="es. 20:30"
                        value={requestedTime}
                        onChange={(e) => setRequestedTime(e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-base sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label 
                      htmlFor="delivery-notes" 
                      className="block text-xs font-bold text-zinc-300 mb-1 cursor-pointer flex items-center gap-1.5"
                    >
                      <FileText size={13} className="text-zinc-400" />
                      Note consegna (Scala, Piano...)
                    </label>
                    <input
                      id="delivery-notes"
                      type="text"
                      placeholder="es. Scala B, 2° piano..."
                      value={deliveryNotes}
                      onChange={(e) => setDeliveryNotes(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-base sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-all"
                    />
                  </div>
                </div>
              )}

              {/* CAMPOS ASPORTO */}
              {serviceType === 'llevar' && (
                <div className="space-y-3 bg-zinc-950/60 p-3.5 rounded-2xl border border-zinc-900">
                  <div>
                    <label 
                      htmlFor="asporto-name" 
                      className="block text-xs font-bold text-zinc-300 mb-1 cursor-pointer flex items-center gap-1.5"
                    >
                      <User size={13} className="text-amber-400" />
                      Nome per il ritiro *
                    </label>
                    <input
                      id="asporto-name"
                      type="text"
                      placeholder="es. Mario"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-base sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-all"
                    />
                  </div>
                  <div>
                    <label 
                      htmlFor="asporto-time" 
                      className="block text-xs font-bold text-zinc-300 mb-1 cursor-pointer flex items-center gap-1.5"
                    >
                      <Clock size={13} className="text-zinc-400" />
                      Orario di ritiro
                    </label>
                    <input
                      id="asporto-time"
                      type="text"
                      placeholder="es. tra 25 minuti / 19:45"
                      value={requestedTime}
                      onChange={(e) => setRequestedTime(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-base sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-all"
                    />
                  </div>
                </div>
              )}

              {/* CAMPOS AL TAVOLO */}
              {serviceType === 'mesa' && (
                <div className="space-y-3 bg-zinc-950/60 p-3.5 rounded-2xl border border-zinc-900">
                  <div>
                    <label 
                      htmlFor="tavolo-num" 
                      className="block text-xs font-bold text-zinc-300 mb-1 cursor-pointer"
                    >
                      Numero di Tavolo *
                    </label>
                    <input
                      id="tavolo-num"
                      type="text"
                      placeholder="es. Tavolo 5"
                      value={tableNumber}
                      onChange={(e) => setTableNumber(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-base sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-all"
                    />
                  </div>
                </div>
              )}

            </div>
          )}

        </div>

        {/* 4. Footer Fijo con Total y CTA de WhatsApp */}
        {items.length > 0 && (
          <div className="p-4 bg-zinc-950 border-t border-zinc-900 flex flex-col gap-3 shrink-0">
            <div className="flex justify-between items-center px-1">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Totale Ordine</span>
              <span className="text-xl font-black text-amber-400 font-mono">
                €{totalAmount.toFixed(2)}
              </span>
            </div>

            <button
              type="button"
              onClick={handleCheckoutWhatsApp}
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs py-3.5 px-4 rounded-full active:scale-95 transition-transform flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.35)]"
            >
              <MessageCircle size={17} strokeWidth={2.5} />
              <span className="tracking-wider uppercase">Invia Ordine su WhatsApp</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
}