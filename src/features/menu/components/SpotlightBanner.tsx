// src/features/menu/components/SpotlightBanner.tsx
import Image from 'next/image';
import { Sparkles } from 'lucide-react';

const BUCKET_URL = "https://jclzrvizljglhhndkmvo.supabase.co/storage/v1/object/public/platos";

interface SpotlightBannerProps {
  status?: any; 
  primaryColor?: string;
}

export function SpotlightBanner({ status, primaryColor }: SpotlightBannerProps) {
  return (
    <div className="relative w-full h-[220px] rounded-[1.5rem] overflow-hidden group cursor-pointer shadow-xl">
      
      <Image 
        src={`${BUCKET_URL}/cevichemixto.jpg`}
        alt="Ceviche Mixto - Recomendación del Chef"
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        priority
        unoptimized // <-- Esta es la clave para esquivar los errores de Vercel
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

      <div className="absolute bottom-5 left-5 right-5 flex flex-col items-start">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 mb-3">
          <Sparkles size={14} className="text-[#E4B363]" />
          <span className="text-[10px] font-bold text-white tracking-widest uppercase">
            Recomendación del Chef
          </span>
        </div>
        
        <h2 className="text-3xl font-extrabold text-white tracking-tight mb-1">
          Ceviche Misto
        </h2>
        <p className="text-sm text-zinc-300">
          Pesca del día con leche de tigre.
        </p>
      </div>
    </div>
  );
}