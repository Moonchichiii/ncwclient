import {
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  forwardRef,
  useRef,
  useEffect,
} from 'react';
import gsap from 'gsap';
import clsx from 'clsx';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    const labelRef = useRef<HTMLLabelElement>(null);
    const errorRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
      if (labelRef.current) {
        gsap.fromTo(
          labelRef.current,
          { opacity: 0, y: -5 },
          { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
        );
      }
    }, []);

    useEffect(() => {
      if (error && errorRef.current) {
        gsap.fromTo(
          errorRef.current,
          { opacity: 0, x: -10 },
          { opacity: 1, x: 0, duration: 0.3, ease: 'power2.out' }
        );
      }
    }, [error]);

    return (
      <div className="flex flex-col space-y-2">
        <label ref={labelRef} className="text-sm font-medium text-gray-300">
          {label}
        </label>
        <div className="relative">
          <input
            ref={ref}
            className={clsx(
              'w-full bg-[#223651]/50 backdrop-blur-sm border-2 border-[#343A40] rounded-xl px-4 py-3',
              'text-white placeholder-gray-400',
              'focus:outline-none focus:border-[#CBB26A] focus:ring-1 focus:ring-[#CBB26A]',
              'transition-all duration-200',
              error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
              className
            )}
            {...props}
          />
          {error && (
            <span
              ref={errorRef}
              className="absolute -bottom-6 left-0 text-sm text-red-500"
            >
              {error}
            </span>
          )}
        </div>
      </div>
    );
  }
);

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className, ...props }, ref) => {
    const labelRef = useRef<HTMLLabelElement>(null);
    const errorRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
      if (labelRef.current) {
        gsap.fromTo(
          labelRef.current,
          { opacity: 0, y: -5 },
          { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
        );
      }
    }, []);

    useEffect(() => {
      if (error && errorRef.current) {
        gsap.fromTo(
          errorRef.current,
          { opacity: 0, x: -10 },
          { opacity: 1, x: 0, duration: 0.3, ease: 'power2.out' }
        );
      }
    }, [error]);

    return (
      <div className="flex flex-col space-y-2">
        <label ref={labelRef} className="text-sm font-medium text-gray-300">
          {label}
        </label>
        <div className="relative">
          <textarea
            ref={ref}
            className={clsx(
              'w-full bg-[#223651]/50 backdrop-blur-sm border-2 border-[#343A40] rounded-xl px-4 py-3',
              'text-white placeholder-gray-400',
              'focus:outline-none focus:border-[#CBB26A] focus:ring-1 focus:ring-[#CBB26A]',
              'transition-all duration-200 resize-none',
              error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
              className
            )}
            {...props}
          />
          {error && (
            <span
              ref={errorRef}
              className="absolute -bottom-6 left-0 text-sm text-red-500"
            >
              {error}
            </span>
          )}
        </div>
      </div>
    );
  }
);