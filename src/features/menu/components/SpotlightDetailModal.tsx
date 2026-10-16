// src/features/menu/components/SpotlightDetailModal.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import { 
  X, Utensils, CheckCircle2, MessageCircle, Moon, 
  Sparkles, Coffee, Clock, MapPin, ChevronRight 
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
  if (!isOpen || !data) return null;

  // Enviar mensaje predeterminado a WhatsApp según la opción seleccionada
  const handleOrderWhatsApp = () => {
    let messageText = '';

    switch (data.type) {
      case 'menu':
        messageText = 
          `*🍽️ PEDIDO MENÚ DEL DÍA (${data.dailyData?.dayName.toUpperCase()})*\n` +
          `Me gustaría pedir el Menú Fijo de almuerzo (€${data.dailyData?.price.toFixed(2)}).\n` +
          `Incluye: ${data.dailyData?.incluye}.`;
        break;

      case 'promo':
        messageText = 
          `*🌙 PROMOCIÓN NOCTURNA - MANTAS MILANO*\n` +
          `Me gustaría aprovechar la promoción: *${data.title}*.\n` +
          `Detalle: ${data.promoData?.subtitle || ''}`;
        break;

      case 'chef':
        messageText = 
          `*✨ PEDIDO PLATO RECOMENDADO*\n` +
          `Me gustaría pedir su célebre *Ceviche Mixto Mantas* (€20.00).\n` +
          `Pesca del día con leche de tigre tradicional.`;
        break;

      case 'desayuno':
        messageText = 
          `*☕ PEDIDO DESAYUNO DOMINICAL*\n` +
          `Me gustaría pedir los Desayunos Criollos a domicilio:\n` +
          `• Pan con Chicharrón Tradicional\n` +
          `• Tamal Criollo con Salsa\n` +
          `• Jugo de fruta fresca`;
        break;
    }

    const encoded = encodeURIComponent(messageText);
    window.open(`https://wa.me/${RESTAURANT_PHONE}?text=${encoded}`, '_blank');
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/85 backdrop-blur-md animate-in fade-in duration-200 p-0 sm:p-4"
      onClick={onClose}
    >
      <div 
        className="w-full sm:max-w-md bg-[#0a0a0f] rounded-t-[2.2rem] sm:rounded-[2.2rem] border border-zinc-800/90 overflow-hidden shadow-2xl flex flex-col max-h-[90dvh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ribete Andino */}
        <div className="relative w-full h-3 shrink-0 overflow-hidden shadow-sm">
          <Image
            src={`${BUCKET_URL}/cintaexplorarcarta.png`}
            alt="Bordo Mantas"
            fill
            className="object-cover"
            unoptimized
          />
        </div>

        {/* Cabecera */}
        <div className="px-5 py-3.5 border-b border-zinc-900 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            {data.type === 'menu' && <Utensils size={18} className="text-amber-400" />}
            {data.type === 'promo' && <Moon size={18} className="text-fuchsia-400" />}
            {data.type === 'chef' && <Sparkles size={18} className="text-cyan-400" />}
            {data.type === 'desayuno' && <Coffee size={18} className="text-amber-400" />}
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-500 block">
                {data.badge}
              </span>
              <h2 className="text-sm font-black font-serif text-white tracking-wide truncate max-w-[220px]">
                {data.title}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white flex items-center justify-center active:scale-90"
          >
            <X size={16} />
          </button>
        </div>

        {/* Contenido con Scroll */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4">
          
          {/* Imagen destacada */}
          <div className="relative w-full h-40 rounded-2xl overflow-hidden border border-zinc-800">
            <Image
              src={data.image}
              alt={data.title}
              fill
              className="object-cover"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          </div>

          {/* ================= OPCIÓN 1: DETALLE MENÚ DEL DÍA ================= */}
          {data.type === 'menu' && data.dailyData && (
            <div className="space-y-3">
              <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-4 space-y-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 block">
                  1. Elige tu Primer Plato (Entrada)
                </span>
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
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 block">
                  2. Elige tu Segundo Plato
                </span>
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
                <p className="text-xs text-amber-300 font-bold">
                  ✦ {data.dailyData.incluye}
                </p>
              </div>
            </div>
          )}

          {/* ================= OPCIÓN 2: DETALLE PROMO DE NOCHE ================= */}
          {data.type === 'promo' && (
            <div className="space-y-3">
              <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-4 space-y-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-fuchsia-400 block">
                  Detalles de la Oferta
                </span>
                <p className="text-sm font-bold text-white">
                  {data.promoData?.title}
                </p>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  {data.promoData?.subtitle}
                </p>
              </div>

              <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-2xl p-3.5 space-y-1.5">
                <div className="flex items-center gap-2 text-xs text-zinc-300 font-semibold">
                  <Clock size={14} className="text-fuchsia-400" />
                  <span>Disponible de 15:30 a 22:00</span>
                </div>
                <p className="text-[11px] text-zinc-400 pl-5">
                  Válido para consumo en mesa o para llevar de Mantas Milano.
                </p>
              </div>
            </div>
          )}

          {/* ================= OPCIÓN 3: RECOMENDACIÓN DEL CHEF ================= */}
          {data.type === 'chef' && (
            <div className="space-y-3">
              <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400">
                    Plato Icónico Peruano
                  </span>
                  <span className="text-base font-black text-amber-400 font-mono">€20.00</span>
                </div>
                <p className="text-sm font-serif font-black text-white">
                  Ceviche Mixto Tradicional
                </p>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Pesca del día marinada con limón fresco recién exprimido, selecta variedad de mariscos, cebolla roja crujiente, choclo peruano y camote glaseado.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-center text-xs">
                <div className="p-2.5 rounded-xl bg-zinc-900/50 border border-zinc-800">
                  <span className="text-[10px] text-zinc-500 block uppercase">Origen</span>
                  <span className="font-bold text-zinc-200">Costa del Perú</span>
                </div>
                <div className="p-2.5 rounded-xl bg-zinc-900/50 border border-zinc-800">
                  <span className="text-[10px] text-zinc-500 block uppercase">Maridaje</span>
                  <span className="font-bold text-zinc-200">Inca Kola o Pisco Sour</span>
                </div>
              </div>
            </div>
          )}

          {/* ================= OPCIÓN 4: DESAYUNOS DOMINICALES & DELIVERY ================= */}
          {data.type === 'desayuno' && (
            <div className="space-y-3">
              <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-4 space-y-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 block">
                  El Verdadero Desayuno Dominical Peruano
                </span>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Cada domingo por la mañana preparamos el tradicional desayuno criollo para disfrutar en el local o cómodamente en casa:
                </p>
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center gap-2 text-xs text-zinc-200">
                    <CheckCircle2 size={13} className="text-amber-400 shrink-0" />
                    <span><strong>Pan con Chicharrón:</strong> Cerdo dorado, camote y salsa criolla</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-zinc-200">
                    <CheckCircle2 size={13} className="text-amber-400 shrink-0" />
                    <span><strong>Tamales Criollos:</strong> De maíz rellenos en hoja de plátano</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-zinc-200">
                    <CheckCircle2 size={13} className="text-amber-400 shrink-0" />
                    <span><strong>Jugos Naturales:</strong> Papaya, Surtido o Jugo Especial</span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-black text-amber-400 uppercase tracking-wider block">Horario de Desayuno</span>
                  <span className="text-xs font-bold text-white">Domingo de 08:00 a 13:00</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-black text-emerald-400 uppercase tracking-wider block">Entrega</span>
                  <span className="text-xs font-bold text-white">Delivery Activo</span>
                </div>
              </div>

              {onNavigateToCategory && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onNavigateToCategory('cat_desayunos');
                  }}
                  className="w-full py-2.5 px-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
                >
                  <span>Explorar todos los platos de desayuno</span>
                  <ChevronRight size={14} className="text-amber-400" />
                </button>
              )}
            </div>
          )}

        </div>

        {/* Footer con CTA WhatsApp Direct */}
        <div className="p-4 bg-zinc-950 border-t border-zinc-900 shrink-0">
          <button
            onClick={handleOrderWhatsApp}
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs py-3.5 px-4 rounded-full active:scale-95 transition-transform flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.35)]"
          >
            <MessageCircle size={17} strokeWidth={2.5} />
            <span className="tracking-wider uppercase">Pedir / Consultar por WhatsApp</span>
          </button>
        </div>

      </div>
    </div>
  );
}