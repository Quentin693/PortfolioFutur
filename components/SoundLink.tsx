import React, { AnchorHTMLAttributes } from 'react';
import useSounds from '../hooks/useSounds';

interface SoundLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  clickVolume?: number;
  className?: string;
  children: React.ReactNode;
}

const SoundLink: React.FC<SoundLinkProps> = ({ 
  clickVolume = 0.5, 
  className = '',
  onClick,
  children,
  ...props
}) => {
  const { playClick } = useSounds(clickVolume);
  
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    playClick();
    if (onClick) onClick(e);
  };
  
  return (
    <a
      className={className}
      onClick={handleClick}
      {...props}
    >
      {children}
    </a>
  );
};

export default SoundLink; 