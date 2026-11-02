import React, { useState } from 'react';
import { HabitItem } from '../types';
import { CheckSquare, Plus, Sprout, Flame, Bookmark } from 'lucide-react';

interface HabitTrackerProps {
  habits: HabitItem[];
  onToggleHabitDate: (habitId: string, dateStr: string) => void;
  onAddHabit: (habit: Omit<HabitItem, 'id' | 'completedDates'>) => void;
  onDeleteHabit: (habitId: string) => void;
}

export const HabitTracker: React.FC<HabitTrackerProps> = ({
  habits,
  onToggleHabitDate,
  onAddHabit,
}) => {
  const [newHabitName, setNewHabitName] = useState('');
  const [newHabitCategory, setNewHabitCategory] = useState('Bem-estar');

  // Get past 7 days in Portuguese locale
  const getLast7Days = () => {
    const dates = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      dates.push({
        dateStr: d.toISOString().split('T')[0],
        label: d.toLocaleDateString('pt-BR', { weekday: 'short' }),
        dayNum: d.getDate(),
      });
    }
    return dates;
  };

  const weekDates = getLast7Days();

  const handleCreateHabit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHabitName.trim()) return;
    onAddHabit({
      name: newHabitName.trim(),
      category: newHabitCategory,
      icon: 'Sprout',
      targetDaysPerWeek: 7,
    });
    setNewHabitName('');
  };

  return (
    <div className="bg-dot-grid min-h-[calc(100vh-5rem)] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="relative paper-card p-6 sm:p-8 rounded-2xl">
          <div className="washi-tape-top"></div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="px-3 py-1 bg-[#F7D6D0] text-[#783527] rounded-full text-xs font-heading font-bold uppercase tracking-wider flex items-center space-x-1">
                  <Bookmark className="w-3 h-3" />
                  <span>Rituais & Hábitos</span>
                </span>
                <span className="text-xs text-[#717972] font-medium">• Matriz Botânica de Hábitos</span>
              </div>
              <h2 className="font-heading text-3xl font-bold text-[#1F1B14] tracking-tight">
                Rituais Diários & Hábitos de Centramento
              </h2>
              <p className="text-[#414943] text-sm mt-1">
                Pequenos passos consistentes constroem um santuário de paz e bem-estar.
              </p>
            </div>
          </div>
        </div>

        {/* Add New Habit Form */}
        <div className="paper-card p-6 rounded-2xl">
          <h3 className="font-heading text-lg font-bold text-[#1F1B14] mb-4">Adicionar Novo Hábito ou Ritual</h3>
          <form onSubmit={handleCreateHabit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Nome do hábito (ex: Chá noturno & leitura)"
              value={newHabitName}
              onChange={(e) => setNewHabitName(e.target.value)}
              className="flex-1 bg-[#F5EFEB] border border-[#EDE4D8] rounded-xl px-4 py-2.5 text-sm text-[#1F1B14] placeholder-[#717972] focus:outline-none focus:border-[#3B6E52]"
            />
            <select
              value={newHabitCategory}
              onChange={(e) => setNewHabitCategory(e.target.value)}
              aria-label="Categoria do hábito"
              className="bg-[#F5EFEB] border border-[#EDE4D8] rounded-xl px-4 py-2.5 text-sm text-[#1F1B14] focus:outline-none focus:border-[#3B6E52]"
            >
              <option value="Bem-estar">Bem-estar</option>
              <option value="Mente">Mente</option>
              <option value="Saúde">Saúde</option>
              <option value="Reflexão">Reflexão</option>
              <option value="Artesanato">Artesanato</option>
            </select>
            <button type="submit" className="btn-primary-craft px-5 py-2.5 rounded-xl text-sm flex items-center justify-center space-x-1.5">
              <Plus className="w-4 h-4" />
              <span>Plantar Hábito</span>
            </button>
          </form>
        </div>

        {/* Habits Matrix Card */}
        <div className="paper-card p-6 sm:p-8 rounded-2xl overflow-x-auto">
          <div className="min-w-[700px]">
            <div className="grid grid-cols-12 gap-4 pb-4 border-b border-[#EDE4D8] text-xs font-heading font-bold text-[#717972] uppercase tracking-wider">
              <div className="col-span-5">Ritual / Hábito</div>
              <div className="col-span-1 text-center">Sequência</div>
              <div className="col-span-6 grid grid-cols-7 text-center">
                {weekDates.map(d => (
                  <div key={d.dateStr}>
                    <span className="block text-[#E08775] capitalize">{d.label}</span>
                    <span className="text-sm font-bold text-[#1F1B14]">{d.dayNum}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="divide-y divide-[#EDE4D8] mt-4">
              {habits.map((habit) => {
                let streak = 0;
                for (let i = 0; i < 30; i++) {
                  const checkD = new Date();
                  checkD.setDate(checkD.getDate() - i);
                  const dStr = checkD.toISOString().split('T')[0];
                  if (habit.completedDates.includes(dStr)) {
                    streak++;
                  } else if (i > 0) {
                    break;
                  }
                }

                return (
                  <div key={habit.id} className="grid grid-cols-12 gap-4 py-4 items-center">
                    <div className="col-span-5 flex items-center space-x-3">
                      <div className="w-9 h-9 rounded-xl bg-[#E8F2EC] flex items-center justify-center text-[#3B6E52]">
                        <Sprout className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-heading font-bold text-sm text-[#1F1B14]">{habit.name}</h4>
                        <span className="text-xs text-[#717972] bg-[#F5EFEB] px-2 py-0.5 rounded-md border border-[#EDE4D8]">
                          {habit.category}
                        </span>
                      </div>
                    </div>

                    <div className="col-span-1 text-center">
                      <div className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-[#F7D6D0]/60 text-[#783527] text-xs font-bold">
                        <Flame className="w-3.5 h-3.5 fill-[#E08775] text-[#E08775]" />
                        <span>{streak}</span>
                      </div>
                    </div>

                    <div className="col-span-6 grid grid-cols-7 gap-2 items-center justify-items-center">
                      {weekDates.map((d) => {
                        const isCompleted = habit.completedDates.includes(d.dateStr);
                        return (
                          <button
                            key={d.dateStr}
                            onClick={() => onToggleHabitDate(habit.id, d.dateStr)}
                            aria-label={`Marcar ${habit.name} como ${isCompleted ? 'incompleto' : 'concluído'} para ${d.label}`}
                            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                              isCompleted
                                ? 'bg-[#3B6E52] text-white shadow-xs scale-105'
                                : 'bg-[#F5EFEB] border border-[#EDE4D8] hover:border-[#3B6E52]'
                            }`}
                            title={`Alternar ${d.dateStr}`}
                          >
                            {isCompleted ? <CheckSquare className="w-4 h-4" /> : <span className="w-2 h-2 rounded-full bg-[#EDE4D8]"></span>}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
