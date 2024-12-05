import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import gsap from 'gsap';

const PolicyModal = ({ isOpen, onClose, title, content }) => {
  const modalRef = useRef(null);
  const backdropRef = useRef(null);
  const contentRef = useRef(null);
  const headerRef = useRef(null);
  const isAnimatingRef = useRef(false);
  
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      showModal();
    } else if (modalRef.current) {
      hideModal();
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const showModal = () => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    const tl = gsap.timeline({
      defaults: { ease: 'power4.out' },
      onComplete: () => {
        isAnimatingRef.current = false;
      }
    });

    // Reset initial states
    gsap.set(modalRef.current, { opacity: 0, scale: 0.95, y: 20 });
    gsap.set(backdropRef.current, { opacity: 0 });
    gsap.set(headerRef.current, { opacity: 0, y: -20 });
    gsap.set(contentRef.current.children, { opacity: 0, y: 30 });

    // Animate in sequence
    tl.to(backdropRef.current, {
      opacity: 1,
      duration: 0.4,
    })
    .to(modalRef.current, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.5,
      ease: 'back.out(1.7)',
    }, '-=0.2')
    .to(headerRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.4,
    }, '-=0.3')
    .to(contentRef.current.children, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      stagger: 0.05,
    }, '-=0.2');
  };

  const hideModal = () => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    const tl = gsap.timeline({
      defaults: { ease: 'power2.inOut' },
      onComplete: () => {
        isAnimatingRef.current = false;
      }
    });

    tl.to(contentRef.current.children, {
      opacity: 0,
      y: -20,
      duration: 0.3,
      stagger: 0.02,
    })
    .to(headerRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.3,
    }, '-=0.2')
    .to(modalRef.current, {
      opacity: 0,
      scale: 0.95,
      y: 20,
      duration: 0.3,
    }, '-=0.2')
    .to(backdropRef.current, {
      opacity: 0,
      duration: 0.3,
    }, '-=0.1');
  };

  const formattedContent = React.useMemo(() => {
    return content.split('\n').map((line, index) => {
      if (line.startsWith('# ')) {
        return React.createElement('h2', {
          key: index,
          className: 'text-2xl font-bold mt-8 mb-4 text-gray-50',
          children: line.replace('# ', '').trim(),
        });
      }
      if (line.startsWith('## ')) {
        return React.createElement('h3', {
          key: index,
          className: 'text-xl font-semibold mt-6 mb-3 text-gray-50',
          children: line.replace('## ', '').trim(),
        });
      }
      if (line.startsWith('### ')) {
        return React.createElement('h4', {
          key: index,
          className: 'text-lg font-semibold mt-4 mb-2 text-gray-50',
          children: line.replace('### ', '').trim(),
        });
      }
      if (line.startsWith('- ') || line.startsWith('* ')) {
        return React.createElement('li', {
          key: index,
          className: 'ml-6 my-1 text-gray-300',
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
        className: 'my-2 text-gray-300 leading-relaxed',
        children: line,
      });
    });
  }, [content]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        ref={backdropRef}
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur z-40"
      />

      {/* Modal */}
      <div
        ref={modalRef}
        className="fixed inset-4 sm:inset-auto sm:top-[10%] sm:left-1/2 sm:-translate-x-1/2 sm:max-w-3xl w-full max-h-[80vh] 
          bg-gray-900 rounded-xl shadow-xl z-50 flex flex-col"
      >
        {/* Header */}
        <div 
          ref={headerRef}
          className="flex items-center justify-between px-6 py-4 border-b border-gray-800"
        >
          <h2 className="text-xl font-bold text-gray-50">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-full transition-colors"
            aria-label="Close"
          >
            <X size={20} className="text-gray-300" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <div ref={contentRef} className="max-w-none">{formattedContent}</div>
        </div>
      </div>
    </>
  );
};

export default PolicyModal;