import React, { TextareaHTMLAttributes, forwardRef } from 'react';
import clsx from 'clsx';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className, ...props }, ref) => (
    <div className="flex flex-col">
      <label htmlFor={props.id || props.name} className="block mb-2 font-medium text-gray-300">
        {label}
      </label>
      <textarea
        ref={ref}
        id={props.id || props.name}
        className={clsx(
          "w-full bg-[#223651] border border-[#343A40] rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#CBB26A] transition-colors",
          error ? "border-red-500" : "",
          className
        )}
        aria-invalid={!!error}
        aria-describedby={error ? `${props.id || props.name}-error` : undefined}
        {...props}
      />
      {error && (
        <span id={`${props.id || props.name}-error`} className="mt-1 text-sm text-red-500">
          {error}
        </span>
      )}
    </div>
  )
);

Textarea.displayName = 'Textarea';
export default Textarea;
