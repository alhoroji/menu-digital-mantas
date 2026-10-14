// src/features/menu/config/spotlight.config.ts

const BUCKET_URL = "https://jclzrvizljglhhndkmvo.supabase.co/storage/v1/object/public/platos";

export interface DailyMenuItem {
  dayName: string; // "Martedì", "Mercoledì", etc.
  dayKey: 'martes' | 'miercoles' | 'jueves' | 'viernes';
  price: number;
  entradas: string[];
  segundos: string[];
  incluye: string;
  image: string;
  destacado: string;
}

export interface PromoNightItem {
  title: string;
  subtitle: string;
  priceTag?: string;
  image: string;
  badge: string;
}

// 1. MENÚ DEL DÍA (De Martes a Viernes)
export const DAILY_MENUS: Record<string, DailyMenuItem> = {
  martes: {
    dayName: "Martedì",
    dayKey: 'martes',
    price: 12.00,
    destacado: "Seco de Res con Frijoles o Chaufa",
    image: `${BUCKET_URL}/platoscriollos.jpg?v=2`,
    entradas: ["Papa a la Huancaína", "Sopa Criolla del Día", "Ensalada Fresca"],
    segundos: ["Seco de Res con Frijoles y Arroz", "Arroz Chaufa de Pollo al Wok", "Milanesa con Papas Fritas"],
    incluye: "Primo + Secondo + Chicha Morada o Acqua"
  },
  miercoles: {
    dayName: "Mercoledì",
    dayKey: 'miercoles',
    price: 12.00,
    destacado: "Ají de Gallina o Pescado Frito",
    image: `${BUCKET_URL}/platoscriollos.jpg?v=2`,
    entradas: ["Causa Rellena de Pollo", "Tequeños con Guacamole", "Crema de Ocopa"],
    segundos: ["Ají de Gallina Tradicional", "Filete de Pescado Frito con Yuca", "Tallarines Rojos con Pollo"],
    incluye: "Primo + Secondo + Chicha Morada o Acqua"
  },
  jueves: {
    dayName: "Giovedì",
    dayKey: 'jueves',
    price: 12.00,
    destacado: "Carapulcra con Sopa Seca o Pollo",
    image: `${BUCKET_URL}/platoscriollos.jpg?v=2`,
    entradas: ["Tamalito Criollo", "Papa Rellena Casera", "Sopa de Pollo Casera"],
    segundos: ["Carapulcra Chinchana", "Lomo Saltado al Jugo", "Arroz con Pollo Criollo"],
    incluye: "Primo + Secondo + Chicha Morada o Acqua"
  },
  viernes: {
    dayName: "Venerdì",
    dayKey: 'viernes',
    price: 13.00,
    destacado: "Dúo Criollo o Pescado a lo Macho",
    image: `${BUCKET_URL}/platosmarinos.jpg?v=2`,
    entradas: ["Ceviche Clásico Carretillero", "Choritos a la Chalaca", "Causa Limeña"],
    segundos: ["Pescado a lo Macho", "Seco de Carne Norteño", "Chaufa Marino"],
    incluye: "Primo + Secondo + Chicha Morada o Acqua"
  }
};

// 2. PROMOCIONES DE NOCHE (15:30 a 22:00)
export const NIGHT_PROMOS: Record<number, PromoNightItem> = {
  2: { // Martes
    title: "Martes 2x1 Chilcanos & Pisco",
    subtitle: "Con tu plato criollo o piqueo tradicional",
    priceTag: "Promo 2x1",
    badge: "PROMO NOTTE",
    image: `${BUCKET_URL}/bevidas%26trago.jpg?v=2`
  },
  3: { // Miércoles
    title: "Miércoles Criollo al Wok",
    subtitle: "Chaufa Especial + Inca Kola personal de regalo",
    priceTag: "Solo €14.00",
    badge: "SPECIAL SERA",
    image: `${BUCKET_URL}/platoscriollos.jpg?v=2`
  },
  4: { // Jueves
    title: "Jueves de Pollo a la Brasa",
    subtitle: "Medio Pollo + Papas + Ensalada y Salsas de la casa",
    priceTag: "€20.00",
    badge: "PROMO FAMIGLIA",
    image: `${BUCKET_URL}/pollo_ala_brasa.jpg?v=2`
  },
  5: { // Viernes
    title: "Viernes Marino & Pisco Sour",
    subtitle: "Dúo Marino (Ceviche + Chicharrón) con copa de bienvenida",
    priceTag: "Offerta Speciale",
    badge: "WEEKEND VIBES",
    image: `${BUCKET_URL}/platosmarinos.jpg?v=2`
  },
  6: { // Sábado
    title: "Gran Noche Mantas",
    subtitle: "Pollo a la Brasa Entero con papas gigantes y gaseosa",
    priceTag: "Solo €35.00",
    badge: "SABATO NIGHT",
    image: `${BUCKET_URL}/pollo_ala_brasa.jpg?v=2`
  },
  0: { // Domingo noche
    title: "Cena de Domingo Criollo",
    subtitle: "Cierra la semana con nuestro Lomo Saltado y Fettuccini",
    priceTag: "Top Seller",
    badge: "DOMENICA SERA",
    image: `${BUCKET_URL}/platoscriollos.jpg?v=2`
  }
};

// 3. RECOMENDACIÓN DEL CHEF (Estado base / Fines de semana mediodía)
export const CHEF_RECOMMENDATION = {
  badge: "RECOMENDACIÓN DEL CHEF",
  title: "Ceviche Mixto",
  subtitle: "Pesca del día con leche de tigre, choclo y camote.",
  image: `${BUCKET_URL}/cevichemixto.jpg?v=3`
};

// 4. DESAYUNO DOMINICAL & DELIVERY
export const SUNDAY_BREAKFAST_PROMO = {
  badge: "SOLO DOMENICA • 8:00 A 13:00",
  title: "Desayunos Criollos & Delivery",
  subtitle: "Pan con Chicharrón crocante, Tamales y Jugos directo a tu casa.",
  image: `${BUCKET_URL}/desayunos.jpg?v=2`,
  actionText: "Ordina a Domicilio"
};