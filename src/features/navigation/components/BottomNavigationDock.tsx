// src/features/navigation/components/BottomNavigationDock.tsx
'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Utensils, ShoppingBag, MapPin, User, X, Navigation, Phone, Clock, ExternalLink } from 'lucide-react';
import { useCartStore } from '@/features/cart/store/useCartStore';
import { CartDrawer } from '@/features/cart/components/CartDrawer';

const BUCKET_URL = "https://jclzrvizljglhhndkmvo.supabase.co/storage/v1/object/public/platos";

const RESTAURANT_INFO = {
  name: "MANTAS Restaurante",
  address: "Via Giovanni Battista Grassi, 5, 20157 Milano MI",
  googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Via+Giovanni+Battista+Grassi%2C+5%2C+20157+Milano+MI",
  phone: "+39 351 329 0178",
  phoneRaw: "+393513290178",
  hours: {
    weekdays: "Lun – Ven: 11:00 – 23:00",
    weekends: "Sab – Dom: 08:00 – 23:00",
    note: "Aperto tutti i giorni",
  }
};

// 1. COMPONENTE INTERNO QUE CONSUME usePathname()
function BottomNavigationDockContent() {
  const pathname = usePathname();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);

  const getTotalItems = useCartStore((state) => state.getTotalItems);
  const cartCount = getTotalItems ? getTotalItems() : 0;

  const isMenuTab = pathname?.includes('/mantas');

  return (
    <>
      {/* Dock Flotante Fijo */}
      <nav 
        aria-label="Navegación principal"
        className="fixed bottom-4 left-0 right-0 z-40 px-4 pointer-events-none"
      >
        <div className="max-w-md mx-auto pointer-events-auto">
          <div className="bg-[#09090d]/95 backdrop-blur-xl border border-zinc-800/90 rounded-full px-3 py-2 flex items-center justify-around shadow-[0_8px_32px_rgba(0,0,0,0.85)]">
            
            {/* Pestaña 1: Menù */}
            <Link
              href="/mantas"
              className={`flex flex-col items-center justify-center gap-1 py-1 px-3 rounded-full transition-all active:scale-95 ${
                isMenuTab ? 'text-amber-400 font-black' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Utensils size={18} strokeWidth={isMenuTab ? 2.5 : 2} />
              <span className="text-[10px] uppercase tracking-wider font-bold">
                Menù
              </span>
            </Link>

            {/* Pestaña 2: Carrello */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex flex-col items-center justify-center gap-1 py-1 px-3 rounded-full text-zinc-400 hover:text-zinc-200 transition-all relative active:scale-95"
            >
              <div className="relative">
                <ShoppingBag size={18} strokeWidth={2} />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-black flex items-center justify-center animate-pulse shadow-sm">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="text-[10px] uppercase tracking-wider font-bold">
                Carrello
              </span>
            </button>

            {/* Pestaña 3: Locale (Datos reales de Milán) */}
            <button
              onClick={() => setIsLocationOpen(true)}
              className="flex flex-col items-center justify-center gap-1 py-1 px-3 rounded-full text-zinc-400 hover:text-zinc-200 transition-all active:scale-95"
            >
              <MapPin size={18} strokeWidth={2} />
              <span className="text-[10px] uppercase tracking-wider font-bold">
                Locale
              </span>
            </button>

            {/* Pestaña 4: Profilo */}
            <button
              onClick={() => alert('I tuoi dati di consegna verranno salvati automaticamente al primo ordine.')}
              className="flex flex-col items-center justify-center gap-1 py-1 px-3 rounded-full text-zinc-400 hover:text-zinc-200 transition-all active:scale-95"
            >
              <User size={18} strokeWidth={2} />
              <span className="text-[10px] uppercase tracking-wider font-bold">
                Profilo
              </span>
            </button>

          </div>
        </div>
      </nav>

      {/* Modal de Carrito */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Modal de Ubicación y Horarios de Mantas */}
      {isLocationOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full sm:max-w-md bg-[#0a0a0f] rounded-t-[2.2rem] sm:rounded-[2.2rem] border border-zinc-800/80 overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            
            <div className="relative w-full h-3 shrink-0 overflow-hidden shadow-sm">
              <Image
                src={`${BUCKET_URL}/cintaexplorarcarta.png`}
                alt="Borde Mantas"
                fill
                className="object-cover"
                unoptimized
              />
            </div>

            <div className="px-5 py-4 border-b border-zinc-900 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-amber-500 text-xs font-black">❖</span>
                <h2 className="text-base font-black font-serif text-white tracking-wide">
                  {RESTAURANT_INFO.name}
                </h2>
              </div>
              <button
                onClick={() => setIsLocationOpen(false)}
                className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white flex items-center justify-center active:scale-90 transition-transform"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-4">
              {/* Tarjeta Dirección */}
              <div className="bg-zinc-900/70 border border-zinc-800/80 rounded-2xl p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                      Dove siamo
                    </span>
                    <p className="text-sm font-bold text-white leading-snug mt-0.5">
                      {RESTAURANT_INFO.address}
                    </p>
                  </div>
                </div>

                <a
                  href={RESTAURANT_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-400 text-black font-black text-xs py-3 px-4 rounded-xl active:scale-[0.98] transition-transform flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(245,158,11,0.3)]"
                >
                  <Navigation size={15} />
                  <span className="uppercase tracking-wider">Apri in Google Maps</span>
                  <ExternalLink size={13} className="opacity-70" />
                </a>
              </div>

              {/* Horarios Reales */}
              <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-2 text-zinc-300">
                  <Clock size={16} className="text-amber-400" />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Orari di Apertura
                  </span>
                </div>
                <div className="text-xs text-zinc-400 space-y-1.5 pl-6">
                  <p className="text-emerald-400 font-semibold">{RESTAURANT_INFO.hours.note}</p>
                  <p>{RESTAURANT_INFO.hours.weekdays}</p>
                  <p>{RESTAURANT_INFO.hours.weekends}</p>
                </div>
              </div>

              {/* Teléfono Real */}
              <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-2xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Phone size={16} className="text-emerald-400" />
                  <div>
                    <span className="text-[10px] uppercase text-zinc-500 font-bold block">Telefono</span>
                    <span className="text-xs font-bold text-white">{RESTAURANT_INFO.phone}</span>
                  </div>
                </div>
                <a
                  href={`tel:${RESTAURANT_INFO.phoneRaw}`}
                  className="text-xs font-bold text-amber-400 hover:underline"
                >
                  Chiama ora
                </a>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}

// 2. EXPORTACIÓN ENVUELTA EN SUSPENSE (RESUELVE EL ERROR DE NEXT.JS 16)
export function BottomNavigationDock() {
  return (
    <Suspense fallback={null}>
      <BottomNavigationDockContent />
    </Suspense>
  );
}