import React from 'react';

interface NeoButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'neutral';
  fullWidth?: boolean;
}

const NeoButton: React.FC<NeoButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "border-3 border-black font-display font-bold text-sm sm:text-base px-6 py-4 transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none uppercase tracking-wide";
  const shadowStyle = "shadow-neo hover:-translate-y-1 hover:translate-x-0 hover:shadow-neo-lg";
  
  let colorStyle = "";
  switch (variant) {
    case 'primary':
      colorStyle = "bg-neo-green text-black";
      break;
    case 'secondary':
      colorStyle = "bg-neo-blue text-black";
      break;
    case 'danger':
      colorStyle = "bg-neo-pink text-black";
      break;
    case 'neutral':
      colorStyle = "bg-white text-black hover:bg-gray-50";
      break;
  }

  const widthStyle = fullWidth ? "w-full" : "";

  return (
    <button 
      className={`${baseStyles} ${shadowStyle} ${colorStyle} ${widthStyle} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};

export default NeoButton;