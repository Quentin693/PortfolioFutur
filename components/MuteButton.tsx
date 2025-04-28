import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useSoundContext } from '../hooks/useSounds';
import { motion } from 'framer-motion';

interface MuteButtonProps {
  className?: string;
}

const MuteButton: React.FC<MuteButtonProps> = ({ className = '' }) => {
  const { isMuted, toggleMute } = useSoundContext();
  const [isMounted, setIsMounted] = useState(false);

  // S'assurer que le composant est monté côté client avant de l'afficher
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Ne rien rendre côté serveur pour éviter les problèmes d'hydratation
  if (!isMounted) {
    return null;
  }

  return (
    <motion.button
      onClick={toggleMute}
      className={`p-2 relative rounded-full backdrop-blur-sm flex items-center justify-center group ${className}`}
      style={{ 
        backgroundColor: 'rgba(0, 60, 255, 0.3)',
        border: '2px solid rgba(76, 190, 255, 0.6)',
        boxShadow: '0 4px 16px rgba(62, 120, 255, 0.4)',
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Effet de brillance au survol */}
      <div className="absolute inset-0 bg-blue-400/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
      
      {/* Cercle pulsant autour du bouton lorsque le son est actif */}
      {!isMuted && (
        <motion.div 
          className="absolute inset-0 rounded-full"
          style={{ border: '2px solid rgba(56, 182, 255, 0.6)' }}
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.7, 0.2, 0.7]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
      
      {/* Icône */}
      <div className="text-white relative z-10">
        {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
      </div>
      
      {/* Tooltip */}
      <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-gray-900/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap">
        {isMuted ? 'Activer le son' : 'Désactiver le son'}
      </div>
    </motion.button>
  );
};

export default MuteButton; 