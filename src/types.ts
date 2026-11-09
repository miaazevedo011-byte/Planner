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

export type ViewState = 'home' | 'spreadsheet' | 'notes' | 'shopping' | 'recipes';

export interface RecipeIngredient {
  name: string;
  cost: string; // e.g. "R$ 3,20"
}

export interface RecipeStep {
  title: string;
  desc: string;
}

export interface RecipeItem {
  id: string;
  title: string;
  category: string;
  time: string;
  yield: string;
  cost: string;
  tip: string;
  imageUrl?: string;
  isFavorite?: boolean;
  notes?: string; // post-it note
  sourceUrl?: string; // Real website link found via Google Search
  sourceTitle?: string; // e.g., "Panelinha", "TudoGostoso", "Google Culinária"
  sourceDomain?: string; // e.g., "tudogostoso.com.br"
  ingredients: RecipeIngredient[];
  steps: RecipeStep[];
}

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

export type AppWeather = 'ensolarado' | 'chuva' | 'outono' | 'primavera' | 'inverno' | 'noite';

export type AppColorThemeId =
  | 'sage-classic'
  | 'sakura-rose'
  | 'coffee-kraft'
  | 'lavender-dream'
  | 'ocean-breeze'
  | 'autumn-terracotta'
  | 'matcha-bamboo'
  | 'chamomile-gold'
  | 'vanilla-biscuit'
  | 'mint-cream'
  | 'peach-blossom'
  | 'sunflower-butter'
  | 'blueberry-muffin'
  | 'honey-almond'
  | 'midnight-black'
  | 'wine-burgundy'
  | 'navy-midnight'
  | 'emerald-forest'
  | 'dark-kraft'
  | 'gothic-rose';

export interface AppThemeConfig {
  id: AppColorThemeId;
  name: string;
  emoji: string;
  primaryColor: string;
  primaryBg: string;
  accentColor: string;
  paperBgColor: string;
  headerBg: string;
  borderColor: string;
  cardBg: string;
  tagline: string;
  isDark?: boolean;
  textColor?: string;
  headingColor?: string;
  subtextColor?: string;
}

export interface AppSettings {
  weather: AppWeather;
  weatherDescription: string;
  weatherTemp: string;
  customDate: string; // YYYY-MM-DD or empty for real device date
  paperPattern:
    | 'dot-grid'
    | 'dot-grid-dark'
    | 'lined'
    | 'lined-dark'
    | 'plain'
    | 'plain-dark'
    | 'botanical'
    | 'botanical-dark'
    | 'kraft'
    | 'kraft-dark'
    | 'grid-school'
    | 'grid-school-dark';
  focusTimerDuration: number; // in minutes (e.g. 25)
  timerSecondsLeft: number;
  isTimerRunning: boolean;
  showPiggyAssistant?: boolean; // Opção para manter ou ocultar o porquinho
  themeId?: AppColorThemeId; // Tema de cores completo do app
  customBackgroundImage?: string; // Imagem ou padrão aleatório de fundo
}

