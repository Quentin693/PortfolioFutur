import React, { ComponentType } from 'react';
import useSounds, { Sounds } from '../hooks/useSounds';

interface WithSoundsProps {
  clickVolume?: number;
  modalVolume?: number;
}

/**
 * Higher-Order Component qui ajoute des sons à n'importe quel composant
 * @param WrappedComponent - Le composant à envelopper
 * @returns Un nouveau composant avec des props sounds pour jouer les sons
 */
export function withSounds<P extends object>(
  WrappedComponent: ComponentType<P & { sounds?: Sounds }>
) {
  return function WithSounds({ 
    clickVolume = 0.5, 
    modalVolume = 0.4,
    ...props
  }: P & WithSoundsProps) {
    const sounds = useSounds(clickVolume, modalVolume);
    
    return <WrappedComponent {...props as P} sounds={sounds} />;
  };
}

export default withSounds; 