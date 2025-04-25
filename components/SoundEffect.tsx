import { useEffect, useRef } from 'react';

type SoundEffectType = 'click' | 'modal';

interface SoundEffectProps {
  type: SoundEffectType;
  play: boolean;
  volume?: number;
}

export const useSoundEffect = (type: SoundEffectType, volume: number = 0.5) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Map de types de sons à leurs fichiers
    const soundFiles: Record<SoundEffectType, string> = {
      click: '/sounds/UI Click Menu Modern Interface Select Small 01.mp3',
      modal: '/sounds/Menu Modern Interface Hover Sound.mp3'
    };

    // Créer l'élément audio
    if (typeof window !== 'undefined') {
      audioRef.current = new Audio(soundFiles[type]);
      audioRef.current.volume = volume;
    }

    return () => {
      // Nettoyer lors du démontage
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [type, volume]);

  const play = () => {
    if (audioRef.current) {
      // Pour lire le son à nouveau même si déjà en cours
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(e => console.error("Failed to play sound:", e));
    }
  };

  return { play };
};

const SoundEffect: React.FC<SoundEffectProps> = ({ type, play, volume = 0.5 }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Map de types de sons à leurs fichiers
    const soundFiles: Record<SoundEffectType, string> = {
      click: '/sounds/UI Click Menu Modern Interface Select Small 01.mp3',
      modal: '/sounds/Menu Modern Interface Window Close Sound.mp3'
    };

    // Créer l'élément audio
    audioRef.current = new Audio(soundFiles[type]);
    audioRef.current.volume = volume;

    // Lire le son quand la prop play change à true
    if (play) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(e => console.error("Failed to play sound:", e));
    }

    return () => {
      // Nettoyer lors du démontage
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [type, play, volume]);

  return null; // Ce composant ne rend rien visuellement
};

export default SoundEffect; 