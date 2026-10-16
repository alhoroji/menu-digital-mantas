// src/app/admin/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  Lock, Utensils, Tag, Moon, Save, Plus, 
  Trash2, Check, AlertCircle, Eye, EyeOff, Search, Loader2 
} from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { DAILY_MENUS, DailyMenuItem, NIGHT_PROMOS, PromoNightItem } from '@/features/menu/config/spotlight.config';
import { PLATOS_DB } from '@/features/menu/services/menu.service';
import { Dish } from '@/core/types/menu.types';

const ADMIN_PIN = "1234"; // PIN de acceso rápido
const BUCKET_URL = "https://jclzrvizljglhhndkmvo.supabase.co/storage/v1/object/public/platos";

export default function AdminDashboardPage() {
  // 1. ESTADO DE AUTENTICACIÓN
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  // 2. NAVEGACIÓN DE PESTAÑAS DEL PANEL
  const [activeTab, setActiveTab] = useState<'menu_dia' | 'carta_precios' | 'promos'>('carta_precios');

  // 3. ESTADOS EDITABLES (Menú del día, Platos de la Carta y Promociones Nocturnas)
  const [dailyMenus, setDailyMenus] = useState<Record<string, DailyMenuItem>>(DAILY_MENUS);
  const [selectedDayKey, setSelectedDayKey] = useState<'martes' | 'miercoles' | 'jueves' | 'viernes'>('martes');
   
  const [dishesList, setDishesList] = useState<Dish[]>(PLATOS_DB);
  const [nightPromos, setNightPromos] = useState<Record<number, PromoNightItem>>(NIGHT_PROMOS);
   
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('ALL');

  // Estados de guardado y confirmación de borrado
  const [isSaving, setIsSaving] = useState(false);
  const [savedNotice, setSavedNotice] = useState(false);
  const [dishToDelete, setDishToDelete] = useState<{ id: string; name: string } | null>(null);

  // 4. CARGAR DATOS DESDE SUPABASE AL INICIAR SESIÓN
  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchDatabaseData = async () => {
      try {
        // A. Cargar Menús del Día
        const { data: dbMenus } = await supabase
          .from('daily_menus')
          .select('*')
          .eq('restaurant_slug', 'mantas');

        if (dbMenus && dbMenus.length > 0) {
          const formattedMenus: Record<string, DailyMenuItem> = { ...DAILY_MENUS };
          dbMenus.forEach((m: any) => {
            formattedMenus[m.day_key] = {
              dayKey: m.day_key,
              dayName: m.day_name,
              price: Number(m.price),
              destacado: m.destacado,
              entradas: Array.isArray(m.entradas) ? m.entradas : [],
              segundos: Array.isArray(m.segundos) ? m.segundos : [],
              incluye: m.incluye,
              image: m.image
            };
          });
          setDailyMenus(formattedMenus);
        }

        // B. Cargar Platos de la Carta
        const { data: dbDishes } = await supabase
          .from('dishes')
          .select('*')
          .eq('restaurant_slug', 'mantas');

        if (dbDishes && dbDishes.length > 0) {
          setDishesList(dbDishes.map((d: any) => ({
            id: d.id,
            categoryId: d.category_id,
            subcategory: d.subcategory || 'Todas',
            name: d.name,
            description: d.description || '',
            price: { standard: Number(d.price_standard) },
            imageUrl: d.image_url || null,
            tags: Array.isArray(d.tags) ? d.tags : [],
            scheduleCondition: 'always',
            modifiers: [],
            isSoldOut: Boolean(d.is_sold_out)
          })));
        }

        // C. Cargar Promociones Nocturnas
        const { data: dbPromos } = await supabase
          .from('night_promos')
          .select('*')
          .eq('restaurant_slug', 'mantas');

        if (dbPromos && dbPromos.length > 0) {
          const formattedPromos: Record<number, PromoNightItem> = { ...NIGHT_PROMOS };
          dbPromos.forEach((p: any) => {
            formattedPromos[p.day_number] = {
              badge: p.badge,
              title: p.title,
              subtitle: p.subtitle,
              priceTag: p.price_tag,
              image: p.image || NIGHT_PROMOS[p.day_number]?.image || ''
            };
          });
          setNightPromos(formattedPromos);
        }
      } catch (err) {
        console.error("Error al cargar datos desde Supabase:", err);
      }
    };

    fetchDatabaseData();
  }, [isAuthenticated]);

  // MANEJO DE LOGIN POR PIN
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === ADMIN_PIN) {
      setIsAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
      setPinInput('');
    }
  };

  // ================= FUNCIONES PARA EDITAR LA CARTA GENERAL =================
  const handleUpdateDishField = (
    dishId: string, 
    field: 'name' | 'description' | 'categoryId' | 'standardPrice' | 'isSoldOut', 
    value: any
  ) => {
    setDishesList(prev => prev.map(d => {
      if (d.id !== dishId) return d;
      if (field === 'standardPrice') {
        return { ...d, price: { ...d.price, standard: parseFloat(value) || 0 } };
      }
      return { ...d, [field]: value };
    }));
  };

  // Agregar un nuevo plato a la carta
  const handleAddNewDish = () => {
    const newId = `dish_${Date.now()}`;
    const defaultCategory = selectedCategoryFilter === 'ALL' ? 'cat_criollos' : selectedCategoryFilter;
    const newDish: Dish = {
      id: newId,
      categoryId: defaultCategory,
      subcategory: 'Todas',
      name: 'Nuevo Plato',
      description: 'Descripción o ingredientes del plato...',
      price: { standard: 15.00 },
      imageUrl: null,
      tags: [],
      scheduleCondition: 'always',
      modifiers: [],
      isSoldOut: false
    };
    setDishesList(prev => [newDish, ...prev]);
  };

  // Confirmar eliminación de un plato (también lo borra de Supabase)
  const handleConfirmDeleteDish = async () => {
    if (!dishToDelete) return;
    const targetId = dishToDelete.id;
    setDishesList(prev => prev.filter(d => d.id !== targetId));
    setDishToDelete(null);

    try {
      await supabase.from('dishes').delete().eq('id', targetId);
    } catch (err) {
      console.error("Error al eliminar plato en Supabase:", err);
    }
  };

  // ================= FUNCIONES PARA EDITAR PROMOCIONES NOCTURNAS =================
  const handleUpdatePromoField = (dayNum: number, field: keyof PromoNightItem, value: string) => {
    setNightPromos(prev => ({
      ...prev,
      [dayNum]: {
        ...prev[dayNum],
        [field]: value
      }
    }));
  };

  // ================= FUNCIONES PARA EDITAR EL MENÚ DEL DÍA =================
  const handleUpdateDailyMenuField = (field: keyof DailyMenuItem, value: any) => {
    setDailyMenus(prev => ({
      ...prev,
      [selectedDayKey]: {
        ...prev[selectedDayKey],
        [field]: value
      }
    }));
  };

  const handleAddOption = (type: 'entradas' | 'segundos') => {
    const currentList = dailyMenus[selectedDayKey][type];
    handleUpdateDailyMenuField(type, [...currentList, "Nuevo plato"]);
  };

  const handleRemoveOption = (type: 'entradas' | 'segundos', index: number) => {
    const currentList = dailyMenus[selectedDayKey][type].filter((_, i) => i !== index);
    handleUpdateDailyMenuField(type, currentList);
  };

  const handleEditOptionText = (type: 'entradas' | 'segundos', index: number, newText: string) => {
    const currentList = [...dailyMenus[selectedDayKey][type]];
    currentList[index] = newText;
    handleUpdateDailyMenuField(type, currentList);
  };

  // ================= GUARDAR TODOS LOS CAMBIOS EN SUPABASE =================
  const handleSaveAll = async () => {
    setIsSaving(true);
    try {
      // 1. Guardar todos los días del Menú del Día
      const menusPayload = Object.entries(dailyMenus).map(([key, item]) => ({
        day_key: key,
        restaurant_slug: 'mantas',
        day_name: item.dayName,
        price: item.price,
        destacado: item.destacado,
        entradas: item.entradas,
        segundos: item.segundos,
        incluye: item.incluye,
        image: item.image,
        updated_at: new Date().toISOString()
      }));
      await supabase.from('daily_menus').upsert(menusPayload, { onConflict: 'day_key' });

      // 2. Guardar todos los Platos de la Carta
      const dishesPayload = dishesList.map(dish => ({
        id: dish.id,
        restaurant_slug: 'mantas',
        category_id: dish.categoryId,
        subcategory: dish.subcategory || 'Todas',
        name: dish.name,
        description: dish.description || '',
        price_standard: dish.price.standard,
        is_sold_out: dish.isSoldOut || false,
        updated_at: new Date().toISOString()
      }));
      await supabase.from('dishes').upsert(dishesPayload, { onConflict: 'id' });

      // 3. Guardar todas las Promociones Nocturnas
      const promosPayload = Object.entries(nightPromos).map(([dayNum, promo]) => ({
        day_number: parseInt(dayNum),
        restaurant_slug: 'mantas',
        badge: promo.badge,
        title: promo.title,
        subtitle: promo.subtitle,
        price_tag: promo.priceTag,
        image: promo.image,
        updated_at: new Date().toISOString()
      }));
      await supabase.from('night_promos').upsert(promosPayload, { onConflict: 'day_number' });

      setSavedNotice(true);
      setTimeout(() => setSavedNotice(false), 3000);
    } catch (error) {
      console.error("Error al guardar en Supabase:", error);
      alert("Hubo un error al guardar los cambios en la nube.");
    } finally {
      setIsSaving(false);
    }
  };

  // PANTALLA 1: BLOQUEO POR PIN
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-[#07070a] text-white flex items-center justify-center p-4">
        <div className="w-full max-w-sm bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4">
            <Lock size={26} />
          </div>

          <h1 className="text-xl font-black font-serif tracking-wide text-white">
            Mantas Admin
          </h1>
          <p className="text-xs text-zinc-400 mt-1 mb-6">
            Ingresa el PIN para gestionar precios, platos y promociones
          </p>

          <form onSubmit={handleLogin} className="w-full space-y-4">
            <div>
              <input
                type="password"
                inputMode="numeric"
                maxLength={6}
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="PIN de Acceso"
                className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl py-3 px-4 text-center text-2xl font-mono tracking-widest text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                autoFocus
              />
              {pinError && (
                <p className="text-xs text-red-400 mt-2 flex items-center justify-center gap-1">
                  <AlertCircle size={13} /> PIN incorrecto. Intenta de nuevo.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-500 to-amber-400 text-black font-black text-xs py-3.5 rounded-xl uppercase tracking-wider active:scale-95 transition-transform"
            >
              Entrar al Panel
            </button>
          </form>
        </div>
      </main>
    );
  }

  // FILTRADO DE PLATOS
  const filteredDishes = dishesList.filter(d => {
    const matchesSearch = d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (d.description || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategoryFilter === 'ALL' || d.categoryId === selectedCategoryFilter;
    return matchesSearch && matchesCat;
  });

  // PANTALLA 2: PANEL DE ADMINISTRACIÓN PRINCIPAL
  return (
    <main className="min-h-screen bg-[#07070a] text-zinc-100 pb-24 relative">
       
      {/* MODAL DE CONFIRMACIÓN PARA ELIMINAR PLATO */}
      {dishToDelete && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-xs bg-zinc-950 border border-zinc-800 rounded-3xl p-5 shadow-2xl text-center">
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 mx-auto mb-3">
              <Trash2 size={22} />
            </div>
            <h3 className="text-sm font-black font-serif text-white">
              ¿Eliminar este plato?
            </h3>
            <p className="text-xs text-zinc-400 mt-1 mb-5">
              Estás por eliminar <strong className="text-white">"{dishToDelete.name}"</strong> de la carta.
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setDishToDelete(null)}
                className="py-2.5 rounded-xl text-xs font-bold bg-zinc-900 border border-zinc-800 text-zinc-300"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmDeleteDish}
                className="py-2.5 rounded-xl text-xs font-black bg-red-500 text-white"
              >
                Sí, Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cabecera del Panel */}
      <header className="sticky top-0 z-30 bg-[#09090d]/95 backdrop-blur-md border-b border-zinc-800/80 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-zinc-800">
            <Image
              src={`${BUCKET_URL}/logomantas.png?v=2`}
              alt="Mantas Logo"
              fill
              className="object-contain"
              unoptimized
            />
          </div>
          <div>
            <h1 className="text-sm font-black font-serif text-white tracking-wide">
              Mantas Admin
            </h1>
            <span className="text-[10px] text-emerald-400 font-mono block">● Conectado a Supabase</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSaveAll}
            disabled={isSaving}
            className="flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-black text-xs font-black py-2 px-3.5 rounded-xl shadow-md active:scale-95 transition-all"
          >
            {isSaving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            <span>{isSaving ? 'Guardando...' : 'Guardar Cambios'}</span>
          </button>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="text-xs text-zinc-400 hover:text-white px-2 py-1.5"
          >
            Salir
          </button>
        </div>
      </header>

      {/* Aviso de confirmación de guardado */}
      {savedNotice && (
        <div className="bg-emerald-500/15 border-b border-emerald-500/30 text-emerald-300 text-xs py-2.5 px-4 text-center font-bold flex items-center justify-center gap-1.5 animate-in fade-in">
          <Check size={15} /> ¡Cambios guardados y sincronizados en Supabase correctamente!
        </div>
      )}

      {/* Selector de Pestañas Principales */}
      <div className="max-w-4xl mx-auto px-4 pt-5">
        <div className="grid grid-cols-3 gap-1.5 bg-zinc-950 p-1.5 rounded-2xl border border-zinc-800/80 mb-6">
          <button
            onClick={() => setActiveTab('menu_dia')}
            className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-black transition-all ${
              activeTab === 'menu_dia' ? 'bg-amber-400 text-black shadow-md' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Utensils size={14} />
            <span className="truncate">Menú del Día</span>
          </button>

          <button
            onClick={() => setActiveTab('carta_precios')}
            className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-black transition-all ${
              activeTab === 'carta_precios' ? 'bg-amber-400 text-black shadow-md' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Tag size={14} />
            <span className="truncate">Precios de Carta</span>
          </button>

          <button
            onClick={() => setActiveTab('promos')}
            className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-black transition-all ${
              activeTab === 'promos' ? 'bg-amber-400 text-black shadow-md' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Moon size={14} />
            <span className="truncate">Promociones</span>
          </button>
        </div>

        {/* ================= PESTAÑA 1: MENÚ DEL DÍA ================= */}
        {activeTab === 'menu_dia' && (
          <div className="space-y-5">
            <div className="flex gap-2 overflow-x-auto pb-1">
              {(['martes', 'miercoles', 'jueves', 'viernes'] as const).map((key) => {
                const dayObj = dailyMenus[key];
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedDayKey(key)}
                    className={`flex-1 min-w-[90px] py-2.5 px-3 rounded-2xl text-xs font-black border transition-all ${
                      selectedDayKey === key
                        ? 'bg-zinc-900 border-amber-400 text-amber-400 shadow-sm'
                        : 'bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    {dayObj.dayName}
                  </button>
                );
              })}
            </div>

            <div className="bg-zinc-950 border border-zinc-800/80 rounded-3xl p-5 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-900 pb-4">
                <div>
                  <h2 className="text-base font-black font-serif text-white">
                    Menú Fijo de {dailyMenus[selectedDayKey].dayName}
                  </h2>
                  <p className="text-xs text-zinc-400">
                    Activo desde las 22:00 del día anterior hasta las 15:30
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-xs font-bold text-zinc-300">Precio (€):</label>
                  <input
                    type="number"
                    step="0.5"
                    value={dailyMenus[selectedDayKey].price}
                    onChange={(e) => handleUpdateDailyMenuField('price', parseFloat(e.target.value) || 0)}
                    className="w-24 bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-1.5 text-base font-mono font-bold text-amber-400 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1">
                  Plato Destacado (Subtítulo en el Banner Principal):
                </label>
                <input
                  type="text"
                  value={dailyMenus[selectedDayKey].destacado}
                  onChange={(e) => handleUpdateDailyMenuField('destacado', e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Lista de Entradas */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-amber-400">
                    Opciones de Entrada (Primo Piatto)
                  </span>
                  <button
                    onClick={() => handleAddOption('entradas')}
                    className="text-xs text-amber-400 hover:underline flex items-center gap-1 font-bold"
                  >
                    <Plus size={13} /> Agregar Entrada
                  </button>
                </div>
                {dailyMenus[selectedDayKey].entradas.map((entrada, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={entrada}
                      onChange={(e) => handleEditOptionText('entradas', idx, e.target.value)}
                      className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                    />
                    <button
                      onClick={() => handleRemoveOption('entradas', idx)}
                      className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-red-400 flex items-center justify-center shrink-0"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Lista de Segundos */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-amber-400">
                    Opciones de Segundo (Secondo Piatto)
                  </span>
                  <button
                    onClick={() => handleAddOption('segundos')}
                    className="text-xs text-amber-400 hover:underline flex items-center gap-1 font-bold"
                  >
                    <Plus size={13} /> Agregar Segundo
                  </button>
                </div>
                {dailyMenus[selectedDayKey].segundos.map((segundo, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={segundo}
                      onChange={(e) => handleEditOptionText('segundos', idx, e.target.value)}
                      className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                    />
                    <button
                      onClick={() => handleRemoveOption('segundos', idx)}
                      className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-red-400 flex items-center justify-center shrink-0"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Incluye */}
              <div className="pt-2">
                <label className="block text-xs font-bold text-zinc-300 mb-1">
                  Bebida / Qué incluye el menú:
                </label>
                <input
                  type="text"
                  value={dailyMenus[selectedDayKey].incluye}
                  onChange={(e) => handleUpdateDailyMenuField('incluye', e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>
          </div>
        )}

        {/* ================= PESTAÑA 2: CARTA GENERAL Y PRECIOS (100% EDITABLE) ================= */}
        {activeTab === 'carta_precios' && (
          <div className="space-y-4">
            {/* Buscador, Filtro de Categoría y Botón de Nuevo Plato */}
            <div className="flex flex-col sm:flex-row gap-2.5">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3.5 top-3 text-zinc-500" />
                <input
                  type="text"
                  placeholder="Buscar plato por nombre o ingrediente..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <select
                value={selectedCategoryFilter}
                onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                className="bg-zinc-950 border border-zinc-800 rounded-2xl px-3 py-2.5 text-xs font-bold text-zinc-300 focus:outline-none focus:border-amber-400"
              >
                <option value="ALL">Todas las categorías</option>
                <option value="cat_marinos">Platos Marinos</option>
                <option value="cat_criollos">Platos Criollos</option>
                <option value="cat_pollo">Pollo a la Brasa</option>
                <option value="cat_entradas">Entradas</option>
                <option value="cat_bebidas">Bebidas</option>
                <option value="cat_desayunos">Desayunos Criollos</option>
              </select>

              <button
                type="button"
                onClick={handleAddNewDish}
                className="bg-amber-400 hover:bg-amber-300 text-black text-xs font-black py-2.5 px-4 rounded-2xl flex items-center justify-center gap-1.5 shrink-0 shadow-sm active:scale-95 transition-all"
              >
                <Plus size={15} />
                <span>Nuevo Plato</span>
              </button>
            </div>

            {/* Lista de Platos con Inputs Editables */}
            <div className="space-y-3">
              {filteredDishes.map((dish) => {
                const currentPrice = dish.price.standard || 0;
                return (
                  <div 
                    key={dish.id} 
                    className="bg-zinc-950 border border-zinc-800/80 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-md"
                  >
                    {/* Campos para editar Nombre, Descripción y Categoría */}
                    <div className="flex-1 w-full space-y-2">
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={dish.name}
                          onChange={(e) => handleUpdateDishField(dish.id, 'name', e.target.value)}
                          placeholder="Nombre del plato"
                          className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-1.5 text-sm font-bold text-white font-serif focus:outline-none focus:border-amber-400"
                        />
                        {dish.isSoldOut && (
                          <span className="text-[9px] bg-red-500/20 border border-red-500/40 text-red-400 px-2 py-0.5 rounded font-black shrink-0">
                            AGOTADO
                          </span>
                        )}
                      </div>

                      <input
                        type="text"
                        value={dish.description || ''}
                        onChange={(e) => handleUpdateDishField(dish.id, 'description', e.target.value)}
                        placeholder="Descripción o ingredientes (opcional)"
                        className="w-full bg-zinc-900/60 border border-zinc-800/70 rounded-xl px-3 py-1.5 text-xs text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-amber-400"
                      />

                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-zinc-500 uppercase font-bold">Categoría:</span>
                        <select
                          value={dish.categoryId}
                          onChange={(e) => handleUpdateDishField(dish.id, 'categoryId', e.target.value)}
                          className="bg-zinc-900 border border-zinc-800 rounded-lg px-2 py-0.5 text-[11px] text-amber-400 font-semibold focus:outline-none"
                        >
                          <option value="cat_marinos">Platos Marinos</option>
                          <option value="cat_criollos">Platos Criollos</option>
                          <option value="cat_pollo">Pollo a la Brasa</option>
                          <option value="cat_entradas">Entradas</option>
                          <option value="cat_bebidas">Bebidas</option>
                          <option value="cat_desayunos">Desayunos Criollos</option>
                        </select>
                      </div>
                    </div>

                    {/* Controles de Precio, Disponible/Agotado y Eliminar */}
                    <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-zinc-900 shrink-0">
                      <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 rounded-xl px-2.5 py-1.5">
                        <span className="text-xs font-mono text-zinc-400">€</span>
                        <input
                          type="number"
                          step="0.5"
                          value={currentPrice}
                          onChange={(e) => handleUpdateDishField(dish.id, 'standardPrice', e.target.value)}
                          className="w-16 bg-transparent text-center text-sm font-mono font-bold text-amber-400 focus:outline-none"
                        />
                      </div>

                      {/* Botón Disponible / Agotado */}
                      <button
                        type="button"
                        onClick={() => handleUpdateDishField(dish.id, 'isSoldOut', !dish.isSoldOut)}
                        title={dish.isSoldOut ? "Marcar como disponible" : "Marcar como agotado"}
                        className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-colors ${
                          dish.isSoldOut 
                            ? 'bg-red-500/10 border-red-500/30 text-red-400' 
                            : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                        }`}
                      >
                        {dish.isSoldOut ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>

                      {/* Botón Eliminar Plato */}
                      <button
                        type="button"
                        onClick={() => setDishToDelete({ id: dish.id, name: dish.name })}
                        title="Eliminar plato"
                        className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-red-400 flex items-center justify-center transition-colors"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= PESTAÑA 3: PROMOS DE NOCHE (100% EDITABLE) ================= */}
        {activeTab === 'promos' && (
          <div className="space-y-4">
            <div className="bg-zinc-950 border border-zinc-800/80 rounded-3xl p-5">
              <h2 className="text-base font-black font-serif text-white">
                Promociones Nocturnas (15:30 – 22:00)
              </h2>
              <p className="text-xs text-zinc-400 mt-1">
                Edita el título, descripción y etiqueta de precio de cada noche. Al terminar, presiona arriba el botón verde "Guardar Cambios".
              </p>
            </div>

            <div className="space-y-4">
              {[
                { dayNum: 2, label: "Martes" },
                { dayNum: 3, label: "Miércoles" },
                { dayNum: 4, label: "Jueves" },
                { dayNum: 5, label: "Viernes" },
                { dayNum: 6, label: "Sábado" },
                { dayNum: 0, label: "Domingo" }
              ].map(({ dayNum, label }) => {
                const promo = nightPromos[dayNum] || {
                  badge: `${label.toUpperCase()} • PROMO`,
                  title: `Promo ${label}`,
                  subtitle: `Descripción de la promo...`,
                  priceTag: `Oferta`,
                  image: ''
                };

                return (
                  <div key={dayNum} className="bg-zinc-950 border border-zinc-800/80 rounded-3xl p-5 space-y-3 shadow-md">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-900 pb-3">
                      <span className="text-xs font-black uppercase tracking-wider text-fuchsia-400">
                        Noche de {label}
                      </span>

                      <div className="flex items-center gap-2">
                        <label className="text-xs font-bold text-zinc-400">Etiqueta de Precio / Promo:</label>
                        <input
                          type="text"
                          value={promo.priceTag}
                          onChange={(e) => handleUpdatePromoField(dayNum, 'priceTag', e.target.value)}
                          placeholder="Ej: Promo 2x1 o Solo €14.00"
                          className="bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs font-mono font-bold text-amber-400 focus:outline-none focus:border-amber-400"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-zinc-400 mb-1">
                          Badge Superior:
                        </label>
                        <input
                          type="text"
                          value={promo.badge}
                          onChange={(e) => handleUpdatePromoField(dayNum, 'badge', e.target.value)}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-amber-400"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-zinc-300 mb-1">
                          Título Principal de la Promo:
                        </label>
                        <input
                          type="text"
                          value={promo.title}
                          onChange={(e) => handleUpdatePromoField(dayNum, 'title', e.target.value)}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-sm font-bold text-white focus:outline-none focus:border-amber-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-zinc-400 mb-1">
                        Descripción / Qué incluye la promoción:
                      </label>
                      <input
                        type="text"
                        value={promo.subtitle}
                        onChange={(e) => handleUpdatePromoField(dayNum, 'subtitle', e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </main>
  );
}