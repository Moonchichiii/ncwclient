import { ReactNode } from 'react';

export interface BaseProps {
  children?: ReactNode;
  className?: string;
}

export interface ButtonProps extends BaseProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}