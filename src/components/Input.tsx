import { forwardRef, type InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ invalid, className = '', ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`w-full h-14 px-5 rounded-xl bg-white text-neutral-900 placeholder-neutral-400 text-base font-medium outline-none transition-all duration-200 border ${invalid ? 'border-red-400 focus:border-red-500' : 'border-neutral-200 focus:border-neutral-900'} focus:ring-1 focus:ring-neutral-900 ${className}`}
        {...props}
      />
    );
  },
);

Input.displayName = 'Input';
