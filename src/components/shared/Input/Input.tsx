import { InputHTMLAttributes, forwardRef } from 'react';
import clsx from 'clsx';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ label, className, ...props }, ref) => (
  <div className="flex flex-col">
    <label className="mb-2 text-sm font-medium text-gray-300">{label}</label>
    <input
      ref={ref}
      className={clsx(
        "w-full bg-[#223651] border border-[#343A40] rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#CBB26A] transition-colors",
        className
      )}
      {...props}
    />
  </div>
));

Input.displayName = 'Input';
export default Input;
