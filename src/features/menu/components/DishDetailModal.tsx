// src/features/menu/components/DishDetailModal.tsx
import { useState } from 'react';
import { X, Minus, Plus } from 'lucide-react';
import { Dish } from '@/core/types/menu.types';

interface DishDetailModalProps {
  dish: Dish;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (dish: Dish, quantity: number, notes: string) => void; 
}

export function DishDetailModal({ dish, isOpen, onClose, onConfirm }: DishDetailModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const displayPrice = dish.price.table || dish.price.standard;
  const totalPrice = displayPrice * quantity;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col justify-end">
      
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-[#09090B] w-full sm:max-w-md sm:mx-auto h-[85vh] rounded-t-[2rem] border-t border-zinc-800 flex flex-col animate-in slide-in-from-bottom-full duration-300">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/10 active:scale-90"
        >
          <X size={20} />
        </button>

        <div className="w-full h-64 bg-zinc-900 rounded-t-[2rem] overflow-hidden shrink-0">
          {dish.imageUrl ? (
            <img src={dish.imageUrl} alt={dish.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-zinc-800 text-zinc-600">
              <span>Sin foto disponible</span>
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
          <div className="flex justify-between items-start gap-4 mb-2">
            <h2 className="text-2xl font-medium tracking-tight text-white">{dish.name}</h2>
            <span className="text-xl font-bold text-white">€{displayPrice.toFixed(2)}</span>
          </div>
          
          <p className="text-zinc-400 text-sm leading-relaxed mb-6">
            {dish.description}
          </p>

          {dish.modifiers && dish.modifiers.length > 0 && (
            <div className="mb-8">
              <h3 className="text-sm font-bold text-zinc-100 uppercase tracking-wider mb-4">Adicionales</h3>
              <div className="flex flex-col gap-3">
                {dish.modifiers.map((mod, idx) => (
                  <label key={idx} className="flex items-center justify-between p-4 rounded-2xl border border-zinc-800 bg-zinc-900/50 active:bg-zinc-800 transition-colors">
                    <div className="flex items-center gap-3">
                      <input type="checkbox" className="w-5 h-5 rounded border-zinc-700 bg-zinc-800 text-[#E4B363] focus:ring-[#E4B363] focus:ring-offset-zinc-900" />
                      <span className="text-zinc-200">{mod.name}</span>
                    </div>
                    {mod.extraPrice > 0 && (
                      <span className="text-zinc-400 text-sm">+ €{mod.extraPrice.toFixed(2)}</span>
                    )}
                  </label>
                ))}
              </div>
            </div>
          )}

          <div className="mb-8">
            <h3 className="text-sm font-bold text-zinc-100 uppercase tracking-wider mb-4">Notas para la cocina</h3>
            <textarea 
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ej: Sin cebolla, extra picante..."
              className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-4 text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-[#E4B363] resize-none h-24 transition-colors"
            />
          </div>
        </div>

        <div className="p-6 bg-[#09090B] border-t border-zinc-800/50 shrink-0 mb-4 sm:mb-0">
          <div className="flex items-center justify-between gap-6">
            
            <div className="flex items-center gap-4 bg-zinc-900 border border-zinc-800 rounded-full px-2 py-1.5">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-full flex items-center justify-center text-zinc-400 active:bg-zinc-800 active:text-white transition-colors"
              >
                <Minus size={18} />
              </button>
              <span className="font-bold text-lg w-4 text-center text-white">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 rounded-full flex items-center justify-center text-zinc-400 active:bg-zinc-800 active:text-white transition-colors"
              >
                <Plus size={18} />
              </button>
            </div>

            <button 
              onClick={() => {
                onConfirm(dish, quantity, notes);
                onClose();
              }}
              className="flex-1 bg-zinc-100 text-black h-14 rounded-full font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform"
            >
              <span>Agregar</span>
              <span>•</span>
              <span>€{totalPrice.toFixed(2)}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}