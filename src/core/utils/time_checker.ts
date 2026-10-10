// src/core/utils/time_checker.ts
import { ScheduleConfig } from '../types/tenant.types';

export function checkMenuStatus(menuDiaConfig: ScheduleConfig, promoConfig: ScheduleConfig) {
  // Obtenemos la hora actual del sistema (En producción esto debería ajustarse a la zona horaria del restaurante)
  const now = new Date();
  
  // getDay() devuelve 0 para Domingo, 1 para Lunes, etc.
  // Lo ajustamos para que 1 = Lunes y 7 = Domingo para alinear con nuestra config.
  let currentDay = now.getDay();
  if (currentDay === 0) currentDay = 7; 

  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  // Función interna para convertir "HH:MM" a minutos totales (ej. "03:00" -> 180)
  const timeToMinutes = (timeString: string) => {
    const [hours, minutes] = timeString.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const currentTotalMinutes = currentHour * 60 + currentMinute;

  // Evaluar Menú del Día (Lunes a Viernes de 3:00 a 16:00)
  const isMenuDiaTime = () => {
    if (!menuDiaConfig.isActive) return false;
    if (!menuDiaConfig.daysOfWeek.includes(currentDay)) return false;

    const startMinutes = timeToMinutes(menuDiaConfig.startTime);
    const endMinutes = timeToMinutes(menuDiaConfig.endTime);

    return currentTotalMinutes >= startMinutes && currentTotalMinutes < endMinutes;
  };

  // Evaluar Promoción (Lunes a Viernes pasado las 16:00)
  const isPromoTime = () => {
    if (!promoConfig.isActive) return false;
    if (!promoConfig.daysOfWeek.includes(currentDay)) return false;
    
     const startMinutes = timeToMinutes(promoConfig.startTime);
     const endMinutes = timeToMinutes(promoConfig.endTime);
     
     // La lógica asume que la promo es hasta la medianoche (23:59) si endMinutes es menor (ej. horario de madrugada)
     if (startMinutes > endMinutes) {
         return currentTotalMinutes >= startMinutes || currentTotalMinutes <= endMinutes;
     }

    return currentTotalMinutes >= startMinutes && currentTotalMinutes <= endMinutes;
  };
  
  // Si es fin de semana (Sábado 6 o Domingo 7), ambas funciones devolverán false según la configuración, 
  // por lo que mostraremos la carta normal.

  return {
    showMenuDia: isMenuDiaTime(),
    showPromo: isPromoTime(),
    showFullMenuOnly: !isMenuDiaTime() && !isPromoTime() // Para los fines de semana
  };
}