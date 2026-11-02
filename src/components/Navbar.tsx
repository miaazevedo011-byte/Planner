import React from 'react';
import { TabType } from '../types';
import { BookOpen, Calendar, CheckSquare, Sparkles, Image as ImageIcon, Plus, Heart } from 'lucide-react';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  onOpenNewModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onOpenNewModal }) => {
  const navItems: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'today', label: 'Página de Hoje', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'weekly', label: 'Planejador Semanal', icon: <Calendar className="w-4 h-4" /> },
    { id: 'habits', label: 'Rituais & Hábitos', icon: <CheckSquare className="w-4 h-4" /> },
    { id: 'notes', label: 'Notas & Polaroids', icon: <ImageIcon className="w-4 h-4" /> },
    { id: 'ai', label: 'Assistente IA', icon: <Sparkles className="w-4 h-4" /> },
  ];

  const currentDateFormatted = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="bg-[#FDFBF7] border-b-2 border-[#EDE4D8] sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('today')}>
            <div className="w-10 h-10 rounded-full bg-[#3B6E52] flex items-center justify-center text-[#FDFBF7] shadow-sm ring-2 ring-[#EDE4D8]">
              <Heart className="w-5 h-5 fill-[#F7D6D0] text-[#3B6E52]" />
            </div>
            <div>
              <h1 className="font-heading font-bold text-xl text-[#1F1B14] tracking-tight">Planejador Artesanal</h1>
              <p className="text-xs text-[#717972] font-medium tracking-wide">Caderno Bullet Journal & Papelaria</p>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden md:flex items-center space-x-1 bg-[#F5EFEB] p-1.5 rounded-xl border border-[#EDE4D8]">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-[#3B6E52] text-[#FDFBF7] shadow-xs'
                      : 'text-[#414943] hover:text-[#1F1B14] hover:bg-[#EDE4D8]/50'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Date & Quick Add */}
          <div className="flex items-center space-x-4">
            <div className="hidden lg:block text-right">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#E08775] block">Entrada de Hoje</span>
              <span className="text-sm font-heading font-bold text-[#1F1B14] capitalize">{currentDateFormatted}</span>
            </div>

            <button
              onClick={onOpenNewModal}
              className="btn-primary-craft px-4 py-2.5 rounded-xl flex items-center space-x-2 text-sm shadow-sm"
              title="Adicionar tarefa, nota ou polaroid"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Nova Entrada</span>
            </button>
          </div>

        </div>

        {/* Mobile Navigation Tabs */}
        <div className="flex md:hidden overflow-x-auto py-2 space-x-2 border-t border-[#EDE4D8] scrollbar-none">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-all ${
                  isActive
                    ? 'bg-[#3B6E52] text-[#FDFBF7]'
                    : 'bg-[#F5EFEB] text-[#414943] border border-[#EDE4D8]'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
