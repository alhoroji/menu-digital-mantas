// src/app/admin/page.tsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Lock, Utensils, Tag, Moon, Save, Plus, 
  Trash2, Check, AlertCircle, Eye, EyeOff, Search 
} from 'lucide-react';
import { DAILY_MENUS, DailyMenuItem, NIGHT_PROMOS } from '@/features/menu/config/spotlight.config';
import { PLATOS_DB } from '@/features/menu/services/menu.service';
import { Dish } from '@/core/types/menu.types';

const ADMIN_PIN = "1234"; // PIN de acceso rápido (personalizable)
const BUCKET_URL = "https://jclzrvizljglhhndkmvo.supabase.co/storage/v1/object/public/platos";

export default function AdminDashboardPage() {
  // 1. ESTADO DE AUTENTICACIÓN
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  // 2. NAVEGACIÓN DE PESTAÑAS DEL PANEL
  const [activeTab, setActiveTab] = useState<'menu_dia' | 'carta_precios' | 'promos'>('menu_dia');

  // 3. ESTADOS EDITABLES
  const [dailyMenus, setDailyMenus] = useState(DAILY_MENUS);
  const [selectedDayKey, setSelectedDayKey] = useState<'martes' | 'miercoles' | 'jueves' | 'viernes'>('martes');
  
  const [dishesList, setDishesList] = useState<Dish[]>(PLATOS_DB);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('ALL');

  const [savedNotice, setSavedNotice] = useState(false);

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

  // ACTUALIZAR PRECIO O DISPONIBILIDAD DE UN PLATO DE LA CARTA
  const handleUpdatePrice = (dishId: string, newPrice: number) => {
    setDishesList(prev => prev.map(d => d.id === dishId ? { ...d, price: { ...d.price, standard: newPrice } } : d));
  };

  const handleToggleSoldOut = (dishId: string) => {
    setDishesList(prev => prev.map(d => d.id === dishId ? { ...d, isSoldOut: !d.isSoldOut } : d));
  };

  // ACTUALIZAR MENÚ DEL DÍA
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
    handleUpdateDailyMenuField(type, [...currentList, "Nuovo piatto"]);
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

  const handleSaveAll = () => {
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
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
            Mantas Milano Admin
          </h1>
          <p className="text-xs text-zinc-400 mt-1 mb-6">
            Inserisci il PIN per gestire prezzi, menù e promozioni
          </p>

          <form onSubmit={handleLogin} className="w-full space-y-4">
            <div>
              <input
                type="password"
                inputMode="numeric"
                maxLength={6}
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="PIN di Accesso"
                className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl py-3 px-4 text-center text-2xl font-mono tracking-widest text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                autoFocus
              />
              {pinError && (
                <p className="text-xs text-red-400 mt-2 flex items-center justify-center gap-1">
                  <AlertCircle size={13} /> PIN errato. Riprova.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-500 to-amber-400 text-black font-black text-xs py-3.5 rounded-xl uppercase tracking-wider active:scale-95 transition-transform"
            >
              Accedi al Pannello
            </button>
          </form>
        </div>
      </main>
    );
  }

  // FILTRADO DE PLATOS
  const filteredDishes = dishesList.filter(d => {
    const matchesSearch = d.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategoryFilter === 'ALL' || d.categoryId === selectedCategoryFilter;
    return matchesSearch && matchesCat;
  });

  // PANTALLA 2: PANEL DE ADMINISTRACIÓN PRINCIPAL
  return (
    <main className="min-h-screen bg-[#07070a] text-zinc-100 pb-20">
      
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
            <span className="text-[10px] text-emerald-400 font-mono block">● Sistema Operativo</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSaveAll}
            className="flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-black py-2 px-3.5 rounded-xl shadow-md active:scale-95 transition-all"
          >
            <Save size={14} />
            <span>Salva Modifiche</span>
          </button>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="text-xs text-zinc-400 hover:text-white px-2 py-1.5"
          >
            Esci
          </button>
        </div>
      </header>

      {/* Aviso de confirmación de guardado */}
      {savedNotice && (
        <div className="bg-emerald-500/15 border-b border-emerald-500/30 text-emerald-300 text-xs py-2 px-4 text-center font-bold flex items-center justify-center gap-1.5 animate-in fade-in">
          <Check size={14} /> Modifiche salvate con successo.
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
            <span className="truncate">Menù del Giorno</span>
          </button>

          <button
            onClick={() => setActiveTab('carta_precios')}
            className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-black transition-all ${
              activeTab === 'carta_precios' ? 'bg-amber-400 text-black shadow-md' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Tag size={14} />
            <span className="truncate">Prezzi Carta</span>
          </button>

          <button
            onClick={() => setActiveTab('promos')}
            className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-black transition-all ${
              activeTab === 'promos' ? 'bg-amber-400 text-black shadow-md' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Moon size={14} />
            <span className="truncate">Promozioni</span>
          </button>
        </div>

        {/* ================= PESTAÑA 1: MENÚ DEL DÍA ================= */}
        {activeTab === 'menu_dia' && (
          <div className="space-y-5">
            {/* Selector del día de la semana */}
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

            {/* Formulario del día activo */}
            <div className="bg-zinc-950 border border-zinc-800/80 rounded-3xl p-5 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-900 pb-4">
                <div>
                  <h2 className="text-base font-black font-serif text-white">
                    Menù Fisso di {dailyMenus[selectedDayKey].dayName}
                  </h2>
                  <p className="text-xs text-zinc-400">
                    Attivo dalle 22:00 del giorno precedente fino alle 15:30
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-xs font-bold text-zinc-300">Prezzo (€):</label>
                  <input
                    type="number"
                    step="0.5"
                    value={dailyMenus[selectedDayKey].price}
                    onChange={(e) => handleUpdateDailyMenuField('price', parseFloat(e.target.value) || 0)}
                    className="w-24 bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-1.5 text-base font-mono font-bold text-amber-400 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Plato destacado en el Banner */}
              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1">
                  Frase in Evidenza (Titolo Banner):
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
                    Opzioni Primo Piatto (Entradas)
                  </span>
                  <button
                    onClick={() => handleAddOption('entradas')}
                    className="text-xs text-amber-400 hover:underline flex items-center gap-1 font-bold"
                  >
                    <Plus size={13} /> Aggiungi
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
                    Opzioni Secondo Piatto (Segundos)
                  </span>
                  <button
                    onClick={() => handleAddOption('segundos')}
                    className="text-xs text-amber-400 hover:underline flex items-center gap-1 font-bold"
                  >
                    <Plus size={13} /> Aggiungi
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
                  Bevanda / Incluso nel Prezzo:
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

        {/* ================= PESTAÑA 2: CARTA GENERAL Y PRECIOS ================= */}
        {activeTab === 'carta_precios' && (
          <div className="space-y-4">
            {/* Buscador y Filtro */}
            <div className="flex flex-col sm:flex-row gap-2.5">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3.5 top-3 text-zinc-500" />
                <input
                  type="text"
                  placeholder="Cerca piatto (es. Ceviche, Chaufa, Pollo...)"
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
                <option value="ALL">Tutte le categorie</option>
                <option value="cat_marinos">Platos Marinos</option>
                <option value="cat_criollos">Platos Criollos</option>
                <option value="cat_pollo">Pollo a la Brasa</option>
                <option value="cat_entradas">Entradas</option>
                <option value="cat_bebidas">Bebidas</option>
                <option value="cat_desayunos">Desayunos Criollos</option>
              </select>
            </div>

            {/* Lista de Platos */}
            <div className="bg-zinc-950 border border-zinc-800/80 rounded-3xl divide-y divide-zinc-900 overflow-hidden">
              {filteredDishes.map((dish) => {
                const currentPrice = dish.price.standard || 0;
                return (
                  <div key={dish.id} className="p-3.5 sm:p-4 flex items-center justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-white font-serif truncate">
                          {dish.name}
                        </h3>
                        {dish.isSoldOut && (
                          <span className="text-[9px] bg-red-500/20 border border-red-500/40 text-red-400 px-1.5 py-0.5 rounded font-black shrink-0">
                            ESAURITO
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-zinc-500 block uppercase tracking-wider">
                        {dish.categoryId.replace('cat_', '')} {dish.subcategory !== 'Todas' ? `• ${dish.subcategory}` : ''}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      {/* Input de Precio */}
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-mono text-zinc-400">€</span>
                        <input
                          type="number"
                          step="0.5"
                          value={currentPrice}
                          onChange={(e) => handleUpdatePrice(dish.id, parseFloat(e.target.value) || 0)}
                          className="w-16 bg-zinc-900 border border-zinc-800 rounded-xl px-2 py-1.5 text-center text-sm font-mono font-bold text-amber-400 focus:outline-none focus:border-amber-400"
                        />
                      </div>

                      {/* Botón Disponible / Agotado */}
                      <button
                        onClick={() => handleToggleSoldOut(dish.id)}
                        title={dish.isSoldOut ? "Rendi disponibile" : "Segna come esaurito"}
                        className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-colors ${
                          dish.isSoldOut 
                            ? 'bg-red-500/10 border-red-500/30 text-red-400' 
                            : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                        }`}
                      >
                        {dish.isSoldOut ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= PESTAÑA 3: PROMOS DE NOCHE ================= */}
        {activeTab === 'promos' && (
          <div className="bg-zinc-950 border border-zinc-800/80 rounded-3xl p-5 space-y-4">
            <h2 className="text-base font-black font-serif text-white">
              Promozioni Notturne (15:30 – 22:00)
            </h2>
            <p className="text-xs text-zinc-400">
              Queste promozioni ruotano automaticamente nel banner serale in base al giorno della settimana.
            </p>

            <div className="space-y-3 pt-2">
              {[
                { day: "Martes", data: NIGHT_PROMOS[2] },
                { day: "Miércoles", data: NIGHT_PROMOS[3] },
                { day: "Jueves", data: NIGHT_PROMOS[4] },
                { day: "Viernes", data: NIGHT_PROMOS[5] },
                { day: "Sábado", data: NIGHT_PROMOS[6] },
                { day: "Domingo", data: NIGHT_PROMOS[0] }
              ].map((item, idx) => (
                <div key={idx} className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-3.5 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-fuchsia-400 block">
                      {item.day} • {item.data?.badge}
                    </span>
                    <h3 className="text-xs font-bold text-white mt-0.5">{item.data?.title}</h3>
                    <p className="text-[11px] text-zinc-400">{item.data?.subtitle}</p>
                  </div>
                  <span className="text-xs font-mono font-bold text-amber-400 bg-zinc-950 px-2.5 py-1 rounded-lg border border-zinc-800 shrink-0">
                    {item.data?.priceTag}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </main>
  );
}