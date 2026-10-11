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
    /* Marco Paspartú Textil con Glow Cálido */
    <div className="relative p-[7px] rounded-[2rem] overflow-hidden shadow-[0_0_25px_rgba(239,68,68,0.45)] group cursor-pointer active:scale-[0.99] transition-all">
      
      {/* Fondo Textil Andino (Marco exterior bien visible) */}
      <Image 
        src={`${BUCKET_URL}/bannerceviche.png`}
        alt="Textil Andino Marco"
        fill
        className="object-cover"
        unoptimized
      />

      {/* Contenedor Interior: Foto del plato + Degradado + Textos */}
      <div className="relative w-full h-[225px] rounded-[1.6rem] overflow-hidden bg-zinc-950">
        
        {/* Foto de la comida */}
        <Image 
          src={`${BUCKET_URL}/cevichemixto.jpg`}
          alt="Ceviche Mixto - Recomendación del Chef"
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          priority
          unoptimized
        />

        {/* Degradado oscuro para lectura impecable */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent z-10" />

        {/* Textos e insignia */}
        <div className="absolute bottom-4 left-4 right-4 flex flex-col items-start z-20">
          
          {/* Píldora Recomendación con micro-borde textil */}
          <div className="p-[1.5px] rounded-full overflow-hidden relative mb-2 shadow-lg">
            <Image 
              src={`${BUCKET_URL}/tiramaestra.png`}
              alt="Borde Textil"
              fill
              className="object-cover"
              unoptimized
            />
            <div className="relative px-3 py-1 rounded-full bg-black/80 backdrop-blur-md flex items-center gap-1.5">
              <Sparkles size={12} className="text-amber-400 animate-pulse" />
              <span className="text-[10px] font-extrabold text-white tracking-widest uppercase">
                Recomendación del Chef
              </span>
            </div>
          </div>
          
          <h2 className="text-3xl font-black text-white tracking-tight mb-0.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
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