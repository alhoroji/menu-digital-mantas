// src/app/[restaurante_slug]/categoria/[categoria_id]/page.tsx
'use client';

import { useState, Suspense } from 'react';
import { ArrowLeft, Search } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import { DishCard } from '@/features/menu/components/DishCard';
import { DishDetailModal } from '@/features/menu/components/DishDetailModal';
import { CartFloatingButton } from '@/features/cart/components/CartFloatingButton';
import { useCartStore } from '@/features/cart/store/useCartStore';
import { Dish } from '@/core/types/menu.types';

const BUCKET_URL = "https://jclzrvizljglhhndkmvo.supabase.co/storage/v1/object/public/platos";

// --- BASE DE DATOS TEMPORAL ---
const categoriasDB: Record<string, { id: string; name: string; subcategories: string[] }> = {
  cat_entradas: { id: "cat_entradas", name: "Entradas", subcategories: ["Todas"] },
  cat_criollos: { id: "cat_criollos", name: "Platos Criollos", subcategories: ["Todas"] },
  cat_marinos: { id: "cat_marinos", name: "Platos Marinos", subcategories: ["Entradas", "Ceviches", "Combos", "Adicionales"] },
  cat_pollo: { id: "cat_pollo", name: "Pollo a la Brasa", subcategories: ["Todas"] },
  cat_bebidas: { id: "cat_bebidas", name: "Bebidas", subcategories: ["Todas"] }
};

