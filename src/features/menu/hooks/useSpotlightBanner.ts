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
  endTime?: Date; // <-- Añadido para el cronómetro
}

export function useSpotlightBanner(): SpotlightState {
  const [dbDailyMenus, setDbDailyMenus] = useState<Record<string, DailyMenuItem>>(DAILY_MENUS);
  const [dbNightPromos, setDbNightPromos] = useState<Record<number, PromoNightItem>>(NIGHT_PROMOS);

  const [state, setState] = useState<SpotlightState>({
    mode: 'chef',
    badge: CHEF_RECOMMENDATION.badge,
    title: CHEF_RECOMMENDATION.title,
    subtitle: CHEF_RECOMMENDATION.subtitle,
    image: CHEF_RECOMMENDATION.image,
    canOpenModal: true,
    shouldAutoOpen: false
  });

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
        console.error('Error Supabase Spotlight:', err);
      }
    }
    fetchLivePromos();
  }, []);

  useEffect(() => {
    const calculateBanner = () => {
      const now = new Date();
      const day = now.getDay();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const timeDecimal = hours + minutes / 60; 

      // Función para calcular la hora exacta de fin
      const getEndTime = (h: number, m: number) => {
        const d = new Date();
        d.setHours(h, m, 0, 0);
        return d;
      };

      // 1. DESAYUNOS (Domingo de 09:00 a 12:30)
      if (day === 0 && timeDecimal >= 9.0 && timeDecimal < 12.5) {
        setState({
          mode: 'desayuno_domingo',
          badge: SUNDAY_BREAKFAST_PROMO.badge,
          title: SUNDAY_BREAKFAST_PROMO.title,
          subtitle: 'Toca para ver los desayunos y delivery.',
          image: SUNDAY_BREAKFAST_PROMO.image,
          priceBadge: 'Delivery',
          canOpenModal: true,
          shouldAutoOpen: true,
          endTime: getEndTime(12, 30) // Termina a las 12:30
        });
        return;
      }

      // 2. MENÚ DEL DÍA (Martes a Viernes, de 10:30 a 15:30)
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
          subtitle: `${menu.destacado}. Toca para ver la lista.`,
          image: menu.image,
          priceBadge: `€${menu.price.toFixed(2)}`,
          dailyMenuData: menu,
          canOpenModal: true,
          shouldAutoOpen: true,
          endTime: getEndTime(15, 30) // Termina a las 15:30
        });
        return;
      }

      // 3. PROMOS DE NOCHE (De 18:30 a 23:30)
      if (timeDecimal >= 18.5 && timeDecimal < 23.5) {
        const promo = dbNightPromos[day] || dbNightPromos[2];
        setState({
          mode: 'promo_noche',
          badge: `🌙 ${promo.badge}`,
          title: promo.title,
          subtitle: `${promo.subtitle}. Toca para ver detalles.`,
          image: promo.image,
          priceBadge: promo.priceTag,
          promoNightData: promo,
          canOpenModal: true,
          shouldAutoOpen: true,
          endTime: getEndTime(23, 30) // Termina a las 23:30
        });
        return;
      }

      // 4. FUERA DE HORARIO (Chef)
      setState({
        mode: 'chef',
        badge: CHEF_RECOMMENDATION.badge,
        title: CHEF_RECOMMENDATION.title,
        subtitle: 'Toca para ver nuestra sugerencia.',
        image: CHEF_RECOMMENDATION.image,
        canOpenModal: true,
        shouldAutoOpen: false
      });
    };

    calculateBanner();
    const interval = setInterval(calculateBanner, 60000);
    return () => clearInterval(interval);
  }, [dbDailyMenus, dbNightPromos]);

  return state;
}