import React, { useState } from 'react';
import { X, Sparkles } from 'lucide-react';

export const PiggyAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [tipMessage, setTipMessage] = useState('');

  const calculateTip = () => {
    const currentMonth = new Date().getMonth();
    const storageKey = `personal_finance_budget_2026_${currentMonth}`;
    const saved = localStorage.getItem(storageKey);
    
    if (!saved) {
      return "Oinc! Comece preenchendo a planilha do mês atual para eu calcular seu saldo e te dar dicas personalizadas de economia! 🐖💚";
    }

    try {
      const b = JSON.parse(saved);
      const totalEntries = Number(b.salary || 0) + Number(b.extraIncome || 0) + Number(b.otherIncome || 0);
      const totalFixed = Number(b.housing || 0) + Number(b.water || 0) + Number(b.electricity || 0) +
                        Number(b.internet || 0) + Number(b.phone || 0) + Number(b.transport || 0) + Number(b.otherFixed || 0);
      const totalVariable = Number(b.groceries || 0) + Number(b.diningOut || 0) + Number(b.fuel || 0) +
                            Number(b.health || 0) + Number(b.leisure || 0) + Number(b.otherVariable || 0);
      const totalCards = Number(b.card1 || 0) + Number(b.card2 || 0) + Number(b.card3 || 0);
      const totalDaily = (b.dailyTransactions || []).reduce((acc: number, curr: any) => acc + Number(curr.amount || 0), 0);
      
      const totalExits = totalFixed + totalVariable + totalCards + totalDaily;
      const finalBalance = totalEntries - totalExits;

      const formatted = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Math.abs(finalBalance));

      if (finalBalance > 0) {
        return `Oinc! Parabéns! Seu saldo atual está positivo em ${formatted}. Que tal separar uma parte para a sua reserva financeira ou investimento? 🌿✨`;
      } else if (finalBalance === 0) {
        return `Oinc! Suas entradas e saídas estão equilibradas (R$ 0,00). Vamos tentar poupar um pouco nos gastos variáveis este mês? ☕`;
      } else {
        return `Oinc! Alerta do porquinho! Seu orçamento está no vermelho com saldo negativo de ${formatted}. Hora de revisar despesas e cortar excessos! 🚨`;
      }
    } catch (e) {
      return "Oinc! Continue registrando seus gastos com carinho e planejamento! 🐖💚";
    }
  };

  const handleToggle = () => {
    if (!isOpen) {
      setTipMessage(calculateTip());
    }
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-3 w-80 paper-card p-4 rounded-2xl shadow-xl relative animate-bounce-short border-2 border-[#3B6E52] bg-[#FDFBF7]">
          <div className="absolute -bottom-2 right-8 w-4 h-4 bg-[#FDFBF7] border-r-2 border-b-2 border-[#3B6E52] rotate-45"></div>
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Fechar mensagem do porquinho"
            className="absolute top-2 right-2 text-[#717972] hover:text-[#1F1B14]"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="flex items-start space-x-3">
            <span className="text-3xl">🐖</span>
            <div>
              <h4 className="font-heading font-bold text-sm text-[#3B6E52] flex items-center space-x-1">
                <span>Conselho do Porquinho</span>
                <Sparkles className="w-3.5 h-3.5 text-[#E08775]" />
              </h4>
              <p className="text-xs text-[#414943] mt-1.5 leading-relaxed">{tipMessage}</p>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={handleToggle}
        className="w-16 h-16 rounded-full bg-[#3B6E52] text-white flex items-center justify-center shadow-lg hover:bg-[#2A4F3B] transition-transform hover:scale-105 ring-4 ring-[#FDFBF7] relative group"
        title="Clique para ver dica de economia baseada no saldo"
      >
        <span className="text-3xl">🐖</span>
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#E08775] rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-xs">
          💡
        </span>
      </button>
    </div>
  );
};
