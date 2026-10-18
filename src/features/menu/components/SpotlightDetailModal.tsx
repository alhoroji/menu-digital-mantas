// src/features/menu/components/SpotlightDetailModal.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  X, Utensils, CheckCircle2, MessageCircle, Moon, 
  Sparkles, Coffee, Clock, ChevronRight, Timer 
} from 'lucide-react';
import { DailyMenuItem, PromoNightItem } from '../config/spotlight.config';

const BUCKET_URL = "https://jclzrvizljglhhndkmvo.supabase.co/storage/v1/object/public/platos";
const RESTAURANT_PHONE = "393513290178";

export interface SpotlightModalData {
  type: 'menu' | 'promo' | 'chef' | 'desayuno';
  title: string;
  badge: string;
  image: string;
  dailyData?: DailyMenuItem;
  promoData?: PromoNightItem;
  endTime?: Date;
}

interface SpotlightDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: SpotlightModalData | null;
  onNavigateToCategory?: (categorySlug: string) => void;
}

export function SpotlightDetailModal({ 
  isOpen, 
  onClose, 
  data, 
  onNavigateToCategory 
}: SpotlightDetailModalProps) {
  const [timeLeft, setTimeLeft] = useState<string>('');

  useEffect(() => {
    if (!data?.endTime) return;
    
    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = data.endTime!.getTime() - now;

      if (distance <= 0) {
        setTimeLeft('¡TIEMPO TERMINADO!');
        return;
      }

      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      const mStr = minutes.toString().padStart(2, '0');
      const sStr = seconds.toString().padStart(2, '0');

      if (hours > 0) {
        setTimeLeft(`${hours}h ${mStr}m ${sStr}s`);
      } else {
        setTimeLeft(`${mStr}m ${sStr}s`);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [data?.endTime]);

  if (!isOpen || !data) return null;

  const handleOrderWhatsApp = () => {
    let messageText = '';
    switch (data.type) {
      case 'menu':
        messageText = `*🍽️ PEDIDO MENÚ DEL DÍA (${data.dailyData?.dayName.toUpperCase()})*\nMe gustaría pedir el Menú Fijo de almuerzo (€${data.dailyData?.price.toFixed(2)}).\nIncluye: ${data.dailyData?.incluye}.`;
        break;
      case 'promo':
        messageText = `*🌙 PROMOCIÓN NOCTURNA - MANTAS MILANO*\nMe gustaría aprovechar la promoción: *${data.title}*.\nDetalle: ${data.promoData?.subtitle || ''}`;
        break;
      case 'chef':
        messageText = `*✨ PEDIDO PLATO RECOMENDADO*\nMe gustaría pedir su célebre *Ceviche Mixto Mantas* (€20.00).`;
        break;
      case 'desayuno':
        messageText = `*☕ PEDIDO DESAYUNO DOMINICAL*\nMe gustaría pedir los Desayunos Criollos a domicilio.`;
        break;
    }
    window.open(`https://wa.me/${RESTAURANT_PHONE}?text=${encodeURIComponent(messageText)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/85 backdrop-blur-md animate-in fade-in duration-200 p-0 sm:p-4" onClick={onClose}>
      <div className="w-full sm:max-w-md bg-[#0a0a0f] rounded-t-[2.2rem] sm:rounded-[2.2rem] border border-zinc-800/90 overflow-hidden shadow-2xl flex flex-col max-h-[90dvh]" onClick={(e) => e.stopPropagation()}>
        
        <div className="relative w-full h-3 shrink-0 overflow-hidden shadow-sm">
          <Image src={`${BUCKET_URL}/cintaexplorarcarta.png`} alt="Bordo" fill className="object-cover" unoptimized />
        </div>

        {/* --- CRONÓMETRO GIGANTE Y VIVO --- */}
        {data.endTime && timeLeft && (
          <div className="bg-gradient-to-r from-red-950 via-red-900 to-red-950 border-b-2 border-red-500/80 px-4 py-3.5 flex items-center justify-center gap-3 relative overflow-hidden shadow-[0_4px_15px_rgba(220,38,38,0.3)]">
            <div className="absolute inset-0 bg-red-500/20 animate-pulse pointer-events-none" />
            
            <Timer size={28} className="text-amber-400 relative z-10 animate-bounce drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
            
            <div className="flex items-baseline gap-2 relative z-10">
              <span className="text-red-100 text-[11px] sm:text-xs font-black tracking-widest uppercase drop-shadow-md">
                Termina en:
              </span>
              <span className="text-amber-400 text-xl sm:text-2xl font-black font-mono tracking-widest drop-shadow-[0_0_12px_rgba(251,191,36,0.9)]">
                {timeLeft}
              </span>
            </div>
          </div>
        )}

        <div className="px-5 py-3.5 border-b border-zinc-900 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            {data.type === 'menu' && <Utensils size={18} className="text-amber-400" />}
            {data.type === 'promo' && <Moon size={18} className="text-fuchsia-400" />}
            {data.type === 'chef' && <Sparkles size={18} className="text-cyan-400" />}
            {data.type === 'desayuno' && <Coffee size={18} className="text-amber-400" />}
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-500 block">{data.badge}</span>
              <h2 className="text-sm font-black font-serif text-white tracking-wide truncate max-w-[220px]">{data.title}</h2>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white flex items-center justify-center active:scale-90">
            <X size={16} />
          </button>
        </div>

        <div className="p-4 sm:p-5 overflow-y-auto space-y-4">
          <div className="relative w-full h-40 rounded-2xl overflow-hidden border border-zinc-800">
            <Image src={data.image} alt={data.title} fill className="object-cover" unoptimized />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          </div>

          {data.type === 'menu' && data.dailyData && (
            <div className="space-y-3">
              <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-4 space-y-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 block">1. Elige tu Primer Plato</span>
                <div className="space-y-1.5">
                  {data.dailyData.entradas.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-zinc-200">
                      <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-4 space-y-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 block">2. Elige tu Segundo Plato</span>
                <div className="space-y-1.5">
                  {data.dailyData.segundos.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-zinc-200 font-medium">
                      <CheckCircle2 size={13} className="text-amber-400 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-center">
                <p className="text-xs text-amber-300 font-bold">✦ {data.dailyData.incluye}</p>
              </div>
            </div>
          )}

          {data.type === 'promo' && (
            <div className="space-y-3">
              <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-4 space-y-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-fuchsia-400 block">Detalles de la Oferta</span>
                <p className="text-sm font-bold text-white">{data.promoData?.title}</p>
                <p className="text-xs text-zinc-300 leading-relaxed">{data.promoData?.subtitle}</p>
              </div>
            </div>
          )}

          {data.type === 'chef' && (
             <div className="space-y-3">
             <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-4 space-y-2">
               <div className="flex justify-between items-center">
                 <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400">Plato Icónico Peruano</span>
                 <span className="text-base font-black text-amber-400 font-mono">€20.00</span>
               </div>
               <p className="text-sm font-serif font-black text-white">Ceviche Mixto Tradicional</p>
               <p className="text-xs text-zinc-300 leading-relaxed">Pesca del día marinada con limón fresco recién exprimido, selecta variedad de mariscos, cebolla roja crujiente y choclo.</p>
             </div>
           </div>
          )}

          {data.type === 'desayuno' && (
             <div className="space-y-3">
             <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-4 space-y-2">
               <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 block">El Verdadero Desayuno Peruano</span>
               <p className="text-xs text-zinc-300 leading-relaxed">Cada domingo por la mañana preparamos el tradicional desayuno criollo:</p>
               <div className="space-y-1.5 pt-1">
                 <div className="flex items-center gap-2 text-xs text-zinc-200"><CheckCircle2 size={13} className="text-amber-400 shrink-0" /><span><strong>Pan con Chicharrón:</strong> Cerdo, camote y salsa</span></div>
                 <div className="flex items-center gap-2 text-xs text-zinc-200"><CheckCircle2 size={13} className="text-amber-400 shrink-0" /><span><strong>Tamales:</strong> De maíz en hoja de plátano</span></div>
                 <div className="flex items-center gap-2 text-xs text-zinc-200"><CheckCircle2 size={13} className="text-amber-400 shrink-0" /><span><strong>Jugos:</strong> Surtido o Jugo Especial</span></div>
               </div>
             </div>
             {onNavigateToCategory && (
               <button type="button" onClick={() => { onClose(); onNavigateToCategory('cat_desayunos'); }} className="w-full py-2.5 px-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all">
                 <span>Ver todos los platos de desayuno</span><ChevronRight size={14} className="text-amber-400" />
               </button>
             )}
           </div>
          )}
        </div>

        <div className="p-4 bg-zinc-950 border-t border-zinc-900 shrink-0">
          <button onClick={handleOrderWhatsApp} className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs py-3.5 px-4 rounded-full active:scale-95 transition-transform flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.35)]">
            <MessageCircle size={17} strokeWidth={2.5} />
            <span className="tracking-wider uppercase">Pedir / Consultar por WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
}