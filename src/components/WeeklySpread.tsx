import React, { useState } from 'react';
import { TaskItem } from '../types';
import { Check, Plus, Bookmark } from 'lucide-react';

interface WeeklySpreadProps {
  tasks: TaskItem[];
  onToggleTask: (id: string) => void;
  onAddTask: (task: Omit<TaskItem, 'id'>) => void;
}

export const WeeklySpread: React.FC<WeeklySpreadProps> = ({ tasks, onToggleTask, onAddTask }) => {
  const [selectedDay, setSelectedDay] = useState<string>(new Date().toISOString().split('T')[0]);
  const [quickTitle, setQuickTitle] = useState('');

  // Generate 7 days of current week in Portuguese locale
  const getDaysOfWeek = () => {
    const curr = new Date();
    const first = curr.getDate() - curr.getDay() + 1; // Monday
    const days = [];
    for (let i = 0; i < 7; i++) {
      const nextDate = new Date(curr.setDate(first + i));
      days.push({
        dateStr: nextDate.toISOString().split('T')[0],
        dayName: nextDate.toLocaleDateString('pt-BR', { weekday: 'short' }),
        dayNumber: nextDate.getDate(),
        monthName: nextDate.toLocaleDateString('pt-BR', { month: 'short' }),
      });
    }
    return days;
  };

  const weekDays = getDaysOfWeek();

  const handleAddForDay = (dateStr: string, e: React.FormEvent) => {
    e.preventDefault();
    if (!quickTitle.trim()) return;
    onAddTask({
      title: quickTitle.trim(),
      category: 'work',
      completed: false,
      priority: 'medium',
      date: dateStr,
    });
    setQuickTitle('');
  };

  return (
    <div className="bg-dot-grid min-h-[calc(100vh-5rem)] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="relative paper-card p-6 sm:p-8 rounded-2xl">
          <div className="washi-tape-top"></div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="px-3 py-1 bg-[#E8F2EC] text-[#2A4F3B] rounded-full text-xs font-heading font-bold uppercase tracking-wider flex items-center space-x-1">
                  <Bookmark className="w-3 h-3" />
                  <span>Visão Semanal</span>
                </span>
                <span className="text-xs text-[#717972] font-medium">• Layout de 7 Dias</span>
              </div>
              <h2 className="font-heading text-3xl font-bold text-[#1F1B14] tracking-tight">
                Planejamento Semanal & Foco
              </h2>
              <p className="text-[#414943] text-sm mt-1">
                Planeje sua semana com tranquilidade, ritmo e espaço para respirar.
              </p>
            </div>

            <div className="flex items-center space-x-3 bg-[#F5EFEB] p-3 rounded-xl border border-[#EDE4D8]">
              <span className="text-xs font-heading font-semibold text-[#717972]">Conclusão Semanal:</span>
              <span className="text-sm font-bold text-[#3B6E52]">
                {tasks.filter(t => t.completed).length} / {tasks.length} Concluídas
              </span>
            </div>
          </div>
        </div>

        {/* 7 Days Grid Spread */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
          {weekDays.map((day) => {
            const dayTasks = tasks.filter(t => t.date === day.dateStr);
            const isToday = day.dateStr === new Date().toISOString().split('T')[0];

            return (
              <div
                key={day.dateStr}
                className={`paper-card p-4 rounded-2xl flex flex-col justify-between relative transition-all ${
                  isToday ? 'ring-2 ring-[#3B6E52] bg-[#FDFBF7]' : 'hover:border-[#3B6E52]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between border-b border-[#EDE4D8] pb-3 mb-3">
                    <div>
                      <span className="text-xs font-heading font-bold uppercase text-[#E08775] capitalize">{day.dayName}</span>
                      <h4 className="font-heading text-xl font-bold text-[#1F1B14]">{day.dayNumber} {day.monthName}</h4>
                    </div>
                    {isToday && (
                      <span className="text-[10px] bg-[#3B6E52] text-white px-2 py-0.5 rounded-full font-bold">
                        Hoje
                      </span>
                    )}
                  </div>

                  {/* Tasks for this day */}
                  <div className="space-y-2 mb-4 max-h-[220px] overflow-y-auto">
                    {dayTasks.length === 0 ? (
                      <p className="text-xs text-[#717972] italic text-center py-4">Sem eventos</p>
                    ) : (
                      dayTasks.map(task => (
                        <div
                          key={task.id}
                          className={`p-2 rounded-lg border text-xs flex items-center justify-between ${
                            task.completed ? 'bg-[#E8F2EC]/50 border-[#C0C9C1] line-through text-[#717972]' : 'bg-[#F5EFEB] border-[#EDE4D8] text-[#1F1B14]'
                          }`}
                        >
                          <div className="flex items-center space-x-2 truncate">
                            <button
                              onClick={() => onToggleTask(task.id)}
                              aria-label={task.completed ? `Marcar ${task.title} como incompleta` : `Marcar ${task.title} como concluída`}
                              className={`w-4 h-4 rounded flex items-center justify-center shrink-0 ${
                                task.completed ? 'bg-[#3B6E52] text-white' : 'border border-[#717972]'
                              }`}
                            >
                              {task.completed && <Check className="w-3 h-3" />}
                            </button>
                            <span className="truncate">{task.title}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Quick Add Form for specific day */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!quickTitle.trim()) return;
                    onAddTask({
                      title: quickTitle.trim(),
                      category: 'personal',
                      completed: false,
                      priority: 'medium',
                      date: day.dateStr,
                    });
                    setQuickTitle('');
                  }}
                  className="flex gap-1 pt-2 border-t border-[#EDE4D8]"
                >
                  <input
                    type="text"
                    placeholder="Adicionar..."
                    value={selectedDay === day.dateStr ? quickTitle : ''}
                    onFocus={() => setSelectedDay(day.dateStr)}
                    onChange={(e) => {
                      setSelectedDay(day.dateStr);
                      setQuickTitle(e.target.value);
                    }}
                    className="flex-1 bg-[#F5EFEB] border border-[#EDE4D8] rounded-lg px-2 py-1 text-xs text-[#1F1B14] placeholder-[#717972] focus:outline-none focus:border-[#3B6E52]"
                  />
                  <button type="submit" aria-label="Adicionar tarefa neste dia" className="p-1.5 bg-[#3B6E52] text-white rounded-lg hover:bg-[#2E5640]">
                    <Plus className="w-3 h-3" />
                  </button>
                </form>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
