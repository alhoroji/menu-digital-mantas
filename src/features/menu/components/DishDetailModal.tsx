// src/features/menu/components/DishDetailModal.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, Plus, Minus, UtensilsCrossed } from 'lucide-react';
import { Dish } from '@/core/types/menu.types';

const BUCKET_URL = "https://jclzrvizljglhhndkmvo.supabase.co/storage/v1/object/public/platos";

interface DishDetailModalProps {
  dish: Dish | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (dish: Dish, quantity: number, notes: string) => void;
}

export function DishDetailModal({ dish, isOpen, onClose, onConfirm }: DishDetailModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');

  // Reiniciar estado cada vez que se abre un plato nuevo
  useEffect(() => {
    if (isOpen) {
      setQuantity(1);
      setNotes('');
    }
  }, [isOpen, dish]);

  if (!isOpen || !dish) return null;

  const rawPrice = typeof dish.price === 'number' 
    ? dish.price 
    : dish.price?.standard ?? 0;
  const totalPrice = (rawPrice * quantity).toFixed(2);

  const handleAdd = () => {
    onConfirm(dish, quantity, notes);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
       
      {/* Contenedor del Modal con Borde Superior Andino */}
      <div className="w-full sm:max-w-md bg-[#0a0a0f] rounded-t-[2.2rem] sm:rounded-[2.2rem] border border-zinc-800/80 overflow-hidden shadow-[0_-10px_35px_rgba(0,0,0,0.9)] flex flex-col max-h-[92vh]">
         
        {/* Cinta textil andina en la corona del modal */}
        <div className="relative w-full h-3 shrink-0 overflow-hidden shadow-sm">
          <Image
            src={`${BUCKET_URL}/cintaexplorarcarta.png`}
            alt="Corona Textil"
            fill
            className="object-cover"
            unoptimized
          />
        </div>

        {/* Zona de Cabecera: Foto del plato o Placeholder Elegante */}
        <div className="relative w-full h-60 bg-zinc-950 flex items-center justify-center shrink-0 overflow-hidden">
          {dish.imageUrl ? (
            <Image
              src={dish.imageUrl}
              alt={dish.name}
              fill
              className="object-cover"
              unoptimized
            />
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 text-zinc-600">
              <div className="w-14 h-14 rounded-full bg-zinc-900/80 border border-zinc-800 flex items-center justify-center text-zinc-500 shadow-inner">
                <UtensilsCrossed size={24} />
              </div>
              <span className="text-[11px] font-bold tracking-widest uppercase text-zinc-500">
                Restaurante Mantas
              </span>
            </div>
          )}

          {/* Sombra de contraste inferior en la foto */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-black/40 pointer-events-none" />

          {/* Botón cerrar flotante */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/70 backdrop-blur-md text-zinc-300 hover:text-white border border-zinc-700/60 flex items-center justify-center active:scale-90 transition-all shadow-lg z-10"
          >
            <X size={18} />
          </button>
        </div>

        {/* Cuerpo del Modal con scroll si es necesario */}
        <div className="p-5 overflow-y-auto flex-1">
          <div className="flex justify-between items-start gap-3 mb-2">
            <h2 className="text-xl font-black text-white font-serif tracking-tight leading-snug">
              {dish.name}
            </h2>
            <span className="text-lg font-black text-amber-400 font-mono shrink-0">
              €{rawPrice.toFixed(2)}
            </span>
          </div>

          {dish.description && (
            <p className="text-xs text-zinc-400 mb-6 leading-relaxed">
              {dish.description}
            </p>
          )}

          {/* Sección: Notas para la cocina */}
          <div className="mb-2">
            <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2">
              NOTAS PARA LA COCINA
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ej: Sin cebolla, poco picante, aderezo aparte..."
              className="w-full h-20 bg-zinc-900/80 border border-zinc-800 rounded-2xl p-3.5 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-500/50 resize-none transition-colors"
            />
          </div>
        </div>

        {/* Barra Inferior: Selector de Cantidad y Botón de Confirmación */}
        <div className="p-4 bg-zinc-950/95 border-t border-zinc-900 flex items-center gap-3 shrink-0">
           
          {/* Selector de cantidad [-] 1 [+] */}
          <div className="flex items-center justify-between w-28 bg-zinc-900 border border-zinc-800 rounded-full px-3 py-2.5 shadow-inner">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="text-zinc-400 hover:text-white active:scale-90 transition-transform"
            >
              <Minus size={14} />
            </button>
            <span className="text-sm font-black text-white font-mono">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="text-zinc-400 hover:text-white active:scale-90 transition-transform"
            >
              <Plus size={14} />
            </button>
          </div>

          {/* Botón de Agregar con Resplandor Ámbar de Conversión */}
          <button
            onClick={handleAdd}
            className="flex-1 bg-gradient-to-r from-amber-500 to-amber-400 text-black font-black text-xs py-3.5 px-4 rounded-full active:scale-95 transition-transform flex items-center justify-center gap-2 shadow-[0_0_18px_rgba(245,158,11,0.35)]"
          >
            <span className="tracking-wider uppercase">Agregar al pedido</span>
            <span>•</span>
            <span className="font-mono text-sm">€{totalPrice}</span>
          </button>

        </div>

      </div>
    </div>
  );
}