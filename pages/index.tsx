"use client";

import React, { useState, useEffect, useRef } from 'react';
import { User, Phone, FolderOpen, Code, Home } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Contact from '../components/Contact';
import About from '../components/About';
import SkillsComponent from '../components/Skills';
import Projects from '../components/Projects';
import InteractiveBackground from '../components/Background';
import { useSounds } from '../hooks/useSounds';
import MuteButton from '../components/MuteButton';

const EnhancedPortfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showOptions, setShowOptions] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Sons
  const { playClick } = useSounds();
  
  // Références pour chaque section
  const homeRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  
  const [texts] = useState([
    "Bonjour, je suis Quentin Cialone",
    "Je suis né le 22 Juin 2003",
    "Développeur Web Fullstack",
    "Passionné de nouvelles technologies",
    "Je cherche une alternance pour Septembre 2025 sur Lyon",
  ]);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Détection du mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Vérifier à l'initialisation
    checkIfMobile();
    
    // Ajouter un écouteur pour vérifier lors du redimensionnement
    window.addEventListener('resize', checkIfMobile);
    
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);
  
  // Suivi de la position de la souris
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left - rect.width / 2,
          y: e.clientY - rect.top - rect.height / 2
        });
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  // Animation d'écriture
  useEffect(() => {
    const currentFullText = texts[currentTextIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    const switchTextDelay = 2000;
    
    if (!isDeleting && typedText === currentFullText) {
      const timeout = setTimeout(() => {
        setIsDeleting(true);
      }, switchTextDelay);
      return () => clearTimeout(timeout);
    } 
    else if (isDeleting && typedText === '') {
      setIsDeleting(false);
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
      return;
    }
    
    const timeout = setTimeout(() => {
      if (isDeleting) {
        setTypedText(prevText => prevText.substring(0, prevText.length - 1));
      } else {
        setTypedText(prevText => currentFullText.substring(0, prevText.length + 1));
      }
    }, typingSpeed);
    
    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, currentTextIndex, texts]);
  
  // Effet de clignotement du curseur
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    
    return () => clearInterval(interval);
  }, []);
  
  // Options pour les blocs de navigation
  const sections = [
    { 
      id: 'about', 
      icon: <User size={isMobile ? 24 : 36} />, 
      label: 'Mon parcours', 
      color: '#002eff',
      ref: aboutRef
    },
    { 
      id: 'skills', 
      icon: <Code size={isMobile ? 24 : 36} />, 
      label: 'Compétences', 
      color: '#33fff9',
      ref: skillsRef
    },
    { 
      id: 'projects', 
      icon: <FolderOpen size={isMobile ? 24 : 36} />, 
      label: 'Projets', 
      color: '#2326e3',
      ref: projectsRef
    },
    { 
      id: 'contact', 
      icon: <Phone size={isMobile ? 24 : 36} />, 
      label: 'Contact', 
      color: '#00f0ff',
      ref: contactRef
    }
  ];
  
  // Options pour la barre de navigation rapide
  const navOptions = [
    { id: 'home', icon: <Home size={24} />, label: 'Accueil', color: '#6366F1', ref: homeRef },
    ...sections
  ];
  
  // Observer pour détecter la section visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Trouver l'id de la section qui est visible
            const id = entry.target.id;
            if (id) {
              setActiveSection(id);
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: '-10% 0px' } // Seuil encore plus bas pour une meilleure détection
    );
    
    // Observer toutes les sections
    const sectionElements = document.querySelectorAll('section[id]');
    sectionElements.forEach((section) => {
      observer.observe(section);
    });
    
    return () => {
      sectionElements.forEach((section) => observer.unobserve(section));
    };
  }, []);
  
  // Force l'activation de la section visible au chargement
  useEffect(() => {
    // Déterminer quelle section est visible au chargement
    const checkVisibleSection = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      for (const id of sections) {
        const section = document.getElementById(id);
        if (section) {
          const rect = section.getBoundingClientRect();
          const isVisible = (
            rect.top <= window.innerHeight / 2 &&
            rect.bottom >= window.innerHeight / 2
          );
          if (isVisible) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    
    checkVisibleSection();
    window.addEventListener('scroll', checkVisibleSection);
    
    return () => {
      window.removeEventListener('scroll', checkVisibleSection);
    };
  }, []);
  
  // Fonction pour faire défiler vers une section
  const scrollToSection = (sectionId: string) => {
    playClick();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <div 
      ref={containerRef}
      className="min-h-screen relative overflow-x-hidden text-white"
    >
      {/* Fond interactif animé */}
      <InteractiveBackground />
      
      {/* Effet de reflet */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-blue-500/5 to-purple-500/5 mix-blend-overlay" />
      
      {/* Bouton Mute en haut à gauche */}
      <div className="fixed top-5 left-5 z-50">
        <MuteButton />
      </div>
      
      {/* Navigation fixe */}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 sm:gap-3">
        {navOptions.map((option) => (
          <motion.div
            key={option.id}
            className={`p-2 sm:p-3 rounded-full shadow-lg cursor-pointer backdrop-blur-sm flex items-center justify-center group relative ${activeSection === option.id ? 'ring-2 ring-white' : ''}`}
            style={{ 
              backgroundColor: `${option.color}90`,
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => scrollToSection(option.id)}
          >
            <div className="text-white">
              {option.icon}
            </div>
            
            {/* Label du menu qui apparaît au survol */}
            <div className="hidden md:block absolute right-full mr-2 px-3 py-1 rounded bg-gray-900/80 text-white text-sm opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap">
              {option.label}
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Section d'accueil */}
      <section id="home" ref={homeRef} className="min-h-screen w-full flex flex-col relative pb-8">
        {/* Header */}
        <header className="relative z-10 w-full pt-12 pb-4 md:py-6 flex flex-col items-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-xl sm:text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-600"
          >
            Mon Portfolio
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="title-futuristic text-2xl xs:text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-neon-blue via-neon-cyan to-neon-blue animate-glow px-4 mt-2 md:mt-4 mx-auto max-w-[95%] md:max-w-full"
          >
            <span>{typedText}</span>
            <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity`}>|</span>
          </motion.div>
        </header>
        
        {/* Contenu Principal avec Photo et Blocs */}
        <div className="flex-grow relative w-full h-auto md:h-[70vh] flex flex-col md:flex-row items-center justify-center py-8">
          {/* Cercle lumineux derrière la photo */}
          <div 
            className="absolute rounded-full bg-blue-400/20 blur-2xl hidden md:block"
            style={{ 
              width: '340px', 
              height: '340px',
              transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
              transition: 'transform 0.3s ease-out',
              left: 'calc(50% - 170px)',
              top: 'calc(50% - 170px)',
            }}
          />
          
          {/* Photo de profil au centre */}
          <motion.div 
            className="relative md:absolute overflow-hidden z-30 shadow-2xl border-4 border-white/30 cursor-pointer mb-6 md:mb-0 group rounded-3xl"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8, type: 'spring' }}
            style={{ 
              width: isMobile ? '160px' : '280px',
              height: isMobile ? '220px' : '380px',
              ...(isMobile ? {} : {
                left: 'calc(50% - 140px)',
                top: 'calc(50% - 190px)',
                transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`
              })
            }}
            onClick={() => {
              playClick();
              setShowOptions(!showOptions);
            }}
            whileHover={{ scale: 1.05 }}
          >
            {/* Cadre lumineux */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-75 blur-sm z-0"></div>
            
            {/* Particules autour de la photo */}
            {!isMobile && [...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-white opacity-70 z-20"
                style={{ 
                  boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
                }}
                animate={{
                  x: [0, Math.sin(i * 45 * Math.PI / 180) * 220],
                  y: [0, Math.cos(i * 45 * Math.PI / 180) * 220],
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0]
                }}
                transition={{
                  duration: 5 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}

            <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center relative overflow-hidden z-10">
              {/* Image avec effet de zoom au survol */}
              <div className="w-full h-full overflow-hidden absolute inset-0">
                <Image 
                  src="/Quentin.png" 
                  alt="Photo de profil" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  style={{ objectPosition: "center top" }}
                  width={isMobile ? 180 : 280}
                  height={isMobile ? 240 : 380}
                />
              </div>
              
              {/* Vignette sur l'image */}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 via-transparent to-purple-900/30 opacity-60"></div>
              
              
              {/* Effet de brillance au survol */}
              <div className="absolute -inset-full h-full w-1/2 z-10 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
            </div>
          </motion.div>
          
          {/* Cercle lumineux externe - caché sur mobile */}
          <div 
            className="absolute rounded-full border-2 border-blue-300/20 animate-pulse-slow hidden md:block"
            style={{ 
              width: '440px', 
              height: '440px',
              left: 'calc(50% - 220px)',
              top: 'calc(50% - 220px)',
              transform: `translate(${mousePosition.x * 0.03}px, ${mousePosition.y * 0.03}px)`,
            }}
          />
          
          {/* Container pour les blocs en mode mobile (colonne) */}
          {isMobile && showOptions && (
            <div className="flex flex-col w-full px-4 space-y-4 mt-4">
              {sections.map((section, index) => (
                <motion.div
                  key={section.id}
                  className="w-full cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection(section.id)}
                >
                  <div
                    className="w-full py-4 rounded-xl flex items-center justify-start px-6 shadow-lg transform transition-transform backdrop-blur-sm relative overflow-hidden group"
                    style={{ 
                      backgroundColor: `${section.color}20`,
                      boxShadow: `0 4px 16px ${section.color}40`,
                      border: `2px solid ${section.color}60`
                    }}
                  >
                    {/* Effet de survol */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className="text-white mr-4 relative z-10">
                      {section.icon}
                    </div>
                    <span className="text-white text-lg font-bold relative z-10">{section.label}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
          
          {/* Blocs avec positions absolues sur desktop */}
          {!isMobile && sections.map((section, index) => {
            // Positions pour le desktop
            const desktopPositions = [
              { top: '15%', left: '10%', transform: 'translate(-50%, -50%)' }, // top left
              { top: '65%', left: '10%', transform: 'translate(-50%, -50%)' }, // bottom left
              { top: '15%', right: '10%', transform: 'translate(50%, -50%)' }, // top right
              { top: '65%', right: '10%', transform: 'translate(50%, -50%)' }, // bottom right
            ];
            
            const style = {
              position: 'absolute' as const,
              ...desktopPositions[index],
              width: '300px',
              height: '175px',
              zIndex: 20
            };
            
            return (
              <motion.div
                key={section.id}
                className="absolute cursor-pointer"
                style={style}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ 
                  opacity: showOptions ? 1 : 0,
                  scale: showOptions ? 1 : 0.5
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  type: "spring",
                  stiffness: 80,
                  damping: 12
                }}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                onClick={() => scrollToSection(section.id)}
              >
                <div
                  className="w-full h-full rounded-xl flex flex-col items-center justify-center shadow-lg transform transition-transform backdrop-blur-sm relative overflow-hidden group"
                  style={{ 
                    backgroundColor: `${section.color}20`,
                    boxShadow: `0 8px 32px ${section.color}40`,
                    border: `2px solid ${section.color}60`
                  }}
                >
                  {/* Effet de survol */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="text-white mb-4 relative z-10">
                    {section.icon}
                  </div>
                  <span className="text-white text-lg font-bold relative z-10">{section.label}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
      
      {/* Séparateur stylé entre Home et About */}
      <div className="relative h-16 md:h-24 section-separator">
        <div className="absolute w-full h-full overflow-hidden">
          <div className="container mx-auto h-full relative">
            <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#002eff] to-transparent top-1/2 transform -translate-y-1/2"></div>
            {[...Array(8)].map((_, i) => (
              <div 
                key={i} 
                className="absolute top-1/2 transform -translate-y-1/2 w-2 h-2 md:w-4 md:h-4 rounded-full border-2 border-{#002eff}"
                style={{
                  left: `${(i * 12) + 5}%`,
                  animationDelay: `${i * 0.1}s`,
                  animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite'
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Section Mon parcours */}
      <section id="about" ref={aboutRef} className="min-h-screen w-full py-8 md:py-16 px-4 relative section-spacing">
        <div className="absolute inset-0 bg-gradient-radial from-blue-600/5 to-transparent"></div>
        <div className="container mx-auto">
          <About />
        </div>
      </section>
      
      {/* Séparateur stylé entre About et Skills */}
      <div className="relative h-16 md:h-24 section-separator">
        <div className="absolute w-full h-full overflow-hidden">
          <div className="container mx-auto h-full relative">
            <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#33fff9] to-transparent top-1/2 transform -translate-y-1/2"></div>
            {[...Array(8)].map((_, i) => (
              <div 
                key={i} 
                className="absolute top-1/2 transform -translate-y-1/2 w-2 h-2 md:w-4 md:h-4 rounded-full border-2 border-[#33fff9]"
                style={{
                  left: `${(i * 12) + 5}%`,
                  animationDelay: `${i * 0.1}s`,
                  animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite'
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Section Compétences */}
      <section id="skills" ref={skillsRef} className="min-h-screen w-full py-16 px-4 relative">
        <div className="absolute inset-0 bg-gradient-radial from-green-600/5 to-transparent"></div>
        <div className="container mx-auto">
          <SkillsComponent />
        </div>
      </section>
      
      {/* Séparateur stylé entre Skills et Projects */}
      <div className="relative h-16 md:h-24 section-separator">
        <div className="absolute w-full h-full overflow-hidden">
          <div className="container mx-auto h-full relative">
            <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#2326e3] to-transparent top-1/2 transform -translate-y-1/2"></div>
            {[...Array(8)].map((_, i) => (
              <div 
                key={i} 
                className="absolute top-1/2 transform -translate-y-1/2 w-2 h-2 md:w-4 md:h-4 rounded-full border-2 border-[#2326e3]"
                style={{
                  left: `${(i * 12) + 5}%`,
                  animationDelay: `${i * 0.1}s`,
                  animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite'
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Section Projets */}
      <section id="projects" ref={projectsRef} className="min-h-screen w-full py-16 px-4 relative">
        <div className="absolute inset-0 bg-gradient-radial from-yellow-600/5 to-transparent"></div>
        <div className="container mx-auto">
          <Projects />
        </div>
      </section>
      
      {/* Séparateur stylé entre Projects et Contact */}
      <div className="relative h-16 md:h-24 section-separator">
        <div className="absolute w-full h-full overflow-hidden">
          <div className="container mx-auto h-full relative">
            <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00f0ff] to-transparent top-1/2 transform -translate-y-1/2"></div>
            {[...Array(8)].map((_, i) => (
              <div 
                key={i} 
                className="absolute top-1/2 transform -translate-y-1/2 w-2 h-2 md:w-4 md:h-4 rounded-full border-2 border-[#00f0ff]"
                style={{
                  left: `${(i * 12) + 5}%`,
                  animationDelay: `${i * 0.1}s`,
                  animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite'
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Section Contact */}
      <section id="contact" ref={contactRef} className="min-h-screen w-full py-16 px-4 relative">
        <div className="absolute inset-0 bg-gradient-radial from-pink-600/5 to-transparent"></div>
        <div className="container mx-auto">
          <Contact />
        </div>
      </section>
      
      {/* Footer */}
      <footer className="relative z-10 py-4 text-center text-sm text-gray-400 backdrop-blur-sm bg-gray-900/50">
        <p>Made with fun & 💙 by Quentin Cialone</p>
      </footer>
      
      {/* CSS personnalisé */}
      <style jsx>{`
        @keyframes pulse-slow {
          0% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
          100% { opacity: 0.4; transform: scale(1); }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 3s infinite ease-in-out;
        }
        
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        
        .animate-reverse-spin-slow {
          animation: spin 12s linear infinite reverse;
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes bounce {
          0% { transform: translateY(0); }
          100% { transform: translateY(-5px); }
        }
        
        @keyframes heightChange {
          0% { height: 20%; }
          50% { height: 70%; }
          100% { height: 20%; }
        }
        
        .bg-gradient-radial {
          background-image: radial-gradient(var(--tw-gradient-stops));
        }
        
        @keyframes ping {
          75%, 100% {
            transform: translate(-50%, -50%) scale(1.5);
            opacity: 0;
          }
        }
        
        @keyframes shine {
          0% {
            left: -100%;
            transition-property: left;
          }
          100% {
            left: 100%;
            transition-property: left;
          }
        }
        
        .animate-shine {
          animation: shine 1.5s ease-in-out;
        }

        /* Media Queries pour mobile */
        @media (max-width: 768px) {
          .section-spacing {
            padding-top: 2rem;
            padding-bottom: 2rem;
          }
          
          .section-separator {
            height: 16px; /* Réduire l'espacement entre sections mais pas trop */
          }
        }
      `}</style>
    </div>
  );
};

export default EnhancedPortfolio;