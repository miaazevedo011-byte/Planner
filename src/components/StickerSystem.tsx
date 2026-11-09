import React, { useState, useEffect, useRef } from 'react';
import { StickerPreset, PlacedSticker, AppColorThemeId } from '../types';
import { APP_COLOR_THEMES, BACKGROUND_TEXTURE_PRESETS } from '../constants/themes';
import { Sparkles, Trash2, RotateCw, ZoomIn, ZoomOut, Lock, Unlock, X, Palette, Check, Dices, Edit3 } from 'lucide-react';

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

  // --- STAMPS & SEALS (Ampliar Carimbo) ---
  {
    id: 'stamp-piggy',
    category: 'stamp',
    name: 'Selo Porquinho da Sorte',
    icon: '🐖',
    label: 'Poupança Fofa',
    bgStyle: 'bg-[#E8F2EC] text-[#2A4F3B] border-4 border-dashed border-[#3B6E52] rounded-full p-4',
    width: 'w-32 sm:w-40',
    height: 'h-32 sm:h-40',
  },
  {
    id: 'stamp-wax-heart',
    category: 'stamp',
    name: 'Selo de Cera Verde',
    icon: '💚',
    label: 'Com Carinho',
    bgStyle: 'bg-[#3B6E52] text-[#FDFBF7] border-4 border-double border-[#9CD3B1] rounded-full shadow-md p-4',
    width: 'w-32 sm:w-40',
    height: 'h-32 sm:h-40',
  },
  {
    id: 'stamp-star',
    category: 'stamp',
    name: 'Carimbo Estrela',
    icon: '⭐',
    label: 'Nota 10!',
    bgStyle: 'bg-[#F7D6D0] text-[#783527] border-4 border-dashed border-[#E08775] rounded-3xl p-4',
    width: 'w-32 sm:w-40',
    height: 'h-32 sm:h-40',
  },
  {
    id: 'stamp-coffee',
    category: 'stamp',
    name: 'Carimbo Pausa Pro Chá',
    icon: '☕',
    label: 'Pausa Calma',
    bgStyle: 'bg-[#F0E7DB] text-[#414943] border-4 border-dashed border-[#717972] rounded-full p-4',
    width: 'w-32 sm:w-40',
    height: 'h-32 sm:h-40',
  },
  {
    id: 'stamp-approved',
    category: 'stamp',
    name: 'Carimbo Aprovado Grande',
    icon: '✅',
    label: 'APROVADO!',
    bgStyle: 'bg-[#E8F2EC] text-[#2A4F3B] border-4 border-solid border-[#3B6E52] rounded-2xl transform -rotate-3 p-4 shadow-md',
    width: 'w-36 sm:w-44',
    height: 'h-24 sm:h-28',
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
  isDrawerOpen?: boolean;
  onToggleDrawer?: () => void;
  onCloseDrawer?: () => void;
  children?: React.ReactNode;
  currentThemeId?: AppColorThemeId;
  onSelectTheme?: (themeId: AppColorThemeId) => void;
  currentPattern?: string;
  onSelectPattern?: (pattern: any) => void;
  onSelectRandomTheme?: () => void;
}

