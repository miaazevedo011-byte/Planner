import React, { useState } from 'react';
import { TaskItem, CozyNote, PolaroidItem } from '../types';
import { X, Plus, BookOpen, FileText, Image as ImageIcon } from 'lucide-react';

interface NewItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTask: (task: Omit<TaskItem, 'id'>) => void;
  onAddNote: (note: Omit<CozyNote, 'id'>) => void;
  onAddPolaroid: (polaroid: Omit<PolaroidItem, 'id'>) => void;
}

export const NewItemModal: React.FC<NewItemModalProps> = ({
  isOpen,
  onClose,
  onAddTask,
  onAddNote,
  onAddPolaroid,
}) => {
  const [entryType, setEntryType] = useState<'task' | 'note' | 'polaroid'>('task');
  
  // Task fields
  const [taskTitle, setTaskTitle] = useState('');
  const [taskTime, setTaskTime] = useState('10:00 AM');
  const [taskCategory, setTaskCategory] = useState<TaskItem['category']>('work');

  // Note fields
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [noteColor, setNoteColor] = useState<CozyNote['color']>('parchment');

  // Polaroid fields
  const [polaroidUrl, setPolaroidUrl] = useState('');
  const [polaroidCaption, setPolaroidCaption] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (entryType === 'task') {
      if (!taskTitle.trim()) return;
      onAddTask({
        title: taskTitle.trim(),
        time: taskTime,
        category: taskCategory,
        completed: false,
        priority: 'medium',
        date: new Date().toISOString().split('T')[0],
      });
      setTaskTitle('');
    } else if (entryType === 'note') {
      if (!noteTitle.trim() || !noteContent.trim()) return;
      onAddNote({
        title: noteTitle.trim(),
        content: noteContent.trim(),
        color: noteColor,
        rotation: Math.random() * 2 - 1,
        date: new Date().toISOString().split('T')[0],
        tags: ['journal'],
      });
      setNoteTitle('');
      setNoteContent('');
    } else if (entryType === 'polaroid') {
      if (!polaroidUrl.trim() || !polaroidCaption.trim()) return;
      onAddPolaroid({
        imageUrl: polaroidUrl.trim(),
        caption: polaroidCaption.trim(),
        date: new Date().toISOString().split('T')[0],
        rotation: Math.random() * 2 - 1,
      });
      setPolaroidUrl('');
      setPolaroidCaption('');
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div className="paper-card w-full max-w-lg p-6 sm:p-8 rounded-2xl relative shadow-2xl">
        <div className="washi-tape-top"></div>
        
        <div className="flex items-center justify-between mb-6 border-b border-[#EDE4D8] pb-4">
          <h3 className="font-heading text-2xl font-bold text-[#1F1B14]">Create New Stationery Entry</h3>
          <button onClick={onClose} aria-label="Close modal" className="p-2 text-[#717972] hover:text-[#1F1B14] rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Type Selectors */}
        <div className="grid grid-cols-3 gap-2 mb-6 bg-[#F5EFEB] p-1.5 rounded-xl border border-[#EDE4D8]">
          <button
            onClick={() => setEntryType('task')}
            className={`py-2 rounded-lg text-xs font-heading font-semibold flex items-center justify-center space-x-1.5 ${
              entryType === 'task' ? 'bg-[#3B6E52] text-white shadow-xs' : 'text-[#414943]'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Task</span>
          </button>
          <button
            onClick={() => setEntryType('note')}
            className={`py-2 rounded-lg text-xs font-heading font-semibold flex items-center justify-center space-x-1.5 ${
              entryType === 'note' ? 'bg-[#3B6E52] text-white shadow-xs' : 'text-[#414943]'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Sticky Note</span>
          </button>
          <button
            onClick={() => setEntryType('polaroid')}
            className={`py-2 rounded-lg text-xs font-heading font-semibold flex items-center justify-center space-x-1.5 ${
              entryType === 'polaroid' ? 'bg-[#3B6E52] text-white shadow-xs' : 'text-[#414943]'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Polaroid</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {entryType === 'task' && (
            <>
              <div>
                <label className="block text-xs font-heading font-bold uppercase text-[#717972] mb-1">Task Title</label>
                <input
                  type="text"
                  placeholder="e.g. Afternoon herbal tea & reading"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  className="w-full bg-[#F5EFEB] border border-[#EDE4D8] rounded-xl px-4 py-2.5 text-sm text-[#1F1B14] focus:outline-none focus:border-[#3B6E52]"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-heading font-bold uppercase text-[#717972] mb-1">Time</label>
                  <input
                    type="text"
                    value={taskTime}
                    onChange={(e) => setTaskTime(e.target.value)}
                    className="w-full bg-[#F5EFEB] border border-[#EDE4D8] rounded-xl px-4 py-2.5 text-sm text-[#1F1B14] focus:outline-none focus:border-[#3B6E52]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-heading font-bold uppercase text-[#717972] mb-1">Category</label>
                  <select
                    value={taskCategory}
                    onChange={(e) => setTaskCategory(e.target.value as any)}
                    className="w-full bg-[#F5EFEB] border border-[#EDE4D8] rounded-xl px-4 py-2.5 text-sm text-[#1F1B14] focus:outline-none focus:border-[#3B6E52]"
                  >
                    <option value="work">Work</option>
                    <option value="wellness">Wellness</option>
                    <option value="craft">Craft</option>
                    <option value="errands">Errands</option>
                    <option value="personal">Personal</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {entryType === 'note' && (
            <>
              <div>
                <label className="block text-xs font-heading font-bold uppercase text-[#717972] mb-1">Note Title</label>
                <input
                  type="text"
                  placeholder="e.g. Recipe or Idea"
                  value={noteTitle}
                  onChange={(e) => setNoteTitle(e.target.value)}
                  className="w-full bg-[#F5EFEB] border border-[#EDE4D8] rounded-xl px-4 py-2.5 text-sm text-[#1F1B14] focus:outline-none focus:border-[#3B6E52]"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-heading font-bold uppercase text-[#717972] mb-1">Content</label>
                <textarea
                  placeholder="Write your note here..."
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  className="w-full h-24 bg-[#F5EFEB] border border-[#EDE4D8] rounded-xl p-3 text-sm text-[#1F1B14] focus:outline-none focus:border-[#3B6E52]"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-heading font-bold uppercase text-[#717972] mb-1">Color Theme</label>
                <select
                  value={noteColor}
                  onChange={(e) => setNoteColor(e.target.value as any)}
                  className="w-full bg-[#F5EFEB] border border-[#EDE4D8] rounded-xl px-4 py-2.5 text-sm text-[#1F1B14] focus:outline-none focus:border-[#3B6E52]"
                >
                  <option value="parchment">Parchment</option>
                  <option value="sage">Sage Green</option>
                  <option value="rose">Blushing Rose</option>
                  <option value="kraft">Kraft Brown</option>
                </select>
              </div>
            </>
          )}

          {entryType === 'polaroid' && (
            <>
              <div>
                <label className="block text-xs font-heading font-bold uppercase text-[#717972] mb-1">Image URL</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={polaroidUrl}
                  onChange={(e) => setPolaroidUrl(e.target.value)}
                  className="w-full bg-[#F5EFEB] border border-[#EDE4D8] rounded-xl px-4 py-2.5 text-sm text-[#1F1B14] focus:outline-none focus:border-[#3B6E52]"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-heading font-bold uppercase text-[#717972] mb-1">Caption</label>
                <input
                  type="text"
                  placeholder="e.g. Studio light on ferns"
                  value={polaroidCaption}
                  onChange={(e) => setPolaroidCaption(e.target.value)}
                  className="w-full bg-[#F5EFEB] border border-[#EDE4D8] rounded-xl px-4 py-2.5 text-sm text-[#1F1B14] focus:outline-none focus:border-[#3B6E52]"
                  required
                />
              </div>
            </>
          )}

          <div className="flex justify-end space-x-3 pt-4 border-t border-[#EDE4D8]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold text-[#717972] hover:bg-[#F5EFEB]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary-craft px-6 py-2.5 rounded-xl text-sm flex items-center space-x-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Save Entry</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
