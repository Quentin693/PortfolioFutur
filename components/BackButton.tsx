"use client";

import React from 'react';
import { X } from 'lucide-react';
import { useSounds } from '../hooks/useSounds';

interface BackButtonProps {
  onClick: () => void;
  className?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ onClick, className = '' }) => {
  const { playClick } = useSounds();
  
  const handleClick = () => {
    playClick();
    onClick();
  };

  return (
    <button 
      onClick={handleClick}
      className={`flex items-center justify-center p-2 rounded-full bg-red-800/80 hover:bg-red-700 transition-colors ${className}`}
      aria-label="Retour"
    >
      <X size={20} className="text-white" />
    </button>
  );
};

export default BackButton;