import React, { AnchorHTMLAttributes } from 'react';
import useSounds from '../hooks/useSounds';

interface SoundLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  hoverVolume?: number;
  clickVolume?: number;
  className?: string;
  children: React.ReactNode;
}

const SoundLink: React.FC<SoundLinkProps> = ({ 
  hoverVolume = 0.3,
  clickVolume = 0.5, 
  className = '',
  onClick,
  children,
  ...props
}) => {
  const { playHover, playClick } = useSounds(hoverVolume, clickVolume);
  
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    playClick();
    if (onClick) onClick(e);
  };
  
  return (
    <a
      className={className}
      onClick={handleClick}
      onMouseEnter={playHover}
      {...props}
    >
      {children}
    </a>
  );
};

export default SoundLink; 