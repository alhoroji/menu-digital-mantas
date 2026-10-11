// src/features/menu/components/DishCard.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import { Plus } from 'lucide-react';
import { Dish } from '@/core/types/menu.types';

const BUCKET_URL = "https://jclzrvizljglhhndkmvo.supabase.co/storage/v1/object/public/platos";

// Sistema temático automatizado según la categoría del plato
const CATEGORY_THEMES: Record<string, { banner: string; glow: string; textAccent: string }> = {
  cat_marinos: {
    banner: `${BUCKET_URL}/bannerplatosmarino.png`,
    glow: '0 0 3px #00e5ff, 0 0 10px rgba(0, 229, 255, 0.55)',
    textAccent: 'text-cyan-400',
  },
  cat_criollos: {
    banner: `${BUCKET_URL}/bannerplatoscriollo-polloalabrasa.png`,
    glow: '0 0 3px #ff1744, 0 0 10px rgba(255, 23, 68, 0.55)',
    textAccent: 'text-rose-400',
  },
  cat_pollo: {
    banner: `${BUCKET_URL}/bannerplatoscriollo-polloalabrasa.png`,
    glow: '0 0 3px #ffab00, 0 0 10px rgba(255, 171, 0, 0.55)',
    textAccent: 'text-amber-400',
  },
  cat_entradas: {
    banner: `${BUCKET_URL}/bannerentrada-bebidas.png`,
    glow: '0 0 3px #10b981, 0 0 9px rgba(16, 185, 129, 0.5)',
    textAccent: 'text-emerald-400',
  },
  cat_bebidas: {
    banner: `${BUCKET_URL}/bannerentrada-bebidas.png`,
    glow: '0 0 3px #e040fb, 0 0 10px rgba(224, 64, 251, 0.55)',
    textAccent: 'text-fuchsia-400',
  },
};

interface DishCardProps {
  dish: Dish;
  onAdd: (dish: Dish) => void;
}

export function DishCard({ dish, onAdd }: DishCardProps) {
  // Resuelve el tema automáticamente o usa fallback seguro
  const theme = CATEGORY_THEMES[dish.categoryId] || {
    banner: `${BUCKET_URL}/tiramaestra.png`,
    glow: '0 0 3px #ff3d00, 0 0 9px rgba(255, 61, 0, 0.5)',
    textAccent: 'text-amber-400',
  };

  // Manejo resiliente del precio (€) soportando objeto o número
  const rawPrice = typeof dish.price === 'number' 
    ? dish.price 
    : dish.price?.standard ?? 0;
  const formattedPrice = `€${rawPrice.toFixed(2)}`;

  return (
    <article
      onClick={() => onAdd(dish)}
      className="relative p-[1.5px] rounded-[1.4rem] overflow-hidden cursor-pointer active:scale-[0.99] transition-all group"
      style={{ boxShadow: theme.glow }}
    >
      {/* 1. MARCO TEXTIL ANDINO (Paspartú de 1.5px) */}
      <Image
        src={theme.banner}
        alt="Borde Textil Andino"
        fill
        className="object-cover pointer-events-none"
        unoptimized
      />

      {/* 2. CONTENEDOR INTERIOR OSCURO CON ALTO CONTRASTE */}
      <div className="relative bg-[#0d0d12]/95 backdrop-blur-md rounded-[1.3rem] p-4 flex justify-between items-center gap-3.5 select-none">
        
        {/* Información del plato */}
        <div className="flex-1 min-w-0 pr-1">
          <h3 className="text-sm font-black text-white tracking-tight font-serif line-clamp-2 leading-snug mb-1">
            {dish.name}
          </h3>
          
          {dish.description ? (
            <p className="text-[11px] text-zinc-400 leading-snug line-clamp-2 mb-3">
              {dish.description}
            </p>
          ) : (
            <div className="h-2" />
          )}

          <span className="text-sm font-black text-white font-mono tracking-wide">
            {formattedPrice}
          </span>
        </div>

        {/* Miniatura / Placeholder + Botón interactivo (+) */}
        <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800/80 flex items-center justify-center shrink-0">
          {dish.imageUrl ? (
            <Image
              src={dish.imageUrl}
              alt={dish.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              unoptimized
            />
          ) : (
            <span className="text-[10px] text-zinc-600 font-medium">
              Sin imagen
            </span>
          )}

          {/* Botón flotante (+) en la esquina inferior */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAdd(dish);
            }}
            aria-label={`Agregar ${dish.name}`}
            className="absolute bottom-1 right-1 w-7 h-7 rounded-full bg-white text-black flex items-center justify-center shadow-lg active:scale-90 transition-transform hover:bg-zinc-100"
          >
            <Plus size={15} strokeWidth={2.8} />
          </button>
        </div>

      </div>
    </article>
  );
}