export type TabType = 'today' | 'weekly' | 'habits' | 'notes' | 'ai';

export interface TaskItem {
  id: string;
  title: string;
  time?: string;
  category: 'work' | 'personal' | 'wellness' | 'craft' | 'errands';
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  date: string;
}

export interface HabitItem {
  id: string;
  name: string;
  category: string;
  icon: string;
  completedDates: string[];
  targetDaysPerWeek: number;
}

export interface CozyNote {
  id: string;
  title: string;
  content: string;
  color: 'rose' | 'sage' | 'parchment' | 'kraft';
  rotation: number;
  date: string;
  tags: string[];
}

export interface PolaroidItem {
  id: string;
  imageUrl: string;
  caption: string;
  date: string;
  rotation: number;
}

export interface DailyJournal {
  date: string;
  mood: 'radiant' | 'calm' | 'thoughtful' | 'cozy' | 'tired';
  weather: string;
  gratitude: string[];
  reflection: string;
  quote: string;
}

export type ShoppingCategory = 'Alimentação' | 'Casa / Limpeza' | 'Higiene / Saúde' | 'Outros';

export interface ShoppingItem {
  id: string;
  name: string;
  category: ShoppingCategory;
  quantity: number;
  unitPrice: number;
  purchased: boolean;
}

export interface MonthlyBudget {
  salary: number;
  extraIncome: number;
  otherIncome: number;
  
  // Fixed expenses
  housing: number;
  water: number;
  electricity: number;
  internet: number;
  phone: number;
  transport: number;
  otherFixed: number;

  // Variable expenses
  groceries: number;
  diningOut: number;
  fuel: number;
  health: number;
  leisure: number;
  otherVariable: number;

  // Credit cards
  card1: number;
  card2: number;
  card3: number;

  // Daily transactions
  dailyTransactions: {
    id: string;
    date: string;
    description: string;
    amount: number;
  }[];

  // Closing notes
  workedWell: string;
  exaggerated: string;
  nextMonthGoal: string;
}

export interface FreeNote {
  id: string;
  title: string;
  content: string;
  date: string;
}

export type ViewState = 'home' | 'spreadsheet' | 'notes' | 'shopping';

export interface StickerPreset {
  id: string;
  category: 'washi' | 'stamp' | 'badge' | 'icon';
  name: string;
  icon?: string;
  label?: string;
  bgStyle: string;
  borderStyle?: string;
  textStyle?: string;
  aspectRatio?: string;
  width?: string;
  height?: string;
}

export interface PlacedSticker {
  id: string;
  presetId: string;
  category: 'washi' | 'stamp' | 'badge' | 'icon';
  name: string;
  icon?: string;
  label?: string;
  bgStyle: string;
  borderStyle?: string;
  textStyle?: string;
  x: number; // percentage (0..90)
  y: number; // percentage or px
  rotation: number; // degrees
  scale: number; // e.g. 1
  viewKey: string;
}
