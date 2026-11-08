import React, { useState, useEffect } from 'react';
import {
  Search,
  Clock,
  PieChart,
  DollarSign,
  Bookmark,
  Edit3,
  Trash2,
  Share2,
  CheckCircle2,
  Circle,
  ShoppingBag,
  Sparkles,
  ArrowLeft,
  X,
  Plus,
  UtensilsCrossed,
  ChefHat,
  Heart,
  Save,
  Check,
  StickyNote,
  Globe,
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { RecipeItem, RecipeIngredient, RecipeStep, ShoppingItem } from '../types';
import { searchRecipeOnline } from '../services/gemini';

// Curated default recipes inspired by Brazilian comfort cooking
const PRESET_RECIPES: RecipeItem[] = [
  {
    id: 'bolo-cenoura',
    title: 'Bolo de Cenoura com Chocolate',
    category: 'Confeitaria Afetiva',
    time: '45 min',
    yield: '8 porções',
    cost: 'R$ 18,50',
    tip: 'Não jogue as cascas da cenoura fora! Higienize bem e bata junto na massa para aproveitar 100% das fibras, nutrientes e economizar no desperdício.',
    imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&auto=format&fit=crop&q=80',
    isFavorite: true,
    notes: 'Receita favorita de domingo! Fica incrível se adicionar raspas finas de laranja na massa.',
    ingredients: [
      { name: '3 cenouras médias raladas', cost: 'R$ 2,80' },
      { name: '4 ovos caipiras', cost: 'R$ 4,20' },
      { name: '1/2 xícara de óleo vegetal', cost: 'R$ 1,80' },
      { name: '2 xícaras de açúcar cristal', cost: 'R$ 2,00' },
      { name: '2 e 1/2 xícaras de farinha de trigo', cost: 'R$ 2,50' },
      { name: '1 colher (sopa) de fermento químico', cost: 'R$ 0,80' },
      { name: '1 lata de leite condensado (cobertura)', cost: 'R$ 4,40' }
    ],
    steps: [
      { title: 'Bater os líquidos no liquidificador', desc: 'Bata as cenouras raladas, os ovos e o óleo até formar um creme homogêneo e alaranjado (cerca de 3 a 5 minutos).' },
      { title: 'Incorporar os secos delicadamente', desc: 'Transfira para uma tigela funda e misture o açúcar e a farinha peneirada aos poucos com um fouet de silicone.' },
      { title: 'Adicionar fermento e assar', desc: 'Adicione o fermento mexendo carinhosamente. Despeje em forma untada e asse a 180°C por 40 minutos em forno pré-aquecido.' },
      { title: 'Cobertura cremosa de brigadeiro', desc: 'Em fogo baixo, cozinhe o leite condensado com 3 colheres de chocolate em pó e 1 colher de manteiga até soltar do fundo. Cubra o bolo morno.' }
    ]
  },
  {
    id: 'panqueca-aveia',
    title: 'Panqueca de Aveia e Banana',
    category: 'Café da Manhã & Lanches',
    time: '15 min',
    yield: '2 porções',
    cost: 'R$ 6,50',
    tip: 'Use bananas bem maduras (com pintinhas pretas), elas são super doces e dispensam qualquer adição de açúcar refinado ou adoçante.',
    imageUrl: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=800&auto=format&fit=crop&q=80',
    isFavorite: false,
    notes: 'Excelente pré-treino rápido ou café da manhã econômico.',
    ingredients: [
      { name: '2 bananas maduras amassadas', cost: 'R$ 1,50' },
      { name: '2 ovos', cost: 'R$ 2,10' },
      { name: '4 colheres (sopa) de farelo de aveia', cost: 'R$ 1,40' },
      { name: '1 pitada de canela em pó', cost: 'R$ 0,50' },
      { name: '1 colher (chá) de mel ou melaço', cost: 'R$ 1,00' }
    ],
    steps: [
      { title: 'Amasse e misture', desc: 'Em um prato fundo, amasse as bananas com o garfo e misture os ovos batidos e a aveia até formar uma massa pastosa uniforme.' },
      { title: 'Dourar na frigideira', desc: 'Aqueça uma frigideira antiaderente untada com um fiozinho de manteiga ou óleo. Despeje pequenas porções e doure em fogo baixo por 2 min de cada lado.' },
      { title: 'Finalização acolhedora', desc: 'Sirva com canela polvilhada e um fio delicado de mel por cima.' }
    ]
  },
  {
    id: 'risoto-alho-poro',
    title: 'Risoto de Alho-Poró com Queijo',
    category: 'Jantar Conforto',
    time: '35 min',
    yield: '4 porções',
    cost: 'R$ 17,20',
    tip: 'Faça caldo caseiro fervendo as folhas verdes escuras do alho-poró com cebola e talos de salsinha em vez de usar tabletes industrializados.',
    imageUrl: 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?w=800&auto=format&fit=crop&q=80',
    isFavorite: true,
    notes: 'Super cremoso! Perfeito para receber amigos sem estourar o orçamento.',
    ingredients: [
      { name: '1 e 1/2 xícara de arroz arbóreo ou agulhinha', cost: 'R$ 3,80' },
      { name: '1 talo grande de alho-poró fatiado', cost: 'R$ 4,50' },
      { name: '2 colheres (sopa) de manteiga', cost: 'R$ 2,00' },
      { name: '1/2 xícara de vinho branco ou caldo de limão', cost: 'R$ 2,50' },
      { name: '100g de queijo parmesão ou meia cura ralado', cost: 'R$ 4,40' }
    ],
    steps: [
      { title: 'Refogar o alho-poró', desc: 'Em uma panela funda, derreta metade da manteiga e refogue o alho-poró finamente fatiado até murchar e liberar aroma doce.' },
      { title: 'Nacarar o arroz', desc: 'Junte o arroz e refogue por 1 minuto. Adicione o vinho e mexa até evaporar todo o álcool.' },
      { title: 'Cozimento gradual', desc: 'Vá adicionando o caldo quente concha por concha, mexendo sempre até o arroz ficar al dente (cerca de 18 min).' },
      { title: 'Mantecatura final', desc: 'Desligue o fogo, adicione o queijo ralado e o restante da manteiga gelada. Mexa vigorosamente para dar brilho e cremosidade.' }
    ]
  },
  {
    id: 'torta-salgada',
    title: 'Torta Salgada Prática de Liquidificador',
    category: 'Lanche da Tarde',
    time: '40 min',
    yield: '8 porções',
    cost: 'R$ 14,00',
    tip: 'Ideal para o método "limpa geladeira": use sobras de legumes, frango desfiado, milho ou queijo que estiverem abertos.',
    imageUrl: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800&auto=format&fit=crop&q=80',
    isFavorite: false,
    notes: 'Prática para marmitas da semana.',
    ingredients: [
      { name: '3 ovos', cost: 'R$ 3,15' },
      { name: '1 xícara de leite', cost: 'R$ 1,50' },
      { name: '1/2 xícara de óleo', cost: 'R$ 1,80' },
      { name: '2 xícaras de farinha de trigo', cost: 'R$ 2,00' },
      { name: '1 colher (sopa) de fermento em pó', cost: 'R$ 0,80' },
      { name: 'Recheio de legumes, milho e queijo', cost: 'R$ 4,75' }
    ],
    steps: [
      { title: 'Bater a massa', desc: 'Bata os ovos, leite e óleo no liquidificador. Acrescente a farinha e o fermento e bata rapidamente apenas para incorporar.' },
      { title: 'Montagem na assadeira', desc: 'Despeje metade da massa em uma forma untada, espalhe o recheio temperado e cubra com a outra metade da massa.' },
      { title: 'Assar até dourar', desc: 'Leve ao forno médio (180°C) por cerca de 35 a 40 minutos até espetar um palito e sair limpo.' }
    ]
  },
  {
    id: 'sopa-legumes',
    title: 'Sopa Reconfortante de Legumes',
    category: 'Prato Principal / Sopa',
    time: '30 min',
    yield: '4 porções',
    cost: 'R$ 11,20',
    tip: 'Congele em potinhos individuais herméticos para ter refeições saudáveis e quentinhas prontas naqueles dias corridos.',
    imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80',
    isFavorite: false,
    notes: 'Perfeita para noites frescas acompanhada de torradinhas.',
    ingredients: [
      { name: '2 batatas médias picadas', cost: 'R$ 2,20' },
      { name: '1 cenoura média em cubos', cost: 'R$ 1,50' },
      { name: '1 chuchu ou abobrinha', cost: 'R$ 2,00' },
      { name: '1 cebola e 2 dentes de alho picados', cost: 'R$ 1,80' },
      { name: '1 xícara de macarrão padre nosso', cost: 'R$ 1,70' },
      { name: 'Cheiro-verde picadinho a gosto', cost: 'R$ 2,00' }
    ],
    steps: [
      { title: 'Refogado aromático', desc: 'Em fogo médio, refogue a cebola e o alho em um fio de azeite até ficarem dourados e cheirosos.' },
      { title: 'Cozinhar os legumes', desc: 'Adicione a batata, cenoura e chuchu com 1 litro de água fervente e sal. Cozinhe por 15 minutos até amaciar.' },
      { title: 'Juntar a massa', desc: 'Acrescente o macarrão e cozinhe por mais 8 minutos. Finalize com cheiro-verde fresco.' }
    ]
  },
  {
    id: 'cookies-caseiros',
    title: 'Cookies Caseiros de Gotas de Chocolate',
    category: 'Confeitaria Afetiva',
    time: '25 min',
    yield: '12 cookies',
    cost: 'R$ 12,80',
    tip: 'Deixe as bolinhas de massa na geladeira por 15 minutos antes de assar; assim os biscoitos ficam crocantes por fora e macios por dentro.',
    imageUrl: 'https://images.unsplash.com/photo-1499636137210-bcc494a0ee69?w=800&auto=format&fit=crop&q=80',
    isFavorite: true,
    notes: 'As crianças adoram ajudar a enrolar as bolinhas!',
    ingredients: [
      { name: '1/2 xícara de manteiga amolecida', cost: 'R$ 3,20' },
      { name: '1/2 xícara de açúcar mascavo', cost: 'R$ 2,10' },
      { name: '1/4 xícara de açúcar branco', cost: 'R$ 0,80' },
      { name: '1 ovo', cost: 'R$ 1,05' },
      { name: '1 e 1/4 xícara de farinha de trigo', cost: 'R$ 1,50' },
      { name: '100g de chocolate meio amargo picado', cost: 'R$ 4,15' }
    ],
    steps: [
      { title: 'Bater manteiga e açúcares', desc: 'Misture bem a manteiga com os açúcares até formar uma pastinha clara e fofa.' },
      { title: 'Adicionar ovo e secos', desc: 'Acrescente o ovo, a essência de baunilha e depois a farinha e 1/2 colher de fermento.' },
      { title: 'Incorporar o chocolate e assar', desc: 'Misture as gotas de chocolate. Modele bolinhas espaçadas em forma untada e asse a 180°C por 12-14 minutos.' }
    ]
  }
];

interface RecipeBookViewProps {
  onBackToHome: () => void;
  onOpenBudget: () => void;
  currentYear: number;
  currentMonthIndex: number;
}

export const RecipeBookView: React.FC<RecipeBookViewProps> = ({
  onBackToHome,
  onOpenBudget,
  currentYear,
  currentMonthIndex
}) => {
  // Saved recipes persistence (respects empty array if user deleted all)
  const [savedRecipes, setSavedRecipes] = useState<RecipeItem[]>(() => {
    try {
      const saved = localStorage.getItem('personal_finance_saved_recipes');
      if (saved !== null) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error('Error loading saved recipes:', e);
    }
    return [PRESET_RECIPES[0], PRESET_RECIPES[3], PRESET_RECIPES[4]];
  });

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  // Default to first saved recipe, or null if user deleted everything
  const [activeRecipe, setActiveRecipe] = useState<RecipeItem | null>(() => {
    try {
      const saved = localStorage.getItem('personal_finance_saved_recipes');
      if (saved !== null) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.length > 0 ? parsed[0] : null;
        }
      }
    } catch (e) {
      // ignore
    }
    return PRESET_RECIPES[0];
  });

  // Interactive Checklist states for active recipe
  const [checkedIngredients, setCheckedIngredients] = useState<Record<string, boolean>>({});
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});

  // Post-it notes state for current recipe
  const [postItContent, setPostItContent] = useState<string>(activeRecipe?.notes || '');

  // Edit Modal state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState<RecipeItem | null>(activeRecipe);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Sync savedRecipes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('personal_finance_saved_recipes', JSON.stringify(savedRecipes));
    } catch (e) {
      console.error('Error saving recipes:', e);
    }
  }, [savedRecipes]);

  // When active recipe changes, sync post-it and reset checklists
  useEffect(() => {
    setPostItContent(activeRecipe?.notes || '');
    setCheckedIngredients({});
    setCompletedSteps({});
  }, [activeRecipe?.id, activeRecipe?.title]);

  // Handle Post-it update & autosave
  const handlePostItChange = (text: string) => {
    setPostItContent(text);
    if (!activeRecipe) return;
    const updatedRecipe = { ...activeRecipe, notes: text };
    setActiveRecipe(updatedRecipe);

    // Also update in saved recipes if present
    setSavedRecipes(prev =>
      prev.map(r => (r.id === activeRecipe.id || r.title === activeRecipe.title ? { ...r, notes: text } : r))
    );
  };

  // Perform search (presets first, then Gemini AI online search)
  const handleSearch = async (queryText?: string) => {
    const term = (queryText !== undefined ? queryText : searchQuery).trim();
    if (!term) return;

    // Check presets first for instant response
    const normalized = term.toLowerCase();
    const presetMatch = PRESET_RECIPES.find(
      r => r.title.toLowerCase().includes(normalized) || normalized.includes(r.title.toLowerCase())
    );

    // Also check user's saved recipes
    const savedMatch = savedRecipes.find(
      r => r.title.toLowerCase().includes(normalized) || normalized.includes(r.title.toLowerCase())
    );

    if (presetMatch && (!queryText || queryText === presetMatch.title)) {
      setActiveRecipe(presetMatch);
      showToast(`Receita encontrada: ${presetMatch.title}! 🥕✨`);
      return;
    }

    if (savedMatch && queryText === savedMatch.title) {
      setActiveRecipe(savedMatch);
      showToast(`Receita do seu caderno: ${savedMatch.title}! 📖✨`);
      return;
    }

    // Call server Gemini API search engine
    setIsSearching(true);
    try {
      showToast(`Pesquisando receita prática e econômica de "${term}"... 🔍`);
      const onlineRecipe = await searchRecipeOnline(term);

      if (onlineRecipe && onlineRecipe.title) {
        // Fallback default image if none returned
        onlineRecipe.imageUrl =
          onlineRecipe.imageUrl ||
          'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80';
        setActiveRecipe(onlineRecipe);
        showToast(`Receita encontrada com sucesso! 🍳`);
      } else {
        // Fallback to preset if result was empty
        if (presetMatch) setActiveRecipe(presetMatch);
      }
    } catch (err: any) {
      console.warn('Search fallback to preset:', err);
      if (presetMatch) {
        setActiveRecipe(presetMatch);
        showToast(`Carregando receita aproximada: ${presetMatch.title}`);
      } else {
        showToast(`Não foi possível pesquisar no momento. Verifique sua conexão.`);
      }
    } finally {
      setIsSearching(false);
    }
  };

  // Toggle favorite
  const handleToggleFavorite = () => {
    if (!activeRecipe) return;
    const isFav = !activeRecipe.isFavorite;
    const updated = { ...activeRecipe, isFavorite: isFav };
    setActiveRecipe(updated);
    setSavedRecipes(prev =>
      prev.map(r => (r.id === activeRecipe.id || r.title === activeRecipe.title ? updated : r))
    );
    showToast(isFav ? 'Adicionada aos favoritos! ❤️' : 'Removida dos favoritos');
  };

  // Toggle save recipe to notebook
  const isCurrentlySaved = activeRecipe
    ? savedRecipes.some(
        r => r.id === activeRecipe.id || r.title.toLowerCase() === activeRecipe.title.toLowerCase()
      )
    : false;

  const handleToggleSaveRecipe = () => {
    if (!activeRecipe) return;
    if (isCurrentlySaved) {
      setSavedRecipes(prev =>
        prev.filter(r => r.id !== activeRecipe.id && r.title.toLowerCase() !== activeRecipe.title.toLowerCase())
      );
      showToast('Receita removida do seu caderno.');
    } else {
      const toSave = { ...activeRecipe, notes: postItContent };
      setSavedRecipes(prev => [toSave, ...prev]);
      showToast('Receita salva no seu caderno com carinho! 📖💖');
    }
  };

  // Delete current recipe
  const handleDeleteRecipe = () => {
    if (!activeRecipe) return;
    if (confirm(`Deseja realmente remover "${activeRecipe.title}" do seu caderno?`)) {
      const updated = savedRecipes.filter(
        r => r.id !== activeRecipe.id && r.title.toLowerCase() !== activeRecipe.title.toLowerCase()
      );
      setSavedRecipes(updated);
      setActiveRecipe(updated.length > 0 ? updated[0] : null);
      showToast('Receita excluída do caderno.');
    }
  };

  // Open Edit Modal
  const handleOpenEdit = () => {
    if (!activeRecipe) return;
    setEditFormData(JSON.parse(JSON.stringify(activeRecipe)));
    setIsEditModalOpen(true);
  };

  // Save changes from Edit Modal
  const handleSaveEdit = () => {
    if (!editFormData) return;
    setActiveRecipe(editFormData);
    setSavedRecipes(prev =>
      prev.map(r => (r.id === editFormData.id || (activeRecipe && r.title === activeRecipe.title) ? editFormData : r))
    );
    setIsEditModalOpen(false);
    showToast('Receita atualizada com sucesso! ✍️');
  };

  // Toggle ingredient checkbox
  const handleToggleIngredient = (idx: number) => {
    setCheckedIngredients(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  // Toggle step complete
  const handleToggleStep = (idx: number) => {
    setCompletedSteps(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  // Add ingredients directly to Shopping List
  const handleAddToShoppingList = () => {
    if (!activeRecipe) return;
    try {
      const shoppingKey = `personal_finance_shopping_${currentYear}_${currentMonthIndex}`;
      const existingStr = localStorage.getItem(shoppingKey);
      let existingList: ShoppingItem[] = [];
      if (existingStr) {
        try {
          existingList = JSON.parse(existingStr);
        } catch (e) {
          existingList = [];
        }
      }

      // Add all ingredients that are not checked (or all if none checked)
      const hasAnyChecked = Object.values(checkedIngredients).some(Boolean);
      const itemsToAdd = activeRecipe.ingredients.filter((_, idx) =>
        hasAnyChecked ? !checkedIngredients[idx] : true
      );

      const newShoppingItems: ShoppingItem[] = itemsToAdd.map((ing, i) => {
        // Parse numerical cost if possible (e.g. "R$ 3,20" -> 3.20)
        let numPrice = 0;
        const match = ing.cost.replace('R$', '').replace(/\s/g, '').replace(',', '.');
        if (!isNaN(parseFloat(match))) {
          numPrice = parseFloat(match);
        }

        return {
          id: `rec_ing_${Date.now()}_${i}`,
          name: ing.name,
          category: 'Alimentação',
          quantity: 1,
          unitPrice: numPrice,
          purchased: false
        };
      });

      const updatedList = [...existingList, ...newShoppingItems];
      localStorage.setItem(shoppingKey, JSON.stringify(updatedList));

      showToast(
        `${newShoppingItems.length} ingredientes adicionados à sua Lista de Compras do mês! 🛒`
      );
    } catch (e) {
      console.error('Error adding to shopping list:', e);
      showToast('Erro ao adicionar à lista de compras.');
    }
  };

  // Calculate step progress
  const totalSteps = activeRecipe?.steps?.length || 0;
  const completedStepsCount = Object.values(completedSteps).filter(Boolean).length;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-[#22553B] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center space-x-2.5 text-sm font-heading font-bold animate-in fade-in slide-in-from-top-4 duration-200">
          <span>✨</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Hub Selector: Alternar entre Orçamento e Caderno Culinário */}
      <section className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Back to Home / Budget link */}
        <button
          onClick={onOpenBudget}
          className="flex-1 bg-[#FCF2E6] hover:bg-[#F5EFEB] border border-[#EDE4D8] rounded-2xl p-3 flex items-center justify-between shadow-xs transition-all group"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-[#EAE1D5] flex items-center justify-center text-[#22553B] group-hover:scale-105 transition-transform">
              <DollarSign className="w-5 h-5" />
            </div>
            <div className="text-left">
              <span className="block text-[11px] font-heading font-bold uppercase tracking-wider text-[#717972]">
                Voltar ao Orçamento
              </span>
              <span className="font-heading font-bold text-sm text-[#1F1B14]">
                Planilha Financeira {currentYear}
              </span>
            </div>
          </div>
          <span className="text-[#717972] font-bold text-lg group-hover:translate-x-1 transition-transform">→</span>
        </button>

        {/* Active Tab: Caderno Culinário */}
        <div className="flex-[1.25] relative bg-[#3B6E52] text-white rounded-2xl p-3 shadow-md flex items-center justify-between overflow-hidden">
          {/* Washi tape charm decoration */}
          <div className="absolute -top-1.5 right-8 w-16 h-4 bg-[#FFDAD3]/90 rounded-xs rotate-2 shadow-xs pointer-events-none"></div>

          <div className="flex items-center space-x-3 z-10">
            <div className="w-10 h-10 rounded-full bg-[#B7EECB] text-[#002112] flex items-center justify-center shadow-xs">
              <UtensilsCrossed className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-[11px] font-heading font-bold tracking-widest uppercase text-[#B7EECB]">
                Caderno Culinário
              </span>
              <h2 className="font-heading font-bold text-base text-white">
                Minhas Receitas Práticas
              </h2>
            </div>
          </div>

          <div className="z-10 flex items-center space-x-1">
            <span className="text-2xl">📖</span>
          </div>
        </div>
      </section>

      {/* Barra de Busca Artesanal de Receitas */}
      <section className="relative bg-[#FDFBF7] border-2 border-[#EDE4D8] rounded-2xl p-4 shadow-sm flex flex-col gap-3">
        {/* Washi tape decorative pin */}
        <div className="absolute -top-2.5 left-10 w-20 h-4 bg-[#FFDAD3]/90 -rotate-1 rounded-xs shadow-xs pointer-events-none"></div>

        <label
          htmlFor="recipe-search-input"
          className="font-heading font-bold text-xs sm:text-sm text-[#5D4742] flex items-center gap-1.5"
        >
          <UtensilsCrossed className="w-4 h-4 text-[#93493A]" />
          <span>O que vamos cozinhar hoje com carinho e economia?</span>
        </label>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <div className="relative flex-1">
            <input
              id="recipe-search-input"
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') handleSearch();
              }}
              placeholder="Ex: Bolo de Cenoura, Estrogonofe de Frango, Panqueca, Feijoada..."
              className="w-full bg-[#FCF2E6] text-[#1F1B14] placeholder-[#717972] font-sans text-sm px-4 py-3 rounded-xl border border-[#EDE4D8] focus:outline-none focus:border-[#3B6E52] focus:bg-[#FFF8F2] transition-all pr-10"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 text-[#717972] hover:text-[#1F1B14]"
                title="Limpar campo"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <button
            onClick={() => handleSearch()}
            disabled={isSearching}
            className="bg-[#22553B] hover:bg-[#1B432F] text-white font-heading font-bold text-sm px-6 py-3 rounded-xl flex items-center justify-center space-x-2 shadow-sm active:scale-95 transition-all disabled:opacity-60 cursor-pointer"
          >
            {isSearching ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                <span>Pesquisando...</span>
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>Buscar</span>
              </>
            )}
          </button>
        </div>

        {/* Chips de Sugestões Rápidas */}
        <div className="flex items-center gap-2 overflow-x-auto pt-1 pb-1 scrollbar-none">
          <span className="text-xs font-heading font-bold text-[#717972] shrink-0">Sugestões:</span>
          {PRESET_RECIPES.map(preset => (
            <button
              key={preset.id}
              onClick={() => {
                setSearchQuery(preset.title);
                handleSearch(preset.title);
              }}
              className="px-3 py-1 rounded-full text-xs font-heading font-semibold whitespace-nowrap bg-[#F5EFEB] hover:bg-[#E8F2EC] text-[#22553B] border border-[#EDE4D8] hover:border-[#3B6E52] transition-colors cursor-pointer"
            >
              {preset.title.split(' ')[0] === 'Bolo' && '🥕 '}
              {preset.title.split(' ')[0] === 'Panqueca' && '🍌 '}
              {preset.title.split(' ')[0] === 'Risoto' && '🍲 '}
              {preset.title.split(' ')[0] === 'Torta' && '🥧 '}
              {preset.title.split(' ')[0] === 'Sopa' && '🥣 '}
              {preset.title.split(' ')[0] === 'Cookies' && '🍪 '}
              {preset.title}
            </button>
          ))}
        </div>
      </section>

      {/* Receita Ativa ou Estado Limpo quando nenhuma receita está selecionada */}
      {activeRecipe ? (
        <article className="relative bg-[#FDFBF7] border-2 border-[#EDE4D8] rounded-2xl p-5 sm:p-7 shadow-sm space-y-6">
          {/* Washi tape corner accents */}
          <div className="absolute -top-3 right-12 w-24 h-5 bg-[#B7EECB]/80 rotate-2 rounded-xs shadow-xs pointer-events-none"></div>

        {/* Header da Receita: Foto e Metadados */}
        <div className="flex flex-col gap-4">
          {activeRecipe.imageUrl && (
            <div className="relative w-full h-56 sm:h-64 rounded-xl overflow-hidden shadow-sm border border-[#EDE4D8]">
              <img
                src={activeRecipe.imageUrl}
                alt={activeRecipe.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <button
                onClick={handleToggleFavorite}
                className="absolute bottom-3 left-3 flex items-center space-x-1.5 bg-[#FFF8F2]/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-xs border border-[#EDE4D8] hover:scale-105 transition-transform"
                title="Favoritar receita"
              >
                <Heart
                  className={`w-4 h-4 ${
                    activeRecipe.isFavorite ? 'fill-[#E08775] text-[#E08775]' : 'text-[#717972]'
                  }`}
                />
                <span className="text-xs font-heading font-bold text-[#1F1B14]">
                  {activeRecipe.isFavorite ? 'Favorita da Família' : 'Favoritar'}
                </span>
              </button>
            </div>
          )}

          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-heading font-bold uppercase tracking-wider text-[#93493A]">
                {activeRecipe.category || 'Culinária Afetiva'}
              </span>
              <div className="flex items-center text-[#E08775]">
                {'★★★★★'.split('').map((star, i) => (
                  <span key={i} className="text-sm font-bold">
                    {star}
                  </span>
                ))}
              </div>
            </div>
            <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#22553B] leading-tight">
              {activeRecipe.title}
            </h1>

            {/* Fonte Real da Receita (Google Search / Sites / Livros) */}
            <div className="flex flex-wrap items-center gap-2 mt-1">
              <span className="inline-flex items-center gap-1 text-xs font-heading font-medium bg-[#E8F2EC] text-[#22553B] px-2.5 py-1 rounded-full border border-[#B7EECB]">
                <Globe className="w-3.5 h-3.5 text-[#3B6E52]" />
                <span>Localizada via: {activeRecipe.sourceTitle || activeRecipe.sourceDomain || 'Google Search & Livros de Culinária'}</span>
              </span>
              {activeRecipe.sourceUrl && (
                <a
                  href={activeRecipe.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-heading font-bold text-[#22553B] hover:text-[#1B432F] bg-[#FCF2E6] hover:bg-[#EDE4D8] px-2.5 py-1 rounded-full border border-[#EDE4D8] transition-colors shadow-2xs"
                  title="Abrir receita original no Google ou site de culinária"
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#93493A]" />
                  <span>Ver Fonte Original no Google/Site</span>
                  <ExternalLink className="w-3 h-3 text-[#717972]" />
                </a>
              )}
            </div>
          </div>

          {/* Badges de Métricas (Tempo, Rendimento, Custo Estimado) */}
          <div className="grid grid-cols-3 gap-2.5 sm:gap-4">
            <div className="bg-[#FCF2E6] border border-[#EDE4D8] rounded-xl p-3 flex flex-col items-center text-center">
              <div className="flex items-center space-x-1 text-[#22553B]">
                <Clock className="w-4 h-4" />
                <span className="font-heading font-bold text-xs sm:text-sm">{activeRecipe.time}</span>
              </div>
              <span className="text-[11px] text-[#717972] mt-0.5">Preparo total</span>
            </div>

            <div className="bg-[#FCF2E6] border border-[#EDE4D8] rounded-xl p-3 flex flex-col items-center text-center">
              <div className="flex items-center space-x-1 text-[#5D4742]">
                <PieChart className="w-4 h-4" />
                <span className="font-heading font-bold text-xs sm:text-sm">{activeRecipe.yield}</span>
              </div>
              <span className="text-[11px] text-[#717972] mt-0.5">Rendimento</span>
            </div>

            <div className="bg-[#E8F2EC] border border-[#B7EECB] rounded-xl p-3 flex flex-col items-center text-center">
              <div className="flex items-center space-x-1 text-[#22553B]">
                <span className="text-sm">🐖</span>
                <span className="font-heading font-bold text-xs sm:text-sm text-[#22553B]">
                  {activeRecipe.cost}
                </span>
              </div>
              <span className="text-[11px] text-[#3B6E52] font-semibold mt-0.5">Custo estimado</span>
            </div>
          </div>

          {/* Barra de Ações Rápidas: Salvar, Editar, Excluir, Compartilhar */}
          <div className="flex items-center gap-2 pt-1 flex-wrap">
            <button
              onClick={handleToggleSaveRecipe}
              className={`flex-1 min-w-[120px] rounded-xl py-2.5 px-4 flex items-center justify-center space-x-2 shadow-xs active:scale-95 transition-all font-heading font-bold text-xs sm:text-sm cursor-pointer ${
                isCurrentlySaved
                  ? 'bg-[#22553B] text-white hover:bg-[#1B432F]'
                  : 'bg-[#FCF2E6] text-[#22553B] border border-[#EDE4D8] hover:bg-[#E8F2EC]'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isCurrentlySaved ? 'fill-white' : ''}`} />
              <span>{isCurrentlySaved ? 'Salva no Caderno' : 'Salvar Receita'}</span>
            </button>

            <button
              onClick={handleOpenEdit}
              className="bg-[#FCF2E6] hover:bg-[#EDE4D8] text-[#1F1B14] border border-[#EDE4D8] rounded-xl py-2.5 px-4 flex items-center justify-center space-x-1.5 font-heading font-bold text-xs sm:text-sm active:scale-95 transition-all cursor-pointer"
              title="Editar receita"
            >
              <Edit3 className="w-4 h-4 text-[#5D4742]" />
              <span>Editar</span>
            </button>

            <button
              onClick={handleDeleteRecipe}
              className="bg-[#FFDAD3]/50 hover:bg-[#FFDAD3] text-[#783527] border border-[#FFDAD3] rounded-xl p-2.5 flex items-center justify-center active:scale-95 transition-all cursor-pointer"
              title="Excluir do caderno"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                const text = `${activeRecipe.title}\nTempo: ${activeRecipe.time} | Custo: ${activeRecipe.cost}\n\nIngredientes:\n${activeRecipe.ingredients.map(i => `- ${i.name} (${i.cost})`).join('\n')}\n\nModo de Preparo:\n${activeRecipe.steps.map((s, i) => `${i + 1}. ${s.title}: ${s.desc}`).join('\n')}`;
                navigator.clipboard?.writeText(text);
                showToast('Receita copiada para a área de transferência! 📋');
              }}
              className="bg-[#FCF2E6] hover:bg-[#EDE4D8] text-[#5D4742] border border-[#EDE4D8] rounded-xl p-2.5 flex items-center justify-center active:scale-95 transition-all cursor-pointer"
              title="Copiar receita completa"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* POST-IT / POSTTIP DE ANOTAÇÕES DA CHEF */}
        <div className="relative bg-[#FEF9C3] border border-[#FDE047] rounded-xl p-4 shadow-sm space-y-2">
          {/* Washi tape pin top */}
          <div className="absolute -top-2.5 left-8 w-16 h-4 bg-[#FDE047]/80 -rotate-2 rounded-xs shadow-xs pointer-events-none"></div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <StickyNote className="w-4 h-4 text-[#854D0E]" />
              <span className="font-heading font-bold text-xs uppercase tracking-wider text-[#854D0E]">
                Post-it da Receita: Minhas Anotações &amp; Toques Pessoais
              </span>
            </div>
            <span className="text-[11px] text-[#A16207] font-medium">Autosalvo 💾</span>
          </div>

          <textarea
            value={postItContent}
            onChange={e => handlePostItChange(e.target.value)}
            placeholder="Escreva aqui suas observações (ex: ficou perfeito com raspas de limão, reduzi metade do açúcar, data que testou, elogios da família...)"
            rows={2}
            className="w-full bg-transparent text-[#713F12] placeholder-[#A16207]/60 font-sans text-xs sm:text-sm focus:outline-none resize-none leading-relaxed border-b border-dashed border-[#FDE047]/80 pb-1"
          />
        </div>

        {/* Card: Ingredientes Frescos & Preços Estimados */}
        <div className="bg-[#FCF2E6] border border-[#EDE4D8] rounded-2xl p-4 sm:p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-full bg-[#FFDAD3] flex items-center justify-center text-[#783527]">
                <UtensilsCrossed className="w-4 h-4" />
              </div>
              <h3 className="font-heading font-bold text-base text-[#1F1B14]">
                Ingredientes Frescos &amp; Custo Unitário
              </h3>
            </div>
            <span className="text-xs font-heading font-bold text-[#717972]">
              {activeRecipe.ingredients.length} itens
            </span>
          </div>

          {/* Lista com checkboxes para riscar os que você já tem em casa */}
          <p className="text-[11px] text-[#717972]">
            Toque nos ingredientes para marcar os que você já tem em casa.
          </p>

          <ul className="space-y-2">
            {activeRecipe.ingredients.map((ing, idx) => {
              const isChecked = !!checkedIngredients[idx];
              return (
                <li
                  key={idx}
                  onClick={() => handleToggleIngredient(idx)}
                  className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-all border ${
                    isChecked
                      ? 'bg-[#EAE1D5]/60 border-transparent text-[#717972] line-through'
                      : 'bg-[#FDFBF7] border-[#EDE4D8] hover:border-[#3B6E52] text-[#1F1B14] shadow-2xs'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    {isChecked ? (
                      <CheckCircle2 className="w-5 h-5 text-[#3B6E52] shrink-0" />
                    ) : (
                      <Circle className="w-5 h-5 text-[#C0C9C1] shrink-0" />
                    )}
                    <span className="text-xs sm:text-sm font-medium">{ing.name}</span>
                  </div>
                  <span className="text-xs font-heading font-bold text-[#3B6E52] shrink-0 ml-2">
                    {ing.cost}
                  </span>
                </li>
              );
            })}
          </ul>

          {/* Botão Enviar para Lista de Compras */}
          <button
            onClick={handleAddToShoppingList}
            className="w-full bg-[#EAE1D5] hover:bg-[#3B6E52] hover:text-white text-[#22553B] font-heading font-bold text-xs sm:text-sm py-3 rounded-xl flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-xs group"
          >
            <ShoppingBag className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span>Adicionar Faltantes à Lista de Compras</span>
          </button>
        </div>

        {/* Card: Modo de Preparo (Passo a Passo com Checklist) */}
        <div className="bg-[#FCF2E6] border border-[#EDE4D8] rounded-2xl p-4 sm:p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-full bg-[#B7EECB] flex items-center justify-center text-[#002112]">
                <ChefHat className="w-4 h-4" />
              </div>
              <h3 className="font-heading font-bold text-base text-[#1F1B14]">
                Modo de Preparo com Amor
              </h3>
            </div>
            <span className="text-xs font-heading font-bold text-[#22553B]">
              {completedStepsCount}/{totalSteps} concluídos
            </span>
          </div>

          <ol className="space-y-2.5">
            {activeRecipe.steps.map((step, idx) => {
              const isDone = !!completedSteps[idx];
              return (
                <li
                  key={idx}
                  onClick={() => handleToggleStep(idx)}
                  className={`p-3 rounded-xl flex items-start space-x-3 cursor-pointer transition-all border ${
                    isDone
                      ? 'bg-[#EAE1D5]/60 border-transparent text-[#717972]'
                      : 'bg-[#FDFBF7] border-[#EDE4D8] hover:border-[#3B6E52] text-[#1F1B14] shadow-2xs'
                  }`}
                >
                  <span
                    className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center font-heading font-bold text-xs mt-0.5 ${
                      isDone
                        ? 'bg-[#3B6E52] text-white'
                        : 'bg-[#EAE1D5] text-[#1F1B14]'
                    }`}
                  >
                    {isDone ? '✓' : idx + 1}
                  </span>
                  <div className="flex-1">
                    <h4
                      className={`font-heading font-bold text-xs sm:text-sm ${
                        isDone ? 'line-through text-[#717972]' : 'text-[#1F1B14]'
                      }`}
                    >
                      {step.title}
                    </h4>
                    <p className="text-xs text-[#5D4742] mt-0.5 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Dica da Cozinha & Economia (Dica do Porquinho) */}
        <div className="relative bg-[#FFDAD3]/30 border border-[#FFDAD3] rounded-2xl p-4 flex items-start space-x-3.5 overflow-hidden">
          {/* Mini washi tape decorativa */}
          <div className="absolute -top-1.5 right-6 w-14 h-3.5 bg-[#FFDAD3] -rotate-3 rounded-xs pointer-events-none"></div>

          <div className="w-11 h-11 rounded-full bg-[#FFDAD3] flex items-center justify-center text-[#783527] shrink-0 shadow-xs text-xl">
            🐖
          </div>
          <div className="flex flex-col">
            <div className="flex items-center space-x-1.5">
              <span className="font-heading font-bold text-xs sm:text-sm text-[#783527]">
                Dica da Cozinha &amp; Economia
              </span>
              <span className="text-xs">✨</span>
            </div>
            <p className="text-xs text-[#58413D] mt-1 leading-relaxed">
              {activeRecipe.tip}
            </p>
          </div>
        </div>
      </article>
      ) : (
        <div className="relative bg-[#FDFBF7] border-2 border-dashed border-[#EDE4D8] rounded-3xl p-8 sm:p-12 text-center shadow-xs space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#E8F2EC] text-[#22553B] flex items-center justify-center mx-auto text-3xl shadow-xs">
            🍳
          </div>
          <div className="space-y-1.5 max-w-md mx-auto">
            <h3 className="font-heading font-bold text-xl text-[#22553B]">
              Seu Caderno de Receitas está Pronto!
            </h3>
            <p className="text-xs sm:text-sm text-[#717972] leading-relaxed">
              Nenhuma receita selecionada no momento. Digite o nome de qualquer prato que desejar no campo de busca acima e clique em <strong>Buscar</strong> para carregar ingredientes, custos e modo de preparo.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-2 pt-2">
            {PRESET_RECIPES.slice(0, 4).map(preset => (
              <button
                key={preset.id}
                onClick={() => {
                  setActiveRecipe(preset);
                  setSearchQuery(preset.title);
                }}
                className="px-3.5 py-1.5 rounded-full text-xs font-heading font-bold bg-[#FCF2E6] hover:bg-[#B7EECB] text-[#22553B] border border-[#EDE4D8] transition-all cursor-pointer shadow-2xs"
              >
                + Carregar {preset.title}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Seção: Minhas Receitas Salvas no Caderno */}
      <section className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bookmark className="w-5 h-5 text-[#22553B]" />
            <h3 className="font-heading font-bold text-lg text-[#22553B]">
              Receitas Salvas no Meu Caderno
            </h3>
          </div>
          <span className="text-xs font-heading font-bold text-[#E08775]">
            {savedRecipes.length} receitas
          </span>
        </div>

        {savedRecipes.length === 0 ? (
          <div className="bg-[#FDFBF7] border-2 border-dashed border-[#EDE4D8] rounded-2xl p-6 text-center text-[#717972]">
            <p className="text-sm">Você ainda não tem receitas salvas no seu caderno.</p>
            <p className="text-xs mt-1">Pesquise qualquer prato acima e clique em "Salvar Receita"!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {savedRecipes.map(recipe => (
              <div
                key={recipe.id}
                className={`bg-[#FDFBF7] border-2 rounded-2xl p-3 shadow-2xs flex items-center justify-between gap-3 hover:shadow-sm transition-all ${
                  activeRecipe && (recipe.id === activeRecipe.id || recipe.title === activeRecipe.title)
                    ? 'border-[#3B6E52] ring-2 ring-[#B7EECB]/50'
                    : 'border-[#EDE4D8]'
                }`}
              >
                <div
                  className="flex items-center space-x-3 min-w-0 flex-1 cursor-pointer"
                  onClick={() => {
                    setActiveRecipe(recipe);
                    setSearchQuery(recipe.title);
                  }}
                >
                  <div className="w-14 h-14 rounded-xl bg-[#EAE1D5] overflow-hidden shrink-0 border border-[#EDE4D8]">
                    {recipe.imageUrl ? (
                      <img
                        src={recipe.imageUrl}
                        alt={recipe.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xl">
                        🍳
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-heading font-bold text-xs sm:text-sm text-[#1F1B14] truncate">
                      {recipe.title}
                    </h4>
                    <div className="flex items-center space-x-2 text-[11px] text-[#717972] mt-0.5">
                      <span>⏱️ {recipe.time}</span>
                      <span className="text-[#22553B] font-bold">🐖 {recipe.cost}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-1 shrink-0">
                  <button
                    onClick={() => {
                      setActiveRecipe(recipe);
                      setSearchQuery(recipe.title);
                    }}
                    className="w-8 h-8 rounded-lg bg-[#EAE1D5] text-[#22553B] flex items-center justify-center hover:bg-[#B7EECB] transition-colors"
                    title="Ver receita"
                  >
                    <UtensilsCrossed className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      const updated = savedRecipes.filter(r => r.id !== recipe.id);
                      setSavedRecipes(updated);
                      if (activeRecipe?.id === recipe.id || activeRecipe?.title === recipe.title) {
                        setActiveRecipe(updated.length > 0 ? updated[0] : null);
                      }
                      showToast(`"${recipe.title}" removida do caderno.`);
                    }}
                    className="w-8 h-8 rounded-lg bg-[#FFDAD3]/60 text-[#783527] flex items-center justify-center hover:bg-[#FFDAD3] transition-colors"
                    title="Excluir"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Modal de Edição de Receita */}
      {isEditModalOpen && editFormData && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg bg-[#FDFBF7] border-2 border-[#EDE4D8] rounded-2xl p-5 shadow-2xl max-h-[90vh] overflow-y-auto space-y-4">
            {/* Washi tape decoration */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-5 bg-[#FFDAD3] rotate-1 rounded-xs shadow-xs pointer-events-none"></div>

            <div className="flex items-center justify-between border-b border-[#EDE4D8] pb-3">
              <h3 className="font-heading font-bold text-lg text-[#22553B] flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-[#E08775]" />
                <span>Editar Detalhes da Receita</span>
              </h3>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-[#717972] hover:text-[#1F1B14]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div>
                <label className="block font-heading font-bold text-[#5D4742] mb-1">
                  Nome da Receita
                </label>
                <input
                  type="text"
                  value={editFormData.title}
                  onChange={e => setEditFormData({ ...editFormData, title: e.target.value })}
                  className="w-full bg-[#FCF2E6] px-3 py-2 rounded-xl border border-[#EDE4D8] font-heading font-bold text-[#1F1B14] focus:outline-none focus:border-[#3B6E52]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block font-heading font-bold text-[#5D4742] mb-1">
                    Categoria
                  </label>
                  <input
                    type="text"
                    value={editFormData.category}
                    onChange={e => setEditFormData({ ...editFormData, category: e.target.value })}
                    className="w-full bg-[#FCF2E6] px-3 py-2 rounded-xl border border-[#EDE4D8] font-sans text-xs focus:outline-none focus:border-[#3B6E52]"
                  />
                </div>
                <div>
                  <label className="block font-heading font-bold text-[#5D4742] mb-1">
                    Tempo de Preparo
                  </label>
                  <input
                    type="text"
                    value={editFormData.time}
                    onChange={e => setEditFormData({ ...editFormData, time: e.target.value })}
                    className="w-full bg-[#FCF2E6] px-3 py-2 rounded-xl border border-[#EDE4D8] font-sans text-xs focus:outline-none focus:border-[#3B6E52]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block font-heading font-bold text-[#5D4742] mb-1">
                    Rendimento
                  </label>
                  <input
                    type="text"
                    value={editFormData.yield}
                    onChange={e => setEditFormData({ ...editFormData, yield: e.target.value })}
                    className="w-full bg-[#FCF2E6] px-3 py-2 rounded-xl border border-[#EDE4D8] font-sans text-xs focus:outline-none focus:border-[#3B6E52]"
                  />
                </div>
                <div>
                  <label className="block font-heading font-bold text-[#5D4742] mb-1">
                    Custo Estimado (R$)
                  </label>
                  <input
                    type="text"
                    value={editFormData.cost}
                    onChange={e => setEditFormData({ ...editFormData, cost: e.target.value })}
                    className="w-full bg-[#FCF2E6] px-3 py-2 rounded-xl border border-[#EDE4D8] font-sans text-xs focus:outline-none focus:border-[#3B6E52]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-heading font-bold text-[#5D4742] mb-1">
                  Dica de Economia / Truque da Cozinha
                </label>
                <textarea
                  value={editFormData.tip}
                  onChange={e => setEditFormData({ ...editFormData, tip: e.target.value })}
                  rows={2}
                  className="w-full bg-[#FCF2E6] px-3 py-2 rounded-xl border border-[#EDE4D8] font-sans text-xs focus:outline-none focus:border-[#3B6E52]"
                />
              </div>

              {/* Ingredientes editor */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-heading font-bold text-[#5D4742]">
                    Ingredientes &amp; Valores
                  </label>
                  <button
                    onClick={() =>
                      setEditFormData({
                        ...editFormData,
                        ingredients: [...editFormData.ingredients, { name: '', cost: 'R$ 2,00' }]
                      })
                    }
                    className="text-[11px] font-heading font-bold text-[#22553B] hover:underline"
                  >
                    + Adicionar Ingrediente
                  </button>
                </div>
                <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                  {editFormData.ingredients.map((ing, i) => (
                    <div key={i} className="flex items-center space-x-1.5">
                      <input
                        type="text"
                        value={ing.name}
                        onChange={e => {
                          const updated = [...editFormData.ingredients];
                          updated[i].name = e.target.value;
                          setEditFormData({ ...editFormData, ingredients: updated });
                        }}
                        placeholder="Nome do ingrediente"
                        className="flex-1 bg-[#FCF2E6] px-2 py-1.5 rounded-lg border border-[#EDE4D8] text-xs"
                      />
                      <input
                        type="text"
                        value={ing.cost}
                        onChange={e => {
                          const updated = [...editFormData.ingredients];
                          updated[i].cost = e.target.value;
                          setEditFormData({ ...editFormData, ingredients: updated });
                        }}
                        placeholder="R$ 0,00"
                        className="w-20 bg-[#FCF2E6] px-2 py-1.5 rounded-lg border border-[#EDE4D8] text-xs"
                      />
                      <button
                        onClick={() => {
                          const updated = editFormData.ingredients.filter((_, idx) => idx !== i);
                          setEditFormData({ ...editFormData, ingredients: updated });
                        }}
                        className="text-[#783527] hover:text-red-600 p-1"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-2 pt-3 border-t border-[#EDE4D8]">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-heading font-bold text-[#717972] hover:bg-[#EAE1D5]"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveEdit}
                className="bg-[#22553B] hover:bg-[#1B432F] text-white px-5 py-2 rounded-xl text-xs font-heading font-bold shadow-xs flex items-center space-x-1.5"
              >
                <Save className="w-4 h-4" />
                <span>Salvar Alterações</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
