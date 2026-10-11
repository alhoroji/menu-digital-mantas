// src/app/[restaurante_slug]/categoria/[categoria_id]/page.tsx
'use client';

import { useState, Suspense } from 'react';
import { ArrowLeft, Search } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import { DishCard } from '@/features/menu/components/DishCard';
import { DishDetailModal } from '@/features/menu/components/DishDetailModal';
import { BottomNavigationDock } from '@/features/navigation/components/BottomNavigationDock';
import { useCartStore } from '@/features/cart/store/useCartStore';
import { Dish } from '@/core/types/menu.types';
import { MenuService } from '@/features/menu/services/menu.service';

const BUCKET_URL = "https://jclzrvizljglhhndkmvo.supabase.co/storage/v1/object/public/platos";

function CategoryContent() {
  const router = useRouter();
  const params = useParams();
  const categoria_id = params?.categoria_id as string;
  
  const currentCategory = MenuService.getCategoryById(categoria_id);
  
  if (!currentCategory) {
    return <div className="p-10 text-white text-center">Categoría no encontrada.</div>;
  }

  const [activeTab, setActiveTab] = useState<string>(currentCategory.subcategories[0]);
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);

  const addItemToCart = useCartStore(state => state.addItem);
  const filteredDishes = MenuService.getDishesByCategory(currentCategory.id, activeTab);

  const handleAddDish = (dish: Dish) => setSelectedDish(dish);
  const handleConfirmAdd = (dish: Dish, quantity: number, notes: string) => {
    for (let i = 0; i < quantity; i++) {
      addItemToCart(dish);
    }
  };

  return (
    <main className="min-h-screen bg-[#060608] text-zinc-100 font-sans mx-auto w-full sm:max-w-md pb-24 relative">
      <header className="sticky top-0 z-40 bg-[#060608]/95 backdrop-blur-md border-b border-zinc-800/50">
        <div className="flex items-center justify-between px-4 py-4">
          <button onClick={() => router.back()} className="p-2 -ml-2 rounded-full active:bg-zinc-800 transition-colors">
            <ArrowLeft size={24} className="text-zinc-300" />
          </button>
          <h1 className="text-lg font-black font-serif tracking-wide uppercase text-white">{currentCategory.name}</h1>
          <button className="p-2 -mr-2 rounded-full active:bg-zinc-800 transition-colors">
            <Search size={20} className="text-zinc-400" />
          </button>
        </div>

        <div className="relative w-full h-3 shrink-0 overflow-hidden shadow-sm mb-3">
          <Image
            src={`${BUCKET_URL}/cintaexplorarcarta.png`}
            alt="Borde Mantas"
            fill
            className="object-cover"
            unoptimized
            priority
          />
        </div>

        {currentCategory.subcategories.length > 1 && (
          <div className="w-full overflow-x-auto scrollbar-hide px-4 pb-3 flex gap-2 snap-x">
            {currentCategory.subcategories.map((sub) => (
              <button
                key={sub}
                onClick={() => setActiveTab(sub)}
                className={`snap-start whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-bold transition-all border ${
                  activeTab === sub 
                    ? 'bg-white text-black border-white shadow-sm' 
                    : 'bg-zinc-900 text-zinc-400 border-zinc-800 active:bg-zinc-800'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        )}
      </header>

      <section className="px-4 py-6 flex flex-col gap-4">
        {filteredDishes.length > 0 ? (
          filteredDishes.map(dish => (
            <DishCard key={dish.id} dish={dish} onAdd={handleAddDish} />
          ))
        ) : (
          <div className="py-12 text-center text-zinc-500 flex flex-col items-center">
             <span className="text-4xl mb-3">🍽️</span>
             <p className="text-sm">No hay platos disponibles en esta sección por el momento.</p>
          </div>
        )}
      </section>

      <DishDetailModal 
        dish={selectedDish!} 
        isOpen={selectedDish !== null} 
        onClose={() => setSelectedDish(null)} 
        onConfirm={handleConfirmAdd}
      />

      {/* NUOVA BARRA DI NAVIGAZIONE A 4 SCHEDE */}
      <BottomNavigationDock />
    </main>
  );
}

export default function CategoryView() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#060608] flex items-center justify-center">
        <span className="text-[#E4B363] text-sm font-bold tracking-widest uppercase animate-pulse">
          Cargando carta...
        </span>
      </div>
    }>
      <CategoryContent />
    </Suspense>
  );
}