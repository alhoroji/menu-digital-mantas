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
    /* Marco fino (3px) con resplandor cálido */
    <div className="relative p-[3px] rounded-[1.8rem] overflow-hidden shadow-[0_0_20px_rgba(239,68,68,0.4)] group cursor-pointer active:scale-[0.99] transition-all">
      
      {/* Fondo Textil Andino (Borde sutil y elegante) */}
      <Image 
        src={`${BUCKET_URL}/bannerceviche.png`}
        alt="Textil Andino Marco"
        fill
        className="object-cover"
        unoptimized
      />

      {/* Contenedor Interior: Máximo espacio para la foto */}
      <div className="relative w-full h-[230px] rounded-[1.65rem] overflow-hidden bg-zinc-950">
        
        {/* Foto de la comida */}
        <Image 
          src={`${BUCKET_URL}/cevichemixto.jpg`}
          alt="Ceviche Mixto - Recomendación del Chef"
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          priority
          unoptimized
        />

        {/* Degradado suave para no tapar los detalles del plato */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10" />

        {/* Textos e insignia */}
        <div className="absolute bottom-4 left-4 right-4 flex flex-col items-start z-20">
          
          {/* Píldora Recomendación */}
          <div className="p-[1px] rounded-full overflow-hidden relative mb-2 shadow-md">
            <Image 
              src={`${BUCKET_URL}/cintaexplorarcarta.png`}
              alt="Borde Textil"
              fill
              className="object-cover"
              unoptimized
            />
            <div className="relative px-3 py-1 rounded-full bg-black/85 backdrop-blur-md flex items-center gap-1.5">
              <Sparkles size={11} className="text-amber-400 animate-pulse" />
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