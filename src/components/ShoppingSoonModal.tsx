import React from 'react';
import { ShoppingCart, X, Sparkles } from 'lucide-react';

interface ShoppingSoonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShoppingSoonModal: React.FC<ShoppingSoonModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div className="paper-card w-full max-w-md p-6 sm:p-8 rounded-2xl relative shadow-2xl text-center space-y-4">
        <div className="washi-tape-top"></div>
        
        <div className="w-14 h-14 bg-[#E8F2EC] rounded-2xl mx-auto flex items-center justify-center text-[#3B6E52] border border-[#C0C9C1]">
          <ShoppingCart className="w-7 h-7" />
        </div>

        <h3 className="font-heading text-2xl font-bold text-[#1F1B14]">Lista de Compras</h3>
        
        <div className="inline-block px-4 py-1.5 bg-[#F7D6D0] text-[#783527] rounded-full text-xs font-heading font-bold uppercase tracking-wider">
          ✨ Em Breve
        </div>

        <p className="text-sm text-[#414943] leading-relaxed">
          Esta funcionalidade está sendo preparada com muito carinho para o seu planejamento de supermercado, feira e farmácia. Aguarde novidades!
        </p>

        <button
          onClick={onClose}
          className="btn-primary-craft w-full py-3 rounded-xl text-sm font-semibold mt-2"
        >
          Entendido, Voltar ao Planner
        </button>
      </div>
    </div>
  );
};
