import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
}

const PolicyModal: React.FC<PolicyModalProps> = ({ isOpen, onClose, title, content }) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const formattedContent = React.useMemo(() => {
    return content.split('\n').map((line, index) => {
      if (line.startsWith('# ')) {
        return React.createElement('h2', {
          key: index,
          className: 'text-2xl font-bold mt-8 mb-4 text-mono-50 font-space-grotesk',
          children: line.replace('# ', '').trim(),
        });
      }
      if (line.startsWith('## ')) {
        return React.createElement('h3', {
          key: index,
          className: 'text-xl font-semibold mt-6 mb-3 text-mono-50 font-space-grotesk',
          children: line.replace('## ', '').trim(),
        });
      }
      if (line.startsWith('### ')) {
        return React.createElement('h4', {
          key: index,
          className: 'text-lg font-semibold mt-4 mb-2 text-mono-50 font-space-grotesk',
          children: line.replace('### ', '').trim(),
        });
      }
      if (line.startsWith('- ') || line.startsWith('* ')) {
        return React.createElement('li', {
          key: index,
          className: 'ml-6 my-1 text-mono-200',
          children: line.replace(/^[-*] /, '').trim(),
        });
      }
      if (line.trim() === '') {
        return React.createElement('div', {
          key: index,
          className: 'h-4',
        });
      }
      return React.createElement('p', {
        key: index,
        className: 'my-2 text-mono-200 leading-relaxed',
        children: line,
      });
    });
  }, [content]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="fixed inset-4 sm:inset-auto sm:top-[10%] sm:left-1/2 sm:-translate-x-1/2 sm:max-w-3xl w-full max-h-[80vh] bg-surface-dark rounded-xl shadow-xl z-50 flex flex-col glass-card"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-surface-dark/50">
          <h2 className="text-xl font-bold text-mono-50 font-space-grotesk">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-surface-dark/30 rounded-full transition-colors"
            aria-label="Close"
          >
            <X size={20} className="text-mono-200" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4 scroll-smooth hide-scrollbar">
          <div className="max-w-none">{formattedContent}</div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PolicyModal;
