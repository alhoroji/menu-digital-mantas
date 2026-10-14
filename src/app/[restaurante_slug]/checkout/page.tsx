// src/app/[restaurante_slug]/page.tsx
'use client';

import React from 'react';
import { BellRing } from 'lucide-react';
import Image from 'next/image';
import { SpotlightBanner } from '@/features/menu/components/SpotlightBanner';
import { BentoCategoryGrid } from '@/features/menu/components/BentoCategoryGrid';
import { BottomNavigationDock } from '@/features/navigation/components/BottomNavigationDock';

const mockRestaurant = {
  name: "Mantas",
  theme: { background: "#060608", primary: "#E4B363" }
};

const BUCKET_URL = "https://jclzrvizljglhhndkmvo.supabase.co/storage/v1/object/public/platos";

export default function TenantMenuPage({ params }: { params: { restaurante_slug: string } }) {
  return (
    <main 
      className="min-h-screen font-sans w-full sm:max-w-md mx-auto overflow-x-hidden text-zinc-100 selection:bg-zinc-800 relative flex flex-col pb-28"
      style={{ backgroundColor: mockRestaurant.theme.background }}
    >
      {/* 1. HEADER CON LOGO OFICIAL */}
      <header className="flex justify-between items-center px-5 pt-5 pb-2.5 w-full shrink-0">
        <div className="flex items-center gap-1.5">
          <span className="text-amber-500 text-xs font-black drop-shadow-[0_0_8px_rgba(245,158,11,0.6)] select-none">
            ❖
          </span>

          <div className="relative h-10 w-40 flex items-center justify-center drop-shadow-[0_2px_12px_rgba(239,68,68,0.35)]">
            <Image 
              src={`${BUCKET_URL}/logomantas.png?v=2`} 
              alt="Mantas Logo" 
              fill
              className="object-contain"
              unoptimized 
              priority
            />
          </div>

          <span className="text-amber-500 text-xs font-black drop-shadow-[0_0_8px_rgba(245,158,11,0.6)] select-none">
            ❖
          </span>
        </div>

        <button className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800/80 flex items-center justify-center shadow-lg active:scale-90 transition-transform relative">
          <BellRing size={18} className="text-zinc-400" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-red-500 border border-zinc-900 animate-pulse" />
        </button>
      </header>

      {/* 2. CINTA TEXTIL SUPERIOR */}
      <div className="relative w-full h-3.5 shrink-0 mb-4 overflow-hidden shadow-sm">
        <Image 
          src={`${BUCKET_URL}/cintaexplorarcarta.png`} 
          alt="Bordo Superiore Andino" 
          fill 
          className="object-cover" 
          unoptimized 
          priority
        />
      </div>

      {/* 3. SPOTLIGHT BANNER INTELIGENTE */}
      <div className="w-full px-5 mb-5 shrink-0">
        <SpotlightBanner />
      </div>
      
      {/* 4. GRILLA BENTO COMPLETA (6 categorías con fotos y neones) */}
      <BentoCategoryGrid />

      {/* 5. BARRA DOCK FIJA INFERIOR */}
      <BottomNavigationDock />
      
    </main>
  );
}