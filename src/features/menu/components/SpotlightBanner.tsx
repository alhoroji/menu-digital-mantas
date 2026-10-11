// src/features/menu/components/SpotlightBanner.tsx
'use client';

import Image from 'next/image';
import { Sparkles } from 'lucide-react';

const BUCKET_URL = "https://jclzrvizljglhhndkmvo.supabase.co/storage/v1/object/public/platos";

// Fórmula Neón Eléctrico: Núcleo ultra-saturado + halo compacto
const NEON_CEVICHE = '0 0 5px #ff1744, 0 0 11px #ff3d00, 0 0 20px rgba(255, 61, 0, 0.65)';

interface SpotlightBannerProps {
  status?: any; 
  primaryColor?: string;
}

export function SpotlightBanner({ status, primaryColor }: SpotlightBannerProps) {
  return (
    <div 
      className="relative p-[2.5px] rounded-[1.7rem] overflow-hidden group cursor-pointer active:scale-[0.99] transition-all"
      style={{ boxShadow: NEON_CEVICHE }}
    >
      
      {/* Marco Textil Andino */}
      <Image 
        src={`${BUCKET_URL}/bannerceviche.png`}
        alt="Textil Andino Marco"
        fill
        className="object-cover"
        unoptimized
      />

      {/* Contenedor Interior */}
      <div className="relative w-full h-[185px] rounded-[1.55rem] overflow-hidden bg-zinc-950">
        
        <Image 
          src={`${BUCKET_URL}/cevichemixto.jpg`}
          alt="Ceviche Mixto - Recomendación del Chef"
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          priority
          unoptimized
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10" />

        <div className="absolute bottom-3 left-3.5 right-3.5 flex flex-col items-start z-20">
          
          <div className="p-[1px] rounded-full overflow-hidden relative mb-1.5 shadow-md">
            <Image 
              src={`${BUCKET_URL}/cintaexplorarcarta.png`}
              alt="Borde Textil"
              fill
              className="object-cover"
              unoptimized
            />
            <div className="relative px-2.5 py-0.5 rounded-full bg-black/85 backdrop-blur-md flex items-center gap-1">
              <Sparkles size={10} className="text-amber-400 animate-pulse" />
              <span className="text-[9px] font-extrabold text-white tracking-widest uppercase">
                Recomendación del Chef
              </span>
            </div>
          </div>
          
          <h2 className="text-2xl font-black text-white tracking-tight mb-0.5 font-serif drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            Ceviche Misto
          </h2>
          <p className="text-[11px] text-zinc-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
            Pesca del día con leche de tigre.
          </p>
        </div>

      </div>
    </div>
  );
}