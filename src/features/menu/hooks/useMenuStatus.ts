import { useState, useEffect } from 'react';
import { checkMenuStatus } from '@/core/utils/time_checker';
import { ScheduleConfig } from '@/core/types/tenant.types';

export function useMenuStatus(menuDiaConfig: ScheduleConfig, promoConfig: ScheduleConfig) {
  const [status, setStatus] = useState({ 
    showMenuDia: false, 
    showPromo: false, 
    showFullMenuOnly: true 
  });

  useEffect(() => {
    // Al cargar el componente en el cliente, evalúa la hora
    const currentStatus = checkMenuStatus(menuDiaConfig, promoConfig);
    setStatus(currentStatus);
  }, [menuDiaConfig, promoConfig]);

  return status;
}