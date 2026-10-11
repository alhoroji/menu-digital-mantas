// src/features/cart/components/CartFloatingButton.tsx
'use client';

import React, { useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/features/cart/store/useCartStore';
import { CartDrawer } from '@/features/cart/components/CartDrawer';

export function CartFloatingButton() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const items = useCartStore((state) => state.items);
  const getTotalAmount = useCartStore((state) => state.getTotalAmount);
  const getTotalItems = useCartStore((state) => state.getTotalItems);

  const totalCount = getTotalItems();
  const totalPrice = getTotalAmount();

  if (totalCount === 0) return null;

  return (
    <>
      <aside aria-label="Resumen del carrito" className="fixed bottom-6 left-0 right-0 z-40 px-5 pointer-events-none">
        <div className="max-w-md mx-auto pointer-events-auto">
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="w-full bg-gradient-to-r from-amber-500 to-amber-400 text-black font-black py-3.5 px-5 rounded-full shadow-[0_0_25px_rgba(245,158,11,0.45)] flex items-center justify-between active:scale-[0.98] transition-all"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-black/20 flex items-center justify-center">
                <ShoppingBag size={15} strokeWidth={2.5} />
              </div>
              <span className="text-xs uppercase tracking-wider font-extrabold">
                {totalCount} {totalCount === 1 ? 'plato' : 'platos'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider">Ver pedido</span>
              <span className="text-sm font-mono font-black">• €{totalPrice.toFixed(2)}</span>
            </div>
          </button>
        </div>
      </aside>

      <CartDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </>
  );
}