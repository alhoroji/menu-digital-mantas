// src/features/menu/components/SpotlightBanner.tsx
'use client';

import Image from 'next/image';
import { Sparkles } from 'lucide-react';

const BUCKET_URL = "https://jclzrvizljglhhndkmvo.supabase.co/storage/v1/object/public/platos";

interface SpotlightBannerProps {
  status?: any; 
  primaryColor?: string;
}

export function SpotlightBanner({ status, primaryColor }: SpotlightBannerProps) {
  return (
    /* Contenedor Exterior: Borde Paspartú Textil con Glow Cálido */
    <div className="relative p-[4px] rounded-[1.8rem] overflow-hidden shadow-[0_0_25px_rgba(239,68,68,0.45)] group cursor-pointer active:scale-[0.99] transition-transform">
      
      {/* Fondo Textil Andino (actúa como marco exterior) */}
      <Image 
        src={`${BUCKET_URL}/bannerceviche.png`}
        alt="Textil Andino Marco"
        fill
        className="object-cover"
        unoptimized
      />

      {/* Contenedor Interior: Foto del plato + Degradado + Textos */}
      <div className="relative w-full h-[220px] rounded-[1.6rem] overflow-hidden bg-zinc-950">
        
        {/* Foto de la comida */}
        <Image 
          src={`${BUCKET_URL}/cevichemixto.jpg`}
          alt="Ceviche Mixto - Recomendación del Chef"
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          priority
          unoptimized
        />

        {/* Degradado oscuro para contraste de lectura */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-transparent z-10" />

        {/* Textos y Etiqueta */}
        <div className="absolute bottom-5 left-5 right-5 flex flex-col items-start z-20">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/65 backdrop-blur-md border border-amber-500/40 mb-2.5 shadow-md">
            <Sparkles size={12} className="text-amber-400 animate-pulse" />
            <span className="text-[10px] font-extrabold text-white tracking-widest uppercase">
              Recomendación del Chef
            </span>
          </div>
          
          <h2 className="text-3xl font-extrabold text-white tracking-tight mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            Ceviche Misto
          </h2>
          <p className="text-xs text-zinc-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
            Pesca del día con leche de tigre.
          </p>
        </div>

      </div>
    </div>
  );
}