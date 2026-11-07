import React, { useState } from 'react';
import { ViewState } from './types';
import { HomeCalendar } from './components/HomeCalendar';
import { BudgetSpreadsheet } from './components/BudgetSpreadsheet';
import { NotesView } from './components/NotesView';
import { ShoppingListView } from './components/ShoppingListView';
import { PiggyAssistant } from './components/PiggyAssistant';
import { StickerSystem } from './components/StickerSystem';
import { Calendar, FileText, ShoppingCart, Palette } from 'lucide-react';

export default function App() {
  const [viewState, setViewState] = useState<ViewState>('home');
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [selectedMonthIndex, setSelectedMonthIndex] = useState<number>(new Date().getMonth());

  const handleSelectMonth = (monthIndex: number) => {
    setSelectedMonthIndex(monthIndex);
    setViewState('spreadsheet');
  };

  const handleOpenShopping = () => {
    setViewState('shopping');
  };

  return (
    <div className="min-h-screen bg-[#FFF8F2] text-[#1F1B14] flex flex-col font-sans">
      
      {/* Top Stationery Header */}
      <header className="bg-[#FDFBF7] border-b-2 border-[#EDE4D8] sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Brand Logo */}
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setViewState('home')}>
              <div className="w-10 h-10 rounded-full bg-[#3B6E52] flex items-center justify-center text-[#FDFBF7] shadow-sm ring-2 ring-[#EDE4D8]">
                <span className="text-xl">🐖</span>
              </div>
              <div>
                <h1 className="font-heading font-bold text-xl text-[#1F1B14] tracking-tight">Finanças com Carinho</h1>
                <p className="text-xs text-[#717972] font-medium tracking-wide">Planejador • {selectedYear}</p>
              </div>
            </div>

            {/* Navigation Buttons */}
            <nav className="hidden md:flex items-center space-x-2 bg-[#F5EFEB] p-1.5 rounded-xl border border-[#EDE4D8]">
              <button
                onClick={() => setViewState('home')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  viewState === 'home' ? 'bg-[#3B6E52] text-[#FDFBF7] shadow-xs' : 'text-[#414943] hover:text-[#1F1B14]'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>Calendário ({selectedYear})</span>
              </button>

              <button
                onClick={() => setViewState('notes')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  viewState === 'notes' ? 'bg-[#3B6E52] text-[#FDFBF7] shadow-xs' : 'text-[#414943] hover:text-[#1F1B14]'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Bloco de Notas</span>
              </button>

              <button
                onClick={handleOpenShopping}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  viewState === 'shopping' ? 'bg-[#3B6E52] text-[#FDFBF7] shadow-xs' : 'text-[#414943] hover:text-[#1F1B14]'
                }`}
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Lista de Compras</span>
              </button>
            </nav>

            {/* Quick Badge */}
            <div className="hidden lg:block text-right">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#E08775] block">Decorar Diário</span>
              <span className="text-sm font-heading font-bold text-[#3B6E52] flex items-center space-x-1 justify-end">
                <Palette className="w-4 h-4 text-[#E08775]" />
                <span>Adesivos Habilitados</span>
              </span>
            </div>

          </div>
        </div>
      </header>

      {/* Main Content Area Wrapped with StickerSystem */}
      <main className="flex-1">
        {viewState === 'home' && (
          <StickerSystem viewKey={`home_${selectedYear}`}>
            <HomeCalendar
              selectedYear={selectedYear}
              onSelectYear={setSelectedYear}
              onSelectMonth={handleSelectMonth}
              onOpenNotes={() => setViewState('notes')}
              onOpenShopping={handleOpenShopping}
            />
          </StickerSystem>
        )}

        {viewState === 'spreadsheet' && (
          <StickerSystem viewKey={`spreadsheet_${selectedYear}_${selectedMonthIndex}`}>
            <BudgetSpreadsheet
              year={selectedYear}
              monthIndex={selectedMonthIndex}
              onBack={() => setViewState('home')}
            />
          </StickerSystem>
        )}

        {viewState === 'notes' && (
          <StickerSystem viewKey="notes">
            <NotesView
              onBack={() => setViewState('home')}
            />
          </StickerSystem>
        )}

        {viewState === 'shopping' && (
          <StickerSystem viewKey={`shopping_${selectedYear}_${selectedMonthIndex}`}>
            <ShoppingListView
              year={selectedYear}
              monthIndex={selectedMonthIndex}
              onBack={() => setViewState('home')}
              onMonthChange={setSelectedMonthIndex}
            />
          </StickerSystem>
        )}
      </main>

      {/* Cute Piggy Mascot in Bottom Right */}
      <PiggyAssistant />

    </div>
  );
}
