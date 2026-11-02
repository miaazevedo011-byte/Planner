import React, { useState } from 'react';
import { CozyNote, PolaroidItem } from '../types';
import { Image as ImageIcon, FileText, Plus, Trash2, Tag, Bookmark } from 'lucide-react';

interface CozyNotesProps {
  notes: CozyNote[];
  polaroids: PolaroidItem[];
  onAddNote: (note: Omit<CozyNote, 'id'>) => void;
  onDeleteNote: (id: string) => void;
  onAddPolaroid: (polaroid: Omit<PolaroidItem, 'id'>) => void;
  onDeletePolaroid: (id: string) => void;
}

export const CozyNotes: React.FC<CozyNotesProps> = ({
  notes,
  polaroids,
  onAddNote,
  onDeleteNote,
  onAddPolaroid,
  onDeletePolaroid,
}) => {
  const [activeTab, setActiveTab] = useState<'notes' | 'polaroids'>('notes');
  
  // Note form state
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [noteColor, setNoteColor] = useState<CozyNote['color']>('parchment');
  const [noteTag, setNoteTag] = useState('');

  // Polaroid form state
  const [polaroidUrl, setPolaroidUrl] = useState('');
  const [polaroidCaption, setPolaroidCaption] = useState('');

  const handleCreateNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteTitle.trim() || !noteContent.trim()) return;
    onAddNote({
      title: noteTitle.trim(),
      content: noteContent.trim(),
      color: noteColor,
      rotation: Math.random() * 3 - 1.5,
      date: new Date().toISOString().split('T')[0],
      tags: noteTag ? [noteTag.trim()] : ['anotação'],
    });
    setNoteTitle('');
    setNoteContent('');
    setNoteTag('');
  };

  const handleCreatePolaroid = (e: React.FormEvent) => {
    e.preventDefault();
    if (!polaroidUrl.trim() || !polaroidCaption.trim()) return;
    onAddPolaroid({
      imageUrl: polaroidUrl.trim(),
      caption: polaroidCaption.trim(),
      date: new Date().toISOString().split('T')[0],
      rotation: Math.random() * 4 - 2,
    });
    setPolaroidUrl('');
    setPolaroidCaption('');
  };

  const getColorClass = (c: CozyNote['color']) => {
    switch (c) {
      case 'rose': return 'bg-[#F7D6D0]/80 text-[#783527] border-[#F7D6D0]';
      case 'sage': return 'bg-[#E8F2EC] text-[#2A4F3B] border-[#C0C9C1]';
      case 'kraft': return 'bg-[#F0E7DB] text-[#414943] border-[#EDE4D8]';
      default: return 'bg-[#FAF4EB] text-[#1F1B14] border-[#EDE4D8]';
    }
  };

  return (
    <div className="bg-dot-grid min-h-[calc(100vh-5rem)] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header & Sub-tabs */}
        <div className="relative paper-card p-6 sm:p-8 rounded-2xl">
          <div className="washi-tape-top"></div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="px-3 py-1 bg-[#E8F2EC] text-[#2A4F3B] rounded-full text-xs font-heading font-bold uppercase tracking-wider flex items-center space-x-1">
                  <Bookmark className="w-3 h-3" />
                  <span>Quadro de Memórias</span>
                </span>
                <span className="text-xs text-[#717972] font-medium">• Recortes & Polaroids</span>
              </div>
              <h2 className="font-heading text-3xl font-bold text-[#1F1B14] tracking-tight">
                Notas Aconchegantes & Polaroids
              </h2>
              <p className="text-[#414943] text-sm mt-1">
                Fixe suas receitas favoritas, esboços e memórias fotográficas.
              </p>
            </div>

            <div className="flex bg-[#F5EFEB] p-1.5 rounded-xl border border-[#EDE4D8]">
              <button
                onClick={() => setActiveTab('notes')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold flex items-center space-x-2 transition-all ${
                  activeTab === 'notes' ? 'bg-[#3B6E52] text-white shadow-xs' : 'text-[#414943] hover:text-[#1F1B14]'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Notas Adesivas ({notes.length})</span>
              </button>
              <button
                onClick={() => setActiveTab('polaroids')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold flex items-center space-x-2 transition-all ${
                  activeTab === 'polaroids' ? 'bg-[#3B6E52] text-white shadow-xs' : 'text-[#414943] hover:text-[#1F1B14]'
                }`}
              >
                <ImageIcon className="w-4 h-4" />
                <span>Polaroids ({polaroids.length})</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tab 1: Sticky Notes */}
        {activeTab === 'notes' && (
          <div className="space-y-8">
            
            {/* Add Note Form */}
            <div className="paper-card p-6 rounded-2xl">
              <h3 className="font-heading text-lg font-bold text-[#1F1B14] mb-4">Fixar Nova Nota ou Recorte</h3>
              <form onSubmit={handleCreateNote} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    placeholder="Título da nota ou assunto..."
                    value={noteTitle}
                    onChange={(e) => setNoteTitle(e.target.value)}
                    className="bg-[#F5EFEB] border border-[#EDE4D8] rounded-xl px-4 py-2.5 text-sm text-[#1F1B14] placeholder-[#717972] focus:outline-none focus:border-[#3B6E52]"
                  />
                  <input
                    type="text"
                    placeholder="Marcador (ex: receita, inspiração)"
                    value={noteTag}
                    onChange={(e) => setNoteTag(e.target.value)}
                    className="bg-[#F5EFEB] border border-[#EDE4D8] rounded-xl px-4 py-2.5 text-sm text-[#1F1B14] placeholder-[#717972] focus:outline-none focus:border-[#3B6E52]"
                  />
                  <select
                    value={noteColor}
                    onChange={(e) => setNoteColor(e.target.value as any)}
                    aria-label="Tema de cor da nota"
                    className="bg-[#F5EFEB] border border-[#EDE4D8] rounded-xl px-4 py-2.5 text-sm text-[#1F1B14] focus:outline-none focus:border-[#3B6E52]"
                  >
                    <option value="parchment">Pergaminho</option>
                    <option value="sage">Verde Sálvia</option>
                    <option value="rose">Rosa Suave</option>
                    <option value="kraft">Papel Kraft</option>
                  </select>
                </div>
                <textarea
                  placeholder="Escreva sua nota, receita ou pensamento aqui..."
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  className="w-full h-28 bg-[#F5EFEB] border border-[#EDE4D8] rounded-xl p-4 text-sm text-[#1F1B14] placeholder-[#717972] focus:outline-none focus:border-[#3B6E52]"
                />
                <button type="submit" className="btn-primary-craft px-5 py-2.5 rounded-xl text-sm flex items-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span>Fixar Nota no Quadro</span>
                </button>
              </form>
            </div>

            {/* Notes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {notes.map((note) => (
                <div
                  key={note.id}
                  style={{ transform: `rotate(${note.rotation}deg)` }}
                  className={`p-6 rounded-2xl border shadow-md relative transition-transform hover:rotate-0 ${getColorClass(note.color)}`}
                >
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-4 bg-white/40 shadow-xs rounded-sm"></div>
                  <div className="flex items-center justify-between mb-3 border-b border-black/10 pb-2">
                    <h4 className="font-heading font-bold text-lg">{note.title}</h4>
                    <button
                      onClick={() => onDeleteNote(note.id)}
                      aria-label={`Excluir nota: ${note.title}`}
                      className="text-black/50 hover:text-[#BA1A1A] p-1 rounded transition-colors"
                      title="Remover nota"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-sm whitespace-pre-line leading-relaxed mb-4">{note.content}</p>
                  <div className="flex items-center justify-between pt-3 border-t border-black/10 text-xs">
                    <span className="flex items-center space-x-1 opacity-75">
                      <Tag className="w-3 h-3" />
                      <span>{note.tags.join(', ')}</span>
                    </span>
                    <span className="opacity-75">{note.date}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* Tab 2: Polaroids */}
        {activeTab === 'polaroids' && (
          <div className="space-y-8">
            
            {/* Add Polaroid Form */}
            <div className="paper-card p-6 rounded-2xl">
              <h3 className="font-heading text-lg font-bold text-[#1F1B14] mb-4">Adicionar Memória Polaroid</h3>
              <form onSubmit={handleCreatePolaroid} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="url"
                  placeholder="URL da imagem (ex: link do Unsplash)..."
                  value={polaroidUrl}
                  onChange={(e) => setPolaroidUrl(e.target.value)}
                  className="bg-[#F5EFEB] border border-[#EDE4D8] rounded-xl px-4 py-2.5 text-sm text-[#1F1B14] placeholder-[#717972] focus:outline-none focus:border-[#3B6E52]"
                />
                <input
                  type="text"
                  placeholder="Legenda (ex: Café matinal no jardim)"
                  value={polaroidCaption}
                  onChange={(e) => setPolaroidCaption(e.target.value)}
                  className="bg-[#F5EFEB] border border-[#EDE4D8] rounded-xl px-4 py-2.5 text-sm text-[#1F1B14] placeholder-[#717972] focus:outline-none focus:border-[#3B6E52]"
                />
                <button type="submit" className="btn-primary-craft px-5 py-2.5 rounded-xl text-sm flex items-center justify-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span>Fixar Polaroid</span>
                </button>
              </form>
            </div>

            {/* Polaroids Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {polaroids.map((p) => (
                <div
                  key={p.id}
                  style={{ transform: `rotate(${p.rotation}deg)` }}
                  className="bg-[#FDFBF7] p-4 pb-6 rounded-xl border border-[#EDE4D8] shadow-md transition-transform hover:rotate-0 relative group"
                >
                  <div className="washi-tape-corner"></div>
                  <div className="aspect-square overflow-hidden rounded-lg mb-4 bg-[#F5EFEB]">
                    <img
                      src={p.imageUrl}
                      alt={p.caption}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=600';
                      }}
                    />
                  </div>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-heading font-semibold text-sm text-[#1F1B14]">{p.caption}</p>
                      <span className="text-xs text-[#717972]">{p.date}</span>
                    </div>
                    <button
                      onClick={() => onDeletePolaroid(p.id)}
                      aria-label={`Excluir polaroid: ${p.caption}`}
                      className="text-[#717972] hover:text-[#BA1A1A] p-1.5 rounded"
                      title="Remover polaroid"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
