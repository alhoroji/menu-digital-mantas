// src/features/restaurant/components/LocationModal.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import { X, MapPin, Navigation, Phone, Clock, ExternalLink } from 'lucide-react';
import { RESTAURANT_CONFIG } from '@/core/config/restaurant.config';

const BUCKET_URL = "https://jclzrvizljglhhndkmvo.supabase.co/storage/v1/object/public/platos";

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LocationModal({ isOpen, onClose }: LocationModalProps) {
  if (!isOpen) return null;

  return (
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
            <span className="text-amber-500 text-xs">❖</span>
            <h2 className="text-base font-black font-serif text-white tracking-wide">
              Mantas • Milano
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white flex items-center justify-center active:scale-90 transition-transform"
          >
            <X size={16} />
          </button>
        </div>

        <div className="p-5 overflow-y-auto space-y-4">
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
                  {RESTAURANT_CONFIG.address}
                </p>
              </div>
            </div>

            <a
              href={RESTAURANT_CONFIG.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-gradient-to-r from-amber-500 to-amber-400 text-black font-black text-xs py-3 px-4 rounded-xl active:scale-[0.98] transition-transform flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(245,158,11,0.3)]"
            >
              <Navigation size={15} />
              <span className="uppercase tracking-wider">Apri in Google Maps</span>
              <ExternalLink size={13} className="opacity-70" />
            </a>
          </div>

          <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2 text-zinc-300">
              <Clock size={16} className="text-amber-400" />
              <span className="text-xs font-bold uppercase tracking-wider">
                Orari di Apertura
              </span>
            </div>
            <div className="text-xs text-zinc-400 space-y-1 pl-6">
              <p className="text-zinc-200 font-semibold">{RESTAURANT_CONFIG.hours.days}</p>
              <p>Pranzo: <span className="text-zinc-200">{RESTAURANT_CONFIG.hours.pranzo}</span></p>
              <p>Cena: <span className="text-zinc-200">{RESTAURANT_CONFIG.hours.cena}</span></p>
            </div>
          </div>

          <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Phone size={16} className="text-emerald-400" />
              <div>
                <span className="text-[10px] uppercase text-zinc-500 font-bold block">Contatti</span>
                <span className="text-xs font-bold text-white">{RESTAURANT_CONFIG.phone}</span>
              </div>
            </div>
            <a
              href={`tel:${RESTAURANT_CONFIG.phone}`}
              className="text-xs font-bold text-amber-400 hover:underline"
            >
              Chiama ora
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}