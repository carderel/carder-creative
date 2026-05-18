import React, { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-dark-bg/90 backdrop-blur-md cursor-crosshair"
        onClick={onClose}
      >
        <div className="absolute inset-0 vapor-gradient opacity-10"></div>
      </div>
      
      {/* Modal Content */}
      <div className="relative w-full max-w-xl animate-in fade-in zoom-in-95 duration-300">
        <button 
          onClick={onClose}
          className="absolute -top-12 right-0 text-slate-500 hover:text-white font-mono text-xs font-black uppercase tracking-widest flex items-center transition-colors"
        >
          [Close_Handshake]
          <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="bg-dark-bg border border-neon-cyan shadow-[0_0_50px_rgba(0,242,255,0.2)]">
          <div className="p-1 bg-neon-cyan/20">
            <div className="px-4 py-1 flex justify-between items-center">
              <span className="text-[8px] font-black text-neon-cyan uppercase tracking-[0.3em]">Secure_Interface_v4.5</span>
              <div className="flex space-x-1">
                <div className="w-1.5 h-1.5 rounded-full bg-neon-cyan/40"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-neon-purple/40"></div>
              </div>
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
