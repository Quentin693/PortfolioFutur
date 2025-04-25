"use client";

import React, { createContext, useContext, ReactNode } from 'react';

// Définition des variables de couleur du thème
export const themeColors = {
  // Couleurs principales
  background: '#000000',
  foreground: '#ffffff',
  primary: '#00a2ff',
  primaryGlow: '#007bff',
  secondary: '#0051ff',
  accent: '#00f2ff',
  accentGlow: '#00c3ff',
  darkBg: '#000000',
  darkSurface: '#111111',
  gridLines: '#0c2a4d',
  
  // Variations de bleu cyber
  cyberBlue100: '#E6F6FF',
  cyberBlue200: '#BAE3FF',
  cyberBlue300: '#7CC4FA',
  cyberBlue400: '#47A3F3',
  cyberBlue500: '#2196F3',
  cyberBlue600: '#0C7CD5',
  cyberBlue700: '#0062B1',
  cyberBlue800: '#004C8C',
  cyberBlue900: '#003A75',
  
  // Néons
  neonBlue: '#00a2ff',
  neonCyan: '#00f2ff',
  neonPurple: '#8B5CF6',
};

// Définition des styles partagés du thème
export const themeStyles = {
  cardBg: 'bg-cyber-surface/80 backdrop-blur-md border border-neon-blue/20 shadow-neon-blue',
  glassPanel: 'bg-black/50 backdrop-blur-md border border-neon-blue/30',
  glowText: 'text-glow text-neon-blue',
  buttonPrimary: 'bg-neon-blue/90 hover:bg-neon-blue text-white font-medium rounded-md px-4 py-2 transition-all shadow-neon-blue',
  buttonSecondary: 'bg-transparent border border-neon-blue text-neon-blue hover:bg-neon-blue/10 font-medium rounded-md px-4 py-2 transition-all',
  gridBg: 'bg-cyber-grid bg-[size:60px_60px]',
  futuristicElement: 'futuristic-element',
};

// Création du contexte de thème
type ThemeContextType = {
  colors: typeof themeColors;
  styles: typeof themeStyles;
};

const ThemeContext = createContext<ThemeContextType>({
  colors: themeColors,
  styles: themeStyles,
});

// Hook personnalisé pour utiliser le thème
export const useTheme = () => useContext(ThemeContext);

// Fournisseur de thème
interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  return (
    <ThemeContext.Provider value={{ colors: themeColors, styles: themeStyles }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider; 