const platosDB: Dish[] = [
  { id: "e1", categoryId: "cat_entradas", subcategory: "Todas", name: "Tamal", description: "", price: { standard: 6 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "e2", categoryId: "cat_entradas", subcategory: "Todas", name: "Causa", description: "", price: { standard: 8 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "e3", categoryId: "cat_entradas", subcategory: "Todas", name: "Papa a la Huancaina", description: "", price: { standard: 6 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "e4", categoryId: "cat_entradas", subcategory: "Todas", name: "Crema de Ocopa", description: "", price: { standard: 6 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "c1", categoryId: "cat_criollos", subcategory: "Todas", name: "Fettuccini a la Huancaina C/ Lomo al Jugo", description: "Pasta ricoperta di panna gialla condita, patatine fritte, mela, cipolla, pomodoro", price: { standard: 20 }, imageUrl: null, tags: ["Recomendado"], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "c2", categoryId: "cat_criollos", subcategory: "Todas", name: "Lomo Saltado de Carne", description: "Cipolla, pomodoro, manzo, pasta, salsa di soia e sale", price: { standard: 17 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "c3", categoryId: "cat_criollos", subcategory: "Todas", name: "Lomo Saltado de Pollo", description: "Cipolla, pomodoro, pollo, pasta, salsa di soia e sale", price: { standard: 16 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "c4", categoryId: "cat_criollos", subcategory: "Todas", name: "Trilogia de Lomo Saltado", description: "Cipolla, pomodoro, carne, lonza, gamberi, salsa di soia, riso bianco e patatine fritte", price: { standard: 20 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "c5", categoryId: "cat_criollos", subcategory: "Todas", name: "Chaufa de Carne", description: "Riso, uovo, cipolla cinese, manzo, salsa di soia", price: { standard: 12 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "c6", categoryId: "cat_criollos", subcategory: "Todas", name: "Chaufa de Pollo", description: "Riso, pollo, uovo, cipolla cinese, salsa di soia", price: { standard: 10 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "c7", categoryId: "cat_criollos", subcategory: "Todas", name: "Tallarin Saltado de Carne", description: "Pasta, salsa de soia, pomodoro, cipolla manzo, cipolla cinese", price: { standard: 17 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "m1", categoryId: "cat_marinos", subcategory: "Entradas", name: "Leche de Tigre", description: "Succo di ceviche mixto, lime, sale e spezie", price: { standard: 12 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "m2", categoryId: "cat_marinos", subcategory: "Entradas", name: "Leche de Tigre Mantas", description: "Succo di ceviche mixto, lime, sale e spezie", price: { standard: 22 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "m3", categoryId: "cat_marinos", subcategory: "Entradas", name: "Causa Acevichada", description: "Torta de patate, persico marinato in lime e spezie varie", price: { standard: 16 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "m4", categoryId: "cat_marinos", subcategory: "Entradas", name: "Choritos a la Chalaca", description: "Cozze ripiene di cipolla, pomodoro, rocoto e lima", price: { standard: 12 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "m5", categoryId: "cat_marinos", subcategory: "Ceviches", name: "Ceviche de Pescado Mantas", description: "Pesce persico marinato in lime con spezie varie", price: { standard: 17 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "m6", categoryId: "cat_marinos", subcategory: "Ceviches", name: "Ceviche Mixto Mantas", description: "Pesce, frutti di mare marinate in lime conditi con spezie varie", price: { standard: 20 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "m7", categoryId: "cat_marinos", subcategory: "Ceviches", name: "Ceviche 3 Sabores Mantas", description: "Pesce, gamberi, polpo, frutti di mare in lime conditi", price: { standard: 22 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "m8", categoryId: "cat_marinos", subcategory: "Ceviches", name: "Tiradito Aji Amarillo", description: "Pesce, limone, peperoncino giallo, rocoto, patate dolci, mais", price: { standard: 17 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "m9", categoryId: "cat_marinos", subcategory: "Ceviches", name: "Tiradito Nikkei", description: "Pesce, limone, salsa di ostriche, salsa de soia", price: { standard: 17 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "m10", categoryId: "cat_marinos", subcategory: "Ceviches", name: "Ceviche Carretillero Estilo Mantas", description: "Pesce, limone, salsa di ostriche, salsa de soia", price: { standard: 17 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "m11", categoryId: "cat_marinos", subcategory: "Combos", name: "Chicharron de Pescado / Ceviche", description: "Pesce persico en fletti, manioca fritta e salsa criolla, pesce, frutti di mare", price: { standard: 30 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "m12", categoryId: "cat_marinos", subcategory: "Combos", name: "Ceviche / Arroz con Mariscos", description: "Pesce, frutti di mare marinate in lime conditi con spezie varie, riso e gamberi", price: { standard: 30 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "m13", categoryId: "cat_marinos", subcategory: "Combos", name: "Chicharron de Pescado / Arroz con Mariscos", description: "Pesce persico en fletti, manioca fritta e salsa criolla, riso e gamberi", price: { standard: 30 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "m14", categoryId: "cat_marinos", subcategory: "Adicionales", name: "Pescado Frito", description: "Pesce fritto (intero o fletto), riso, manioca fritta, insalata", price: { standard: 17 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "m15", categoryId: "cat_marinos", subcategory: "Adicionales", name: "Pescado a lo Macho", description: "Crema di frutta di mare, pesce e riso", price: { standard: 20 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "m16", categoryId: "cat_marinos", subcategory: "Adicionales", name: "Pescado en Salsa de Mariscos", description: "Riso, pesce e frutti di mare", price: { standard: 20 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "m17", categoryId: "cat_marinos", subcategory: "Adicionales", name: "Sudado de Pescado", description: "Zuppa di pesce e frutti di mare", price: { standard: 18 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "m18", categoryId: "cat_marinos", subcategory: "Adicionales", name: "Parihuela", description: "Zuppa di pesce e frutti di mare", price: { standard: 23 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "m19", categoryId: "cat_marinos", subcategory: "Adicionales", name: "Jalea Mixta", description: "Pesce persico in fletti, frutti di mare, manioca fritta e salsa criolla", price: { standard: 20 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "m20", categoryId: "cat_marinos", subcategory: "Adicionales", name: "Chicharron de Pescado", description: "Pesce persico in fletti, manioca fritta e salsa criolla", price: { standard: 17 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "m21", categoryId: "cat_marinos", subcategory: "Adicionales", name: "Arroz con Mariscos Mantas", description: "Riso, frutti di mare, spezie", price: { standard: 20 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "m22", categoryId: "cat_marinos", subcategory: "Adicionales", name: "Chaufa de Mariscos", description: "Riso, salsa si soia, frutti di mare, uovo, cipolloti", price: { standard: 18 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "m23", categoryId: "cat_marinos", subcategory: "Adicionales", name: "Arroz de Puerto", description: "Riso, salsa si soia, frutti di mare, uovo, cipolloti e coreando", price: { standard: 20 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "b1", categoryId: "cat_bebidas", subcategory: "Todas", name: "Chicha Morada 1 Lt.", description: "", price: { standard: 10 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "b2", categoryId: "cat_bebidas", subcategory: "Todas", name: "Coca Cola", description: "", price: { standard: 5 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "b3", categoryId: "cat_bebidas", subcategory: "Todas", name: "Inca Kola Original", description: "", price: { standard: 10 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "b4", categoryId: "cat_bebidas", subcategory: "Todas", name: "Inca Kola", description: "", price: { standard: 5 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "b5", categoryId: "cat_bebidas", subcategory: "Todas", name: "Agua Natural", description: "", price: { standard: 2 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "b6", categoryId: "cat_bebidas", subcategory: "Todas", name: "Agua Frizzante", description: "", price: { standard: 2 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "b7", categoryId: "cat_bebidas", subcategory: "Todas", name: "Birra Moretti", description: "", price: { standard: 3 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "b8", categoryId: "cat_bebidas", subcategory: "Todas", name: "Birra Cusqueña", description: "", price: { standard: 4 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "b9", categoryId: "cat_bebidas", subcategory: "Todas", name: "Corona", description: "", price: { standard: 3 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "b10", categoryId: "cat_bebidas", subcategory: "Todas", name: "Coca Cola / The (Latina)", description: "", price: { standard: 2 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "p1", categoryId: "cat_pollo", subcategory: "Todas", name: "1/4 Pollo a la Brasa", description: "Bebite in lata, patatine fritte, insalata e 3 salse", price: { standard: 12, delivery: 12, table: 12 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "p2", categoryId: "cat_pollo", subcategory: "Todas", name: "Mezzo Pollo a la Brasa", description: "Bebite 1/1.2 Lt., patatine fritte, insalata e 3 salse", price: { standard: 25, delivery: 20, table: 25 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "p3", categoryId: "cat_pollo", subcategory: "Todas", name: "1 Pollo a la Brasa Entero", description: "Bebite 1/1.2 Lt., patatine fritte, insalata e 3 salse", price: { standard: 40, delivery: 35, table: 40 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
];
// --- FIN BASE DE DATOS TEMPORAL ---

function CategoryContent() {
  const router = useRouter();
  const params = useParams();
  const categoria_id = params?.categoria_id as string;
  
  const currentCategory = categoriasDB[categoria_id];
  
  if (!currentCategory) {
    return <div className="p-10 text-white">Categoría no encontrada. Verifica la URL.</div>;
  }

  const [activeTab, setActiveTab] = useState<string>(currentCategory.subcategories[0]);
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);

  const addItemToCart = useCartStore(state => state.addItem);

  const filteredDishes = platosDB.filter(
    dish => dish.categoryId === currentCategory.id && dish.subcategory === activeTab
  );

  const handleAddDish = (dish: Dish) => setSelectedDish(dish);
  const handleConfirmAdd = (dish: Dish, quantity: number, notes: string) => addItemToCart(dish);

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

        {/* Cinta textil andina bajo el encabezado */}
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

      <CartFloatingButton />
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