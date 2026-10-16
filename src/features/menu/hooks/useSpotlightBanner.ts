// src/features/menu/hooks/useSpotlightBanner.ts
'use client';

import { useState, useEffect } from 'react';
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
}

export function useSpotlightBanner(): SpotlightState {
  const [state, setState] = useState<SpotlightState>({
    mode: 'chef',
    badge: CHEF_RECOMMENDATION.badge,
    title: CHEF_RECOMMENDATION.title,
    subtitle: CHEF_RECOMMENDATION.subtitle,
    image: CHEF_RECOMMENDATION.image,
    canOpenModal: false
  });

  useEffect(() => {
    const calculateBanner = () => {
      const now = new Date();
      const day = now.getDay(); // 0 = Domingo, 1 = Lunes, 2 = Martes, 3 = Miércoles, 4 = Jueves, 5 = Viernes, 6 = Sábado
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const timeDecimal = hours + minutes / 60; // Ej: 15:30 = 15.5

      // -------------------------------------------------------------
      // 4. REGLA: DESAYUNOS DE DOMINGO & DELIVERY
      // Activo desde Sábado 22:00 hasta Domingo 14:00
      // -------------------------------------------------------------
      const isSundayBreakfastTime = 
        (day === 6 && timeDecimal >= 22.0) || 
        (day === 0 && timeDecimal < 14.0);

      if (isSundayBreakfastTime) {
        setState({
          mode: 'desayuno_domingo',
          badge: SUNDAY_BREAKFAST_PROMO.badge,
          title: SUNDAY_BREAKFAST_PROMO.title,
          subtitle: SUNDAY_BREAKFAST_PROMO.subtitle,
          image: SUNDAY_BREAKFAST_PROMO.image,
          priceBadge: "Delivery Disponible",
          canOpenModal: false
        });
        return;
      }

      // -------------------------------------------------------------
      // 1. REGLA: MENÚ DEL DÍA (Martes a Viernes)
      // Activo desde las 22:00 de la noche anterior hasta las 15:30 del día actual
      // -------------------------------------------------------------
      let targetDailyKey: 'martes' | 'miercoles' | 'jueves' | 'viernes' | null = null;

      // Lunes noche a Martes mediodía -> Menú del Martes
      if ((day === 1 && timeDecimal >= 22.0) || (day === 2 && timeDecimal < 15.5)) {
        targetDailyKey = 'martes';
      }
      // Martes noche a Miércoles mediodía -> Menú del Miércoles
      else if ((day === 2 && timeDecimal >= 22.0) || (day === 3 && timeDecimal < 15.5)) {
        targetDailyKey = 'miercoles';
      }
      // Miércoles noche a Jueves mediodía -> Menú del Jueves
      else if ((day === 3 && timeDecimal >= 22.0) || (day === 4 && timeDecimal < 15.5)) {
        targetDailyKey = 'jueves';
      }
      // Jueves noche a Viernes mediodía -> Menú del Viernes
      else if ((day === 4 && timeDecimal >= 22.0) || (day === 5 && timeDecimal < 15.5)) {
        targetDailyKey = 'viernes';
      }

      if (targetDailyKey && DAILY_MENUS[targetDailyKey]) {
        const menu = DAILY_MENUS[targetDailyKey];
        setState({
          mode: 'menu_del_dia',
          badge: `✦ MENÚ DEL DÍA • ${menu.dayName.toUpperCase()}`,
          title: `Menú ${menu.dayName} — €${menu.price.toFixed(2)}`,
          subtitle: `${menu.destacado}. Toca para ver la carta.`,
          image: menu.image,
          priceBadge: `€${menu.price.toFixed(2)}`,
          dailyMenuData: menu,
          canOpenModal: true
        });
        return;
      }

      // -------------------------------------------------------------
      // 2. REGLA: PROMOCIONES DE NOCHE (15:30 a 22:00)
      // -------------------------------------------------------------
      if (timeDecimal >= 15.5 && timeDecimal < 22.0) {
        const promo = NIGHT_PROMOS[day] || NIGHT_PROMOS[2];
        setState({
          mode: 'promo_noche',
          badge: `🌙 ${promo.badge}`,
          title: promo.title,
          subtitle: promo.subtitle,
          image: promo.image,
          priceBadge: promo.priceTag,
          promoNightData: promo,
          canOpenModal: false
        });
        return;
      }

      // -------------------------------------------------------------
      // 3. REGLA: RECOMENDACIÓN DEL CHEF (Por defecto / Fallback)
      // -------------------------------------------------------------
      setState({
        mode: 'chef',
        badge: CHEF_RECOMMENDATION.badge,
        title: CHEF_RECOMMENDATION.title,
        subtitle: CHEF_RECOMMENDATION.subtitle,
        image: CHEF_RECOMMENDATION.image,
        canOpenModal: false
      });
    };

    calculateBanner();
    // Re-evalúa cada 60 segundos por si el usuario tiene la app abierta durante el cambio de hora
    const interval = setInterval(calculateBanner, 60000);
    return () => clearInterval(interval);
  }, []);

  return state;
}