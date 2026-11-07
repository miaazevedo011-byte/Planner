import React, { useState } from 'react';
import { TaskItem, DailyJournal } from '../types';
import { Check, Clock, Plus, Heart, Edit3, Bookmark, Trash2, Sparkles, CheckCircle2 } from 'lucide-react';

interface TodaySpreadProps {
  tasks: TaskItem[];
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onAddTask: (task: Omit<TaskItem, 'id'>) => void;
  journal: DailyJournal;
  onUpdateJournal: (journal: DailyJournal) => void;
  onOpenNewModal: () => void;
}

export const TodaySpread: React.FC<TodaySpreadProps> = ({
  tasks,
  onToggleTask,
  onDeleteTask,
  onAddTask,
  journal,
  onUpdateJournal,
}) => {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskTime, setNewTaskTime] = useState('09:00');
  const [newTaskCategory, setNewTaskCategory] = useState<TaskItem['category']>('work');
  const [isEditingJournal, setIsEditingJournal] = useState(false);
  const [journalText, setJournalText] = useState(journal.reflection);
  const [gratitudeInput, setGratitudeInput] = useState('');

  const todayStr = new Date().toISOString().split('T')[0];
  const todayTasks = tasks.filter(t => t.date === todayStr);

  // Calculate task completion percentage
  const totalTasks = todayTasks.length;
  const completedTasks = todayTasks.filter(t => t.completed).length;
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const handleQuickAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    onAddTask({
      title: newTaskTitle.trim(),
      time: newTaskTime,
      category: newTaskCategory,
      completed: false,
      priority: 'medium',
      date: todayStr,
    });
    setNewTaskTitle('');
  };

  const handleSaveJournal = () => {
    onUpdateJournal({
      ...journal,
      reflection: journalText,
    });
    setIsEditingJournal(false);
  };

  const handleAddGratitude = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gratitudeInput.trim()) return;
    onUpdateJournal({
      ...journal,
      gratitude: [...journal.gratitude, gratitudeInput.trim()],
    });
    setGratitudeInput('');
  };

  const handleRemoveGratitude = (index: number) => {
    const updated = journal.gratitude.filter((_: string, i: number) => i !== index);
    onUpdateJournal({ ...journal, gratitude: updated });
  };

  const moods: { id: DailyJournal['mood']; label: string; icon: string }[] = [
    { id: 'radiant', label: 'Radiante', icon: '☀️' },
    { id: 'calm', label: 'Calmo & Centrado', icon: '🍃' },
    { id: 'thoughtful', label: 'Reflexivo', icon: '☕' },
    { id: 'cozy', label: 'Aconchegante', icon: '🧶' },
  ];

  return (
    <div className="bg-dot-grid min-h-[calc(100vh-5rem)] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header / Date Banner */}
        <div className="relative paper-card p-6 sm:p-8 rounded-2xl">
          <div className="washi-tape-top"></div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="px-3 py-1 bg-[#F7D6D0] text-[#783527] rounded-full text-xs font-heading font-bold uppercase tracking-wider flex items-center space-x-1">
                  <Bookmark className="w-3 h-3" />
                  <span>Página de Hoje</span>
                </span>
                <span className="text-xs text-[#717972] font-medium">• Vol. 4 Bullet Journal</span>
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#1F1B14] tracking-tight">
                Cultive Momentos Intencionais
              </h2>
              <p className="text-[#414943] text-sm sm:text-base mt-1">
                {journal.weather} • O dia de hoje é uma tela para o foco consciente.
              </p>
            </div>

            {/* Mood Selector */}
            <div className="bg-[#F5EFEB] p-3 rounded-xl border border-[#EDE4D8] flex items-center space-x-3">
              <span className="text-xs font-heading font-semibold text-[#717972]">Humor:</span>
              <div className="flex items-center space-x-2">
                {moods.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => onUpdateJournal({ ...journal, mood: m.id })}
                    title={m.label}
                    className={`px-2.5 py-1.5 rounded-lg text-sm transition-all ${
                      journal.mood === m.id
                        ? 'bg-[#3B6E52] text-white shadow-xs scale-105'
                        : 'bg-[#FDFBF7] text-[#1F1B14] hover:bg-[#EDE4D8]'
                    }`}
                  >
                    <span>{m.icon}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Grid: Schedule & Daily Rituals */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Schedule & Tasks (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="paper-card p-6 rounded-2xl relative">
              <div className="washi-tape-corner"></div>
              
              <div className="flex items-center justify-between mb-4 border-b border-[#EDE4D8] pb-4">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-[#3B6E52]" />
                  <h3 className="font-heading text-xl font-bold text-[#1F1B14]">Cronograma e Tarefas do Dia</h3>
                </div>
                <span className="text-xs bg-[#E8F2EC] text-[#2A4F3B] px-3 py-1 rounded-full font-semibold">
                  {completedTasks} / {totalTasks} Concluídas
                </span>
              </div>

              {/* VISUAL PROGRESS BAR */}
              <div className="mb-6 bg-[#F5EFEB] p-4 rounded-xl border border-[#EDE4D8] space-y-2">
                <div className="flex justify-between text-xs font-heading font-bold text-[#414943]">
                  <span className="flex items-center space-x-1">
                    <CheckCircle2 className="w-4 h-4 text-[#3B6E52]" />
                    <span>Progresso Diário</span>
                  </span>
                  <span className="text-[#3B6E52] font-extrabold">{completionPercentage}%</span>
                </div>
                <div className="w-full bg-[#EDE4D8] h-3 rounded-full overflow-hidden p-0.5">
                  <div
                    className="bg-[#3B6E52] h-full rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${completionPercentage}%` }}
                  ></div>
                </div>
                <p className="text-[11px] text-[#717972] italic">
                  {completionPercentage === 100
                    ? '🎉 Parabéns! Você concluiu todas as tarefas de hoje com maestria.'
                    : completionPercentage >= 50
                    ? '🌿 Ótimo ritmo! Mais da metade do caminho percorrido.'
                    : '☕ Respire fundo, faça uma pausa com um chá e siga no seu ritmo.'}
                </p>
              </div>

              {/* Quick Add Task Form */}
              <form onSubmit={handleQuickAddTask} className="mb-6 flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  placeholder="Adicionar nova tarefa ou ritual..."
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="flex-1 bg-[#F5EFEB] border border-[#EDE4D8] rounded-xl px-4 py-2.5 text-sm text-[#1F1B14] placeholder-[#717972] focus:outline-none focus:border-[#3B6E52]"
                />
                <input
                  type="text"
                  placeholder="Horário (ex: 10:00)"
                  value={newTaskTime}
                  onChange={(e) => setNewTaskTime(e.target.value)}
                  className="w-28 bg-[#F5EFEB] border border-[#EDE4D8] rounded-xl px-3 py-2.5 text-sm text-[#1F1B14] placeholder-[#717972] focus:outline-none focus:border-[#3B6E52]"
                />
                <select
                  value={newTaskCategory}
                  onChange={(e) => setNewTaskCategory(e.target.value as any)}
                  aria-label="Categoria da tarefa"
                  className="bg-[#F5EFEB] border border-[#EDE4D8] rounded-xl px-3 py-2.5 text-sm text-[#1F1B14] focus:outline-none focus:border-[#3B6E52]"
                >
                  <option value="work">Trabalho</option>
                  <option value="wellness">Bem-estar</option>
                  <option value="craft">Artesanato</option>
                  <option value="errands">Afazeres</option>
                  <option value="personal">Pessoal</option>
                </select>
                <button type="submit" className="btn-primary-craft px-4 py-2.5 rounded-xl text-sm flex items-center justify-center space-x-1 shrink-0">
                  <Plus className="w-4 h-4" />
                  <span>Adicionar</span>
                </button>
              </form>

              {/* Task List */}
              <div className="space-y-3">
                {todayTasks.length === 0 ? (
                  <div className="text-center py-8 text-[#717972] italic text-sm">
                    Nenhuma tarefa planejada para hoje ainda. Adicione acima!
                  </div>
                ) : (
                  todayTasks.map((task) => (
                    <div
                      key={task.id}
                      className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                        task.completed
                          ? 'bg-[#E8F2EC]/60 border-[#C0C9C1] opacity-75'
                          : 'bg-[#F5EFEB] border-[#EDE4D8] hover:border-[#3B6E52]'
                      }`}
                    >
                      <div className="flex items-center space-x-3 flex-1 min-w-0">
                        <button
                          onClick={() => onToggleTask(task.id)}
                          aria-label={task.completed ? `Marcar ${task.title} como incompleta` : `Marcar ${task.title} como concluída`}
                          className={`w-6 h-6 rounded-md flex items-center justify-center transition-all shrink-0 ${
                            task.completed
                              ? 'bg-[#3B6E52] text-[#FDFBF7] shadow-xs'
                              : 'bg-[#FDFBF7] border-2 border-[#717972] hover:border-[#3B6E52]'
                          }`}
                        >
                          {task.completed && <Check className="w-4 h-4 stroke-[3]" />}
                        </button>
                        <div className="min-w-0 flex-1">
                          <p className={`text-sm font-medium truncate ${task.completed ? 'line-through text-[#717972]' : 'text-[#1F1B14]'}`}>
                            {task.title}
                          </p>
                          <div className="flex items-center space-x-2 mt-0.5">
                            {task.time && (
                              <span className="text-xs text-[#717972] flex items-center space-x-1">
                                <Clock className="w-3 h-3" />
                                <span>{task.time}</span>
                              </span>
                            )}
                            <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#EDE4D8] text-[#414943] font-semibold">
                              {task.category}
                            </span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => onDeleteTask(task.id)}
                        aria-label={`Excluir tarefa ${task.title}`}
                        className="text-[#717972] hover:text-[#BA1A1A] p-2 rounded-lg transition-colors ml-2"
                        title="Excluir tarefa"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Gratitude & Daily Reflection (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Gratitude Log */}
            <div className="paper-card p-6 rounded-2xl relative">
              <div className="flex items-center justify-between mb-4 border-b border-[#EDE4D8] pb-3">
                <div className="flex items-center space-x-2">
                  <Heart className="w-5 h-5 text-[#E08775]" />
                  <h3 className="font-heading text-lg font-bold text-[#1F1B14]">Diário de Gratidão</h3>
                </div>
                <span className="text-xs text-[#717972]">{journal.gratitude.length} itens</span>
              </div>

              <form onSubmit={handleAddGratitude} className="flex gap-2 mb-4">
                <input
                  type="text"
                  placeholder="Sou grato(a) por..."
                  value={gratitudeInput}
                  onChange={(e) => setGratitudeInput(e.target.value)}
                  className="flex-1 bg-[#F5EFEB] border border-[#EDE4D8] rounded-xl px-3.5 py-2 text-sm text-[#1F1B14] placeholder-[#717972] focus:outline-none focus:border-[#3B6E52]"
                />
                <button type="submit" className="btn-secondary-craft px-3 py-2 rounded-xl text-xs">
                  Adicionar
                </button>
              </form>

              <ul className="space-y-2.5">
                {journal.gratitude.map((item: string, idx: number) => (
                  <li key={idx} className="flex items-center justify-between text-sm bg-[#F5EFEB]/70 p-2.5 rounded-xl border border-[#EDE4D8]">
                    <span className="text-[#1F1B14] flex items-center space-x-2">
                      <span className="text-[#E08775]">•</span>
                      <span>{item}</span>
                    </span>
                    <button
                      onClick={() => handleRemoveGratitude(idx)}
                      aria-label={`Remover gratidão: ${item}`}
                      className="text-[#717972] hover:text-[#BA1A1A] text-xs px-1.5"
                      title="Remover"
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Daily Reflection & Quote */}
            <div className="paper-card p-6 rounded-2xl relative">
              <div className="flex items-center justify-between mb-4 border-b border-[#EDE4D8] pb-3">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-[#3B6E52]" />
                  <h3 className="font-heading text-lg font-bold text-[#1F1B14]">Reflexão Consciente</h3>
                </div>
                <button
                  onClick={() => {
                    if (isEditingJournal) handleSaveJournal();
                    else setIsEditingJournal(true);
                  }}
                  className="text-xs font-semibold text-[#3B6E52] hover:underline flex items-center space-x-1"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>{isEditingJournal ? 'Salvar' : 'Editar'}</span>
                </button>
              </div>

              {isEditingJournal ? (
                <textarea
                  value={journalText}
                  onChange={(e) => setJournalText(e.target.value)}
                  className="w-full h-32 bg-[#F5EFEB] border border-[#EDE4D8] rounded-xl p-3 text-sm text-[#1F1B14] focus:outline-none focus:border-[#3B6E52]"
                />
              ) : (
                <div className="space-y-3">
                  <p className="text-sm text-[#414943] leading-relaxed italic">
                    "{journal.reflection}"
                  </p>
                  <div className="p-3 bg-[#F7D6D0]/40 rounded-xl border border-[#F7D6D0] text-xs text-[#783527] font-medium">
                    ✨ Citação do dia: "{journal.quote}"
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
