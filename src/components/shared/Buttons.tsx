import { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ active, loading, children, className = '', disabled, ...props }, forwardedRef) => {
    const buttonRef = useRef<HTMLButtonElement>(null);

    // Merge forwarded ref with local ref
    useEffect(() => {
      if (typeof forwardedRef === 'function') {
        forwardedRef(buttonRef.current);
      } else if (forwardedRef) {
        forwardedRef.current = buttonRef.current;
      }
    }, [forwardedRef]);

    useEffect(() => {
      const button = buttonRef.current;
      if (!button) return;

      const handleMouseEnter = () => {
        gsap.to(button, { scale: 1.05, duration: 0.2, ease: 'power2.out' });
      };

      const handleMouseLeave = () => {
        gsap.to(button, { scale: 1, duration: 0.2, ease: 'power2.out' });
      };

      const handleMouseDown = () => {
        gsap.to(button, { scale: 0.95, duration: 0.1, ease: 'power2.out' });
      };

      const handleMouseUp = () => {
        gsap.to(button, { scale: 1.05, duration: 0.1, ease: 'power2.out' });
      };

      button.addEventListener('mouseenter', handleMouseEnter);
      button.addEventListener('mouseleave', handleMouseLeave);
      button.addEventListener('mousedown', handleMouseDown);
      button.addEventListener('mouseup', handleMouseUp);

      return () => {
        button.removeEventListener('mouseenter', handleMouseEnter);
        button.removeEventListener('mouseleave', handleMouseLeave);
        button.removeEventListener('mousedown', handleMouseDown);
        button.removeEventListener('mouseup', handleMouseUp);
      };
    }, [disabled, loading]);

    const baseStyles =
      'relative px-6 py-2 rounded-full text-sm font-medium border inline-flex items-center justify-center';
    const activeStyles = active
      ? 'border-white bg-white text-black'
      : 'border-white/20 text-white hover:border-white/40';
    const disabledStyles = disabled ?? loading ? 'opacity-50 cursor-not-allowed' : '';

    return (
      <button
        ref={buttonRef}
        disabled={disabled ?? loading}
        className={`${baseStyles} ${activeStyles} ${disabledStyles} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;