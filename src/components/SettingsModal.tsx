import React, { useState } from 'react';
import { AppSettings, AppWeather } from '../types';
import { X, Sun, CloudRain, Wind, Flower2, Snowflake, Moon, Calendar, Clock, Play, Pause, RotateCcw, Check, Sparkles, Layers } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AppSettings;
  onUpdateSettings: (newSettings: Partial<AppSettings>) => void;
  onOpenWhatsNew?: () => void;
  onSimulateUpdate?: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  onOpenWhatsNew,
  onSimulateUpdate,
}) => {
  if (!isOpen) return null;

  const weatherOptions: {
    id: AppWeather;
    label: string;
    temp: string;
    desc: string;
    icon: React.ReactNode;
    color: string;
  }[] = [
    {
      id: 'ensolarado',
      label: 'Ensolarado & Radiante',
      temp: '26°C',
      desc: 'Céu aberto, luz dourada e produtividade alta',
      icon: <Sun className="w-5 h-5 text-[#E08775]" />,
      color: 'bg-[#FDFBF7] border-[#E08775]/50',
    },
    {
      id: 'chuva',
      label: 'Chuva Aconchegante',
      temp: '18°C',
      desc: 'Gotas na janela, xícara de chá e reflexão calma',
      icon: <CloudRain className="w-5 h-5 text-[#3B6E52]" />,
      color: 'bg-[#E8F2EC]/60 border-[#3B6E52]/40',
    },
    {
      id: 'outono',
      label: 'Brisa de Outono',
      temp: '19°C',
      desc: 'Folhas secas, ar fresco e organização serena',
      icon: <Wind className="w-5 h-5 text-[#783527]" />,
      color: 'bg-[#F7D6D0]/50 border-[#E08775]/40',
    },
    {
      id: 'primavera',
      label: 'Primavera Florida',
      temp: '22°C',
      desc: 'Novas ideias florescendo e energia renovada',
      icon: <Flower2 className="w-5 h-5 text-[#3B6E52]" />,
      color: 'bg-[#E8F2EC]/80 border-[#9CD3B1]',
    },
    {
      id: 'inverno',
      label: 'Inverno Aconchegante',
      temp: '14°C',
      desc: 'Manhã fria, cobertor de lã e foco no ninho',
      icon: <Snowflake className="w-5 h-5 text-[#717972]" />,
      color: 'bg-[#F5EFEB] border-[#EDE4D8]',
    },
    {
      id: 'noite',
      label: 'Noite Estrelada',
      temp: '17°C',
      desc: 'Luz de velas, silêncio tranquilo e gratidão',
      icon: <Moon className="w-5 h-5 text-[#343028]" />,
      color: 'bg-[#EDE4D8] border-[#717972]',
    },
  ];

  const handleSelectWeather = (w: (typeof weatherOptions)[0]) => {
    onUpdateSettings({
      weather: w.id,
      weatherDescription: `${w.label} • ${w.temp}`,
      weatherTemp: w.temp,
    });
  };

  const realTodayStr = new Date().toISOString().split('T')[0];

  const formatTimerDisplay = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
      <div className="paper-card w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 rounded-3xl relative shadow-2xl border-2 border-[#3B6E52]">
        <div className="washi-tape-top"></div>

        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[#EDE4D8] pb-4 mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-[#E8F2EC] flex items-center justify-center text-[#3B6E52] border border-[#C0C9C1]">
              <Clock className="w-5 h-5 text-[#3B6E52]" />
            </div>
            <div>
              <h3 className="font-heading text-2xl font-bold text-[#1F1B14]">Configuração & Tempo do App</h3>
              <p className="text-xs text-[#717972]">Ajuste o clima, a data simulada e o ritmo do seu planner artesanal</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Fechar configurações"
            className="p-2 text-[#717972] hover:text-[#1F1B14] hover:bg-[#F5EFEB] rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          {/* SEÇÃO 1: Clima & Atmosfera do Diário (Tempo Meteorológico) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-heading font-bold uppercase tracking-wider text-[#3B6E52] flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#E08775]" />
                <span>1. Clima & Atmosfera do Planner (Tempo)</span>
              </span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#E8F2EC] text-[#2A4F3B]">
                {settings.weatherDescription}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {weatherOptions.map((opt) => {
                const isSelected = settings.weather === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectWeather(opt)}
                    className={`p-3.5 rounded-2xl border-2 text-left flex items-start space-x-3 transition-all ${opt.color} ${
                      isSelected
                        ? 'ring-2 ring-[#3B6E52] border-[#3B6E52] shadow-sm scale-[1.01]'
                        : 'hover:border-[#3B6E52]/60 hover:scale-[1.005]'
                    }`}
                  >
                    <div className="p-2 bg-[#FDFBF7] rounded-xl shadow-xs border border-[#EDE4D8] shrink-0">
                      {opt.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-heading font-bold text-sm text-[#1F1B14]">{opt.label}</span>
                        <span className="text-xs font-heading font-bold text-[#E08775]">{opt.temp}</span>
                      </div>
                      <p className="text-[11px] text-[#717972] mt-0.5 line-clamp-1">{opt.desc}</p>
                    </div>
                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-[#3B6E52] text-white flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* SEÇÃO 2: Data & Tempo Cronológico */}
          <div className="paper-card p-5 rounded-2xl border border-[#EDE4D8] space-y-3 bg-[#F5EFEB]/60">
            <span className="text-xs font-heading font-bold uppercase tracking-wider text-[#3B6E52] flex items-center space-x-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#3B6E52]" />
              <span>2. Data Atual do Diário (Tempo Cronológico)</span>
            </span>

            <p className="text-xs text-[#717972]">
              Escolha uma data para simular ou volte para a data real de hoje do seu dispositivo:
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="w-full sm:flex-1">
                <input
                  type="date"
                  value={settings.customDate || realTodayStr}
                  onChange={(e) => onUpdateSettings({ customDate: e.target.value })}
                  aria-label="Data atual do planner"
                  className="w-full bg-[#FDFBF7] border border-[#EDE4D8] rounded-xl px-4 py-2.5 text-sm text-[#1F1B14] font-medium focus:outline-none focus:border-[#3B6E52]"
                />
              </div>

              <button
                onClick={() => onUpdateSettings({ customDate: '' })}
                className={`w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-heading font-semibold transition-all ${
                  !settings.customDate
                    ? 'bg-[#3B6E52] text-white shadow-xs'
                    : 'btn-secondary-craft'
                }`}
                title="Redefinir para data real de hoje"
              >
                Hoje Real ({new Date().toLocaleDateString('pt-BR')})
              </button>
            </div>
          </div>

          {/* SEÇÃO 3: Temporizador de Foco / Ritmo de Tempo (Pomodoro) */}
          <div className="paper-card p-5 rounded-2xl border border-[#EDE4D8] space-y-3 bg-[#FDFBF7]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-heading font-bold uppercase tracking-wider text-[#3B6E52] flex items-center space-x-1.5">
                <Clock className="w-3.5 h-3.5 text-[#E08775]" />
                <span>3. Ritmo de Tempo & Foco (Pomodoro do Planner)</span>
              </span>
              <span className="font-heading font-extrabold text-lg text-[#3B6E52]">
                {formatTimerDisplay(settings.timerSecondsLeft)}
              </span>
            </div>

            <p className="text-xs text-[#717972]">
              Reserve blocos de tempo concentrado para preencher suas finanças e organizar a semana:
            </p>

            <div className="flex flex-wrap items-center gap-2">
              {[15, 25, 45].map((mins) => (
                <button
                  key={mins}
                  onClick={() =>
                    onUpdateSettings({
                      focusTimerDuration: mins,
                      timerSecondsLeft: mins * 60,
                      isTimerRunning: false,
                    })
                  }
                  className={`px-3 py-1.5 rounded-xl text-xs font-heading font-semibold transition-all ${
                    settings.focusTimerDuration === mins
                      ? 'bg-[#3B6E52] text-white shadow-xs'
                      : 'bg-[#F5EFEB] text-[#414943] border border-[#EDE4D8] hover:border-[#3B6E52]'
                  }`}
                >
                  {mins} minutos
                </button>
              ))}

              <div className="flex items-center space-x-2 ml-auto">
                <button
                  onClick={() => onUpdateSettings({ isTimerRunning: !settings.isTimerRunning })}
                  className="btn-primary-craft px-4 py-1.5 rounded-xl text-xs flex items-center space-x-1.5"
                >
                  {settings.isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{settings.isTimerRunning ? 'Pausar' : 'Iniciar Foco'}</span>
                </button>
                <button
                  onClick={() =>
                    onUpdateSettings({
                      timerSecondsLeft: settings.focusTimerDuration * 60,
                      isTimerRunning: false,
                    })
                  }
                  className="p-1.5 rounded-xl border border-[#EDE4D8] text-[#717972] hover:text-[#BA1A1A] bg-[#F5EFEB]"
                  title="Reiniciar tempo"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* SEÇÃO 4: Textura do Papel */}
          <div className="space-y-2">
            <span className="text-xs font-heading font-bold uppercase tracking-wider text-[#3B6E52] flex items-center space-x-1.5">
              <Layers className="w-3.5 h-3.5 text-[#3B6E52]" />
              <span>4. Estilo do Papel do Planner</span>
            </span>

            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => onUpdateSettings({ paperPattern: 'dot-grid' })}
                className={`p-3 rounded-2xl border text-xs font-heading font-bold text-center transition-all ${
                  settings.paperPattern === 'dot-grid'
                    ? 'border-[#3B6E52] bg-[#E8F2EC] text-[#2A4F3B] shadow-xs'
                    : 'border-[#EDE4D8] bg-[#F5EFEB] text-[#414943]'
                }`}
              >
                Pontilhado (Dot Grid)
              </button>
              <button
                onClick={() => onUpdateSettings({ paperPattern: 'lined' })}
                className={`p-3 rounded-2xl border text-xs font-heading font-bold text-center transition-all ${
                  settings.paperPattern === 'lined'
                    ? 'border-[#3B6E52] bg-[#E8F2EC] text-[#2A4F3B] shadow-xs'
                    : 'border-[#EDE4D8] bg-[#F5EFEB] text-[#414943]'
                }`}
              >
                Pautado (Linhas)
              </button>
              <button
                onClick={() => onUpdateSettings({ paperPattern: 'plain' })}
                className={`p-3 rounded-2xl border text-xs font-heading font-bold text-center transition-all ${
                  settings.paperPattern === 'plain'
                    ? 'border-[#3B6E52] bg-[#E8F2EC] text-[#2A4F3B] shadow-xs'
                    : 'border-[#EDE4D8] bg-[#F5EFEB] text-[#414943]'
                }`}
              >
                Papel Liso
              </button>
            </div>
          </div>

          {/* SEÇÃO 4: Versão do App & Atualizações */}
          <div className="space-y-3 pt-2 border-t border-[#EDE4D8]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-heading font-bold uppercase tracking-wider text-[#3B6E52] flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#E08775]" />
                <span>4. Versão &amp; Notificações de Atualização</span>
              </span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#E8F2EC] text-[#2A4F3B] border border-[#B7EECB]">
                v2.4.0
              </span>
            </div>

            <div className="bg-[#F5EFEB] border border-[#EDE4D8] rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h4 className="font-heading font-bold text-sm text-[#1F1B14]">
                  Detector Automático de Novas Versões
                </h4>
                <p className="text-xs text-[#717972] mt-0.5">
                  O app verifica novidades continuamente e exibe o balão de atualização na tela.
                </p>
              </div>

              <div className="flex items-center gap-2">
                {onOpenWhatsNew && (
                  <button
                    onClick={() => {
                      onClose();
                      onOpenWhatsNew();
                    }}
                    className="px-3.5 py-2 rounded-xl text-xs font-heading font-bold bg-[#E8F2EC] text-[#22553B] hover:bg-[#B7EECB] transition-colors border border-[#B7EECB]"
                  >
                    Ver Novidades ✨
                  </button>
                )}
                {onSimulateUpdate && (
                  <button
                    onClick={() => {
                      onClose();
                      onSimulateUpdate();
                    }}
                    className="px-3.5 py-2 rounded-xl text-xs font-heading font-bold bg-[#FFF5F2] text-[#93493A] hover:bg-[#FFDAD3] transition-colors border border-[#FFDAD3]"
                    title="Simular exibição do aviso visual de nova versão"
                  >
                    Testar Aviso 🔔
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* SEÇÃO 5: Assistente Porquinho (Opção de Manter ou Ocultar) */}
          <div className="space-y-3 pt-2 border-t border-[#EDE4D8]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-heading font-bold uppercase tracking-wider text-[#3B6E52] flex items-center space-x-1.5">
                <span className="text-sm">🐖</span>
                <span>5. Assistente Porquinho (Dicas de Economia)</span>
              </span>
              <span
                className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${
                  settings.showPiggyAssistant !== false
                    ? 'bg-[#E8F2EC] text-[#2A4F3B] border-[#B7EECB]'
                    : 'bg-[#F5EFEB] text-[#717972] border-[#EDE4D8]'
                }`}
              >
                {settings.showPiggyAssistant !== false ? 'Visível 🟢' : 'Oculto ⚪'}
              </span>
            </div>

            <div className="bg-[#F5EFEB] border border-[#EDE4D8] rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h4 className="font-heading font-bold text-sm text-[#1F1B14] flex items-center gap-1.5">
                  <span>Exibir o Porquinho Flutuante no Canto</span>
                </h4>
                <p className="text-xs text-[#717972] mt-0.5">
                  Oculte o porquinho se desejar mais espaço livre na tela para não atrapalhar mexer no app.
                </p>
              </div>

              <button
                onClick={() =>
                  onUpdateSettings({
                    showPiggyAssistant: settings.showPiggyAssistant === false ? true : false,
                  })
                }
                className={`px-4 py-2 rounded-xl text-xs font-heading font-bold transition-all shadow-xs cursor-pointer ${
                  settings.showPiggyAssistant !== false
                    ? 'bg-[#FFF5F2] text-[#93493A] hover:bg-[#FFDAD3] border border-[#FFDAD3]'
                    : 'bg-[#3B6E52] text-white hover:bg-[#2A4F3B]'
                }`}
              >
                {settings.showPiggyAssistant !== false ? 'Ocultar Porquinho' : 'Mostrar Porquinho'}
              </button>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end pt-6 mt-6 border-t border-[#EDE4D8]">
          <button
            onClick={onClose}
            className="btn-primary-craft px-6 py-2.5 rounded-xl text-sm font-semibold"
          >
            Salvar e Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
