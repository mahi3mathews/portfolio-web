import type { ReactNode } from 'react';

type CardProps = {
  isDarkTheme: boolean;
  children: ReactNode;
  className?: string;
  disableAnimation?: boolean;
  cardKey?: string | number;
};

export function Card({ isDarkTheme, children, className, disableAnimation, cardKey }: CardProps) {
  return (
    <div
      key={cardKey}
      className={`p-4 rounded-xl ${
        isDarkTheme ? 'bg-white/5' : 'bg-white/60'
      } backdrop-blur-md border ${isDarkTheme ? 'border-white/10' : 'border-white/20'} ${
        !disableAnimation ? 'hover:scale-105 transition-all duration-300' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}
