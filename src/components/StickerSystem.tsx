import React, { useState, useEffect, useRef } from 'react';
import { StickerPreset, PlacedSticker } from '../types';
import { Sparkles, Trash2, RotateCw, ZoomIn, ZoomOut, Lock, Unlock, X, Move, Plus, Heart, Palette } from 'lucide-react';

export const STICKER_PRESETS: StickerPreset[] = [
  // --- WASHI TAPES ---
  {
    id: 'washi-sage',
    category: 'washi',
    name: 'Washi Sálvia Botânica',
    label: '🌿 Sálvia & Folhas',
    bgStyle: 'bg-[#E8F2EC] text-[#2A4F3B] border-y-2 border-dashed border-[#3B6E52]/40',
    width: 'w-36 sm:w-44',
    height: 'h-8 sm:h-9',
  },
  {
    id: 'washi-rose',
    category: 'washi',
    name: 'Washi Rosa Floral',
    label: '🌸 Rosa Delicado',
    bgStyle: 'bg-[#F7D6D0] text-[#783527] border-y-2 border-dashed border-[#E08775]/50',
    width: 'w-36 sm:w-44',
    height: 'h-8 sm:h-9',
  },
  {
    id: 'washi-kraft',
    category: 'washi',
    name: 'Washi Kraft Pautado',
    label: '📐 Kraft Vintage',
    bgStyle: 'bg-[#F0E7DB] text-[#414943] border-y-2 border-dotted border-[#717972]/50',
    width: 'w-36 sm:w-44',
    height: 'h-8 sm:h-9',
  },
  {
    id: 'washi-terracotta',
    category: 'washi',
    name: 'Washi Terracota',
    label: '✨ Terracota Clay',
    bgStyle: 'bg-[#E08775] text-[#FFFFFF] border-y-2 border-dashed border-[#753225]/40',
    width: 'w-36 sm:w-44',
    height: 'h-8 sm:h-9',
  },
  {
    id: 'washi-gold',
    category: 'washi',
    name: 'Washi Estrelado',
    label: '⭐ Brilho Dourado',
    bgStyle: 'bg-[#FFF8F2] text-[#1F1B14] border-2 border-dashed border-[#E08775] shadow-xs',
    width: 'w-36 sm:w-44',
    height: 'h-8 sm:h-9',
  },

  // --- STAMPS & SEALS ---
  {
    id: 'stamp-piggy',
    category: 'stamp',
    name: 'Selo Porquinho da Sorte',
    icon: '🐖',
    label: 'Poupança Fofa',
    bgStyle: 'bg-[#E8F2EC] text-[#2A4F3B] border-2 border-dashed border-[#3B6E52] rounded-full',
    width: 'w-24 sm:w-28',
    height: 'h-24 sm:h-28',
  },
  {
    id: 'stamp-wax-heart',
    category: 'stamp',
    name: 'Selo de Cera Verde',
    icon: '💚',
    label: 'Com Carinho',
    bgStyle: 'bg-[#3B6E52] text-[#FDFBF7] border-4 border-double border-[#9CD3B1] rounded-full shadow-md',
    width: 'w-20 sm:w-24',
    height: 'h-20 sm:h-24',
  },
  {
    id: 'stamp-star',
    category: 'stamp',
    name: 'Carimbo Estrela',
    icon: '⭐',
    label: 'Nota 10!',
    bgStyle: 'bg-[#F7D6D0] text-[#783527] border-2 border-dashed border-[#E08775] rounded-2xl',
    width: 'w-20 sm:w-24',
    height: 'h-20 sm:h-24',
  },
  {
    id: 'stamp-coffee',
    category: 'stamp',
    name: 'Carimbo Pausa Pro Chá',
    icon: '☕',
    label: 'Pausa Calma',
    bgStyle: 'bg-[#F0E7DB] text-[#414943] border-2 border-dashed border-[#717972] rounded-full',
    width: 'w-20 sm:w-24',
    height: 'h-20 sm:h-24',
  },
  {
    id: 'stamp-approved',
    category: 'stamp',
    name: 'Carimbo Aprovado',
    icon: '✅',
    label: 'APROVADO!',
    bgStyle: 'bg-[#E8F2EC] text-[#2A4F3B] border-2 border-solid border-[#3B6E52] rounded-xl transform -rotate-3',
    width: 'w-28 sm:w-32',
    height: 'h-16 sm:h-20',
  },

  // --- BADGES ---
  {
    id: 'badge-target',
    category: 'badge',
    name: 'Badge Meta Cumprida',
    icon: '🎯',
    label: 'Meta Cumprida!',
    bgStyle: 'bg-[#3B6E52] text-white rounded-full font-bold shadow-xs',
    width: 'w-auto px-4',
    height: 'h-9',
  },
  {
    id: 'badge-[#3B6E52]',
    category: 'badge',
    name: 'Badge Dia de Poupar',
    icon: '🌿',
    label: 'Dia de Poupar',
    bgStyle: 'bg-[#E8F2EC] text-[#2A4F3B] border border-[#3B6E52] rounded-full font-bold',
    width: 'w-auto px-4',
    height: 'h-9',
  },
  {
    id: 'badge-[#E08775]',
    category: 'badge',
    name: 'Badge Economia 💡',
    icon: '💡',
    label: 'Economia Garantida',
    bgStyle: 'bg-[#F7D6D0] text-[#783527] border border-[#E08775] rounded-full font-bold',
    width: 'w-auto px-4',
    height: 'h-9',
  },
  {
    id: 'badge-paid',
    category: 'badge',
    name: 'Badge Conta Paga',
    icon: '✅',
    label: 'Conta Paga!',
    bgStyle: 'bg-[#E08775] text-white rounded-full font-bold shadow-xs',
    width: 'w-auto px-4',
    height: 'h-9',
  },
  {
    id: 'badge-saved',
    category: 'badge',
    name: 'Badge R$ Guardado',
    icon: '🐷',
    label: 'R$ Guardado',
    bgStyle: 'bg-[#3B6E52] text-[#B7EECB] border border-[#B7EECB] rounded-full font-bold',
    width: 'w-auto px-4',
    height: 'h-9',
  },
  {
    id: 'badge-focus',
    category: 'badge',
    name: 'Badge Foco Total',
    icon: '✨',
    label: 'Foco Total!',
    bgStyle: 'bg-[#FFF8F2] text-[#1F1B14] border-2 border-[#3B6E52] rounded-full font-bold',
    width: 'w-auto px-4',
    height: 'h-9',
  },

  // --- ICONS & MINI CUTOUTS ---
  {
    id: 'icon-clover',
    category: 'icon',
    name: 'Trevo da Sorte',
    icon: '🍀',
    bgStyle: 'bg-[#E8F2EC] rounded-2xl p-2 border border-[#C0C9C1] shadow-xs text-2xl',
    width: 'w-14 sm:w-16',
    height: 'h-14 sm:h-16',
  },
  {
    id: 'icon-ribbon',
    category: 'icon',
    name: 'Laço Rosa',
    icon: '🎀',
    bgStyle: 'bg-[#F7D6D0] rounded-2xl p-2 border border-[#E08775] shadow-xs text-2xl',
    width: 'w-14 sm:w-16',
    height: 'h-14 sm:h-16',
  },
  {
    id: 'icon-bread',
    category: 'icon',
    name: 'Pão Artesanal',
    icon: '🍞',
    bgStyle: 'bg-[#F0E7DB] rounded-2xl p-2 border border-[#EDE4D8] shadow-xs text-2xl',
    width: 'w-14 sm:w-16',
    height: 'h-14 sm:h-16',
  },
  {
    id: 'icon-plant',
    category: 'icon',
    name: 'Planta de Vaso',
    icon: '🪴',
    bgStyle: 'bg-[#E8F2EC] rounded-2xl p-2 border border-[#3B6E52] shadow-xs text-2xl',
    width: 'w-14 sm:w-16',
    height: 'h-14 sm:h-16',
  },
];

