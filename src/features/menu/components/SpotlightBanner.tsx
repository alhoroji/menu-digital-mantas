// src/features/menu/components/SpotlightBanner.tsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, ChevronRight, Moon, Utensils, Coffee } from 'lucide-react';
import { useSpotlightBanner } from '../hooks/useSpotlightBanner';
import { DailyMenuModal } from './DailyMenuModal';

const BUCKET_URL = "https://jclzrvizljglhhndkmvo.supabase.co/storage/v1/object/public/platos";

export function SpotlightBanner() {
  const spotlight = useSpotlightBanner();
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);

  // Icono dinámico según el modo
  const renderIcon = () => {
    switch (spotlight.mode) {
      case 'menu_del_dia':
        return <Utensils size={11} className="text-amber-400" />;
      case 'promo_noche':
        return <Moon size={11} className="text-purple-400" />;
      case 'desayuno_domingo':
        return <Coffee size={11} className="text-amber-400" />;
      default:
        return <Sparkles size={11} className="text-amber-400 fill-amber-400" />;
    }
  };

  const bannerContent = (
    <article 
      onClick={() => {
        if (spotlight.canOpenModal) {
          setIsMenuModalOpen(true);
        }
      }}
      className={`relative p-[1.5px] rounded-[1.8rem] overflow-hidden group shadow-lg transition-all ${
        spotlight.canOpenModal ? 'cursor-pointer active:scale-[0.98]' : ''
      }`}
      style={{
        boxShadow: spotlight.mode === 'promo_noche' 
          ? '0 0 14px rgba(224, 64, 251, 0.45)' 
          : '0 0 14px rgba(245, 158, 11, 0.45)'
      }}
    >
      {/* 1. Marco Textil Andino */}
      <div className="absolute inset-0 pointer-events-none rounded-[1.8rem] overflow-hidden">
        <Image
          src={`${BUCKET_URL}/tiramaestra.png`}
          alt="Borde Textil"
          fill
          className="object-cover"
          unoptimized
        />
      </div>

      {/* 2. Contenedor de la Imagen */}
      <div className="relative bg-[#0d0d12] rounded-[1.7rem] overflow-hidden h-[14rem] flex flex-col justify-end p-5">
        <Image
          src={spotlight.image}
          alt={spotlight.title}
          fill
          className="object-cover pointer-events-none group-hover:scale-105 transition-transform duration-700"
          unoptimized
          priority
        />

        {/* Degradado fino inferior para máxima legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-0" />

        {/* 3. Textos Inteligentes */}
        <div className="relative z-10 flex flex-col items-start select-none">
          
          {/* Badge Contextual */}
          <div className="flex items-center gap-1.5 bg-[#0a0a0f]/90 border border-amber-500/40 backdrop-blur-md rounded-full px-2.5 py-1 mb-2">
            {renderIcon()}
            <span className="text-[9px] font-black uppercase tracking-wider text-amber-400">
              {spotlight.badge}
            </span>
            {spotlight.canOpenModal && (
              <span className="text-[9px] bg-amber-500 text-black px-1.5 py-0.2 rounded-full font-black animate-pulse">
                VEDI MENU
              </span>
            )}
          </div>

          {/* Título Principal */}
          <h3 className="text-xl sm:text-2xl font-black text-white font-serif tracking-tight drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)] flex items-center gap-1.5">
            {spotlight.title}
            {spotlight.canOpenModal && <ChevronRight size={18} className="text-amber-400" />}
          </h3>

          {/* Subtítulo / Descripción */}
          <p className="text-xs text-zinc-200 mt-1 font-medium leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] line-clamp-2">
            {spotlight.subtitle}
          </p>

        </div>
      </div>
    </article>
  );

  return (
    <>
      {/* Si es domingo de desayuno, enlazar directo a desayunos */}
      {spotlight.mode === 'desayuno_domingo' ? (
        <Link href="/mantas/categoria/cat_desayunos">
          {bannerContent}
        </Link>
      ) : (
        bannerContent
      )}

      {/* Modal interactivo de Menú del Día */}
      <DailyMenuModal
        isOpen={isMenuModalOpen}
        onClose={() => setIsMenuModalOpen(false)}
        data={spotlight.dailyMenuData}
      />
    </>
  );
}