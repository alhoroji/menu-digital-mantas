// src/core/types/tenant.types.ts

export interface Branding {
  logoUrl: string;
  primaryColor: string; // Código Hex, ej: "#D4AF37"
  secondaryColor: string;
}

export interface ScheduleConfig {
  isActive: boolean;
  startTime: string; // Formato 24h, ej: "03:00"
  endTime: string;   // Formato 24h, ej: "16:00"
  daysOfWeek: number[]; // 1 = Lunes, 7 = Domingo
}

export interface Restaurant {
  id: string; // El ID del documento en Firestore
  slug: string; // Para la URL (ej: "mantas")
  name: string;
  whatsappNumber: string; // Con código de país, ej: "+39..."
  currency: string; // ej: "S/" o "€"
  timezone: string; // Vital para la lógica de la hora, ej: "Europe/Rome" o "America/Lima"
  branding: Branding;
  schedules: {
    menuDelDia: ScheduleConfig;
    promocion: ScheduleConfig;
  };
  isActive: boolean; // Para suspender el servicio si el cliente no paga
}