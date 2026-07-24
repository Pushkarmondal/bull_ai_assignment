import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  isLoading?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  isLoading = false,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer px-6 py-3.5 text-sm sm:text-base active:scale-[0.97]';
  
  const variants = {
    primary: 'gradient-teal text-white shadow-lg shadow-emerald-950/50 hover:shadow-emerald-500/30 hover:brightness-110 shimmer-effect',
    secondary: 'bg-slate-900/90 text-slate-200 border border-slate-750 hover:bg-slate-800 hover:text-white hover:border-slate-600 shadow-md',
    outline: 'border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-400 shadow-sm',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="inline-flex items-center gap-2.5">
          <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="font-semibold">{children}</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
};
