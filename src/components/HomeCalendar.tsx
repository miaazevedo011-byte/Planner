import React from 'react';
import { monthNames } from '../utils/finance';
import { Calendar, FileText, ShoppingCart, DollarSign, Sparkles, Heart, ChevronRight } from 'lucide-react';

interface HomeCalendarProps {
  selectedYear: number;
  onSelectYear: (year: number) => void;
  onSelectMonth: (monthIndex: number) => void;
  onOpenNotes: () => void;
  onOpenShopping: () => void;
}

export const HomeCalendar: React.FC<HomeCalendarProps> = ({
  selectedYear,
  onSelectYear,
  onSelectMonth,
  onOpenNotes,
  onOpenShopping,
}) => {
  const currentMonthIndex = new Date().getMonth();
  const availableYears = [2026, 2027, 2028, 2029, 2030, 2031, 2032];

  return (
    <div className="bg-dot-grid min-h-[calc(100vh-5rem)] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Hero Banner / Title */}
        <div className="relative paper-card p-6 sm:p-10 rounded-3xl overflow-hidden">
          <div className="washi-tape-top"></div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <span className="px-3.5 py-1 bg-[#F7D6D0] text-[#783527] rounded-full text-xs font-heading font-bold uppercase tracking-wider flex items-center space-x-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Planner Financeiro Pessoal</span>
                </span>
                <span className="text-xs text-[#717972] font-semibold">• Ano {selectedYear}</span>
              </div>
              <h2 className="font-heading text-4xl sm:text-5xl font-bold text-[#1F1B14] tracking-tight">
                Controle de Gastos & Orçamento
              </h2>
              <p className="text-[#414943] text-base mt-2 max-w-xl">
                Organize suas entradas, despesas fixas, variáveis, cartões e lista de compras com a leveza de um caderno artesanal. Selecione o ano e clique em qualquer mês.
              </p>
            </div>

            {/* 3 Navigation Icons */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={onOpenNotes}
                className="paper-card p-4 rounded-2xl flex items-center space-x-3 hover:border-[#3B6E52] transition-all group bg-[#F5EFEB]"
                title="Bloco de Notas"
              >
                <div className="w-10 h-10 rounded-xl bg-[#E8F2EC] flex items-center justify-center text-[#3B6E52] group-hover:scale-110 transition-transform">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <span className="block font-heading font-bold text-sm text-[#1F1B14]">Bloco de Notas</span>
                  <span className="text-[11px] text-[#717972]">Anotações livres</span>
                </div>
              </button>

              <button
                onClick={onOpenShopping}
                className="paper-card p-4 rounded-2xl flex items-center space-x-3 hover:border-[#3B6E52] transition-all group bg-[#F5EFEB]"
                title="Lista de Compras"
              >
                <div className="w-10 h-10 rounded-xl bg-[#F7D6D0]/70 flex items-center justify-center text-[#783527] group-hover:scale-110 transition-transform">
                  <ShoppingCart className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <span className="block font-heading font-bold text-sm text-[#1F1B14]">Lista de Compras</span>
                  <span className="text-[11px] text-[#3B6E52] font-semibold">🛒 Por Mês</span>
                </div>
              </button>

              <button
                onClick={() => onSelectMonth(selectedYear === new Date().getFullYear() ? currentMonthIndex : 0)}
                className="btn-primary-craft p-4 rounded-2xl flex items-center space-x-3 shadow-md"
                title="Ir para o mês"
              >
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white">
                  <DollarSign className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <span className="block font-heading font-bold text-sm text-white">Orçamento</span>
                  <span className="text-[11px] text-[#B7EECB]">Ano {selectedYear}</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Calendar Grid Header & Year Selector */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-[#EDE4D8] pb-4 px-2 gap-4">
          <div className="flex items-center space-x-2">
            <Calendar className="w-6 h-6 text-[#3B6E52]" />
            <h3 className="font-heading text-2xl font-bold text-[#1F1B14]">Calendário Anual de Orçamento</h3>
          </div>

          {/* Year selector dropdown */}
          <div className="flex items-center space-x-2 bg-[#F5EFEB] p-1.5 rounded-xl border border-[#EDE4D8]">
            <span className="text-xs font-heading font-bold text-[#717972] px-2">Selecionar Ano:</span>
            <select
              value={selectedYear}
              onChange={(e) => onSelectYear(Number(e.target.value))}
              aria-label="Selecionar ano do calendário"
              className="bg-[#3B6E52] text-white rounded-lg px-3.5 py-1.5 text-sm font-heading font-bold focus:outline-none shadow-xs"
            >
              {availableYears.map((yr) => (
                <option key={yr} value={yr}>📅 {yr}</option>
              ))}
            </select>
          </div>
        </div>

        {/* 12 Months Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {monthNames.map((month, index) => {
            const isCurrentMonth = index === currentMonthIndex && selectedYear === new Date().getFullYear();
            return (
              <div
                key={month}
                onClick={() => onSelectMonth(index)}
                className={`paper-card p-6 rounded-2xl cursor-pointer hover:border-[#3B6E52] transition-all group relative overflow-hidden flex flex-col justify-between ${
                  isCurrentMonth ? 'ring-2 ring-[#3B6E52] bg-[#FDFBF7]' : 'hover:scale-[1.02]'
                }`}
              >
                <div className="absolute top-2 right-2 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Heart className="w-16 h-16 text-[#3B6E52] fill-[#3B6E52]" />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-heading font-bold uppercase text-[#E08775]">Mês {index + 1} • {selectedYear}</span>
                    {isCurrentMonth && (
                      <span className="text-[10px] bg-[#3B6E52] text-white px-2.5 py-0.5 rounded-full font-bold">
                        Atual
                      </span>
                    )}
                  </div>
                  <h4 className="font-heading text-2xl font-bold text-[#1F1B14] group-hover:text-[#3B6E52] transition-colors">
                    {month}
                  </h4>
                  <p className="text-xs text-[#717972] mt-1">
                    Clique para preencher a planilha de {month.toLowerCase()} de {selectedYear}.
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#EDE4D8] flex items-center justify-between text-xs font-semibold text-[#3B6E52]">
                  <span>Abrir Orçamento</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