interface StickerSystemProps {
  viewKey: string;
  children?: React.ReactNode;
}

export const StickerSystem: React.FC<StickerSystemProps> = ({ viewKey, children }) => {
  const storageKey = `personal_finance_placed_stickers_${viewKey}`;

  const [placedStickers, setPlacedStickers] = useState<PlacedSticker[]>(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : [];
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedStickerId, setSelectedStickerId] = useState<string | null>(null);
  const [isLocked, setIsLocked] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'washi' | 'stamp' | 'badge' | 'icon'>('all');

  const boardRef = useRef<HTMLDivElement>(null);

  // Sync with localStorage
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(placedStickers));
  }, [placedStickers, storageKey]);

  // Load stickers when viewKey changes
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      setPlacedStickers(JSON.parse(saved));
    } else {
      setPlacedStickers([]);
    }
  }, [viewKey, storageKey]);

  // Add new sticker from preset
  const handleAddPreset = (preset: StickerPreset, clientX?: number, clientY?: number) => {
    let posX = 40 + Math.random() * 20; // default middle %
    let posY = 20 + Math.random() * 20; // default top %

    if (clientX !== undefined && clientY !== undefined && boardRef.current) {
      const rect = boardRef.current.getBoundingClientRect();
      posX = Math.max(5, Math.min(85, ((clientX - rect.left) / rect.width) * 100));
      posY = Math.max(5, Math.min(85, ((clientY - rect.top) / rect.height) * 100));
    }

    const newSticker: PlacedSticker = {
      id: `placed-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      presetId: preset.id,
      category: preset.category,
      name: preset.name,
      icon: preset.icon,
      label: preset.label,
      bgStyle: preset.bgStyle,
      borderStyle: preset.borderStyle,
      textStyle: preset.textStyle,
      x: posX,
      y: posY,
      rotation: Math.floor(Math.random() * 14 - 7), // slight organic tilt
      scale: 1,
      viewKey,
    };

    setPlacedStickers(prev => [...prev, newSticker]);
    setSelectedStickerId(newSticker.id);
  };

  // Dragging placed sticker
  const handlePointerDown = (e: React.PointerEvent, stickerId: string) => {
    if (isLocked) return;
    e.stopPropagation();
    setSelectedStickerId(stickerId);

    const board = boardRef.current;
    if (!board) return;
    const rect = board.getBoundingClientRect();

    const sticker = placedStickers.find(s => s.id === stickerId);
    if (!sticker) return;

    const startX = e.clientX;
    const startY = e.clientY;
    const origX = sticker.x;
    const origY = sticker.y;

    const handlePointerMove = (moveEvent: PointerEvent) => {
      const deltaX = ((moveEvent.clientX - startX) / rect.width) * 100;
      const deltaY = ((moveEvent.clientY - startY) / rect.height) * 100;

      const newX = Math.max(1, Math.min(92, origX + deltaX));
      const newY = Math.max(1, Math.min(95, origY + deltaY));

      setPlacedStickers(prev =>
        prev.map(s => (s.id === stickerId ? { ...s, x: newX, y: newY } : s))
      );
    };

    const handlePointerUp = () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
  };

  // Sticker actions
  const handleRotate = (stickerId: string, amount: number) => {
    setPlacedStickers(prev =>
      prev.map(s => (s.id === stickerId ? { ...s, rotation: (s.rotation + amount) % 360 } : s))
    );
  };

  const handleScale = (stickerId: string, factor: number) => {
    setPlacedStickers(prev =>
      prev.map(s => {
        if (s.id === stickerId) {
          const nextScale = Math.max(0.5, Math.min(2.2, Number((s.scale + factor).toFixed(2))));
          return { ...s, scale: nextScale };
        }
        return s;
      })
    );
  };

  const handleDeleteSticker = (stickerId: string) => {
    setPlacedStickers(prev => prev.filter(s => s.id !== stickerId));
    if (selectedStickerId === stickerId) setSelectedStickerId(null);
  };

  const handleClearAll = () => {
    if (placedStickers.length === 0) return;
    if (window.confirm('Deseja remover todos os adesivos decorativos desta tela?')) {
      setPlacedStickers([]);
      setSelectedStickerId(null);
    }
  };

  const filteredPresets = STICKER_PRESETS.filter(p => activeTab === 'all' || p.category === activeTab);

  return (
    <div
      ref={boardRef}
      className="relative min-h-screen"
      onClick={() => setSelectedStickerId(null)}
    >
      {/* Floating Toolbar for Stickers (Top-Right under header) */}
      <div className="fixed top-24 right-4 z-30 flex items-center space-x-2 bg-[#FDFBF7] p-2 rounded-2xl border-2 border-[#EDE4D8] shadow-md backdrop-blur-xs">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsDrawerOpen(!isDrawerOpen);
          }}
          className={`px-3 py-2 rounded-xl text-xs font-heading font-bold flex items-center space-x-1.5 transition-all ${
            isDrawerOpen
              ? 'bg-[#3B6E52] text-white shadow-xs scale-105'
              : 'bg-[#F5EFEB] text-[#3B6E52] hover:bg-[#E8F2EC] border border-[#EDE4D8]'
          }`}
          title="Abrir Gaveta de Adesivos e Washi Tapes"
        >
          <Palette className="w-4 h-4 text-[#E08775]" />
          <span>Adesivos ({placedStickers.length})</span>
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsLocked(!isLocked);
          }}
          className={`p-2 rounded-xl text-xs transition-all ${
            isLocked
              ? 'bg-[#E08775] text-white'
              : 'bg-[#F5EFEB] text-[#717972] hover:text-[#1F1B14] border border-[#EDE4D8]'
          }`}
          title={isLocked ? 'Adesivos bloqueados (clique para desbloquear)' : 'Adesivos móveis (clique para travar)'}
        >
          {isLocked ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
        </button>

        {placedStickers.length > 0 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleClearAll();
            }}
            className="p-2 rounded-xl text-xs bg-[#F5EFEB] text-[#BA1A1A] hover:bg-[#FFDAD6] border border-[#EDE4D8]"
            title="Remover todos os adesivos desta tela"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Main View Content */}
      {children}

      {/* PLACED STICKERS OVERLAY */}
      {placedStickers.map((sticker) => {
        const isSelected = selectedStickerId === sticker.id;

        return (
          <div
            key={sticker.id}
            onPointerDown={(e) => handlePointerDown(e, sticker.id)}
            style={{
              left: `${sticker.x}%`,
              top: `${sticker.y}%`,
              transform: `translate(-50%, -50%) rotate(${sticker.rotation}deg) scale(${sticker.scale})`,
              touchAction: 'none',
            }}
            className={`absolute z-20 cursor-grab active:cursor-grabbing select-none transition-shadow ${
              isSelected ? 'ring-2 ring-[#3B6E52] ring-offset-2 ring-offset-[#FFF8F2] shadow-xl' : 'hover:opacity-95 shadow-md'
            }`}
          >
            {/* WASHI TAPE STICKER */}
            {sticker.category === 'washi' && (
              <div className={`px-4 py-2 flex items-center justify-center space-x-2 font-heading font-bold text-xs shadow-xs rounded-xs ${sticker.bgStyle}`}>
                <span>{sticker.label || sticker.name}</span>
              </div>
            )}

            {/* STAMP STICKER */}
            {sticker.category === 'stamp' && (
              <div className={`p-3 flex flex-col items-center justify-center text-center space-y-0.5 font-heading font-bold text-xs shadow-xs ${sticker.bgStyle}`}>
                {sticker.icon && <span className="text-2xl leading-none">{sticker.icon}</span>}
                {sticker.label && <span className="text-[11px] tracking-tight">{sticker.label}</span>}
              </div>
            )}

            {/* BADGE STICKER */}
            {sticker.category === 'badge' && (
              <div className={`px-3 py-1.5 flex items-center space-x-1.5 text-xs font-heading font-bold shadow-xs ${sticker.bgStyle}`}>
                {sticker.icon && <span>{sticker.icon}</span>}
                <span>{sticker.label || sticker.name}</span>
              </div>
            )}

            {/* ICON / CUTOUT STICKER */}
            {sticker.category === 'icon' && (
              <div className={`flex items-center justify-center ${sticker.bgStyle}`}>
                <span>{sticker.icon}</span>
              </div>
            )}

            {/* ACTION TOOLBAR WHEN SELECTED */}
            {isSelected && !isLocked && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="absolute -top-11 left-1/2 -translate-x-1/2 flex items-center space-x-1 bg-[#1F1B14] text-white p-1 rounded-xl shadow-lg text-xs z-30 animate-in fade-in"
              >
                <button
                  onClick={() => handleRotate(sticker.id, -15)}
                  className="p-1 hover:bg-white/20 rounded-lg"
                  title="Girar anti-horário"
                >
                  <RotateCw className="w-3.5 h-3.5 transform -scale-x-100" />
                </button>
                <button
                  onClick={() => handleRotate(sticker.id, 15)}
                  className="p-1 hover:bg-white/20 rounded-lg"
                  title="Girar horário"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleScale(sticker.id, 0.1)}
                  className="p-1 hover:bg-white/20 rounded-lg"
                  title="Aumentar tamanho"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleScale(sticker.id, -0.1)}
                  className="p-1 hover:bg-white/20 rounded-lg"
                  title="Diminuir tamanho"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDeleteSticker(sticker.id)}
                  className="p-1 hover:bg-[#BA1A1A] rounded-lg text-[#FFDAD6]"
                  title="Remover adesivo"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        );
      })}

      {/* DRAWER / STICKER BOOK PANEL */}
      {isDrawerOpen && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="fixed bottom-0 right-0 left-0 sm:left-auto sm:right-6 sm:bottom-6 z-50 w-full sm:w-96 paper-card rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl border-2 border-[#3B6E52] max-h-[80vh] flex flex-col animate-in slide-in-from-bottom"
        >
          <div className="washi-tape-top"></div>

          {/* Drawer Header */}
          <div className="flex items-center justify-between border-b border-[#EDE4D8] pb-3 mb-3">
            <div className="flex items-center space-x-2">
              <Palette className="w-5 h-5 text-[#E08775]" />
              <h3 className="font-heading font-bold text-lg text-[#1F1B14]">Caderno de Adesivos</h3>
            </div>
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="p-1.5 text-[#717972] hover:text-[#1F1B14] rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="text-xs text-[#717972] mb-3">
            Clique em qualquer adesivo para colocá-lo na tela e arraste para organizar!
          </p>

          {/* Category Tabs */}
          <div className="flex space-x-1 mb-4 bg-[#F5EFEB] p-1 rounded-xl border border-[#EDE4D8] overflow-x-auto scrollbar-none">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1 rounded-lg text-xs font-heading font-semibold whitespace-nowrap ${
                activeTab === 'all' ? 'bg-[#3B6E52] text-white' : 'text-[#414943]'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setActiveTab('washi')}
              className={`px-3 py-1 rounded-lg text-xs font-heading font-semibold whitespace-nowrap ${
                activeTab === 'washi' ? 'bg-[#3B6E52] text-white' : 'text-[#414943]'
              }`}
            >
              Washi Tape
            </button>
            <button
              onClick={() => setActiveTab('stamp')}
              className={`px-3 py-1 rounded-lg text-xs font-heading font-semibold whitespace-nowrap ${
                activeTab === 'stamp' ? 'bg-[#3B6E52] text-white' : 'text-[#414943]'
              }`}
            >
              Carimbos & Selos
            </button>
            <button
              onClick={() => setActiveTab('badge')}
              className={`px-3 py-1 rounded-lg text-xs font-heading font-semibold whitespace-nowrap ${
                activeTab === 'badge' ? 'bg-[#3B6E52] text-white' : 'text-[#414943]'
              }`}
            >
              Emblemas
            </button>
            <button
              onClick={() => setActiveTab('icon')}
              className={`px-3 py-1 rounded-lg text-xs font-heading font-semibold whitespace-nowrap ${
                activeTab === 'icon' ? 'bg-[#3B6E52] text-white' : 'text-[#414943]'
              }`}
            >
              Figurinhas
            </button>
          </div>

          {/* Sticker Presets Grid */}
          <div className="overflow-y-auto flex-1 grid grid-cols-2 gap-3 p-1 max-h-72 border border-[#EDE4D8] rounded-2xl bg-[#FAF4EB]/60">
            {filteredPresets.map((preset) => (
              <button
                key={preset.id}
                onClick={() => handleAddPreset(preset)}
                className="p-3 bg-[#FDFBF7] border border-[#EDE4D8] hover:border-[#3B6E52] rounded-xl flex flex-col items-center justify-center text-center space-y-1.5 transition-all hover:scale-105 group relative shadow-xs"
              >
                {preset.category === 'washi' && (
                  <div className={`w-full py-1 text-[11px] font-heading font-bold ${preset.bgStyle}`}>
                    <span>{preset.label || preset.name}</span>
                  </div>
                )}

                {preset.category === 'stamp' && (
                  <div className={`p-2 font-heading font-bold text-xs ${preset.bgStyle}`}>
                    {preset.icon && <span className="text-xl block">{preset.icon}</span>}
                    {preset.label && <span className="text-[10px]">{preset.label}</span>}
                  </div>
                )}

                {preset.category === 'badge' && (
                  <div className={`px-2.5 py-1 text-[11px] font-heading font-bold ${preset.bgStyle}`}>
                    {preset.icon && <span className="mr-1">{preset.icon}</span>}
                    <span>{preset.label || preset.name}</span>
                  </div>
                )}

                {preset.category === 'icon' && (
                  <div className={`p-2 text-2xl ${preset.bgStyle}`}>
                    <span>{preset.icon}</span>
                  </div>
                )}

                <span className="text-[10px] font-heading text-[#717972] group-hover:text-[#3B6E52] font-medium">
                  {preset.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
