"use client";

import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useSoundEffect } from './SoundEffect';

interface BackButtonProps {
  onClick: () => void;
  className?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ onClick, className = '' }) => {
  const hoverSound = useSoundEffect('hover', 0.3);
  const clickSound = useSoundEffect('click', 0.5);
  
  const handleClick = () => {
    clickSound.play();
    onClick();
  };

  return (
    <button 
      onClick={handleClick}
      onMouseEnter={() => hoverSound.play()}
      className={`flex items-center justify-center p-2 rounded-full bg-red-800/80 hover:bg-red-700 transition-colors ${className}`}
      aria-label="Retour"
    >
      <X size={20} className="text-white" />
    </button>
  );
};

export default BackButton;