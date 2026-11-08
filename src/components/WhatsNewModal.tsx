import React from 'react';
import { Sparkles, X, Check, UtensilsCrossed, ArrowRight } from 'lucide-react';
import { LATEST_RELEASE } from '../constants/version';

interface WhatsNewModalProps {
  isOpen: boolean;
  onClose: () => void;
  version?: string;
}

export const WhatsNewModal: React.FC<WhatsNewModalProps> = ({
  isOpen,
  onClose,
  version = LATEST_RELEASE.version,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#FDFBF7] border-2 border-[#EDE4D8] rounded-3xl p-6 sm:p-7 shadow-2xl max-h-[90vh] overflow-y-auto space-y-5">
        {/* Washi tape decorative pin */}
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-28 h-5 bg-[#FFDAD3] rotate-1 rounded-xs shadow-xs pointer-events-none"></div>

        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-[#EDE4D8] pb-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#E8F2EC] text-[#22553B] border border-[#B7EECB] text-[11px] font-heading font-extrabold uppercase tracking-wider">
                v{version} • Atualizado!
              </span>
              <span className="text-xs text-[#717972] font-semibold">{LATEST_RELEASE.releaseDate}</span>
            </div>
            <h2 className="font-heading font-bold text-2xl text-[#1F1B14] tracking-tight flex items-center gap-2">
              <span>🎉 Novidades da Versão!</span>
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#F5EFEB] hover:bg-[#EDE4D8] text-[#717972] hover:text-[#1F1B14] flex items-center justify-center transition-colors cursor-pointer"
            title="Fechar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Release Highlight Title */}
        <div className="bg-[#FFF5F2] border border-[#FFDAD3] rounded-2xl p-4">
          <p className="font-heading font-bold text-sm text-[#783527]">
            {LATEST_RELEASE.title}
          </p>
          <p className="text-xs text-[#58413D] mt-1 leading-relaxed">
            Seu aplicativo foi atualizado com sucesso. Confira as novas funções preparadas com carinho para o seu planejamento e dia a dia:
          </p>
        </div>

        {/* Feature Highlights Cards */}
        <div className="space-y-3">
          {LATEST_RELEASE.highlights.map((item, index) => (
            <div
              key={index}
              className="bg-[#FCF2E6] border border-[#EDE4D8] rounded-2xl p-3.5 flex items-start space-x-3.5 hover:border-[#3B6E52] transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-[#FDFBF7] border border-[#EDE4D8] flex items-center justify-center text-xl shrink-0 shadow-2xs">
                {item.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-heading font-bold text-sm text-[#1F1B14]">
                  {item.title}
                </h3>
                <p className="text-xs text-[#5D4742] mt-0.5 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="pt-2">
          <button
            onClick={onClose}
            className="w-full bg-[#22553B] hover:bg-[#1B432F] text-white font-heading font-bold text-sm py-3.5 rounded-2xl flex items-center justify-center space-x-2 shadow-md active:scale-98 transition-all cursor-pointer"
          >
            <span>Aproveitar as Novidades! ✨</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
