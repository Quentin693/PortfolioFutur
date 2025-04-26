import React, { ButtonHTMLAttributes } from 'react';
import useSounds from '../hooks/useSounds';

interface SoundButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  clickVolume?: number;
  className?: string;
  children: React.ReactNode;
}

const SoundButton: React.FC<SoundButtonProps> = ({ 
  clickVolume = 0.5, 
  className = '',
  onClick,
  children,
  ...props
}) => {
  const {playClick } = useSounds(0, clickVolume);
  
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    playClick();
    if (onClick) onClick(e);
  };
  
  return (
    <button
      className={className}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default SoundButton; 