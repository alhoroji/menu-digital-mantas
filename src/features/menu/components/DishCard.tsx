// src/features/menu/components/DishCard.tsx
import { Plus } from 'lucide-react';
import { Dish } from '@/core/types/menu.types';

interface DishCardProps {
  dish: Dish;
  onAdd: (dish: Dish) => void;
}

export function DishCard({ dish, onAdd }: DishCardProps) {
  // Tomamos el precio de mesa por defecto, o el estándar si no hay
  const displayPrice = dish.price.table || dish.price.standard;

  return (
    <div 
      onClick={() => onAdd(dish)}
      className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-4 flex gap-4 cursor-pointer active:scale-[0.98] transition-transform group"
    >
      {/* Información del Plato */}
      <div className="flex-1 flex flex-col justify-center">
        <h4 className="text-white font-medium mb-1 leading-tight">{dish.name}</h4>
        
        {dish.description && (
          <p className="text-zinc-500 text-xs line-clamp-2 mb-2 leading-relaxed">
            {dish.description}
          </p>
        )}
        
        <div className="flex items-center gap-2 mt-auto">
          <span className="font-bold text-white text-sm">€{displayPrice.toFixed(2)}</span>
          
          {/* Etiquetas dinámicas (ej. "Recomendado") */}
          {dish.tags?.map(tag => (
            <span key={tag} className="text-[9px] bg-[#E4B363]/20 text-[#E4B363] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Imagen y Botón Agregar */}
      <div className="relative shrink-0">
        {dish.imageUrl ? (
          <div className="w-24 h-24 rounded-xl overflow-hidden bg-zinc-800">
            <img 
              src={dish.imageUrl} 
              alt={dish.name} 
              className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" 
            />
          </div>
        ) : (
          <div className="w-24 h-24 rounded-xl bg-zinc-800/30 border border-zinc-800 flex items-center justify-center">
            <span className="text-zinc-600 text-[10px] text-center px-2">Sin imagen</span>
          </div>
        )}
        
        {/* Botón flotante "+" */}
        <button 
          className="absolute -bottom-2 -right-2 w-9 h-9 rounded-full bg-white text-black flex items-center justify-center shadow-[0_4px_14px_rgba(255,255,255,0.25)] active:scale-90 transition-transform"
          onClick={(e) => {
            e.stopPropagation(); // Evita que el clic se cuente doble al tocar el botón y la tarjeta a la vez
            onAdd(dish);
          }}
        >
          <Plus size={20} strokeWidth={3} />
        </button>
      </div>
    </div>
  );
}