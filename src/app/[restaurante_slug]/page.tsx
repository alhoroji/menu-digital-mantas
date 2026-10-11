// src/app/[restaurante_slug]/page.tsx
'use client';

import React from 'react';
import { BellRing } from 'lucide-react';
import Image from 'next/image';
import { useMenuStatus } from '@/features/menu/hooks/useMenuStatus';
import { SpotlightBanner } from '@/features/menu/components/SpotlightBanner';
import { BentoCategoryGrid } from '@/features/menu/components/BentoCategoryGrid';
import { CartFloatingButton } from '@/features/cart/components/CartFloatingButton';

const mockRestaurant = {
  name: "Mantas",
  theme: { background: "#060608", primary: "#E4B363" },
  schedules: {
    menuDelDia: { isActive: true, startTime: "03:00", endTime: "16:00", daysOfWeek: [1, 2, 3, 4, 5] },
    promocion: { isActive: true, startTime: "16:01", endTime: "23:59", daysOfWeek: [1, 2, 3, 4, 5] }
  }
};

const BUCKET_URL = "https://jclzrvizljglhhndkmvo.supabase.co/storage/v1/object/public/platos";

export default function TenantMenuPage({ params }: { params: { restaurante_slug: string } }) {
  const status = useMenuStatus(mockRestaurant.schedules.menuDelDia, mockRestaurant.schedules.promocion);

  return (
    <main 
      className="min-h-screen font-sans w-full sm:max-w-md mx-auto overflow-x-hidden text-zinc-100 selection:bg-zinc-800 relative flex flex-col"
      style={{ backgroundColor: mockRestaurant.theme.background }}
    >
      {/* 1. HEADER CON LOGO IN BIANCO PURO */}
      <header className="flex justify-between items-center px-5 pt-6 pb-3 w-full shrink-0">
        <div className="flex items-center gap-2">
          {/* Dettaglio ornamentale andino sinistro */}
          <span className="text-amber-500 text-sm font-black drop-shadow-[0_0_8px_rgba(245,158,11,0.6)] select-none">
            ❖
          </span>

          {/* Logo bianco ad alto contrasto */}
          <h1 className="text-4xl font-black text-white tracking-tight font-serif drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] select-none">
            {mockRestaurant.name}
          </h1>

          {/* Dettaglio ornamentale andino destro */}
          <span className="text-amber-500 text-sm font-black drop-shadow-[0_0_8px_rgba(245,158,11,0.6)] select-none">
            ❖
          </span>
        </div>

        {/* Pulsante notifiche */}
        <button className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800/80 flex items-center justify-center shadow-lg active:scale-90 transition-transform relative">
          <BellRing size={18} className="text-zinc-400" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-red-500 border border-zinc-900 animate-pulse" />
        </button>
      </header>

      {/* 2. FASCIA TEXTILE SUPERIORE (ora cintaexplorarcarta.png) */}
      <div className="relative w-full h-3.5 shrink-0 mb-4 overflow-hidden shadow-sm">
        <Image 
          src={`${BUCKET_URL}/cintaexplorarcarta.png`} 
          alt="Bordo Mantas" 
          fill 
          className="object-cover"
          unoptimized 
          priority
        />
      </div>

      {/* 3. SPOTLIGHT BANNER */}
      <div className="w-full px-5 mb-5 shrink-0">
        <SpotlightBanner status={status} primaryColor={mockRestaurant.theme.primary} />
      </div>
      
      {/* 4. GRIGLIA BENTO DELLE CATEGORIE */}
      <BentoCategoryGrid />
      <CartFloatingButton />
      
    </main>
  );
}