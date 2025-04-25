import { useState, useEffect } from 'react';
import { useTheme } from './ThemeProvider';
import { useSoundEffect } from './SoundEffect';

// Component permettant de faire une transition entre les pages
const PageTransition = ({ children, isVisible }: { children: React.ReactNode, isVisible: boolean }) => {
  return (
    <div 
      className={`transition-all duration-800 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {children}
    </div>
  );
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { styles } = useTheme();
  const [pageVisible, setPageVisible] = useState(false);
  
  // Sons avec notre nouveau système
  const modalSound = useSoundEffect('modal', 0.4);
  
  // Animation d'entrée
  useEffect(() => {
    setPageVisible(true);
    
    // Jouer le son de navigation lors du chargement initial
    modalSound.play();
  }, [modalSound]);

  return (
    <div className="min-h-screen">
      <div className="bg-cyberpunk dark:bg-cyberpunk-dark min-h-screen text-gray-100">
        <main className="pt-24 pb-16">
          <PageTransition isVisible={pageVisible}>
            <div className="teleport-animation">
              {children}
            </div>
          </PageTransition>
        </main>
      </div>
    </div>
  );
};

export default Layout; 