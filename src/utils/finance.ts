import { MonthlyBudget } from '../types';

export const formatCurrency = (val: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(isNaN(val) ? 0 : val);
};

export const defaultBudget: MonthlyBudget = {
  salary: 0,
  extraIncome: 0,
  otherIncome: 0,
  housing: 0,
  water: 0,
  electricity: 0,
  internet: 0,
  phone: 0,
  transport: 0,
  otherFixed: 0,
  groceries: 0,
  diningOut: 0,
  fuel: 0,
  health: 0,
  leisure: 0,
  otherVariable: 0,
  card1: 0,
  card2: 0,
  card3: 0,
  dailyTransactions: [],
  workedWell: '',
  exaggerated: '',
  nextMonthGoal: '',
};

export const monthNames = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];
