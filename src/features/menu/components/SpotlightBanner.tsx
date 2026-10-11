// src/features/menu/components/SpotlightBanner.tsx
import Image from 'next/image';
import { Sparkles } from 'lucide-react';

const BUCKET_URL = "https://jclzrvizljglhhndkmvo.supabase.co/storage/v1/object/public/platos";
// Usaremos el mismo patrón para los bordes decorativos
const PATTERN_URL = "https://jclzrvizljglhhndkmvo.supabase.co/storage/v1/object/public/platos/manta_pattern.png"; // Puedes subir una imagen pequeña del patrón aquí

interface SpotlightBannerProps {
  status?: any; 
  primaryColor?: string;
}

export function SpotlightBanner({ status, primaryColor }: SpotlightBannerProps) {
  return (
    <div className="relative p-[4px] rounded-[1.8rem] overflow-hidden bg-gradient-to-r from-red-500 via-yellow-500 to-orange-600 shadow-[0_0_20px_rgba(239,68,68,0.4)] transition-all duration-300 hover:shadow-[0_0_25px_rgba(239,68,68,0.6)]">
      
      {/* Bordes con el Patrón de Manta (opcional si subes manta_pattern.png) */}
      <div 
        className="absolute inset-0 opacity-90 mix-blend-overlay"
        style={{ backgroundImage: `url(${PATTERN_URL})`, backgroundSize: 'cover' }}
      />

      {/* Contenedor Interno */}
      <div className="relative w-full h-[220px] rounded-[1.6rem] overflow-hidden group cursor-pointer bg-zinc-950">
        
        {/* Foto de Ceviche */}
        <Image 
          src={`${BUCKET_URL}/cevichemixto.jpg`}
          alt="Ceviche Mixto - Recomendación del Chef"
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          priority
          unoptimized
        />
        
        {/* Gradiente Oscuro */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

        {/* Contenido UX/IU */}
        <div className="absolute bottom-5 left-5 right-5 flex flex-col items-start">
          
          {/* Etiqueta de recomendación estilizada */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-red-500/30 mb-3 shadow-[0_0_10px_rgba(239,68,68,0.3)]">
            <Sparkles size={12} className="text-yellow-400 animate-pulse" />
            <span className="text-[9px] font-extrabold text-white tracking-widest uppercase">
              Recomendación del Chef
            </span>
          </div>
          
          <h2 className="text-3xl font-extrabold text-white tracking-tight mb-1 font-serif drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            Ceviche Misto
          </h2>
          <p className="text-xs text-zinc-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
            Pesca del día con leche de tigre.
          </p>
        </div>

      </div>
    </div>
  );
}