// src/features/menu/hooks/useSpotlightBanner.ts
'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { 
  DAILY_MENUS, 
  NIGHT_PROMOS, 
  CHEF_RECOMMENDATION, 
  SUNDAY_BREAKFAST_PROMO,
  DailyMenuItem,
  PromoNightItem
} from '../config/spotlight.config';

export type BannerMode = 'menu_del_dia' | 'promo_noche' | 'desayuno_domingo' | 'chef';

export interface SpotlightState {
  mode: BannerMode;
  badge: string;
  title: string;
  subtitle: string;
  image: string;
  priceBadge?: string;
  dailyMenuData?: DailyMenuItem;
  promoNightData?: PromoNightItem;
  canOpenModal: boolean;
  shouldAutoOpen: boolean;
  sessionKey: string;
}

export function useSpotlightBanner(): SpotlightState {
  // Estados para almacenar los datos en vivo desde Supabase
  const [dbDailyMenus, setDbDailyMenus] = useState<Record<string, DailyMenuItem>>(DAILY_MENUS);
  const [dbNightPromos, setDbNightPromos] = useState<Record<number, PromoNightItem>>(NIGHT_PROMOS);

  const [state, setState] = useState<SpotlightState>({
    mode: 'chef',
    badge: CHEF_RECOMMENDATION.badge,
    title: CHEF_RECOMMENDATION.title,
    subtitle: CHEF_RECOMMENDATION.subtitle,
    image: CHEF_RECOMMENDATION.image,
    canOpenModal: true,
    shouldAutoOpen: false,
    sessionKey: 'chef_default'
  });

  // 1. Sincronizar con Supabase para reflejar cambios del admin en tiempo real
  useEffect(() => {
    async function fetchLivePromos() {
      try {
        const [{ data: menusData }, { data: promosData }] = await Promise.all([
          supabase.from('daily_menus').select('*'),
          supabase.from('night_promos').select('*')
        ]);

        if (menusData && menusData.length > 0) {
          const mappedMenus: Record<string, DailyMenuItem> = { ...DAILY_MENUS };
          menusData.forEach((row: any) => {
            mappedMenus[row.day_key] = {
              dayName: row.day_name,
              price: Number(row.price),
              destacado: row.destacado,
              entradas: (Array.isArray(row.entradas) ? row.entradas : []) as string[],
              segundos: (Array.isArray(row.segundos) ? row.segundos : []) as string[],
              incluye: row.incluye,
              image: row.image
            } as DailyMenuItem;
          });
          setDbDailyMenus(mappedMenus);
        }

        if (promosData && promosData.length > 0) {
          const mappedPromos: Record<number, PromoNightItem> = { ...NIGHT_PROMOS };
          promosData.forEach((row: any) => {
            mappedPromos[Number(row.day_number)] = {
              badge: row.badge,
              title: row.title,
              subtitle: row.subtitle,
              priceTag: row.price_tag,
              image: row.image
            } as PromoNightItem;
          });
          setDbNightPromos(mappedPromos);
        }
      } catch (err) {
        console.error('Usando configuración local de respaldo para Spotlight:', err);
      }
    }
    fetchLivePromos();
  }, []);

  // 2. Evaluar horario y determinar qué pantalla emergente mostrar
  useEffect(() => {
    const calculateBanner = () => {
      const now = new Date();
      const day = now.getDay(); // 0 = Domingo, 1 = Lunes, 2 = Martes, etc.
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const timeDecimal = hours + minutes / 60; // Ej: 12:30 = 12.5

      // -------------------------------------------------------------
      // REGLA 1: DESAYUNOS DE DOMINGO (Sábado 22:00 a Domingo 13:00)
      // -------------------------------------------------------------
      const isSundayBreakfastTime = (day === 6 && timeDecimal >= 22.0) || (day === 0 && timeDecimal < 13.0);
      if (isSundayBreakfastTime) {
        setState({
          mode: 'desayuno_domingo',
          badge: SUNDAY_BREAKFAST_PROMO.badge,
          title: SUNDAY_BREAKFAST_PROMO.title,
          subtitle: 'Toca para ver los desayunos y opciones de delivery.',
          image: SUNDAY_BREAKFAST_PROMO.image,
          priceBadge: 'Delivery Disponible',
          canOpenModal: true,
          shouldAutoOpen: true, // Salta solo al entrar
          sessionKey: 'mantas_auto_desayuno'
        });
        return;
      }

      // -------------------------------------------------------------
      // REGLA 2: MENÚ DEL DÍA (Martes a Viernes, de 10:30 a 15:30)
      // -------------------------------------------------------------
      let targetDailyKey: 'martes' | 'miercoles' | 'jueves' | 'viernes' | null = null;
      
      if (timeDecimal >= 10.5 && timeDecimal < 15.5) {
        if (day === 2) targetDailyKey = 'martes';
        else if (day === 3) targetDailyKey = 'miercoles';
        else if (day === 4) targetDailyKey = 'jueves';
        else if (day === 5) targetDailyKey = 'viernes';
      }

      if (targetDailyKey && dbDailyMenus[targetDailyKey]) {
        const menu = dbDailyMenus[targetDailyKey];
        setState({
          mode: 'menu_del_dia',
          badge: `✦ MENÚ DEL DÍA • ${menu.dayName.toUpperCase()}`,
          title: `Menú ${menu.dayName} — €${menu.price.toFixed(2)}`,
          subtitle: `${menu.destacado}. Toca para ver la lista completa.`,
          image: menu.image,
          priceBadge: `€${menu.price.toFixed(2)}`,
          dailyMenuData: menu,
          canOpenModal: true,
          shouldAutoOpen: true, // Salta solo al entrar
          sessionKey: `mantas_auto_menu_${targetDailyKey}`
        });
        return;
      }

      // -------------------------------------------------------------
      // REGLA 3: PROMOCIONES DE NOCHE (De 18:30 a 23:30)
      // -------------------------------------------------------------
      if (timeDecimal >= 18.5 && timeDecimal < 23.5) {
        const promo = dbNightPromos[day] || dbNightPromos[2];
        setState({
          mode: 'promo_noche',
          badge: `🌙 ${promo.badge}`,
          title: promo.title,
          subtitle: `${promo.subtitle}. Toca para ver los detalles.`,
          image: promo.image,
          priceBadge: promo.priceTag,
          promoNightData: promo,
          canOpenModal: true,
          shouldAutoOpen: true, // Salta solo al entrar
          sessionKey: `mantas_auto_noche_${day}`
        });
        return;
      }

      // -------------------------------------------------------------
      // REGLA 4: RECOMENDACIÓN DEL CHEF (Fuera de horario de almuerzo/cena)
      // -------------------------------------------------------------
      setState({
        mode: 'chef',
        badge: CHEF_RECOMMENDATION.badge,
        title: CHEF_RECOMMENDATION.title,
        subtitle: 'Toca para ver nuestra sugerencia especial.',
        image: CHEF_RECOMMENDATION.image,
        canOpenModal: true,
        shouldAutoOpen: false, // NO salta solo, el cliente debe tocar el banner
        sessionKey: 'mantas_auto_chef'
      });
    };

    calculateBanner();
    const interval = setInterval(calculateBanner, 60000);
    return () => clearInterval(interval);
  }, [dbDailyMenus, dbNightPromos]);

  return state;
}