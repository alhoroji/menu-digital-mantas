// src/core/types/menu.types.ts

export interface Category {
  id: string;
  name: string;
  order: number;
  isActive: boolean;
  subcategories?: string[]; // ej: ["Entradas", "Ceviches", "Combos"]
}

export interface DishModifier {
  name: string;
  extraPrice: number; // 0 si es gratis, > 0 si cuesta (ej: "Extra queso")
}

export type ScheduleCondition = 'always' | 'only_menu_dia' | 'only_promo';

export interface DishPrice {
  standard: number; // Precio base
  table?: number;   // Precio en mesa (Tavolo)
  delivery?: number;// Precio para llevar (Delivery)
}

export interface Dish {
  id: string;
  categoryId: string;
  subcategory?: string; // Para agrupar dentro de la categoría
  name: string;
  description: string;
  price: DishPrice; 
  imageUrl: string | null;
  tags: string[];
  scheduleCondition: ScheduleCondition;
  modifiers: DishModifier[];
  isSoldOut: boolean;
}