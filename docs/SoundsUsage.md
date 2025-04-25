# Utilisation des effets sonores dans l'application

Cette documentation explique comment ajouter des effets sonores aux interactions dans l'application.

## Sons disponibles

Les sons suivants sont disponibles dans `/public/sounds/`:

- **Hover**: `UI Alert Menu Deny Small.mp3` - Son joué lors du survol des éléments non-boutons
- **HoverButton**: `Error Bleep 1.mp3` - Son joué lors du survol des boutons
- **Click**: `UI Click Menu Modern Interface Select Small 01.mp3` - Son joué lors d'un clic
- **Modal**: `Menu Modern Interface Window Close Sound.mp3` - Son joué lors de l'ouverture d'une modale

## Composants prêts à l'emploi

### SoundButton

```tsx
import SoundButton from '../components/SoundButton';

// Utilisation simple
<SoundButton onClick={handleClick}>
  Cliquez-moi
</SoundButton>

// Avec volumes personnalisés
<SoundButton 
  onClick={handleClick} 
  hoverVolume={0.2} // Volume du son hoverbutton
  clickVolume={0.4}
  className="btn btn-primary"
>
  Cliquez-moi
</SoundButton>
```

### SoundLink

```tsx
import SoundLink from '../components/SoundLink';

// Utilisation simple
<SoundLink href="/page">
  Visitez cette page
</SoundLink>

// Avec volumes personnalisés
<SoundLink 
  href="/page" 
  hoverVolume={0.2} 
  clickVolume={0.4}
  className="link link-primary"
>
  Visitez cette page
</SoundLink>
```

## Hook useSounds

Pour ajouter des sons à n'importe quel composant:

```tsx
import { useSounds } from '../hooks/useSounds';

function MonComposant() {
  const { playHover, playHoverButton, playClick, playModal } = useSounds();
  
  return (
    <div>
      {/* Pour les éléments non-boutons (texte, images, etc.) */}
      <div onMouseEnter={() => playHover()}>
        Survolez-moi
      </div>
      
      {/* Pour les boutons */}
      <button 
        onClick={() => {
          playClick();
          // Votre logique de clic
        }}
        onMouseEnter={() => playHoverButton()}
      >
        Cliquez-moi
      </button>
      
      <button 
        onClick={() => {
          playModal();
          // Ouvrir votre modale
        }}
      >
        Ouvrir Modale
      </button>
    </div>
  );
}
```

## HOC withSounds

Pour les composants plus complexes, vous pouvez utiliser le HOC `withSounds`:

```tsx
import React from 'react';
import { withSounds } from '../components/withSounds';
import { Sounds } from '../hooks/useSounds';

interface MyComponentProps {
  title: string;
  sounds?: Sounds;
}

const MyComponent: React.FC<MyComponentProps> = ({ title, sounds }) => {
  return (
    <div>
      <h1 onMouseEnter={() => sounds?.playHover()}>{title}</h1>
      <button 
        onClick={() => sounds?.playClick()}
        onMouseEnter={() => sounds?.playHoverButton()}
      >
        Cliquer
      </button>
      <button onClick={() => sounds?.playModal()}>Ouvrir modal</button>
    </div>
  );
};

// Composant avec sons
export default withSounds(MyComponent);

// Utilisation
<MyComponentWithSounds 
  title="Mon titre" 
  hoverVolume={0.3} 
  hoverButtonVolume={0.3}
  clickVolume={0.5} 
  modalVolume={0.4} 
/>
```

## Personnalisation des sons

Si vous souhaitez modifier les sons utilisés, vous pouvez éditer le fichier `SoundEffect.tsx` en changeant les chemins dans l'objet `soundFiles`. 