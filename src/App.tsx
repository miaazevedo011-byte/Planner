import React, { useState, useEffect } from 'react';
import { ViewState, AppSettings } from './types';
import { HomeCalendar } from './components/HomeCalendar';
import { BudgetSpreadsheet } from './components/BudgetSpreadsheet';
import { NotesView } from './components/NotesView';
import { ShoppingListView } from './components/ShoppingListView';
import { RecipeBookView } from './components/RecipeBookView';
import { PiggyAssistant } from './components/PiggyAssistant';
import { StickerSystem } from './components/StickerSystem';
import { SettingsModal } from './components/SettingsModal';
import { UpdateToast } from './components/UpdateToast';
import { WhatsNewModal } from './components/WhatsNewModal';
import { useAppUpdate } from './hooks/useAppUpdate';
import { APP_COLOR_THEMES } from './constants/themes';
import { Calendar, FileText, ShoppingCart, Palette, Clock, Play, Pause, UtensilsCrossed, Sparkles } from 'lucide-react';

export default function App() {
  const [viewState, setViewState] = useState<ViewState>('home');
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [selectedMonthIndex, setSelectedMonthIndex] = useState<number>(new Date().getMonth());
  const [isStickerDrawerOpen, setIsStickerDrawerOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  // App Update Detection System
  const {
    hasUpdate,
    availableVersion,
    isWhatsNewOpen,
    setIsWhatsNewOpen,
    applyUpdate,
    dismissUpdate,
    simulateUpdateNotification,
  } = useAppUpdate();

  // App Settings (Tempo, Clima, Estilo de Papel e Timer)
  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem('personal_finance_app_settings');
    return saved
      ? JSON.parse(saved)
      : {
          weather: 'outono',
          weatherDescription: 'Brisa de Outono • 19°C',
          weatherTemp: '19°C',
          customDate: '',
          paperPattern: 'dot-grid',
          focusTimerDuration: 25,
          timerSecondsLeft: 25 * 60,
          isTimerRunning: false,
        };
  });

  // Sync settings with localStorage
  useEffect(() => {
    localStorage.setItem('personal_finance_app_settings', JSON.stringify(settings));
  }, [settings]);

  // Focus Timer countdown effect
  useEffect(() => {
    if (!settings.isTimerRunning) return;

    const interval = setInterval(() => {
      setSettings((prev) => {
        if (prev.timerSecondsLeft <= 1) {
          return {
            ...prev,
            timerSecondsLeft: 0,
            isTimerRunning: false,
          };
        }
        return {
          ...prev,
          timerSecondsLeft: prev.timerSecondsLeft - 1,
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [settings.isTimerRunning]);

  const handleUpdateSettings = (partial: Partial<AppSettings>) => {
    setSettings((prev) => ({ ...prev, ...partial }));
  };

  const handleSelectMonth = (monthIndex: number) => {
    setSelectedMonthIndex(monthIndex);
    setViewState('spreadsheet');
  };

  const handleOpenShopping = () => {
    setViewState('shopping');
  };

  const availableYears = [2026, 2027, 2028, 2029, 2030, 2031, 2032];

  const formatTimerShort = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const currentTheme =
    APP_COLOR_THEMES.find((t) => t.id === settings.themeId) || APP_COLOR_THEMES[0];

  const handleSelectRandomTheme = () => {
    const otherThemes = APP_COLOR_THEMES.filter((t) => t.id !== settings.themeId);
    const randomTheme = otherThemes[Math.floor(Math.random() * otherThemes.length)] || APP_COLOR_THEMES[0];
    const patterns: AppSettings['paperPattern'][] = [
      'dot-grid',
      'dot-grid-dark',
      'lined',
      'lined-dark',
      'plain',
      'plain-dark',
      'botanical',
      'botanical-dark',
      'kraft',
      'kraft-dark',
      'grid-school',
      'grid-school-dark',
    ];
    const randomPattern = patterns[Math.floor(Math.random() * patterns.length)];
    handleUpdateSettings({
      themeId: randomTheme.id,
      paperPattern: randomPattern,
    });
  };

  const getPaperPatternClass = (pattern?: string, isDarkTheme?: boolean) => {
    switch (pattern) {
      case 'dot-grid-dark':
        return 'bg-dot-grid-dark';
      case 'lined':
        return 'bg-lined-grid';
      case 'lined-dark':
        return 'bg-lined-grid-dark';
      case 'plain':
        return 'bg-plain-paper';
      case 'plain-dark':
        return 'bg-plain-dark';
      case 'botanical':
        return 'bg-botanical-pattern';
      case 'botanical-dark':
        return 'bg-botanical-dark';
      case 'kraft':
        return 'bg-kraft-paper';
      case 'kraft-dark':
        return 'bg-kraft-dark';
      case 'grid-school':
        return 'bg-grid-school';
      case 'grid-school-dark':
      case 'grid-dark':
        return 'bg-grid-dark';
      case 'dot-grid':
      default:
        return isDarkTheme ? 'bg-dot-grid-dark' : 'bg-dot-grid';
    }
  };

  const paperBgClass = getPaperPatternClass(settings.paperPattern, currentTheme.isDark);

  return (
    <div
      className={`min-h-screen ${paperBgClass} flex flex-col font-sans transition-colors duration-300`}
      style={{
        backgroundColor: currentTheme.paperBgColor,
        color: currentTheme.textColor || (currentTheme.isDark ? '#F5F2EB' : '#1F1B14'),
      }}
    >
      
      {/* Top Stationery Header with Active Theme Styling */}
      <header
        className="border-b-2 sticky top-0 z-40 shadow-xs transition-colors duration-300"
        style={{
          backgroundColor: currentTheme.headerBg,
          borderColor: currentTheme.borderColor,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between py-3 md:h-20 gap-3">
            
            {/* Brand Logo & Weather Pill */}
            <div className="flex items-center justify-between sm:justify-start space-x-3">
              <div
                className="flex items-center space-x-2.5 cursor-pointer"
                onClick={() => setViewState('home')}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-sm ring-2 ring-[#EDE4D8] transition-colors"
                  style={{ backgroundColor: currentTheme.primaryColor }}
                >
                  <span className="text-xl">🐖</span>
                </div>
                <div>
                  <h1 className="font-heading font-bold text-xl tracking-tight" style={{ color: currentTheme.textColor || (currentTheme.isDark ? '#F5F2EB' : '#1F1B14') }}>
                    Finanças com Carinho
                  </h1>
                  <p className="text-xs font-medium tracking-wide" style={{ color: currentTheme.subtextColor || (currentTheme.isDark ? '#CBD5E1' : '#717972') }}>
                    Planejador Artesanal • {currentTheme.name.split(' ')[0]} {currentTheme.isDark ? '🌙' : '☀️'}
                  </p>
                </div>
              </div>

              {/* Weather / Tempo Pill in Header */}
              <button
                onClick={() => setIsSettingsOpen(true)}
                className="hidden xl:flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#F5EFEB] border border-[#EDE4D8] hover:border-[#3B6E52] transition-colors text-xs text-[#414943] font-medium"
                title="Clique para mudar o tempo e clima do app"
              >
                <Clock className="w-3.5 h-3.5 text-[#3B6E52]" />
                <span>{settings.weatherDescription}</span>
              </button>
            </div>

            {/* Navigation Buttons */}
            <nav className="flex items-center space-x-1.5 bg-[#F5EFEB] p-1.5 rounded-xl border border-[#EDE4D8] overflow-x-auto scrollbar-none">
              <button
                onClick={() => setViewState('home')}
                className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                  viewState === 'home' ? 'bg-[#3B6E52] text-[#FDFBF7] shadow-xs' : 'text-[#414943] hover:text-[#1F1B14]'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>Calendário</span>
              </button>

              <button
                onClick={() => setViewState('notes')}
                className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                  viewState === 'notes' ? 'bg-[#3B6E52] text-[#FDFBF7] shadow-xs' : 'text-[#414943] hover:text-[#1F1B14]'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Bloco de Notas</span>
              </button>

              <button
                onClick={handleOpenShopping}
                className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                  viewState === 'shopping' ? 'bg-[#3B6E52] text-[#FDFBF7] shadow-xs' : 'text-[#414943] hover:text-[#1F1B14]'
                }`}
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Lista de Compras</span>
              </button>

              <button
                onClick={() => setViewState('recipes')}
                className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                  viewState === 'recipes' ? 'bg-[#3B6E52] text-[#FDFBF7] shadow-xs' : 'text-[#414943] hover:text-[#1F1B14]'
                }`}
              >
                <UtensilsCrossed className="w-4 h-4" />
                <span>Receitas</span>
              </button>
            </nav>

            {/* Upper Right Action Bar: Ano + Pop-up Adesivo + Botão Configuração de Tempo */}
            <div className="flex items-center space-x-2 justify-end">
              {/* Year Selector */}
              <div className="flex items-center space-x-1 bg-[#F5EFEB] p-1 rounded-xl border border-[#EDE4D8]">
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(Number(e.target.value))}
                  aria-label="Selecionar ano"
                  className="bg-[#3B6E52] text-white rounded-lg px-2.5 py-1.5 text-xs font-heading font-bold focus:outline-none shadow-xs cursor-pointer"
                >
                  {availableYears.map((yr) => (
                    <option key={yr} value={yr}>📅 {yr}</option>
                  ))}
                </select>
              </div>

              {/* Botão de Adesivos (ao lado de mudar o ano) */}
              <button
                onClick={() => setIsStickerDrawerOpen(!isStickerDrawerOpen)}
                className={`px-3 py-1.5 rounded-xl text-xs font-heading font-bold flex items-center space-x-1.5 transition-all shadow-xs ${
                  isStickerDrawerOpen
                    ? 'bg-[#3B6E52] text-white scale-105'
                    : 'bg-[#F5EFEB] text-[#3B6E52] hover:bg-[#E8F2EC] border border-[#EDE4D8]'
                }`}
                title="Abrir pop-up de adesivos e washi tapes na parte superior"
              >
                <Palette className="w-4 h-4 text-[#E08775]" />
                <span className="hidden sm:inline">Adesivos</span>
              </button>

              {/* Botão de Configuração (Mudar o tempo do app) */}
              <button
                onClick={() => setIsSettingsOpen(true)}
                className="px-3 py-1.5 rounded-xl text-xs font-heading font-bold flex items-center space-x-1.5 bg-[#F5EFEB] text-[#1F1B14] hover:bg-[#EDE4D8] border border-[#EDE4D8] transition-all shadow-xs hover:scale-105"
                title="Configurações: Mudar o clima e tempo do app"
              >
                <Clock className="w-4 h-4 text-[#3B6E52]" />
                <span className="hidden sm:inline">Tempo</span>
                <span>⚙️</span>
              </button>

              {/* Botão de Nova Versão no cabeçalho quando detectada */}
              {hasUpdate && (
                <button
                  onClick={applyUpdate}
                  className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-xl bg-[#FFF5F2] border border-[#FFDAD3] text-[#783527] text-xs font-heading font-black animate-pulse shadow-xs hover:bg-[#FFDAD3] transition-colors cursor-pointer"
                  title="Nova versão disponível! Clique para atualizar agora"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#E08775]" />
                  <span className="hidden md:inline">Nova Versão</span>
                  <span className="text-[10px] bg-[#E08775] text-white px-1.5 py-0.5 rounded-full font-bold">
                    v{availableVersion}
                  </span>
                </button>
              )}

              {/* Mini Focus Timer pill if running or set */}
              {settings.isTimerRunning && (
                <div
                  onClick={() => setIsSettingsOpen(true)}
                  className="cursor-pointer flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-[#E8F2EC] border border-[#3B6E52] text-[#2A4F3B] text-xs font-heading font-extrabold animate-pulse"
                  title="Timer de Foco em andamento (clique para abrir)"
                >
                  <span>⏱️</span>
                  <span>{formatTimerShort(settings.timerSecondsLeft)}</span>
                </div>
              )}
            </div>

          </div>
        </div>
      </header>

      {/* Main Content Area Wrapped with StickerSystem */}
      <main className="flex-1">
        {viewState === 'home' && (
          <StickerSystem
            viewKey={`home_${selectedYear}`}
            isDrawerOpen={isStickerDrawerOpen}
            onToggleDrawer={() => setIsStickerDrawerOpen(!isStickerDrawerOpen)}
            onCloseDrawer={() => setIsStickerDrawerOpen(false)}
            currentThemeId={settings.themeId || 'sage-classic'}
            onSelectTheme={(themeId) => handleUpdateSettings({ themeId })}
            currentPattern={settings.paperPattern}
            onSelectPattern={(pattern) => handleUpdateSettings({ paperPattern: pattern })}
            onSelectRandomTheme={handleSelectRandomTheme}
          >
            <HomeCalendar
              selectedYear={selectedYear}
              onSelectYear={setSelectedYear}
              onSelectMonth={handleSelectMonth}
              onOpenNotes={() => setViewState('notes')}
              onOpenShopping={handleOpenShopping}
              onOpenRecipes={() => setViewState('recipes')}
              onOpenStickers={() => setIsStickerDrawerOpen(true)}
              onOpenSettings={() => setIsSettingsOpen(true)}
              weatherDescription={settings.weatherDescription}
            />
          </StickerSystem>
        )}

        {viewState === 'spreadsheet' && (
          <StickerSystem
            viewKey={`spreadsheet_${selectedYear}_${selectedMonthIndex}`}
            isDrawerOpen={isStickerDrawerOpen}
            onToggleDrawer={() => setIsStickerDrawerOpen(!isStickerDrawerOpen)}
            onCloseDrawer={() => setIsStickerDrawerOpen(false)}
            currentThemeId={settings.themeId || 'sage-classic'}
            onSelectTheme={(themeId) => handleUpdateSettings({ themeId })}
            currentPattern={settings.paperPattern}
            onSelectPattern={(pattern) => handleUpdateSettings({ paperPattern: pattern })}
            onSelectRandomTheme={handleSelectRandomTheme}
          >
            <BudgetSpreadsheet
              year={selectedYear}
              monthIndex={selectedMonthIndex}
              onBack={() => setViewState('home')}
            />
          </StickerSystem>
        )}

        {viewState === 'notes' && (
          <StickerSystem
            viewKey="notes"
            isDrawerOpen={isStickerDrawerOpen}
            onToggleDrawer={() => setIsStickerDrawerOpen(!isStickerDrawerOpen)}
            onCloseDrawer={() => setIsStickerDrawerOpen(false)}
            currentThemeId={settings.themeId || 'sage-classic'}
            onSelectTheme={(themeId) => handleUpdateSettings({ themeId })}
            currentPattern={settings.paperPattern}
            onSelectPattern={(pattern) => handleUpdateSettings({ paperPattern: pattern })}
            onSelectRandomTheme={handleSelectRandomTheme}
          >
            <NotesView
              onBack={() => setViewState('home')}
            />
          </StickerSystem>
        )}

        {viewState === 'shopping' && (
          <StickerSystem
            viewKey={`shopping_${selectedYear}_${selectedMonthIndex}`}
            isDrawerOpen={isStickerDrawerOpen}
            onToggleDrawer={() => setIsStickerDrawerOpen(!isStickerDrawerOpen)}
            onCloseDrawer={() => setIsStickerDrawerOpen(false)}
            currentThemeId={settings.themeId || 'sage-classic'}
            onSelectTheme={(themeId) => handleUpdateSettings({ themeId })}
            currentPattern={settings.paperPattern}
            onSelectPattern={(pattern) => handleUpdateSettings({ paperPattern: pattern })}
            onSelectRandomTheme={handleSelectRandomTheme}
          >
            <ShoppingListView
              year={selectedYear}
              monthIndex={selectedMonthIndex}
              onBack={() => setViewState('home')}
              onMonthChange={setSelectedMonthIndex}
            />
          </StickerSystem>
        )}

        {viewState === 'recipes' && (
          <StickerSystem
            viewKey="recipes"
            isDrawerOpen={isStickerDrawerOpen}
            onToggleDrawer={() => setIsStickerDrawerOpen(!isStickerDrawerOpen)}
            onCloseDrawer={() => setIsStickerDrawerOpen(false)}
            currentThemeId={settings.themeId || 'sage-classic'}
            onSelectTheme={(themeId) => handleUpdateSettings({ themeId })}
            currentPattern={settings.paperPattern}
            onSelectPattern={(pattern) => handleUpdateSettings({ paperPattern: pattern })}
            onSelectRandomTheme={handleSelectRandomTheme}
          >
            <RecipeBookView
              onBackToHome={() => setViewState('home')}
              onOpenBudget={() => {
                setSelectedMonthIndex(new Date().getMonth());
                setViewState('spreadsheet');
              }}
              currentYear={selectedYear}
              currentMonthIndex={selectedMonthIndex}
            />
          </StickerSystem>
        )}
      </main>

      {/* Settings Modal (Mudar o tempo do app) */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onUpdateSettings={handleUpdateSettings}
        onOpenWhatsNew={() => setIsWhatsNewOpen(true)}
        onSimulateUpdate={simulateUpdateNotification}
      />

      {/* Visual Balloon / Toast de Atualização: 'Nova versão disponível! [Clique aqui para atualizar]' */}
      {hasUpdate && (
        <UpdateToast
          newVersion={availableVersion}
          onUpdate={applyUpdate}
          onDismiss={dismissUpdate}
        />
      )}

      {/* Modal de Novidades exibido na hora após o recarregamento */}
      <WhatsNewModal
        isOpen={isWhatsNewOpen}
        onClose={() => setIsWhatsNewOpen(false)}
        version={availableVersion}
      />

      {/* Cute Piggy Mascot in Bottom Right (opção de manter ou ocultar) */}
      {settings.showPiggyAssistant !== false && (
        <PiggyAssistant />
      )}

    </div>
  );
}
