import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ active, loading, children, className = '', disabled, ...props }, ref) => {
    const baseStyles =
      'relative px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border inline-flex items-center justify-center';
    const activeStyles = active
      ? 'border-white bg-white text-black'
      : 'border-white/20 text-white hover:border-white/40';
    const disabledStyles = disabled || loading ? 'opacity-50 cursor-not-allowed' : '';

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        disabled={disabled || loading}
        className={`${baseStyles} ${activeStyles} ${disabledStyles} ${className}`}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
