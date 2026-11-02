import React, { useState, useEffect } from 'react';
import { FreeNote } from '../types';
import { FileText, Plus, Trash2, ArrowLeft, Bookmark, Sparkles } from 'lucide-react';

interface NotesViewProps {
  onBack: () => void;
}

export const NotesView: React.FC<NotesViewProps> = ({ onBack }) => {
  const [notes, setNotes] = useState<FreeNote[]>(() => {
    const saved = localStorage.getItem('personal_finance_free_notes');
    return saved ? JSON.parse(saved) : [
      {
        id: 'fn-1',
        title: 'Metas Financeiras do Ano',
        content: '1. Guardar 20% do salário todos os meses.\n2. Criar fundo de emergência equivalente a 6 meses de despesas.\n3. Planejar viagem de férias com antecedência sem usar cartão de crédito.',
        date: '2026-01-10',
      },
      {
        id: 'fn-2',
        title: 'Ideias para Economizar',
        content: '- Cozinhar mais em casa nos finais de semana.\n- Cancelar assinaturas de streaming pouco utilizadas.\n- Pesquisar preços em feiras locais antes de comprar hortifrúti.',
        date: '2026-01-15',
      },
    ];
  });

  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  useEffect(() => {
    localStorage.setItem('personal_finance_free_notes', JSON.stringify(notes));
  }, [notes]);

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() && !newContent.trim()) return;
    const note: FreeNote = {
      id: `fn-${Date.now()}`,
      title: newTitle.trim() || 'Nota sem título',
      content: newContent.trim(),
      date: new Date().toISOString().split('T')[0],
    };
    setNotes([note, ...notes]);
    setNewTitle('');
    setNewContent('');
  };

  const handleDelete = (id: string) => {
    setNotes(notes.filter(n => n.id !== id));
  };

  return (
    <div className="bg-dot-grid min-h-[calc(100vh-5rem)] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header with Back button */}
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="btn-secondary-craft px-4 py-2 rounded-xl text-sm flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar ao Início</span>
          </button>
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 bg-[#F7D6D0] text-[#783527] rounded-full text-xs font-heading font-bold uppercase tracking-wider flex items-center space-x-1">
              <Bookmark className="w-3 h-3" />
              <span>Bloco de Notas</span>
            </span>
          </div>
        </div>

        {/* Title Banner */}
        <div className="paper-card p-6 sm:p-8 rounded-2xl relative">
          <div className="washi-tape-top"></div>
          <h2 className="font-heading text-3xl font-bold text-[#1F1B14] tracking-tight flex items-center space-x-3">
            <FileText className="w-8 h-8 text-[#3B6E52]" />
            <span>Anotações Livres & Metas</span>
          </h2>
          <p className="text-[#414943] text-sm mt-1">
            Espaço aberto para rascunhar ideias, sonhos de consumo e lembretes financeiros.
          </p>
        </div>

        {/* Create Note Form */}
        <div className="paper-card p-6 rounded-2xl">
          <h3 className="font-heading text-lg font-bold text-[#1F1B14] mb-4">Criar Nova Anotação</h3>
          <form onSubmit={handleAddNote} className="space-y-4">
            <input
              type="text"
              placeholder="Título da anotação..."
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full bg-[#F5EFEB] border border-[#EDE4D8] rounded-xl px-4 py-2.5 text-sm text-[#1F1B14] placeholder-[#717972] focus:outline-none focus:border-[#3B6E52]"
            />
            <textarea
              placeholder="Escreva seus pensamentos aqui..."
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              className="w-full h-32 bg-[#F5EFEB] border border-[#EDE4D8] rounded-xl p-4 text-sm text-[#1F1B14] placeholder-[#717972] focus:outline-none focus:border-[#3B6E52]"
            />
            <button type="submit" className="btn-primary-craft px-6 py-2.5 rounded-xl text-sm flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Salvar Anotação</span>
            </button>
          </form>
        </div>

        {/* Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {notes.map((note) => (
            <div key={note.id} className="paper-card p-6 rounded-2xl relative flex flex-col justify-between">
              <div className="washi-tape-corner"></div>
              <div>
                <div className="flex items-center justify-between border-b border-[#EDE4D8] pb-3 mb-3">
                  <h4 className="font-heading font-bold text-lg text-[#1F1B14]">{note.title}</h4>
                  <button
                    onClick={() => handleDelete(note.id)}
                    aria-label={`Excluir nota ${note.title}`}
                    className="text-[#717972] hover:text-[#BA1A1A] p-1.5 rounded"
                    title="Excluir"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-sm text-[#414943] whitespace-pre-line leading-relaxed mb-4">{note.content}</p>
              </div>
              <div className="pt-3 border-t border-[#EDE4D8] text-xs text-[#717972] flex justify-between">
                <span>Criado em {note.date}</span>
                <span className="text-[#3B6E52] font-semibold">Nota Caderno</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
