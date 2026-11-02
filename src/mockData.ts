import { TaskItem, HabitItem, CozyNote, PolaroidItem, DailyJournal } from './types';

export const getTodayString = () => {
  const d = new Date();
  return d.toISOString().split('T')[0];
};

export const initialTasks: TaskItem[] = [
  {
    id: 't-1',
    title: 'Ritual de matcha matinal & alongamento suave',
    time: '08:00',
    category: 'wellness',
    completed: true,
    priority: 'high',
    date: getTodayString(),
  },
  {
    id: 't-2',
    title: 'Regar mudas botânicas e samambaias',
    time: '09:30',
    category: 'craft',
    completed: true,
    priority: 'medium',
    date: getTodayString(),
  },
  {
    id: 't-3',
    title: 'Esboçar planejamento semanal do caderno artesanal',
    time: '11:00',
    category: 'work',
    completed: false,
    priority: 'high',
    date: getTodayString(),
  },
  {
    id: 't-4',
    title: 'Ir à feira buscar pão de fermentação natural',
    time: '14:30',
    category: 'errands',
    completed: false,
    priority: 'medium',
    date: getTodayString(),
  },
  {
    id: 't-5',
    title: 'Sessão de aquarela noturna no caderno do jardim',
    time: '19:00',
    category: 'wellness',
    completed: false,
    priority: 'low',
    date: getTodayString(),
  },
];

export const initialHabits: HabitItem[] = [
  {
    id: 'h-1',
    name: 'Meditação Consciente (15min)',
    category: 'Bem-estar',
    icon: 'Sprout',
    completedDates: [getTodayString()],
    targetDaysPerWeek: 7,
  },
  {
    id: 'h-2',
    name: 'Ler 20 páginas de literatura',
    category: 'Mente',
    icon: 'BookOpen',
    completedDates: [getTodayString()],
    targetDaysPerWeek: 5,
  },
  {
    id: 'h-3',
    name: 'Meta de Hidratação (2L de água)',
    category: 'Saúde',
    icon: 'Droplets',
    completedDates: [],
    targetDaysPerWeek: 7,
  },
  {
    id: 'h-4',
    name: 'Registro no Diário à mão',
    category: 'Reflexão',
    icon: 'PenTool',
    completedDates: [getTodayString()],
    targetDaysPerWeek: 7,
  },
];

export const initialNotes: CozyNote[] = [
  {
    id: 'n-1',
    title: 'Receita: Focaccia de alecrim e sal marinho',
    content: 'Misture 500g de farinha, 380g de água, 100g de levain ativo, 10g de sal marinho. Fermente durante a noite. Cubra com flor de sal, ramos de alecrim e azeite antes de assar a 220°C por 30 minutos.',
    color: 'parchment',
    rotation: -1.5,
    date: '2026-10-28',
    tags: ['receita', 'padaria', 'conforto'],
  },
  {
    id: 'n-2',
    title: 'Indicações de Livros para o Outono',
    content: '1. A Vida Secreta das Árvores - Peter Wohlleben\n2. Brilhando no Escuro - Clarice Lispector\n3. Cartas a um Jovem Poeta - Rainer Maria Rilke',
    color: 'sage',
    rotation: 1.2,
    date: '2026-10-29',
    tags: ['leitura', 'inspiração'],
  },
  {
    id: 'n-3',
    title: 'Ideias para Esboços Botânicos',
    content: 'Focar em vagens de eucalipto, ramos de lavanda silvestre e pétalas delicadas de camomila. Usar tinta sépia quente com lavagens de aquarela verde-sálvia.',
    color: 'rose',
    rotation: -0.8,
    date: '2026-10-30',
    tags: ['arte', 'artesanato'],
  },
];

export const initialPolaroids: PolaroidItem[] = [
  {
    id: 'p-1',
    imageUrl: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=600',
    caption: 'Luz da manhã no peitoril da janela do estúdio 🌿',
    date: '2026-10-30',
    rotation: -2,
  },
  {
    id: 'p-2',
    imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600',
    caption: 'Caderno em linho encadernado à mão com páginas artesanais',
    date: '2026-10-29',
    rotation: 1.5,
  },
  {
    id: 'p-3',
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600',
    caption: 'Pão artesanal quentinho & manteiga',
    date: '2026-10-28',
    rotation: -1,
  },
];

export const initialJournal: DailyJournal = {
  date: getTodayString(),
  mood: 'radiant',
  weather: 'Brisa fresca de outono, 18°C',
  gratitude: [
    'O aroma calmante de chá verde sencha fresquinho',
    'Horas silenciosas da manhã antes do agito do dia',
    'Uma carta escrita à mão por um querido amigo',
  ],
  reflection: 'Hoje parecia um convite para desacelerar e notar as texturas sutis ao meu redor. A luz filtrada pelas cortinas de linho criava padrões tão serenos na minha escrivaninha de madeira.',
  quote: 'A simplicidade não é sobre ter menos. É sobre abrir espaço para o que realmente importa.',
};
