import React, { useState } from 'react';
import { MonthlyBudget } from '../types';
import { monthNames, formatCurrency } from '../utils/finance';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';

interface BudgetSpreadsheetProps {
  year: number;
  monthIndex: number;
  onBack: () => void;
}

export const BudgetSpreadsheet: React.FC<BudgetSpreadsheetProps> = ({ year, monthIndex, onBack }) => {
  const storageKey = `personal_finance_budget_${year}_${monthIndex}`;

  const [budget, setBudget] = useState<MonthlyBudget>(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : {
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
  });

  const [newTxDate, setNewTxDate] = useState(`${year}-${String(monthIndex + 1).padStart(2, '0')}-01`);
  const [newTxDesc, setNewTxDesc] = useState('');
  const [newTxAmount, setNewTxAmount] = useState<number | ''>('');

  const updateBudgetState = (updater: (prev: MonthlyBudget) => MonthlyBudget) => {
    setBudget(prev => {
      const next = updater(prev);
      localStorage.setItem(storageKey, JSON.stringify(next));
      return next;
    });
  };

  const handleChange = (field: keyof MonthlyBudget, value: any) => {
    updateBudgetState(prev => ({
      ...prev,
      [field]: value === '' ? 0 : Number(value)
    }));
  };

  const handleTextChange = (field: 'workedWell' | 'exaggerated' | 'nextMonthGoal', value: string) => {
    updateBudgetState(prev => ({ ...prev, [field]: value }));
  };

  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTxDesc.trim() || newTxAmount === '') return;
    const newTx = {
      id: `tx-${Date.now()}`,
      date: newTxDate,
      description: newTxDesc.trim(),
      amount: Number(newTxAmount),
    };
    updateBudgetState(prev => ({
      ...prev,
      dailyTransactions: [newTx, ...prev.dailyTransactions]
    }));
    setNewTxDesc('');
    setNewTxAmount('');
  };

  const handleDeleteTransaction = (id: string) => {
    updateBudgetState(prev => ({
      ...prev,
      dailyTransactions: prev.dailyTransactions.filter(t => t.id !== id)
    }));
  };

  // Calculations
  const totalEntries = Number(budget.salary) + Number(budget.extraIncome) + Number(budget.otherIncome);
  
  const totalFixed = Number(budget.housing) + Number(budget.water) + Number(budget.electricity) +
                    Number(budget.internet) + Number(budget.phone) + Number(budget.transport) + Number(budget.otherFixed);

  const totalVariable = Number(budget.groceries) + Number(budget.diningOut) + Number(budget.fuel) +
                        Number(budget.health) + Number(budget.leisure) + Number(budget.otherVariable);

  const totalCards = Number(budget.card1) + Number(budget.card2) + Number(budget.card3);

  const totalDaily = budget.dailyTransactions.reduce((acc, curr) => acc + Number(curr.amount), 0);

  const totalExits = totalFixed + totalVariable + totalCards + totalDaily;

  const finalBalance = totalEntries - totalExits;

  return (
    <div className="bg-dot-grid min-h-[calc(100vh-5rem)] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Navigation & Title */}
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="btn-secondary-craft px-4 py-2 rounded-xl text-sm flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar ao Calendário</span>
          </button>

          <span className="px-4 py-1.5 bg-[#3B6E52] text-white rounded-full font-heading font-bold text-sm shadow-sm">
            Orçamento de {monthNames[monthIndex]} {year} (Salvo)
          </span>
        </div>

        {/* Header Banner */}
        <div className="relative paper-card p-6 sm:p-8 rounded-3xl">
          <div className="washi-tape-top"></div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#1F1B14] tracking-tight">
                Planilha de Controle • {monthNames[monthIndex]} {year}
              </h2>
              <p className="text-[#414943] text-sm mt-1">
                Preencha os campos abaixo. Tudo é salvo instantaneamente no dispositivo para o ano {year}.
              </p>
            </div>

            <div className="bg-[#F5EFEB] p-4 rounded-2xl border border-[#EDE4D8] text-right">
              <span className="text-xs font-semibold text-[#717972] block">SALDO FINAL DO MÊS</span>
              <span className={`font-heading text-2xl font-bold ${finalBalance >= 0 ? 'text-[#3B6E52]' : 'text-[#BA1A1A]'}`}>
                {formatCurrency(finalBalance)}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          
          {/* 1️⃣ Resumo do Mês */}
          <div className="paper-card p-6 rounded-2xl relative">
            <div className="flex items-center justify-between mb-4 border-b border-[#EDE4D8] pb-3">
              <h3 className="font-heading text-xl font-bold text-[#3B6E52] flex items-center space-x-2">
                <span>1️⃣ Resumo do Mês (Entradas)</span>
              </h3>
              <span className="text-xs font-bold text-[#3B6E52] bg-[#E8F2EC] px-3 py-1 rounded-full">
                Total: {formatCurrency(totalEntries)}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-heading font-bold uppercase text-[#717972] mb-1">Salário (R$)</label>
                <input
                  type="number"
                  step="0.01"
                  value={budget.salary || ''}
                  onChange={(e) => handleChange('salary', e.target.value)}
                  className="w-full bg-[#F5EFEB] border border-[#EDE4D8] rounded-xl px-4 py-2.5 text-sm text-[#1F1B14] focus:outline-none focus:border-[#3B6E52]"
                  placeholder="0,00"
                />
              </div>
              <div>
                <label className="block text-xs font-heading font-bold uppercase text-[#717972] mb-1">Renda Extra (R$)</label>
                <input
                  type="number"
                  step="0.01"
                  value={budget.extraIncome || ''}
                  onChange={(e) => handleChange('extraIncome', e.target.value)}
                  className="w-full bg-[#F5EFEB] border border-[#EDE4D8] rounded-xl px-4 py-2.5 text-sm text-[#1F1B14] focus:outline-none focus:border-[#3B6E52]"
                  placeholder="0,00"
                />
              </div>
              <div>
                <label className="block text-xs font-heading font-bold uppercase text-[#717972] mb-1">Outras Entradas (R$)</label>
                <input
                  type="number"
                  step="0.01"
                  value={budget.otherIncome || ''}
                  onChange={(e) => handleChange('otherIncome', e.target.value)}
                  className="w-full bg-[#F5EFEB] border border-[#EDE4D8] rounded-xl px-4 py-2.5 text-sm text-[#1F1B14] focus:outline-none focus:border-[#3B6E52]"
                  placeholder="0,00"
                />
              </div>
            </div>
          </div>

          {/* 2️⃣ Despesas Fixas */}
          <div className="paper-card p-6 rounded-2xl relative">
            <div className="flex items-center justify-between mb-4 border-b border-[#EDE4D8] pb-3">
              <h3 className="font-heading text-xl font-bold text-[#E08775] flex items-center space-x-2">
                <span>2️⃣ Despesas Fixas</span>
              </h3>
              <span className="text-xs font-bold text-[#783527] bg-[#F7D6D0] px-3 py-1 rounded-full">
                Total Fixo: {formatCurrency(totalFixed)}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-heading font-bold uppercase text-[#717972] mb-1">Moradia (R$)</label>
                <input type="number" step="0.01" value={budget.housing || ''} onChange={(e) => handleChange('housing', e.target.value)} className="w-full bg-[#F5EFEB] border border-[#EDE4D8] rounded-xl px-4 py-2.5 text-sm text-[#1F1B14] focus:outline-none focus:border-[#3B6E52]" placeholder="0,00" />
              </div>
              <div>
                <label className="block text-xs font-heading font-bold uppercase text-[#717972] mb-1">Água (R$)</label>
                <input type="number" step="0.01" value={budget.water || ''} onChange={(e) => handleChange('water', e.target.value)} className="w-full bg-[#F5EFEB] border border-[#EDE4D8] rounded-xl px-4 py-2.5 text-sm text-[#1F1B14] focus:outline-none focus:border-[#3B6E52]" placeholder="0,00" />
              </div>
              <div>
                <label className="block text-xs font-heading font-bold uppercase text-[#717972] mb-1">Luz (R$)</label>
                <input type="number" step="0.01" value={budget.electricity || ''} onChange={(e) => handleChange('electricity', e.target.value)} className="w-full bg-[#F5EFEB] border border-[#EDE4D8] rounded-xl px-4 py-2.5 text-sm text-[#1F1B14] focus:outline-none focus:border-[#3B6E52]" placeholder="0,00" />
              </div>
              <div>
                <label className="block text-xs font-heading font-bold uppercase text-[#717972] mb-1">Internet (R$)</label>
                <input type="number" step="0.01" value={budget.internet || ''} onChange={(e) => handleChange('internet', e.target.value)} className="w-full bg-[#F5EFEB] border border-[#EDE4D8] rounded-xl px-4 py-2.5 text-sm text-[#1F1B14] focus:outline-none focus:border-[#3B6E52]" placeholder="0,00" />
              </div>
              <div>
                <label className="block text-xs font-heading font-bold uppercase text-[#717972] mb-1">Telefone (R$)</label>
                <input type="number" step="0.01" value={budget.phone || ''} onChange={(e) => handleChange('phone', e.target.value)} className="w-full bg-[#F5EFEB] border border-[#EDE4D8] rounded-xl px-4 py-2.5 text-sm text-[#1F1B14] focus:outline-none focus:border-[#3B6E52]" placeholder="0,00" />
              </div>
              <div>
                <label className="block text-xs font-heading font-bold uppercase text-[#717972] mb-1">Transporte (R$)</label>
                <input type="number" step="0.01" value={budget.transport || ''} onChange={(e) => handleChange('transport', e.target.value)} className="w-full bg-[#F5EFEB] border border-[#EDE4D8] rounded-xl px-4 py-2.5 text-sm text-[#1F1B14] focus:outline-none focus:border-[#3B6E52]" placeholder="0,00" />
              </div>
              <div>
                <label className="block text-xs font-heading font-bold uppercase text-[#717972] mb-1">Outras Fixas (R$)</label>
                <input type="number" step="0.01" value={budget.otherFixed || ''} onChange={(e) => handleChange('otherFixed', e.target.value)} className="w-full bg-[#F5EFEB] border border-[#EDE4D8] rounded-xl px-4 py-2.5 text-sm text-[#1F1B14] focus:outline-none focus:border-[#3B6E52]" placeholder="0,00" />
              </div>
            </div>
          </div>

          {/* 3️⃣ Despesas Variáveis */}
          <div className="paper-card p-6 rounded-2xl relative">
            <div className="flex items-center justify-between mb-4 border-b border-[#EDE4D8] pb-3">
              <h3 className="font-heading text-xl font-bold text-[#E08775] flex items-center space-x-2">
                <span>3️⃣ Despesas Variáveis</span>
              </h3>
              <span className="text-xs font-bold text-[#783527] bg-[#F7D6D0] px-3 py-1 rounded-full">
                Total Variável: {formatCurrency(totalVariable)}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-heading font-bold uppercase text-[#717972] mb-1">Mercado (R$)</label>
                <input type="number" step="0.01" value={budget.groceries || ''} onChange={(e) => handleChange('groceries', e.target.value)} className="w-full bg-[#F5EFEB] border border-[#EDE4D8] rounded-xl px-4 py-2.5 text-sm text-[#1F1B14] focus:outline-none focus:border-[#3B6E52]" placeholder="0,00" />
              </div>
              <div>
                <label className="block text-xs font-heading font-bold uppercase text-[#717972] mb-1">Alimentação Fora (R$)</label>
                <input type="number" step="0.01" value={budget.diningOut || ''} onChange={(e) => handleChange('diningOut', e.target.value)} className="w-full bg-[#F5EFEB] border border-[#EDE4D8] rounded-xl px-4 py-2.5 text-sm text-[#1F1B14] focus:outline-none focus:border-[#3B6E52]" placeholder="0,00" />
              </div>
              <div>
                <label className="block text-xs font-heading font-bold uppercase text-[#717972] mb-1">Combustível (R$)</label>
                <input type="number" step="0.01" value={budget.fuel || ''} onChange={(e) => handleChange('fuel', e.target.value)} className="w-full bg-[#F5EFEB] border border-[#EDE4D8] rounded-xl px-4 py-2.5 text-sm text-[#1F1B14] focus:outline-none focus:border-[#3B6E52]" placeholder="0,00" />
              </div>
              <div>
                <label className="block text-xs font-heading font-bold uppercase text-[#717972] mb-1">Saúde (R$)</label>
                <input type="number" step="0.01" value={budget.health || ''} onChange={(e) => handleChange('health', e.target.value)} className="w-full bg-[#F5EFEB] border border-[#EDE4D8] rounded-xl px-4 py-2.5 text-sm text-[#1F1B14] focus:outline-none focus:border-[#3B6E52]" placeholder="0,00" />
              </div>
              <div>
                <label className="block text-xs font-heading font-bold uppercase text-[#717972] mb-1">Lazer (R$)</label>
                <input type="number" step="0.01" value={budget.leisure || ''} onChange={(e) => handleChange('leisure', e.target.value)} className="w-full bg-[#F5EFEB] border border-[#EDE4D8] rounded-xl px-4 py-2.5 text-sm text-[#1F1B14] focus:outline-none focus:border-[#3B6E52]" placeholder="0,00" />
              </div>
              <div>
                <label className="block text-xs font-heading font-bold uppercase text-[#717972] mb-1">Outras Variáveis (R$)</label>
                <input type="number" step="0.01" value={budget.otherVariable || ''} onChange={(e) => handleChange('otherVariable', e.target.value)} className="w-full bg-[#F5EFEB] border border-[#EDE4D8] rounded-xl px-4 py-2.5 text-sm text-[#1F1B14] focus:outline-none focus:border-[#3B6E52]" placeholder="0,00" />
              </div>
            </div>
          </div>

          {/* 4️⃣ Lançamentos Diários */}
          <div className="paper-card p-6 rounded-2xl relative">
            <div className="flex items-center justify-between mb-4 border-b border-[#EDE4D8] pb-3">
              <h3 className="font-heading text-xl font-bold text-[#3B6E52] flex items-center space-x-2">
                <span>4️⃣ Lançamentos Diários</span>
              </h3>
              <span className="text-xs font-bold text-[#3B6E52] bg-[#E8F2EC] px-3 py-1 rounded-full">
                Total Diário: {formatCurrency(totalDaily)}
              </span>
            </div>

            <form onSubmit={handleAddTransaction} className="flex flex-col sm:flex-row gap-3 mb-6">
              <input
                type="date"
                value={newTxDate}
                onChange={(e) => setNewTxDate(e.target.value)}
                className="bg-[#F5EFEB] border border-[#EDE4D8] rounded-xl px-4 py-2.5 text-sm text-[#1F1B14] focus:outline-none focus:border-[#3B6E52]"
              />
              <input
                type="text"
                placeholder="Descrição (ex: Café, Padaria, Uber)"
                value={newTxDesc}
                onChange={(e) => setNewTxDesc(e.target.value)}
                className="flex-1 bg-[#F5EFEB] border border-[#EDE4D8] rounded-xl px-4 py-2.5 text-sm text-[#1F1B14] placeholder-[#717972] focus:outline-none focus:border-[#3B6E52]"
              />
              <input
                type="number"
                step="0.01"
                placeholder="Valor (R$)"
                value={newTxAmount}
                onChange={(e) => setNewTxAmount(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-36 bg-[#F5EFEB] border border-[#EDE4D8] rounded-xl px-4 py-2.5 text-sm text-[#1F1B14] placeholder-[#717972] focus:outline-none focus:border-[#3B6E52]"
              />
              <button type="submit" className="btn-primary-craft px-5 py-2.5 rounded-xl text-sm flex items-center justify-center space-x-1">
                <Plus className="w-4 h-4" />
                <span>Adicionar</span>
              </button>
            </form>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#EDE4D8] text-xs font-heading font-bold text-[#717972] uppercase">
                    <th className="py-2.5 px-3">Data</th>
                    <th className="py-2.5 px-3">Descrição</th>
                    <th className="py-2.5 px-3">Valor</th>
                    <th className="py-2.5 px-3 text-right">Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EDE4D8] text-sm">
                  {budget.dailyTransactions.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="text-center py-6 text-[#717972] italic">
                        Nenhum lançamento diário cadastrado neste mês.
                      </td>
                    </tr>
                  ) : (
                    budget.dailyTransactions.map(tx => (
                      <tr key={tx.id} className="hover:bg-[#F5EFEB]/50">
                        <td className="py-2.5 px-3 text-[#717972]">{tx.date}</td>
                        <td className="py-2.5 px-3 font-medium text-[#1F1B14]">{tx.description}</td>
                        <td className="py-2.5 px-3 font-semibold text-[#BA1A1A]">{formatCurrency(tx.amount)}</td>
                        <td className="py-2.5 px-3 text-right">
                          <button
                            onClick={() => handleDeleteTransaction(tx.id)}
                            aria-label={`Excluir lançamento ${tx.description}`}
                            className="text-[#717972] hover:text-[#BA1A1A] p-1 rounded"
                            title="Remover linha"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* 5️⃣ Cartões de Crédito */}
          <div className="paper-card p-6 rounded-2xl relative">
            <div className="flex items-center justify-between mb-4 border-b border-[#EDE4D8] pb-3">
              <h3 className="font-heading text-xl font-bold text-[#E08775] flex items-center space-x-2">
                <span>5️⃣ Cartões de Crédito</span>
              </h3>
              <span className="text-xs font-bold text-[#783527] bg-[#F7D6D0] px-3 py-1 rounded-full">
                Total Cartões: {formatCurrency(totalCards)}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-heading font-bold uppercase text-[#717972] mb-1">Cartão 1 (R$)</label>
                <input type="number" step="0.01" value={budget.card1 || ''} onChange={(e) => handleChange('card1', e.target.value)} className="w-full bg-[#F5EFEB] border border-[#EDE4D8] rounded-xl px-4 py-2.5 text-sm text-[#1F1B14] focus:outline-none focus:border-[#3B6E52]" placeholder="0,00" />
              </div>
              <div>
                <label className="block text-xs font-heading font-bold uppercase text-[#717972] mb-1">Cartão 2 (R$)</label>
                <input type="number" step="0.01" value={budget.card2 || ''} onChange={(e) => handleChange('card2', e.target.value)} className="w-full bg-[#F5EFEB] border border-[#EDE4D8] rounded-xl px-4 py-2.5 text-sm text-[#1F1B14] focus:outline-none focus:border-[#3B6E52]" placeholder="0,00" />
              </div>
              <div>
                <label className="block text-xs font-heading font-bold uppercase text-[#717972] mb-1">Cartão 3 (R$)</label>
                <input type="number" step="0.01" value={budget.card3 || ''} onChange={(e) => handleChange('card3', e.target.value)} className="w-full bg-[#F5EFEB] border border-[#EDE4D8] rounded-xl px-4 py-2.5 text-sm text-[#1F1B14] focus:outline-none focus:border-[#3B6E52]" placeholder="0,00" />
              </div>
            </div>
          </div>

          {/* 6️⃣ Fechamento do Mês & Observações */}
          <div className="paper-card p-6 sm:p-8 rounded-2xl relative space-y-6">
            <div className="washi-tape-top"></div>
            
            <div className="border-b border-[#EDE4D8] pb-4">
              <h3 className="font-heading text-2xl font-bold text-[#1F1B14]">6️⃣ Fechamento do Mês & Reflexão</h3>
              <p className="text-xs text-[#717972] mt-0.5">Resumo automático e anotações para o próximo mês.</p>
            </div>

            {/* Calculations Summary Box */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-[#F5EFEB] p-5 rounded-2xl border border-[#EDE4D8]">
              <div>
                <span className="text-xs font-heading font-bold text-[#717972] block">Total de Entradas</span>
                <span className="font-heading text-xl font-bold text-[#3B6E52]">{formatCurrency(totalEntries)}</span>
              </div>
              <div>
                <span className="text-xs font-heading font-bold text-[#717972] block">Total de Saídas</span>
                <span className="font-heading text-xl font-bold text-[#BA1A1A]">{formatCurrency(totalExits)}</span>
              </div>
              <div>
                <span className="text-xs font-heading font-bold text-[#717972] block">Saldo Final</span>
                <span className={`font-heading text-xl font-bold ${finalBalance >= 0 ? 'text-[#3B6E52]' : 'text-[#BA1A1A]'}`}>
                  {formatCurrency(finalBalance)}
                </span>
              </div>
            </div>

            {/* Observations / Reflections */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-heading font-bold uppercase text-[#3B6E52] mb-1">O que funcionou?</label>
                <textarea
                  value={budget.workedWell}
                  onChange={(e) => handleTextChange('workedWell', e.target.value)}
                  className="w-full h-28 bg-[#F5EFEB] border border-[#EDE4D8] rounded-xl p-3 text-sm text-[#1F1B14] focus:outline-none focus:border-[#3B6E52]"
                  placeholder="Ex: Consegui economizar no mercado..."
                />
              </div>
              <div>
                <label className="block text-xs font-heading font-bold uppercase text-[#E08775] mb-1">Onde exagerei?</label>
                <textarea
                  value={budget.exaggerated}
                  onChange={(e) => handleTextChange('exaggerated', e.target.value)}
                  className="w-full h-28 bg-[#F5EFEB] border border-[#EDE4D8] rounded-xl p-3 text-sm text-[#1F1B14] focus:outline-none focus:border-[#3B6E52]"
                  placeholder="Ex: Gastos excessivos com delivery..."
                />
              </div>
              <div>
                <label className="block text-xs font-heading font-bold uppercase text-[#3B6E52] mb-1">Meta para o próximo mês?</label>
                <textarea
                  value={budget.nextMonthGoal}
                  onChange={(e) => handleTextChange('nextMonthGoal', e.target.value)}
                  className="w-full h-28 bg-[#F5EFEB] border border-[#EDE4D8] rounded-xl p-3 text-sm text-[#1F1B14] focus:outline-none focus:border-[#3B6E52]"
                  placeholder="Ex: Guardar 10% a mais na poupança..."
                />
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
