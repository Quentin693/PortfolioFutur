import { useSoundEffect } from '../components/SoundEffect';

export interface Sounds {
  playHover: () => void;
  playHoverButton: () => void;
  playClick: () => void;
  playModal: () => void;
}

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
  const hoverSound = useSoundEffect('hover', hoverVolume);
  const hoverButtonSound = useSoundEffect('hoverbutton', hoverButtonVolume);
  const clickSound = useSoundEffect('click', clickVolume);
  const modalSound = useSoundEffect('modal', modalVolume);

  return {
    playHover: () => hoverSound.play(),
    playHoverButton: () => hoverButtonSound.play(),
    playClick: () => clickSound.play(),
    playModal: () => modalSound.play()
  };
};

export default useSounds; 