// src/features/menu/services/menu.service.ts
import { Dish } from '@/core/types/menu.types';

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

export const PLATOS_DB: Dish[] = [
  // Entradas
  { id: "e1", categoryId: "cat_entradas", subcategory: "Todas", name: "Tamal", description: "", price: { standard: 6 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "e2", categoryId: "cat_entradas", subcategory: "Todas", name: "Causa", description: "", price: { standard: 8 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "e3", categoryId: "cat_entradas", subcategory: "Todas", name: "Papa a la Huancaina", description: "", price: { standard: 6 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "e4", categoryId: "cat_entradas", subcategory: "Todas", name: "Crema de Ocopa", description: "", price: { standard: 6 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },

  // Criollos
  { id: "c1", categoryId: "cat_criollos", subcategory: "Todas", name: "Fettuccini a la Huancaina C/ Lomo al Jugo", description: "Pasta ricoperta di panna gialla condita, patatine fritte, cipolla, pomodoro e lomo", price: { standard: 20 }, imageUrl: null, tags: ["Recomendado"], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "c2", categoryId: "cat_criollos", subcategory: "Todas", name: "Lomo Saltado de Carne", description: "Cipolla, pomodoro, manzo saltato, riso bianco e patatine fritte", price: { standard: 17 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "c3", categoryId: "cat_criollos", subcategory: "Todas", name: "Lomo Saltado de Pollo", description: "Cipolla, pomodoro, pollo saltato, riso bianco e patatine fritte", price: { standard: 16 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "c4", categoryId: "cat_criollos", subcategory: "Todas", name: "Trilogia de Lomo Saltado", description: "Cipolla, pomodoro, carne, lonza, gamberi, salsa di soia, riso bianco e patatine fritte", price: { standard: 20 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "c5", categoryId: "cat_criollos", subcategory: "Todas", name: "Chaufa de Carne", description: "Riso saltato al wok, uovo, cipollotto, manzo e salsa di soia", price: { standard: 12 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "c6", categoryId: "cat_criollos", subcategory: "Todas", name: "Chaufa de Pollo", description: "Riso saltato al wok, pollo, uovo, cipollotto e salsa di soia", price: { standard: 10 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "c7", categoryId: "cat_criollos", subcategory: "Todas", name: "Tallarin Saltado de Carne", description: "Pasta, salsa di soia, pomodoro, cipolla, manzo e cipollotto", price: { standard: 17 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },

  // Marinos
  { id: "m1", categoryId: "cat_marinos", subcategory: "Entradas", name: "Leche de Tigre", description: "Succo di ceviche mixto, lime, sale e spezie", price: { standard: 12 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "m2", categoryId: "cat_marinos", subcategory: "Entradas", name: "Leche de Tigre Mantas", description: "Succo concentrato di ceviche con frutti di mare scelti", price: { standard: 22 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "m3", categoryId: "cat_marinos", subcategory: "Entradas", name: "Causa Acevichada", description: "Torta di patate gialle con ceviche fresco di pesce in cima", price: { standard: 16 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "m4", categoryId: "cat_marinos", subcategory: "Entradas", name: "Choritos a la Chalaca", description: "Cozze ripiene di cipolla rossa, pomodoro, rocoto e succo di lime", price: { standard: 12 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "m5", categoryId: "cat_marinos", subcategory: "Ceviches", name: "Ceviche de Pescado Mantas", description: "Pesce persico fresco marinato al momento con lime e ají", price: { standard: 17 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "m6", categoryId: "cat_marinos", subcategory: "Ceviches", name: "Ceviche Mixto Mantas", description: "Pesce e frutti di mare marinati con latte di tigre, mais choclo e camote", price: { standard: 20 }, imageUrl: null, tags: ["Recomendado"], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "m7", categoryId: "cat_marinos", subcategory: "Ceviches", name: "Ceviche 3 Sabores Mantas", description: "Pesce, gamberi e polpo marinati in 3 stili diversi", price: { standard: 22 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "m8", categoryId: "cat_marinos", subcategory: "Ceviches", name: "Tiradito Aji Amarillo", description: "Fettine sottili di pesce in crema di ají amarillo e lime", price: { standard: 17 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "m9", categoryId: "cat_marinos", subcategory: "Ceviches", name: "Tiradito Nikkei", description: "Pesce crudo marinato con riduzione orientale di soia e zenzero", price: { standard: 17 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "m10", categoryId: "cat_marinos", subcategory: "Ceviches", name: "Ceviche Carretillero Estilo Mantas", description: "Ceviche classico accompagnato da calamari croccanti", price: { standard: 17 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "m11", categoryId: "cat_marinos", subcategory: "Combos", name: "Chicharron de Pescado / Ceviche", description: "Duo marino: pesce croccante fritto con manioca e ceviche fresco", price: { standard: 30 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "m12", categoryId: "cat_marinos", subcategory: "Combos", name: "Ceviche / Arroz con Mariscos", description: "Duo classico con ceviche mixto e riso ai frutti di mare", price: { standard: 30 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "m13", categoryId: "cat_marinos", subcategory: "Combos", name: "Chicharron de Pescado / Arroz con Mariscos", description: "Duo caldo: pesce fritto dorato e riso con gamberi e calamari", price: { standard: 30 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "m14", categoryId: "cat_marinos", subcategory: "Adicionales", name: "Pescado Frito", description: "Pesce fritto intero o filetto, riso, manioca e insalata criolla", price: { standard: 17 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "m15", categoryId: "cat_marinos", subcategory: "Adicionales", name: "Pescado a lo Macho", description: "Filetto di pesce coperto da cremosa salsa piccante ai frutti di mare", price: { standard: 20 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "m16", categoryId: "cat_marinos", subcategory: "Adicionales", name: "Pescado en Salsa de Mariscos", description: "Riso, pesce e frutti di mare in salsa profumata", price: { standard: 20 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "m17", categoryId: "cat_marinos", subcategory: "Adicionales", name: "Sudado de Pescado", description: "Zuppa tradizionale di pesce marinata con cipolla, pomodoro e chicha", price: { standard: 18 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "m18", categoryId: "cat_marinos", subcategory: "Adicionales", name: "Parihuela", description: "Zuppa ricca e concentrata di frutti di mare misti e granchio", price: { standard: 23 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "m19", categoryId: "cat_marinos", subcategory: "Adicionales", name: "Jalea Mixta", description: "Misto di frutti di mare e pesce fritti con manioca e sarza criolla", price: { standard: 20 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "m20", categoryId: "cat_marinos", subcategory: "Adicionales", name: "Chicharron de Pescado", description: "Bocconcini di pesce fritti croccanti con salse peruviane", price: { standard: 17 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "m21", categoryId: "cat_marinos", subcategory: "Adicionales", name: "Arroz con Mariscos Mantas", description: "Riso saporito cotto nel brodo di mare con frutti di mare e spezie", price: { standard: 20 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "m22", categoryId: "cat_marinos", subcategory: "Adicionales", name: "Chaufa de Mariscos", description: "Riso al wok con gamberi, calamari, uovo e cipollotto", price: { standard: 18 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "m23", categoryId: "cat_marinos", subcategory: "Adicionales", name: "Arroz de Puerto", description: "Riso ai frutti di mare arricchito con coriandolo e peperoncino giallo", price: { standard: 20 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },

  // Pollo a la Brasa
  { id: "p1", categoryId: "cat_pollo", subcategory: "Todas", name: "1/4 Pollo a la Brasa", description: "Con patatine fritte, insalata fresca e le nostre 3 salse artigianali", price: { standard: 12, delivery: 12, table: 12 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "p2", categoryId: "cat_pollo", subcategory: "Todas", name: "Mezzo Pollo a la Brasa", description: "Con patatine fritte abbondanti, insalata fresca e salse", price: { standard: 25, delivery: 20, table: 25 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "p3", categoryId: "cat_pollo", subcategory: "Todas", name: "1 Pollo a la Brasa Entero", description: "Pollo intero marinato alle erbe andine, patatine fritte famiglia e salse", price: { standard: 40, delivery: 35, table: 40 }, imageUrl: null, tags: ["Recomendado"], scheduleCondition: 'always', modifiers: [], isSoldOut: false },

  // Bebidas
  { id: "b1", categoryId: "cat_bebidas", subcategory: "Todas", name: "Chicha Morada 1 Lt.", description: "Bevanda artigianale di mais viola con mela, cannella e chiodi di garofano", price: { standard: 10 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "b2", categoryId: "cat_bebidas", subcategory: "Todas", name: "Coca Cola", description: "Bottiglia o lattina", price: { standard: 5 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "b3", categoryId: "cat_bebidas", subcategory: "Todas", name: "Inca Kola Original 1.5 Lt.", description: "La bibita gassata iconica del Perù formato famiglia", price: { standard: 10 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "b4", categoryId: "cat_bebidas", subcategory: "Todas", name: "Inca Kola 500ml", description: "Formato personale", price: { standard: 5 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "b5", categoryId: "cat_bebidas", subcategory: "Todas", name: "Agua Natural", description: "Acqua naturale 500ml", price: { standard: 2 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "b6", categoryId: "cat_bebidas", subcategory: "Todas", name: "Agua Frizzante", description: "Acqua frizzante 500ml", price: { standard: 2 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "b7", categoryId: "cat_bebidas", subcategory: "Todas", name: "Birra Moretti", description: "Birra classica italiana 33cl", price: { standard: 3 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "b8", categoryId: "cat_bebidas", subcategory: "Todas", name: "Birra Cusqueña", description: "Birra premium peruviana (Dorada o Negra)", price: { standard: 4 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "b9", categoryId: "cat_bebidas", subcategory: "Todas", name: "Corona", description: "Birra Corona 33cl", price: { standard: 3 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "b10", categoryId: "cat_bebidas", subcategory: "Todas", name: "Coca Cola / The (Lattina)", description: "Lattina 33cl", price: { standard: 2 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },

  // Desayunos Criollos (Solo fines de semana y festivos)
  { id: "d1", categoryId: "cat_desayunos", subcategory: "Sandwiches", name: "Pan con Chicharrón Clásico", description: "Pancetta dorata nel proprio succo, patata dolce fritta e sarza criolla in panino artigianale croccante", price: { standard: 9 }, imageUrl: null, tags: ["Recomendado"], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "d2", categoryId: "cat_desayunos", subcategory: "Sandwiches", name: "Pan con Chicharrón Mantas (Doppio)", description: "Doppia porzione di chicharrón croccante con camote e cipolla rossa marinata", price: { standard: 13 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "d3", categoryId: "cat_desayunos", subcategory: "Especiales", name: "Tamal Criollo con Sarza", description: "Impasto tradizionale di mais ripieno di carne, avvolto in foglia di banano", price: { standard: 6.5 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "d4", categoryId: "cat_desayunos", subcategory: "Especiales", name: "Salchicha Huachana con Uova", description: "Tipica salsiccia artigianale speziata saltata con uova e pane caldo", price: { standard: 10 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "d5", categoryId: "cat_desayunos", subcategory: "Jugos & Calientes", name: "Jugo Especial Mantas", description: "Frullato energizzante di frutta mista, latte, algarrobina e uovo", price: { standard: 7 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "d6", categoryId: "cat_desayunos", subcategory: "Jugos & Calientes", name: "Jugo de Papaya o Surtido", description: "Frutta fresca tropicale frullata al momento", price: { standard: 6 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false },
  { id: "d7", categoryId: "cat_desayunos", subcategory: "Jugos & Calientes", name: "Caffè Americano / Infusione", description: "Caffè filtro tradizionale o tè caldo", price: { standard: 2.5 }, imageUrl: null, tags: [], scheduleCondition: 'always', modifiers: [], isSoldOut: false }
];

export const MenuService = {
  // Normalizador: resuelve 'desayunos', 'cat_desayunos', 'marinos', 'pollos' sin errores 404
  getCategoryById: (categoryId: string): CategoryInfo | null => {
    if (!categoryId) return null;
    
    // Mapeo directo de slugs de URL a claves de DB
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

  getDishesByCategory: (categoryId: string, subcategory?: string): Dish[] => {
    const category = MenuService.getCategoryById(categoryId);
    const targetCatId = category ? category.id : categoryId;

    return PLATOS_DB.filter(dish => {
      const matchCat = dish.categoryId === targetCatId;
      if (!subcategory || subcategory === 'Todas') return matchCat;
      return matchCat && dish.subcategory === subcategory;
    });
  }
};