export const StickerSystem: React.FC<StickerSystemProps> = ({
  viewKey,
  isDrawerOpen: controlledDrawerOpen,
  onToggleDrawer,
  onCloseDrawer,
  children,
  currentThemeId = 'sage-classic',
  onSelectTheme,
  currentPattern = 'dot-grid',
  onSelectPattern,
  onSelectRandomTheme,
}) => {
  const storageKey = `personal_finance_placed_stickers_${viewKey}`;

  const [placedStickers, setPlacedStickers] = useState<PlacedSticker[]>(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : [];
  });

  const [internalDrawerOpen, setInternalDrawerOpen] = useState(false);
  const isDrawerOpen = controlledDrawerOpen !== undefined ? controlledDrawerOpen : internalDrawerOpen;

  const handleCloseDrawer = () => {
    if (onCloseDrawer) {
      onCloseDrawer();
    } else {
      setInternalDrawerOpen(false);
    }
  };

  const handleToggle = () => {
    if (onToggleDrawer) {
      onToggleDrawer();
    } else {
      setInternalDrawerOpen(!internalDrawerOpen);
    }
  };

  const [selectedStickerId, setSelectedStickerId] = useState<string | null>(null);
  const [isLocked, setIsLocked] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'washi' | 'stamp' | 'badge' | 'icon' | 'themes'>('all');

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
      rotation: Math.floor(Math.random() * 14 - 7),
      scale: 1,
      viewKey,
    };

    setPlacedStickers((prev) => [...prev, newSticker]);
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

    const sticker = placedStickers.find((s) => s.id === stickerId);
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

      setPlacedStickers((prev) =>
        prev.map((s) => (s.id === stickerId ? { ...s, x: newX, y: newY } : s))
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
    setPlacedStickers((prev) =>
      prev.map((s) => (s.id === stickerId ? { ...s, rotation: (s.rotation + amount) % 360 } : s))
    );
  };

  const handleScale = (stickerId: string, factor: number) => {
    setPlacedStickers((prev) =>
      prev.map((s) => {
        if (s.id === stickerId) {
          const nextScale = Math.max(0.4, Math.min(3.0, Number((s.scale + factor).toFixed(2))));
          return { ...s, scale: nextScale };
        }
        return s;
      })
    );
  };

  const handleRenameSticker = (stickerId: string) => {
    const sticker = placedStickers.find((s) => s.id === stickerId);
    if (!sticker) return;
    const currentName = sticker.label || sticker.name;
    const newName = window.prompt("Renomear adesivo / carimbo:", currentName);
    if (newName !== null && newName.trim() !== '') {
      setPlacedStickers((prev) =>
        prev.map((s) => (s.id === stickerId ? { ...s, label: newName.trim() } : s))
      );
    }
  };

  const handleDeleteSticker = (stickerId: string) => {
    setPlacedStickers((prev) => prev.filter((s) => s.id !== stickerId));
    if (selectedStickerId === stickerId) setSelectedStickerId(null);
  };

  const handleClearAll = () => {
    if (placedStickers.length === 0) return;
    if (window.confirm('Deseja remover todos os adesivos decorativos desta tela?')) {
      setPlacedStickers([]);
      setSelectedStickerId(null);
    }
  };

  const filteredPresets = STICKER_PRESETS.filter(
    (p) => activeTab === 'all' || p.category === activeTab
  );

  return (
    <div
      ref={boardRef}
      className="relative min-h-screen"
      onClick={() => setSelectedStickerId(null)}
    >
      {/* Floating Toolbar for quick lock/unlock and clear in the upper-right corner */}
      {placedStickers.length > 0 && (
        <div className="fixed top-24 right-4 z-30 flex items-center space-x-1.5 bg-[#FDFBF7] p-1.5 rounded-2xl border border-[#EDE4D8] shadow-sm backdrop-blur-xs">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsLocked(!isLocked);
            }}
            className={`p-1.5 rounded-xl text-xs transition-all ${
              isLocked
                ? 'bg-[#E08775] text-white'
                : 'bg-[#F5EFEB] text-[#717972] hover:text-[#1F1B14] border border-[#EDE4D8]'
            }`}
            title={isLocked ? 'Adesivos bloqueados (clique para desbloquear)' : 'Adesivos móveis (clique para travar)'}
          >
            {isLocked ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleClearAll();
            }}
            className="p-1.5 rounded-xl text-xs bg-[#F5EFEB] text-[#BA1A1A] hover:bg-[#FFDAD6] border border-[#EDE4D8]"
            title="Remover todos os adesivos desta tela"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

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
              isSelected
                ? 'ring-2 ring-[#3B6E52] ring-offset-2 ring-offset-[#FFF8F2] shadow-xl'
                : 'hover:opacity-95 shadow-md'
            }`}
          >
            {/* WASHI TAPE STICKER */}
            {sticker.category === 'washi' && (
              <div
                className={`px-4 py-2 flex items-center justify-center space-x-2 font-heading font-bold text-xs shadow-xs rounded-xs ${sticker.bgStyle}`}
              >
                <span>{sticker.label || sticker.name}</span>
              </div>
            )}

            {/* STAMP STICKER */}
            {sticker.category === 'stamp' && (
              <div
                className={`p-3 flex flex-col items-center justify-center text-center space-y-0.5 font-heading font-bold text-xs shadow-xs ${sticker.bgStyle}`}
              >
                {sticker.icon && <span className="text-2xl leading-none">{sticker.icon}</span>}
                {sticker.label && <span className="text-[11px] tracking-tight">{sticker.label}</span>}
              </div>
            )}

            {/* BADGE STICKER */}
            {sticker.category === 'badge' && (
              <div
                className={`px-3 py-1.5 flex items-center space-x-1.5 text-xs font-heading font-bold shadow-xs ${sticker.bgStyle}`}
              >
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
                  onClick={() => handleRenameSticker(sticker.id)}
                  className="p-1 hover:bg-white/20 rounded-lg text-[#E6C280]"
                  title="Alterar nome do adesivo/carimbo"
                >
                  <Edit3 className="w-3.5 h-3.5" />
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

      {/* POP-UP DO ADESIVO NA PARTE SUPERIOR (Anchor at top right near Year option) */}
      {isDrawerOpen && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="fixed top-20 sm:top-24 right-2 sm:right-6 z-50 w-[94vw] sm:w-[410px] paper-card rounded-3xl p-5 shadow-2xl border-2 border-[#3B6E52] max-h-[82vh] flex flex-col animate-in slide-in-from-top-4 bg-[#FDFBF7]"
        >
          <div className="washi-tape-top"></div>

          {/* Drawer Header */}
          <div className="flex items-center justify-between border-b border-[#EDE4D8] pb-3 mb-3">
            <div className="flex items-center space-x-2">
              <Palette className="w-5 h-5 text-[#E08775]" />
              <h3 className="font-heading font-bold text-lg text-[#1F1B14]">Adesivos & Washi Tapes</h3>
            </div>
            <button
              onClick={handleCloseDrawer}
              aria-label="Fechar pop-up de adesivos"
              className="p-1.5 text-[#717972] hover:text-[#1F1B14] hover:bg-[#F5EFEB] rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="text-xs text-[#717972] mb-3">
            Clique no adesivo desejado para colá-lo na tela e arraste para posicionar!
          </p>

          {/* Category Tabs */}
          <div className="flex space-x-1 mb-3.5 bg-[#F5EFEB] p-1 rounded-xl border border-[#EDE4D8] overflow-x-auto scrollbar-none">
            <button
              onClick={() => setActiveTab('themes')}
              className={`px-3 py-1 rounded-lg text-xs font-heading font-extrabold whitespace-nowrap transition-all flex items-center space-x-1.5 shadow-2xs ${
                activeTab === 'themes'
                  ? 'bg-[#93493A] text-white shadow-xs'
                  : 'text-[#93493A] bg-[#FFF0ED] hover:bg-[#FFDAD3]'
              }`}
            >
              <Palette className="w-3.5 h-3.5 text-current" />
              <span>🎨 Temas do App</span>
            </button>
            <button
              onClick={() => setActiveTab('all')}
              className={`px-2.5 py-1 rounded-lg text-xs font-heading font-semibold whitespace-nowrap transition-all ${
                activeTab === 'all' ? 'bg-[#3B6E52] text-white shadow-xs' : 'text-[#414943]'
              }`}
            >
              Adesivos
            </button>
            <button
              onClick={() => setActiveTab('washi')}
              className={`px-2.5 py-1 rounded-lg text-xs font-heading font-semibold whitespace-nowrap transition-all ${
                activeTab === 'washi' ? 'bg-[#3B6E52] text-white shadow-xs' : 'text-[#414943]'
              }`}
            >
              Washi Tape
            </button>
            <button
              onClick={() => setActiveTab('stamp')}
              className={`px-2.5 py-1 rounded-lg text-xs font-heading font-semibold whitespace-nowrap transition-all ${
                activeTab === 'stamp' ? 'bg-[#3B6E52] text-white shadow-xs' : 'text-[#414943]'
              }`}
            >
              Carimbos
            </button>
            <button
              onClick={() => setActiveTab('badge')}
              className={`px-2.5 py-1 rounded-lg text-xs font-heading font-semibold whitespace-nowrap transition-all ${
                activeTab === 'badge' ? 'bg-[#3B6E52] text-white shadow-xs' : 'text-[#414943]'
              }`}
            >
              Emblemas
            </button>
            <button
              onClick={() => setActiveTab('icon')}
              className={`px-2.5 py-1 rounded-lg text-xs font-heading font-semibold whitespace-nowrap transition-all ${
                activeTab === 'icon' ? 'bg-[#3B6E52] text-white shadow-xs' : 'text-[#414943]'
              }`}
            >
              Figurinhas
            </button>
          </div>

          {/* VIEW: SELEÇÃO DE TEMAS COMPLETOS DO APP */}
          {activeTab === 'themes' ? (
            <div className="overflow-y-auto flex-1 space-y-3.5 p-1 max-h-[54vh] border border-[#EDE4D8] rounded-2xl bg-[#FAF4EB]/60">
              {/* Botão Tema Surpresa / Aleatório */}
              <button
                onClick={() => {
                  if (onSelectRandomTheme) {
                    onSelectRandomTheme();
                  } else {
                    const randomTheme = APP_COLOR_THEMES[Math.floor(Math.random() * APP_COLOR_THEMES.length)];
                    if (onSelectTheme) onSelectTheme(randomTheme.id);
                  }
                }}
                className="w-full bg-[#FFF5F2] hover:bg-[#FFDAD3] text-[#783527] border-2 border-dashed border-[#E08775] rounded-2xl p-3 flex items-center justify-center space-x-2 font-heading font-bold text-xs shadow-xs active:scale-98 transition-all cursor-pointer group"
              >
                <Dices className="w-4 h-4 text-[#E08775] group-hover:rotate-180 transition-transform" />
                <span>🎲 Aplicar Tema Surpresa / Aleatório</span>
              </button>

              {/* Seção 1: Paletas de Cores Completas (Claras e Escuras) */}
              <div className="space-y-3">
                {/* Temas Noturnos & Escuros */}
                <div>
                  <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-[#93493A] px-1 flex items-center gap-1 mb-1.5">
                    <span>🌙 Temas Noturnos &amp; Escuros (Texto Claro)</span>
                  </span>
                  <div className="grid grid-cols-1 gap-2">
                    {APP_COLOR_THEMES.filter(t => t.isDark).map((theme) => {
                      const isSelected = currentThemeId === theme.id;
                      return (
                        <button
                          key={theme.id}
                          onClick={() => onSelectTheme && onSelectTheme(theme.id)}
                          className={`p-3 rounded-2xl border-2 text-left flex items-center justify-between transition-all cursor-pointer ${
                            isSelected
                              ? 'border-[#E6C280] ring-2 ring-[#E6C280]/40 shadow-xs scale-[1.01]'
                              : 'border-[#3D332B] hover:border-[#E6C280]/60'
                          }`}
                          style={{ backgroundColor: theme.paperBgColor, color: theme.textColor || '#F5F2EB' }}
                        >
                          <div className="flex items-center space-x-3 min-w-0">
                            <div className="flex items-center -space-x-1.5 shrink-0">
                              <span
                                className="w-5 h-5 rounded-full border border-[#2E3342] shadow-2xs"
                                style={{ backgroundColor: theme.primaryColor }}
                              />
                              <span
                                className="w-5 h-5 rounded-full border border-[#2E3342] shadow-2xs"
                                style={{ backgroundColor: theme.accentColor }}
                              />
                              <span
                                className="w-5 h-5 rounded-full border border-[#2E3342] shadow-2xs"
                                style={{ backgroundColor: theme.cardBg }}
                              />
                            </div>

                            <div className="min-w-0">
                              <div className="flex items-center space-x-1.5">
                                <span className="text-sm">{theme.emoji}</span>
                                <h4 className="font-heading font-bold text-xs truncate" style={{ color: theme.textColor || '#F5F2EB' }}>
                                  {theme.name}
                                </h4>
                                <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-[#2E3342] text-[#E6C280] font-heading font-bold shrink-0">
                                  Noturno 🌙
                                </span>
                              </div>
                              <p className="text-[10px] opacity-80 mt-0.5 truncate">
                                {theme.tagline}
                              </p>
                            </div>
                          </div>

                          {isSelected && (
                            <div className="w-5 h-5 rounded-full bg-[#E6C280] text-[#12141A] flex items-center justify-center shrink-0 ml-2">
                              <Check className="w-3 h-3 stroke-[3]" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Temas Claros Culinários & Papelaria */}
                <div>
                  <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-[#3B6E52] px-1 flex items-center gap-1 mb-1.5">
                    <span>☀️ Temas Claros &amp; Papelaria Acolhedora</span>
                  </span>
                  <div className="grid grid-cols-1 gap-2">
                    {APP_COLOR_THEMES.filter(t => !t.isDark).map((theme) => {
                      const isSelected = currentThemeId === theme.id;
                      return (
                        <button
                          key={theme.id}
                          onClick={() => onSelectTheme && onSelectTheme(theme.id)}
                          className={`p-3 rounded-2xl border-2 text-left flex items-center justify-between transition-all bg-[#FDFBF7] cursor-pointer ${
                            isSelected
                              ? 'border-[#3B6E52] ring-2 ring-[#B7EECB]/60 shadow-xs scale-[1.01]'
                              : 'border-[#EDE4D8] hover:border-[#3B6E52]/50 hover:bg-[#FFFDF9]'
                          }`}
                        >
                          <div className="flex items-center space-x-3 min-w-0">
                            <div className="flex items-center -space-x-1.5 shrink-0">
                              <span
                                className="w-5 h-5 rounded-full border border-white shadow-2xs"
                                style={{ backgroundColor: theme.primaryColor }}
                              />
                              <span
                                className="w-5 h-5 rounded-full border border-white shadow-2xs"
                                style={{ backgroundColor: theme.accentColor }}
                              />
                              <span
                                className="w-5 h-5 rounded-full border border-[#EDE4D8] shadow-2xs"
                                style={{ backgroundColor: theme.cardBg }}
                              />
                            </div>

                            <div className="min-w-0">
                              <div className="flex items-center space-x-1.5">
                                <span className="text-sm">{theme.emoji}</span>
                                <h4 className="font-heading font-bold text-xs text-[#1F1B14] truncate">
                                  {theme.name}
                                </h4>
                              </div>
                              <p className="text-[10px] text-[#717972] mt-0.5 truncate">
                                {theme.tagline}
                              </p>
                            </div>
                          </div>

                          {isSelected && (
                            <div className="w-5 h-5 rounded-full bg-[#3B6E52] text-white flex items-center justify-center shrink-0 ml-2">
                              <Check className="w-3 h-3 stroke-[3]" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Seção 2: Padrão do Papel de Fundo (Texturas Claras e Noturnas) */}
              <div className="space-y-2 pt-2 border-t border-[#EDE4D8]/80">
                <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-[#717972] px-1 block">
                  Texturas de Papel Artesanal ({BACKGROUND_TEXTURE_PRESETS.length} Opções)
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {BACKGROUND_TEXTURE_PRESETS.map((pat) => {
                    let cleanId = pat.id;
                    if (pat.id === 'pattern-dot') cleanId = 'dot-grid';
                    else if (pat.id === 'pattern-dot-dark') cleanId = 'dot-grid-dark';
                    else if (pat.id === 'pattern-lined') cleanId = 'lined';
                    else if (pat.id === 'pattern-lined-dark') cleanId = 'lined-dark';
                    else if (pat.id === 'pattern-plain') cleanId = 'plain';
                    else if (pat.id === 'pattern-plain-dark') cleanId = 'plain-dark';
                    else if (pat.id === 'texture-botanical') cleanId = 'botanical';
                    else if (pat.id === 'texture-botanical-dark') cleanId = 'botanical-dark';
                    else if (pat.id === 'texture-kraft') cleanId = 'kraft';
                    else if (pat.id === 'texture-kraft-dark') cleanId = 'kraft-dark';
                    else if (pat.id === 'texture-grid-school') cleanId = 'grid-school';
                    else if (pat.id === 'texture-grid-dark') cleanId = 'grid-school-dark';

                    const isPatSelected = currentPattern === cleanId;

                    return (
                      <button
                        key={pat.id}
                        onClick={() => {
                          if (onSelectPattern) onSelectPattern(cleanId);
                        }}
                        className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                          pat.isDark ? 'bg-[#1A1D26] text-[#F5F2EB]' : 'bg-[#FDFBF7] text-[#414943]'
                        } ${
                          isPatSelected
                            ? 'border-[#3B6E52] ring-2 ring-[#B7EECB]/60 shadow-2xs font-bold'
                            : 'border-[#EDE4D8] hover:border-[#3B6E52]/40'
                        }`}
                      >
                        <div className="flex items-center space-x-1.5">
                          <span>{pat.emoji}</span>
                          <div className="min-w-0">
                            <span className="text-[11px] font-heading block truncate">{pat.name.split(' (')[0]}</span>
                            <span className="text-[9px] opacity-70 block truncate">{pat.isDark ? 'Fundo Escuro' : 'Fundo Claro'}</span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            /* Sticker Presets Grid */
            <div className="overflow-y-auto flex-1 grid grid-cols-2 gap-2.5 p-1 max-h-[52vh] border border-[#EDE4D8] rounded-2xl bg-[#FAF4EB]/60">
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
          )}
        </div>
      )}
    </div>
  );
};
