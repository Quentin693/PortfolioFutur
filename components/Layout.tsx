"use client";

import React, { useEffect, useState } from 'react';
import { useSounds } from '../hooks/useSounds';

// Component permettant de faire une transition entre les pages
const PageTransition = ({ children, isVisible }: { children: React.ReactNode, isVisible: boolean }) => {
  return (
    <div className={`transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {children}
    </div>
  );
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  // Jouer un son lors du chargement de la page
  const { playModal } = useSounds(0.3, 0.3, 0.5, 0.3);
  
  useEffect(() => {
    // Déclencher l'animation après le chargement
    setIsVisible(true);
    playModal();
  }, [playModal]);
  
  return (
    <PageTransition isVisible={isVisible}>
      {children}
    </PageTransition>
  );
};

export default Layout; 