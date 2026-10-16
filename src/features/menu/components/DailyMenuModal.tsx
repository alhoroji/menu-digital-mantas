// src/features/menu/components/DailyMenuModal.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import { X, Utensils, CheckCircle2, MessageCircle } from 'lucide-react';
import { DailyMenuItem } from '../config/spotlight.config';

const BUCKET_URL = "https://jclzrvizljglhhndkmvo.supabase.co/storage/v1/object/public/platos";
const RESTAURANT_PHONE = "393513290178";

interface DailyMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  data?: DailyMenuItem;
}

export function DailyMenuModal({ isOpen, onClose, data }: DailyMenuModalProps) {
  if (!isOpen || !data) return null;

  const handleOrderWhatsApp = () => {
    const text = encodeURIComponent(
      `*🍽️ PEDIDO MENÚ DEL DÍA (${data.dayName.toUpperCase()})*\n` +
      `Me gustaría pedir el Menú Fijo de almuerzo (€${data.price.toFixed(2)}).\n` +
      `Incluye: ${data.incluye}.`
    );
    window.open(`https://wa.me/${RESTAURANT_PHONE}?text=${text}`, '_blank');
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/85 backdrop-blur-md animate-in fade-in duration-200 p-0 sm:p-4"
      onClick={onClose}
    >
      <div 
        className="w-full sm:max-w-md bg-[#0a0a0f] rounded-t-[2.2rem] sm:rounded-[2.2rem] border border-amber-500/30 overflow-hidden shadow-2xl flex flex-col max-h-[90dvh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ribete Andino */}
        <div className="relative w-full h-3 shrink-0 overflow-hidden shadow-sm">
          <Image
            src={`${BUCKET_URL}/cintaexplorarcarta.png`}
            alt="Borde Mantas"
            fill
            className="object-cover"
            unoptimized
          />
        </div>

        {/* Cabecera */}
        <div className="px-5 py-4 border-b border-zinc-900 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Utensils size={18} className="text-amber-400" />
            <div>
              <h2 className="text-base font-black font-serif text-white tracking-wide">
                Menú del Día • {data.dayName}
              </h2>
              <span className="text-xs text-amber-400 font-mono font-bold">
                Fórmula Completa €{data.price.toFixed(2)}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white flex items-center justify-center active:scale-90"
          >
            <X size={16} />
          </button>
        </div>

        {/* Contenido del Menú */}
        <div className="p-5 overflow-y-auto space-y-4">
          
          {/* Entradas */}
          <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-4 space-y-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 block">
              1. Elige tu Primer Plato (Entrada)
            </span>
            <div className="space-y-1.5">
              {data.entradas.map((entrada, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-zinc-200">
                  <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                  <span>{entrada}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Segundos */}
          <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-4 space-y-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 block">
              2. Elige tu Segundo Plato
            </span>
            <div className="space-y-1.5">
              {data.segundos.map((segundo, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-zinc-200 font-medium">
                  <CheckCircle2 size={13} className="text-amber-400 shrink-0" />
                  <span>{segundo}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Incluye */}
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-center">
            <p className="text-xs text-amber-300 font-bold">
              ✦ {data.incluye}
            </p>
          </div>

        </div>

        {/* Botón WhatsApp */}
        <div className="p-4 bg-zinc-950 border-t border-zinc-900">
          <button
            onClick={handleOrderWhatsApp}
            className="w-full bg-gradient-to-r from-amber-500 to-amber-400 text-black font-black text-xs py-3.5 px-4 rounded-full active:scale-95 transition-transform flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(245,158,11,0.35)]"
          >
            <MessageCircle size={17} strokeWidth={2.5} />
            <span className="tracking-wider uppercase">Pedir Menú de Almuerzo por WhatsApp</span>
          </button>
        </div>

      </div>
    </div>
  );
}