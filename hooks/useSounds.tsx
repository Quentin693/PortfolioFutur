import { useEffect, useRef } from 'react';
import { createContext, useContext, useState, ReactNode } from 'react';

export interface Sounds {
  playClick: () => void;
  playModal: () => void;
}

interface SoundContextType {
  isMuted: boolean;
  toggleMute: () => void;
}

// Gestionnaire global des sons
class SoundManager {
  private static instance: SoundManager;
  private audioMap: Map<string, HTMLAudioElement> = new Map();
  private _isMuted: boolean = false;
  private listeners: Set<() => void> = new Set();

  private constructor() {}

  public static getInstance(): SoundManager {
    if (!SoundManager.instance) {
      SoundManager.instance = new SoundManager();
    }
    return SoundManager.instance;
  }

  public get isMuted(): boolean {
    return this._isMuted;
  }

  public setMuted(value: boolean): void {
    this._isMuted = value;
    // Mettre à jour tous les sons existants
    this.audioMap.forEach(audio => {
      audio.muted = value;
    });
    // Notifier tous les listeners
    this.listeners.forEach(listener => listener());
  }

  public toggleMute(): void {
    this.setMuted(!this._isMuted);
  }

  public addListener(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  public getAudio(key: string, src: string): HTMLAudioElement | undefined {
    if (!this.audioMap.has(key)) {
      if (typeof window !== 'undefined') {
        const audio = new Audio(src);
        audio.muted = this._isMuted;
        this.audioMap.set(key, audio);
      }
    }
    return this.audioMap.get(key);
  }

  public play(key: string, src: string, volume: number = 0.5): void {
    if (typeof window === 'undefined') return;
    
    const audio = this.getAudio(key, src);
    if (audio) {
      audio.volume = volume;
      audio.currentTime = 0;
      audio.play().catch(e => console.error("Failed to play sound:", e));
    }
  }
}

// Créer un contexte pour gérer l'état du son
const SoundContext = createContext<SoundContextType>({
  isMuted: false,
  toggleMute: () => {},
});

// Provider pour le contexte de son
export const SoundProvider = ({ children }: { children: ReactNode }) => {
  // Récupérer l'instance du gestionnaire de sons
  const soundManagerRef = useRef<SoundManager | undefined>(undefined);
  const [isMuted, setIsMuted] = useState(false);
  
  // Initialiser le gestionnaire de sons côté client
  useEffect(() => {
    if (typeof window !== 'undefined') {
      soundManagerRef.current = SoundManager.getInstance();
      
      // Charger l'état depuis localStorage
      const savedState = localStorage.getItem('sound-muted');
      const initialMuted = savedState === 'true';
      
      // Définir l'état initial
      setIsMuted(initialMuted);
      soundManagerRef.current.setMuted(initialMuted);
      
      // S'abonner aux changements
      const unsubscribe = soundManagerRef.current.addListener(() => {
        setIsMuted(soundManagerRef.current!.isMuted);
      });
      
      return unsubscribe;
    }
    return () => {}; // Retourner une fonction vide pour SSR
  }, []);
  
  // Sauvegarder l'état dans le localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('sound-muted', isMuted.toString());
    }
  }, [isMuted]);
  
  const toggleMute = () => {
    if (soundManagerRef.current) {
      soundManagerRef.current.toggleMute();
    }
  };
  
  return (
    <SoundContext.Provider value={{ isMuted, toggleMute }}>
      {children}
    </SoundContext.Provider>
  );
};

// Hook pour accéder au contexte de son
export const useSoundContext = () => useContext(SoundContext);

// Types de sons disponibles
type SoundType = 'click' | 'modal';

// Map des types de sons vers leurs fichiers
const SOUND_FILES: Record<SoundType, string> = {
  click: '/sounds/UI Click Menu Modern Interface Select Small 01.mp3',
  modal: '/sounds/Menu Modern Interface Hover Sound.mp3'
};

/**
 * Hook pour utiliser facilement les sons dans n'importe quel composant
 * @param hoverVolume - volume du son de survol (0-1)
 * @param hoverButtonVolume - volume du son de survol des boutons (0-1)
 * @param clickVolume - volume du son de clic (0-1)
 * @param modalVolume - volume du son d'ouverture de modale (0-1)
 * @returns Un objet avec des méthodes pour jouer chaque type de son
 */
export const useSounds = (
  hoverVolume: number = 0.3, 
  hoverButtonVolume: number = 0.3,
  clickVolume: number = 0.5, 
  modalVolume: number = 0.4
): Sounds => {
  const soundManagerRef = useRef<SoundManager | undefined>(undefined);
  const { isMuted } = useSoundContext();
  
  // S'assurer que nous avons accès au gestionnaire de sons
  useEffect(() => {
    if (typeof window !== 'undefined') {
      soundManagerRef.current = SoundManager.getInstance();
    }
    return () => {}; // Retourner une fonction vide pour SSR
  }, []);
  
  return {
    playClick: () => {
      if (soundManagerRef.current && !isMuted) {
        soundManagerRef.current.play('click', SOUND_FILES.click, clickVolume);
      }
    },
    playModal: () => {
      if (soundManagerRef.current && !isMuted) {
        soundManagerRef.current.play('modal', SOUND_FILES.modal, modalVolume);
      }
    }
  };
};

export default useSounds; 