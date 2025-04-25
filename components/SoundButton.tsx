import React, { ButtonHTMLAttributes } from 'react';
import useSounds from '../hooks/useSounds';

interface SoundButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  hoverVolume?: number;
  clickVolume?: number;
  className?: string;
  children: React.ReactNode;
}

const SoundButton: React.FC<SoundButtonProps> = ({ 
  hoverVolume = 0.3,
  clickVolume = 0.5, 
  className = '',
  onClick,
  children,
  ...props
}) => {
  const { playHoverButton, playClick } = useSounds(0, hoverVolume, clickVolume);
  
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    playClick();
    if (onClick) onClick(e);
  };
  
  return (
    <button
      className={className}
      onClick={handleClick}
      onMouseEnter={playHoverButton}
      {...props}
    >
      {children}
    </button>
  );
};

export default SoundButton; 