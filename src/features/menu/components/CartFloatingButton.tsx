import { ShoppingBag } from 'lucide-react';

interface CartFloatingButtonProps {
  total: number;
  itemsCount: number;
}

export function CartFloatingButton({ total, itemsCount }: CartFloatingButtonProps) {
  // Si no hay items, no mostramos el carrito para mantener la pantalla limpia
  if (itemsCount === 0) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 sm:max-w-sm sm:mx-auto z-50">
      <button className="w-full h-16 rounded-[2rem] bg-zinc-100 flex items-center justify-between px-2 pr-6 shadow-[0_20px_40px_rgba(0,0,0,0.4)] active:scale-95 transition-transform">
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 rounded-full bg-black flex items-center justify-center">
            <ShoppingBag size={18} className="text-white" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-[10px] font-bold flex items-center justify-center text-white border-2 border-zinc-100 shadow-sm">
              {itemsCount}
            </span>
          </div>
          <span className="font-semibold text-black tracking-tight">Ver Carrito</span>
        </div>
        <span className="font-bold text-black text-lg">
          € {total.toFixed(2)}
        </span>
      </button>
    </div>
  );
}