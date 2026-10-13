// src/features/menu/components/SpotlightBanner.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import { Sparkles } from 'lucide-react';

const BUCKET_URL = "https://jclzrvizljglhhndkmvo.supabase.co/storage/v1/object/public/platos";

interface SpotlightBannerProps {
  status?: any;
  primaryColor?: string;
}

export function SpotlightBanner({ status, primaryColor }: SpotlightBannerProps) {
  return (
    <article 
      className="relative p-[1.5px] rounded-[1.8rem] overflow-hidden group shadow-lg"
      style={{ boxShadow: '0 0 12px rgba(239, 68, 68, 0.45)' }}
    >
      {/* 1. Cornice tessile andina */}
      <div className="absolute inset-0 pointer-events-none rounded-[1.8rem] overflow-hidden">
        <Image
          src={`${BUCKET_URL}/tiramaestra.png`}
          alt="Cornice Tessile"
          fill
          className="object-cover"
          unoptimized
        />
      </div>

      {/* 2. Contenitore Immagine (Luce naturale chiara e senza ombre pesanti) */}
      <div className="relative bg-[#0d0d12] rounded-[1.7rem] overflow-hidden h-[15rem] flex flex-col justify-end p-5">
        <Image
          src={`${BUCKET_URL}/cevichemixto.jpg?v=2`}
          alt="Ceviche Misto Mantas"
          fill
          className="object-cover pointer-events-none group-hover:scale-105 transition-transform duration-700"
          unoptimized
          priority
        />

        {/* 3. Testi con ombreggiatura individuale */}
        <div className="relative z-10 flex flex-col items-start select-none">
          <div className="flex items-center gap-1 bg-[#0a0a0f]/90 border border-amber-500/30 backdrop-blur-md rounded-full px-2.5 py-1 mb-2">
            <Sparkles size={11} className="text-amber-500 fill-amber-500" />
            <span className="text-[9px] font-black uppercase tracking-wider text-amber-500">
              RECOMENDACIÓN DEL CHEF
            </span>
          </div>

          <h3 className="text-2xl font-black text-white font-serif tracking-tight drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
            Ceviche Misto
          </h3>

          <p className="text-xs text-zinc-100 mt-1 font-medium leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
            Pesca del día con leche de tigre.
          </p>
        </div>
      </div>
    </article>
  );
}