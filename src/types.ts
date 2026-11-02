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
