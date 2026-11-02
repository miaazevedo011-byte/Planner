import React, { useState, useEffect } from 'react';
import { ShoppingItem, ShoppingCategory } from '../types';
import { monthNames, formatCurrency } from '../utils/finance';
import { transcribeShoppingListFromImage } from '../services/gemini';
import { ArrowLeft, Plus, Trash2, ShoppingCart, Check, Edit3, Bookmark, Sparkles, Camera, Loader2 } from 'lucide-react';

interface ShoppingListViewProps {
  year: number;
  monthIndex: number;
  onBack: () => void;
  onMonthChange: (newIndex: number) => void;
}

export const ShoppingListView: React.FC<ShoppingListViewProps> = ({
  year,
  monthIndex,
  onBack,
  onMonthChange,
}) => {
  const storageKey = `personal_finance_shopping_${year}_${monthIndex}`;

  const [items, setItems] = useState<ShoppingItem[]>(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : [
      { id: 's-1', name: 'Arroz integral 5kg', category: 'Alimentação', quantity: 1, unitPrice: 28.50, purchased: false },
      { id: 's-2', name: 'Feijão carioca 1kg', category: 'Alimentação', quantity: 2, unitPrice: 8.90, purchased: true },
      { id: 's-3', name: 'Detergente neutro', category: 'Casa / Limpeza', quantity: 3, unitPrice: 3.20, purchased: false },
      { id: 's-4', name: 'Sabonete líquido', category: 'Higiene / Saúde', quantity: 1, unitPrice: 12.90, purchased: false },
    ];
  });

  const [nameInput, setNameInput] = useState('');
  const [categoryInput, setCategoryInput] = useState<ShoppingCategory>('Alimentação');
  const [qtyInput, setQtyInput] = useState<number | ''>(1);
  const [priceInput, setPriceInput] = useState<number | ''>('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcribeError, setTranscribeError] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(items));
  }, [items, storageKey]);

  const categories: ShoppingCategory[] = [
    'Alimentação',
    'Casa / Limpeza',
    'Higiene / Saúde',
    'Outros',
  ];

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim()) return;

    if (editingId) {
      setItems(items.map(item => item.id === editingId ? {
        ...item,
        name: nameInput.trim(),
        category: categoryInput,
        quantity: Number(qtyInput) || 1,
        unitPrice: Number(priceInput) || 0,
      } : item));
      setEditingId(null);
    } else {
      const newItem: ShoppingItem = {
        id: `shop-${Date.now()}`,
        name: nameInput.trim(),
        category: categoryInput,
        quantity: Number(qtyInput) || 1,
        unitPrice: Number(priceInput) || 0,
        purchased: false,
      };
      setItems([newItem, ...items]);
    }

    setNameInput('');
    setQtyInput(1);
    setPriceInput('');
  };

  const handleTogglePurchased = (id: string) => {
    setItems(items.map(item => item.id === id ? { ...item, purchased: !item.purchased } : item));
  };

  const handleDeleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleEditItem = (item: ShoppingItem) => {
    setEditingId(item.id);
    setNameInput(item.name);
    setCategoryInput(item.category);
    setQtyInput(item.quantity);
    setPriceInput(item.unitPrice);
    window.scrollTo({ top: 250, behavior: 'smooth' });
  };

  const handleClearList = () => {
    if (window.confirm('Tem certeza que deseja remover todos os itens desta lista de compras?')) {
      setItems([]);
    }
  };

  const handleImageImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsTranscribing(true);
    setTranscribeError(null);

    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const base64Full = reader.result as string;
        const mimeType = file.type || 'image/jpeg';
        const base64Data = base64Full.split(',')[1];

        const transcribed = await transcribeShoppingListFromImage(base64Data, mimeType);
        if (transcribed && transcribed.length > 0) {
          const newItems: ShoppingItem[] = transcribed.map((t, idx) => ({
            id: `trans-${Date.now()}-${idx}`,
            name: t.name || 'Item transcrito',
            category: (categories.includes(t.category as any) ? t.category : 'Outros') as ShoppingCategory,
            quantity: Number(t.quantity) || 1,
            unitPrice: Number(t.unitPrice) || 0,
            purchased: false,
          }));
          setItems(prev => [...newItems, ...prev]);
        } else {
          setTranscribeError('Nenhum item foi detectado na imagem. Tente uma foto mais nítida.');
        }
      } catch (err: any) {
        setTranscribeError(`Erro ao transcrever imagem: ${err.message || 'Erro desconhecido'}`);
      } finally {
        setIsTranscribing(false);
      }
    };
    reader.onerror = () => {
      setIsTranscribing(false);
      setTranscribeError('Erro ao ler o arquivo de imagem.');
    };
    reader.readAsDataURL(file);
  };

  const totalEstimated = items.reduce((acc, curr) => acc + (Number(curr.quantity) * Number(curr.unitPrice)), 0);

  return (
    <div className="bg-dot-grid min-h-[calc(100vh-5rem)] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Navigation & Month Selector */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <button
            onClick={onBack}
            className="btn-secondary-craft px-4 py-2 rounded-xl text-sm flex items-center space-x-2 w-fit"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar ao Início</span>
          </button>

          <div className="flex items-center space-x-2 bg-[#F5EFEB] p-1.5 rounded-xl border border-[#EDE4D8]">
            <span className="text-xs font-heading font-bold text-[#717972] px-2">Mês:</span>
            <select
              value={monthIndex}
              onChange={(e) => onMonthChange(Number(e.target.value))}
              aria-label="Selecionar mês da lista de compras"
              className="bg-[#FDFBF7] border border-[#EDE4D8] rounded-lg px-3 py-1.5 text-sm font-semibold text-[#1F1B14] focus:outline-none focus:border-[#3B6E52]"
            >
              {monthNames.map((m, idx) => (
                <option key={m} value={idx}>{m} {year}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Title Banner & AI Photo Import Button */}
        <div className="relative paper-card p-6 sm:p-8 rounded-3xl">
          <div className="washi-tape-top"></div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="px-3 py-1 bg-[#F7D6D0] text-[#783527] rounded-full text-xs font-heading font-bold uppercase tracking-wider flex items-center space-x-1">
                  <Bookmark className="w-3 h-3" />
                  <span>Lista de Compras</span>
                </span>
                <span className="text-xs text-[#717972] font-medium">• {monthNames[monthIndex]} {year}</span>
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#1F1B14] tracking-tight">
                Lista de Compras • {monthNames[monthIndex]} {year}
              </h2>
              <p className="text-[#414943] text-sm mt-1">
                Organize os produtos do mês {monthNames[monthIndex]} de {year} ou importe uma foto manuscrita.
              </p>
            </div>

            {/* AI Photo Import Action */}
            <div className="flex flex-col items-end gap-2 shrink-0">
              <label className="btn-primary-craft px-5 py-3 rounded-2xl text-sm flex items-center space-x-2 cursor-pointer shadow-md hover:scale-105 transition-transform">
                {isTranscribing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Camera className="w-5 h-5" />}
                <span>{isTranscribing ? 'Transcrevendo Lista...' : '📸 Importar Foto Manuscrita'}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageImport}
                  disabled={isTranscribing}
                  className="hidden"
                />
              </label>
              <span className="text-[11px] text-[#717972] italic">IA separa por categoria automaticamente</span>
            </div>
          </div>

          {transcribeError && (
            <div className="mt-4 p-3 bg-[#FFDAD6] border border-[#BA1A1A]/30 rounded-xl text-xs text-[#93000A]">
              {transcribeError}
            </div>
          )}
        </div>

        {/* Add / Edit Item Form */}
        <div className="paper-card p-6 rounded-2xl relative">
          <div className="washi-tape-corner"></div>
          <h3 className="font-heading text-lg font-bold text-[#1F1B14] mb-4">
            {editingId ? '✏️ Editando Item da Lista' : '➕ Adicionar Novo Item'}
          </h3>
          <form onSubmit={handleAddItem} className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            <div className="sm:col-span-4">
              <label className="block text-xs font-heading font-bold uppercase text-[#717972] mb-1">Nome do Produto</label>
              <input
                type="text"
                placeholder="Ex: Leite, Arroz, Sabão..."
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                className="w-full bg-[#F5EFEB] border border-[#EDE4D8] rounded-xl px-4 py-2.5 text-sm text-[#1F1B14] placeholder-[#717972] focus:outline-none focus:border-[#3B6E52]"
                required
              />
            </div>
            <div className="sm:col-span-3">
              <label className="block text-xs font-heading font-bold uppercase text-[#717972] mb-1">Categoria</label>
              <select
                value={categoryInput}
                onChange={(e) => setCategoryInput(e.target.value as ShoppingCategory)}
                className="w-full bg-[#F5EFEB] border border-[#EDE4D8] rounded-xl px-3 py-2.5 text-sm text-[#1F1B14] focus:outline-none focus:border-[#3B6E52]"
              >
                {categories.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-heading font-bold uppercase text-[#717972] mb-1">Quantidade</label>
              <input
                type="number"
                min="1"
                value={qtyInput}
                onChange={(e) => setQtyInput(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full bg-[#F5EFEB] border border-[#EDE4D8] rounded-xl px-3 py-2.5 text-sm text-[#1F1B14] focus:outline-none focus:border-[#3B6E52]"
              />
            </div>
            <div className="sm:col-span-3">
              <label className="block text-xs font-heading font-bold uppercase text-[#717972] mb-1">Preço Unit. Est. (R$)</label>
              <input
                type="number"
                step="0.01"
                placeholder="0,00"
                value={priceInput}
                onChange={(e) => setPriceInput(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full bg-[#F5EFEB] border border-[#EDE4D8] rounded-xl px-3 py-2.5 text-sm text-[#1F1B14] placeholder-[#717972] focus:outline-none focus:border-[#3B6E52]"
              />
            </div>
            <div className="sm:col-span-12 flex justify-end space-x-3 pt-2">
              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null);
                    setNameInput('');
                    setQtyInput(1);
                    setPriceInput('');
                  }}
                  className="px-4 py-2 text-sm text-[#717972] hover:text-[#1F1B14]"
                >
                  Cancelar Edição
                </button>
              )}
              <button type="submit" className="btn-primary-craft px-6 py-2.5 rounded-xl text-sm flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>{editingId ? 'Salvar Alteração' : 'Adicionar à Lista'}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Categories Grouping */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-heading text-xl font-bold text-[#1F1B14]">Itens por Categoria</h3>
            {items.length > 0 && (
              <button
                onClick={handleClearList}
                className="text-xs text-[#BA1A1A] hover:underline flex items-center space-x-1 font-semibold"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Limpar Lista Inteira</span>
              </button>
            )}
          </div>

          {categories.map((cat) => {
            const catItems = items.filter(i => i.category === cat);
            if (catItems.length === 0) return null;

            const catTotal = catItems.reduce((acc, curr) => acc + (Number(curr.quantity) * Number(curr.unitPrice)), 0);

            return (
              <div key={cat} className="paper-card p-6 rounded-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-[#EDE4D8] pb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">
                      {cat === 'Alimentação' ? '🥦' : cat === 'Casa / Limpeza' ? '🏠' : cat === 'Higiene / Saúde' ? '🧴' : '📦'}
                    </span>
                    <h4 className="font-heading text-lg font-bold text-[#3B6E52]">{cat}</h4>
                    <span className="text-xs bg-[#E8F2EC] text-[#2A4F3B] px-2.5 py-0.5 rounded-full font-semibold">
                      {catItems.length} {catItems.length === 1 ? 'item' : 'itens'}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-[#717972]">
                    Subtotal: {formatCurrency(catTotal)}
                  </span>
                </div>

                <div className="space-y-2.5">
                  {catItems.map((item) => {
                    const itemTotal = Number(item.quantity) * Number(item.unitPrice);
                    return (
                      <div
                        key={item.id}
                        className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                          item.purchased
                            ? 'bg-[#E8F2EC]/40 border-[#C0C9C1] opacity-75'
                            : 'bg-[#F5EFEB] border-[#EDE4D8] hover:border-[#3B6E52]'
                        }`}
                      >
                        <div className="flex items-center space-x-3 flex-1 min-w-0">
                          <button
                            onClick={() => handleTogglePurchased(item.id)}
                            aria-label={item.purchased ? `Desmarcar ${item.name}` : `Marcar ${item.name} como comprado`}
                            className={`w-6 h-6 rounded-md flex items-center justify-center transition-all shrink-0 ${
                              item.purchased
                                ? 'bg-[#3B6E52] text-white shadow-xs'
                                : 'bg-[#FDFBF7] border-2 border-[#717972] hover:border-[#3B6E52]'
                            }`}
                          >
                            {item.purchased && <Check className="w-4 h-4 stroke-[3]" />}
                          </button>
                          <div className="min-w-0 flex-1">
                            <p className={`text-sm font-medium truncate ${item.purchased ? 'line-through text-[#717972]' : 'text-[#1F1B14]'}`}>
                              {item.name}
                            </p>
                            <div className="flex items-center space-x-3 text-xs text-[#717972] mt-0.5">
                              <span>Qtd: {item.quantity}</span>
                              {item.unitPrice > 0 && <span>Unit: {formatCurrency(item.unitPrice)}</span>}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3 shrink-0 ml-4">
                          <span className={`text-sm font-bold ${item.purchased ? 'line-through text-[#717972]' : 'text-[#3B6E52]'}`}>
                            {formatCurrency(itemTotal)}
                          </span>
                          <button
                            onClick={() => handleEditItem(item)}
                            aria-label={`Editar ${item.name}`}
                            className="text-[#717972] hover:text-[#3B6E52] p-1.5 rounded bg-[#FDFBF7] border border-[#EDE4D8]"
                            title="Editar item ou preço"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteItem(item.id)}
                            aria-label={`Excluir ${item.name}`}
                            className="text-[#717972] hover:text-[#BA1A1A] p-1.5 rounded"
                            title="Excluir"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {items.length === 0 && (
            <div className="paper-card p-12 rounded-2xl text-center space-y-3">
              <ShoppingCart className="w-12 h-12 text-[#C0C9C1] mx-auto" />
              <h4 className="font-heading font-bold text-lg text-[#1F1B14]">Sua lista de compras está vazia</h4>
              <p className="text-xs text-[#717972]">Adicione produtos acima ou importe uma foto da sua lista manuscrita para {monthNames[monthIndex]} {year}!</p>
            </div>
          )}
        </div>

        {/* Footer Total */}
        <div className="paper-card p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-[#3B6E52]" />
            <span className="font-heading font-bold text-sm text-[#1F1B14]">Resumo da Lista ({monthNames[monthIndex]} {year})</span>
          </div>
          <div className="text-right">
            <span className="text-xs text-[#717972] block">Valor Total Estimado</span>
            <span className="font-heading text-2xl font-bold text-[#3B6E52]">{formatCurrency(totalEstimated)}</span>
          </div>
        </div>

      </div>
    </div>
  );
};
