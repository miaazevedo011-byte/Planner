import React, { useState } from 'react';
import { Sparkles, RefreshCw, X } from 'lucide-react';

interface UpdateToastProps {
  newVersion?: string;
  onUpdate: () => void;
  onDismiss?: () => void;
}

export const UpdateToast: React.FC<UpdateToastProps> = ({
  newVersion = '2.4.0',
  onUpdate,
  onDismiss,
}) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleClickUpdate = () => {
    setIsUpdating(true);
    // Give 300ms for UI feedback before triggering the reload
    setTimeout(() => {
      onUpdate();
    }, 300);
  };

  return (
    <aside
      aria-label="Notificação de atualização"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-md animate-in slide-in-from-bottom-6 fade-in duration-300"
    >
      <div className="relative bg-[#FFF8F2] border-2 border-[#3B6E52] rounded-2xl p-4 sm:p-4.5 shadow-2xl flex items-center justify-between gap-3 text-[#1F1B14] overflow-hidden ring-4 ring-[#B7EECB]/40">
        {/* Washi tape pin */}
        <div className="absolute -top-2 left-6 w-16 h-3.5 bg-[#FFDAD3]/90 -rotate-2 rounded-xs shadow-xs pointer-events-none"></div>

        {/* Pulse / Badge icon */}
        <div className="w-10 h-10 rounded-xl bg-[#E8F2EC] border border-[#B7EECB] flex items-center justify-center text-[#22553B] shrink-0 shadow-xs">
          <RefreshCw className={`w-5 h-5 ${isUpdating ? 'animate-spin' : 'animate-pulse'}`} />
        </div>

        {/* Message and Action */}
        <div className="flex-1 min-w-0 pr-1">
          <div className="flex items-center space-x-1.5 text-[11px] font-heading font-bold uppercase tracking-wider text-[#3B6E52]">
            <Sparkles className="w-3.5 h-3.5 text-[#E08775]" />
            <span>Atualização do Sistema</span>
          </div>
          <p className="text-xs sm:text-sm font-heading font-extrabold text-[#1F1B14] leading-snug mt-0.5">
            Nova versão disponível!{' '}
            <button
              onClick={handleClickUpdate}
              disabled={isUpdating}
              className="inline-flex items-center text-[#93493A] hover:text-[#783527] underline decoration-2 underline-offset-2 font-black cursor-pointer active:scale-95 transition-transform"
              title="Clique para atualizar o aplicativo agora"
            >
              {isUpdating ? 'Atualizando...' : '[Clique aqui para atualizar]'}
            </button>
          </p>
        </div>

        {/* Close / Dismiss */}
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="w-7 h-7 rounded-full bg-[#FCF2E6] hover:bg-[#EDE4D8] text-[#717972] hover:text-[#1F1B14] flex items-center justify-center transition-colors shrink-0 cursor-pointer"
            title="Lembrar mais tarde"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </aside>
  );
};
