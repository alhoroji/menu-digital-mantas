// src/features/menu/services/menu.service.ts
import { Dish } from '@/core/types/menu.types';
import { supabase } from '@/lib/supabaseClient';

export interface CategoryInfo {
  id: string;
  name: string;
  subcategories: string[];
}

export const CATEGORIAS_DB: Record<string, CategoryInfo> = {
  cat_entradas: { id: "cat_entradas", name: "Entradas", subcategories: ["Todas"] },
  cat_criollos: { id: "cat_criollos", name: "Platos Criollos", subcategories: ["Todas"] },
  cat_marinos: { id: "cat_marinos", name: "Platos Marinos", subcategories: ["Todas", "Entradas", "Ceviches", "Combos", "Adicionales"] },
  cat_pollo: { id: "cat_pollo", name: "Pollo a la Brasa", subcategories: ["Todas"] },
  cat_bebidas: { id: "cat_bebidas", name: "Bebidas", subcategories: ["Todas"] },
  cat_desayunos: { id: "cat_desayunos", name: "Desayunos Criollos", subcategories: ["Todas", "Sandwiches", "Especiales", "Jugos & Calientes"] }
};

// Respaldo estático (Fallback de seguridad traducido al español)
export const PLATOS_DB: Dish[] = [
  // Entradas
  { id: "e1", categoryId: "cat_entradas", subcategory: "Todas", name: "Tamal", description: "", price: { standard: 6 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "e2", categoryId: "cat_entradas", subcategory: "Todas", name: "Causa", description: "", price: { standard: 8 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "e3", categoryId: "cat_entradas", subcategory: "Todas", name: "Papa a la Huancaína", description: "", price: { standard: 6 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "e4", categoryId: "cat_entradas", subcategory: "Todas", name: "Crema de Ocopa", description: "", price: { standard: 6 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },

  // Criollos
  { id: "c1", categoryId: "cat_criollos", subcategory: "Todas", name: "Fettuccini a la Huancaína C/ Lomo al Jugo", description: "Pasta cubierta con salsa cremosa a la huancaína, papas fritas, cebolla, tomate y lomo fino", price: { standard: 20 }, imageUrl: null, tags: ["Recomendado"], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "c2", categoryId: "cat_criollos", subcategory: "Todas", name: "Lomo Saltado de Carne", description: "Cebolla, tomate, trozos de lomo salteados al wok, arroz blanco y papas fritas", price: { standard: 17 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "c3", categoryId: "cat_criollos", subcategory: "Todas", name: "Lomo Saltado de Pollo", description: "Cebolla, tomate, pollo salteado al wok, arroz blanco y papas fritas", price: { standard: 16 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "c4", categoryId: "cat_criollos", subcategory: "Todas", name: "Trilogía de Lomo Saltado", description: "Cebolla, tomate, carne, pollo y camarones salteados con salsa de soya, arroz y papas fritas", price: { standard: 20 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "c5", categoryId: "cat_criollos", subcategory: "Todas", name: "Chaufa de Carne", description: "Arroz salteado al wok con huevo, cebollino, carne y salsa de soya", price: { standard: 12 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "c6", categoryId: "cat_criollos", subcategory: "Todas", name: "Chaufa de Pollo", description: "Arroz salteado al wok con pollo, huevo, cebollino y salsa de soya", price: { standard: 10 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "c7", categoryId: "cat_criollos", subcategory: "Todas", name: "Tallarín Saltado de Carne", description: "Fideos salteados con salsa de soya, tomate, cebolla, carne y cebollino", price: { standard: 17 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },

  // Marinos
  { id: "m1", categoryId: "cat_marinos", subcategory: "Entradas", name: "Leche de Tigre", description: "Jugo concentrado de ceviche mixto, limón, sal y especias", price: { standard: 12 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "m2", categoryId: "cat_marinos", subcategory: "Entradas", name: "Leche de Tigre Mantas", description: "Jugo concentrado especial de ceviche con selección de mariscos", price: { standard: 22 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "m3", categoryId: "cat_marinos", subcategory: "Entradas", name: "Causa Acevichada", description: "Pastel de papa amarilla coronado con ceviche fresco de pescado", price: { standard: 16 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "m4", categoryId: "cat_marinos", subcategory: "Entradas", name: "Choritos a la Chalaca", description: "Mejillones rellenos de cebolla roja, tomate, rocoto y jugo de limón fresco", price: { standard: 12 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "m5", categoryId: "cat_marinos", subcategory: "Ceviches", name: "Ceviche de Pescado Mantas", description: "Pescado fresco del día marinado al momento con limón peruano y ají", price: { standard: 17 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "m6", categoryId: "cat_marinos", subcategory: "Ceviches", name: "Ceviche Mixto Mantas", description: "Pescado y mariscos marinados en leche de tigre, acompañados de choclo y camote", price: { standard: 20 }, imageUrl: null, tags: ["Recomendado"], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "m7", categoryId: "cat_marinos", subcategory: "Ceviches", name: "Ceviche 3 Sabores Mantas", description: "Pescado, langostinos y pulpo marinados en tres estilos diferentes", price: { standard: 22 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "m8", categoryId: "cat_marinos", subcategory: "Ceviches", name: "Tiradito Ají Amarillo", description: "Finos cortes de pescado en crema suave de ají amarillo y limón", price: { standard: 17 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "m9", categoryId: "cat_marinos", subcategory: "Ceviches", name: "Tiradito Nikkei", description: "Pescado crudo marinado con reducción oriental de soya y jengibre", price: { standard: 17 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "m10", categoryId: "cat_marinos", subcategory: "Ceviches", name: "Ceviche Carretillero Estilo Mantas", description: "Ceviche clásico acompañado de calamares crujientes dorados", price: { standard: 17 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "m11", categoryId: "cat_marinos", subcategory: "Combos", name: "Chicharrón de Pescado / Ceviche", description: "Dúo marino: pescado crujiente frito con yuca y ceviche fresco", price: { standard: 30 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "m12", categoryId: "cat_marinos", subcategory: "Combos", name: "Ceviche / Arroz con Mariscos", description: "Dúo clásico con ceviche mixto y arroz con mariscos sazonados", price: { standard: 30 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "m13", categoryId: "cat_marinos", subcategory: "Combos", name: "Chicharrón de Pescado / Arroz con Mariscos", description: "Dúo caliente: pescado frito dorado y arroz con camarones y calamares", price: { standard: 30 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "m14", categoryId: "cat_marinos", subcategory: "Adicionales", name: "Pescado Frito", description: "Pescado entero o filete frito, acompañado de arroz, yuca y ensalada criolla", price: { standard: 17 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "m15", categoryId: "cat_marinos", subcategory: "Adicionales", name: "Pescado a lo Macho", description: "Filete de pescado cubierto con una cremosa y picante salsa de mariscos", price: { standard: 20 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "m16", categoryId: "cat_marinos", subcategory: "Adicionales", name: "Pescado en Salsa de Mariscos", description: "Arroz, pescado y mariscos en salsa aromática de la casa", price: { standard: 20 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "m17", categoryId: "cat_marinos", subcategory: "Adicionales", name: "Sudado de Pescado", description: "Sopa tradicional de pescado marinada con cebolla, tomate y chicha de jora", price: { standard: 18 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "m18", categoryId: "cat_marinos", subcategory: "Adicionales", name: "Parihuela", description: "Sopa rica y concentrada de mariscos surtidos y cangrejo", price: { standard: 23 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "m19", categoryId: "cat_marinos", subcategory: "Adicionales", name: "Jalea Mixta", description: "Surtido de mariscos y pescado fritos con yuca dorada y salsa criolla", price: { standard: 20 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "m20", categoryId: "cat_marinos", subcategory: "Adicionales", name: "Chicharrón de Pescado", description: "Trocitos de pescado marinados y fritos crujientes con salsas peruanas", price: { standard: 17 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "m21", categoryId: "cat_marinos", subcategory: "Adicionales", name: "Arroz con Mariscos Mantas", description: "Arroz sabroso cocinado en caldo de mariscos con frutos del mar y especias", price: { standard: 20 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "m22", categoryId: "cat_marinos", subcategory: "Adicionales", name: "Chaufa de Mariscos", description: "Arroz al wok con camarones, calamares, huevo y cebollino", price: { standard: 18 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "m23", categoryId: "cat_marinos", subcategory: "Adicionales", name: "Arroz de Puerto", description: "Arroz con mariscos enriquecido con cilantro y ají amarillo", price: { standard: 20 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },

  // Pollo a la Brasa
  { id: "p1", categoryId: "cat_pollo", subcategory: "Todas", name: "1/4 Pollo a la Brasa", description: "Con papas fritas, ensalada fresca y nuestras 3 salsas artesanales", price: { standard: 12, delivery: 12, table: 12 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "p2", categoryId: "cat_pollo", subcategory: "Todas", name: "Medio Pollo a la Brasa", description: "Con abundantes papas fritas, ensalada fresca y salsas", price: { standard: 25, delivery: 20, table: 25 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "p3", categoryId: "cat_pollo", subcategory: "Todas", name: "1 Pollo a la Brasa Entero", description: "Pollo entero marinado con hierbas andinas, papas fritas familiares y salsas", price: { standard: 40, delivery: 35, table: 40 }, imageUrl: null, tags: ["Recomendado"], scheduleCondition: 'always', modifiers: [], isSoldOut: false },

  // Bebidas
  { id: "b1", categoryId: "cat_bebidas", subcategory: "Todas", name: "Chicha Morada 1 Lt.", description: "Bebida artesanal de maíz morado con manzana, canela y clavos de olor", price: { standard: 10 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "b2", categoryId: "cat_bebidas", subcategory: "Todas", name: "Coca Cola", description: "Botella o lata", price: { standard: 5 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "b3", categoryId: "cat_bebidas", subcategory: "Todas", name: "Inca Kola Original 1.5 Lt.", description: "La icónica bebida gaseosa del Perú formato familiar", price: { standard: 10 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "b4", categoryId: "cat_bebidas", subcategory: "Todas", name: "Inca Kola 500ml", description: "Formato personal", price: { standard: 5 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "b5", categoryId: "cat_bebidas", subcategory: "Todas", name: "Agua Natural", description: "Agua natural 500ml", price: { standard: 2 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "b6", categoryId: "cat_bebidas", subcategory: "Todas", name: "Agua con Gas", description: "Agua con gas 500ml", price: { standard: 2 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "b7", categoryId: "cat_bebidas", subcategory: "Todas", name: "Cerveza Moretti", description: "Cerveza clásica italiana 33cl", price: { standard: 3 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "b8", categoryId: "cat_bebidas", subcategory: "Todas", name: "Cerveza Cusqueña", description: "Cerveza premium peruana (Dorada o Negra)", price: { standard: 4 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "b9", categoryId: "cat_bebidas", subcategory: "Todas", name: "Corona", description: "Cerveza Corona 33cl", price: { standard: 3 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "b10", categoryId: "cat_bebidas", subcategory: "Todas", name: "Coca Cola / Té (Lata)", description: "Lata 33cl", price: { standard: 2 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },

  // Desayunos Criollos
  { id: "d1", categoryId: "cat_desayunos", subcategory: "Sandwiches", name: "Pan con Chicharrón Clásico", description: "Cerdo dorado en su propio jugo, camote frito y salsa criolla en pan artesanal crujiente", price: { standard: 9 }, imageUrl: null, tags: ["Recomendado"], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "d2", categoryId: "cat_desayunos", subcategory: "Sandwiches", name: "Pan con Chicharrón Mantas (Doble)", description: "Doble porción de chicharrón crujiente con camote y cebolla roja marinada", price: { standard: 13 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "d3", categoryId: "cat_desayunos", subcategory: "Especiales", name: "Tamal Criollo con Salsa", description: "Masa tradicional de maíz rellena de carne, envuelta en hoja de plátano", price: { standard: 6.5 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "d4", categoryId: "cat_desayunos", subcategory: "Especiales", name: "Salchicha Huachana con Huevos", description: "Típico embutido artesanal especiado salteado con huevos y pan caliente", price: { standard: 10 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "d5", categoryId: "cat_desayunos", subcategory: "Jugos & Calientes", name: "Jugo Especial Mantas", description: "Batido energizante de frutas mixtas, leche, algarrobina y huevo", price: { standard: 7 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "d6", categoryId: "cat_desayunos", subcategory: "Jugos & Calientes", name: "Jugo de Papaya o Surtido", description: "Fruta fresca tropical licuada al momento", price: { standard: 6 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "d7", categoryId: "cat_desayunos", subcategory: "Jugos & Calientes", name: "Café Americano / Infusión", description: "Café pasado tradicional o té caliente", price: { standard: 2.5 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false }
];

export const MenuService = {
  getCategoryById: (categoryId: string): CategoryInfo | null => {
    if (!categoryId) return null;
    const aliases: Record<string, string> = {
      'entradas': 'cat_entradas',
      'criollos': 'cat_criollos',
      'marinos': 'cat_marinos',
      'pollos': 'cat_pollo',
      'pollo': 'cat_pollo',
      'bebidas': 'cat_bebidas',
      'desayunos': 'cat_desayunos'
    };
    const targetKey = aliases[categoryId] || (categoryId.startsWith('cat_') ? categoryId : `cat_${categoryId}`);
    return CATEGORIAS_DB[targetKey] || CATEGORIAS_DB[categoryId] || null;
  },

  // Consulta estática sincrónica (Fallback)
  getDishesByCategory: (categoryId: string, subcategory?: string): Dish[] => {
    const category = MenuService.getCategoryById(categoryId);
    const targetCatId = category ? category.id : categoryId;

    return PLATOS_DB.filter(dish => {
      const matchCat = dish.categoryId === targetCatId;
      if (!subcategory || subcategory === 'Todas') return matchCat;
      return matchCat && dish.subcategory === subcategory;
    });
  },

  // Consulta dinámica asíncrona conectada a Supabase
  fetchDishesByCategoryAsync: async (categoryId: string, restaurantSlug: string = 'mantas'): Promise<Dish[]> => {
    const category = MenuService.getCategoryById(categoryId);
    const targetCatId = category ? category.id : categoryId;

    try {
      const { data, error } = await supabase
        .from('dishes')
        .select('*')
        .eq('restaurant_slug', restaurantSlug)
        .eq('category_id', targetCatId);

      if (error || !data || data.length === 0) {
        return MenuService.getDishesByCategory(categoryId);
      }

      return data.map((d: any) => ({
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
      }));
    } catch {
      return MenuService.getDishesByCategory(categoryId);
    }
  }
};