"use client";

import React, { useState, useCallback, useEffect } from 'react';
import { Github, ExternalLink, X, Code, LayoutDashboard, Layers, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import Image from 'next/image';
import { useTheme } from './ThemeProvider';
import { useSoundEffect } from './SoundEffect';

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  imageUrl?: string;
  gradientFrom: string;
  gradientTo: string;
  githubUrl?: string;
  demoUrl?: string;
  longDescription?: string;
  features?: string[];
  technologies?: string[];
  screenshots?: {
    url: string;
    caption: string;
  }[];
}

interface LightboxProps {
  screenshots: {
    url: string;
    caption: string;
  }[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

// Composant Lightbox pour les captures d'écran en plein écran
const Lightbox: React.FC<LightboxProps> = ({ screenshots, currentIndex, onClose, onNext, onPrev }) => {
  const { styles } = useTheme();
  const screenshot = screenshots[currentIndex];
  const clickSound = useSoundEffect('click', 0.5);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-md" onClick={onClose}>
      <div className="relative w-full h-full flex items-center justify-center p-4" onClick={(e) => e.stopPropagation()}>
        {/* Image courante */}
        <div className="relative max-w-5xl max-h-[85vh] w-full flex flex-col items-center">
          <div className={`${styles.futuristicElement} p-1 border border-neon-blue/30 shadow-neon-blue rounded-lg bg-black/30 overflow-hidden`}>
            <Image 
              src={screenshot.url} 
              alt={screenshot.caption} 
              width={800}
              height={500}
              className="max-h-[75vh] max-w-full object-contain rounded"
            />
          </div>
          <p className="text-center mt-4 text-neon-blue font-display">{screenshot.caption}</p>
        </div>
        
        {/* Bouton fermer */}
        <button 
          className="absolute top-4 right-4 bg-black/50 hover:bg-neon-blue/20 text-white p-3 rounded-full transition-colors z-[70] border border-neon-blue/30"
          onClick={() => {
            clickSound.play();
            onClose();
          }}
        >
          <X size={24} />
        </button>
        
        {/* Navigation */}
        {screenshots.length > 1 && (
          <>
            <button 
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-neon-blue/20 text-white p-3 rounded-full transition-colors border border-neon-blue/30"
              onClick={(e) => {
                e.stopPropagation();
                clickSound.play();
                onPrev();
              }}
            >
              <ChevronLeft size={28} />
            </button>
            
            <button 
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-neon-blue/20 text-white p-3 rounded-full transition-colors border border-neon-blue/30"
              onClick={(e) => {
                e.stopPropagation();
                clickSound.play();
                onNext();
              }}
            >
              <ChevronRight size={28} />
            </button>
            
            {/* Indicateur de position */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
              {screenshots.map((_, index) => (
                <div 
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentIndex ? 'bg-neon-blue shadow-neon-blue' : 'bg-white/40'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const ProjectSlider: React.FC<{
  project: Project;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
  openLightbox: (index: number, e: React.MouseEvent) => void;
}> = ({ project, onClose, onNext, onPrev, isFirst, isLast, openLightbox }) => {
  const { styles } = useTheme();
  const clickSound = useSoundEffect('click', 0.5);
  
  return (
    <div className={`${styles.glassPanel} w-[1000px] h-[700px] overflow-hidden rounded-lg border border-neon-blue/40 shadow-neon-blue transition-all duration-500 ${styles.futuristicElement} flex flex-col holographic`}>
      {/* En-tête avec titre et boutons de navigation */}
      <div className="flex justify-between items-center border-b border-neon-blue/20 p-5">
        <h3 className="text-2xl font-display font-semibold text-neon-blue glitch-text" data-text={project.title}>
          {project.title}
        </h3>
        <div className="flex items-center space-x-3">
          <button 
            className={`p-2.5 rounded-full border border-neon-blue/20 transition-colors ${isFirst ? 'text-gray-500 cursor-not-allowed' : 'text-neon-blue hover:bg-neon-blue/10 scanner-effect'}`}
            onClick={() => {
              if (!isFirst) {
                clickSound.play();
                onPrev();
              }
            }}
            disabled={isFirst}
          >
            <ChevronLeft size={18} />
          </button>
          <button 
            className={`p-2.5 rounded-full border border-neon-blue/20 transition-colors ${isLast ? 'text-gray-500 cursor-not-allowed' : 'text-neon-blue hover:bg-neon-blue/10 scanner-effect'}`}
            onClick={() => {
              if (!isLast) {
                clickSound.play();
                onNext();
              }
            }}
            disabled={isLast}
          >
            <ChevronRight size={18} />
          </button>
          <button 
            className="p-2.5 rounded-full border border-neon-blue/20 text-neon-blue hover:bg-neon-blue/10 transition-colors ml-2 scanner-effect"
            onClick={() => {
              clickSound.play();
              onClose();
            }}
          >
            <X size={18} />
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {/* Image principale avec hauteur fixe */}
        <div className="relative h-60 w-full bg-black hologram-projection">
          {project.imageUrl ? (
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              sizes="1000px"
              className="object-cover w-full"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-r from-neon-blue/20 to-neon-cyan/20 flex items-center justify-center">
              <span className="text-neon-blue opacity-50 font-display">Aucune image</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
        </div>
        
        {/* Tags et badges de technologie */}
        <div className="px-8 py-4 -mt-8 relative z-10 flex flex-wrap gap-3">
          {project.tags.map((tag) => (
            <span 
              key={tag} 
              className="text-sm py-1.5 px-3 rounded-md bg-neon-blue/10 text-neon-blue border border-neon-blue/30 font-display float-effect"
            >
              {tag}
            </span>
          ))}
        </div>
        
        {/* Description longue avec hauteur fixe */}
        <div className="px-8 py-3">
          <div className="bg-black/50 p-5 rounded-lg border border-neon-blue/10 backdrop-blur-sm mb-6 h-[90px] overflow-y-auto distortion-overlay">
            <p className="text-gray-200 text-base">
              {project.longDescription || project.description}
            </p>
          </div>
        </div>
        
        {/* Fonctionnalités et Technologies côte à côte */}
        <div className="grid grid-cols-2 gap-6 px-8">
          {/* Fonctionnalités */}
          <div className="bg-black/30 p-5 rounded-lg border border-neon-blue/20 h-[220px] overflow-y-auto distortion-overlay">
            <h4 className="text-neon-blue font-display text-sm uppercase tracking-wider mb-4 flex items-center">
              <Layers size={16} className="mr-2" />
              Fonctionnalités
            </h4>
            {project.features && project.features.length > 0 ? (
              <ul className="space-y-2">
                {project.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start text-base">
                    <span className="text-neon-blue mr-2">•</span>
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400 italic text-base">Aucune fonctionnalité spécifiée</p>
            )}
          </div>
          
          {/* Technologies */}
          <div className="bg-black/30 p-5 rounded-lg border border-neon-blue/20 h-[220px] overflow-y-auto distortion-overlay">
            <h4 className="text-neon-blue font-display text-sm uppercase tracking-wider mb-4 flex items-center">
              <Code size={16} className="mr-2" />
              Technologies
            </h4>
            {project.technologies && project.technologies.length > 0 ? (
              <ul className="space-y-2">
                {project.technologies.map((tech, idx) => (
                  <li key={idx} className="flex items-start text-base">
                    <span className="text-neon-blue mr-2">•</span>
                    <span className="text-gray-300">{tech}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400 italic text-base">Aucune technologie spécifiée</p>
            )}
          </div>
        </div>
        
        {/* Galerie de captures d'écran */}
        <div className="px-8 py-6">
          {project.screenshots && project.screenshots.length > 0 ? (
            <div>
              <h4 className="text-neon-blue font-display text-sm uppercase tracking-wider mb-4 flex items-center">
                <LayoutDashboard size={16} className="mr-2" />
                Captures d&apos;écran
              </h4>
              <div className="grid grid-cols-4 gap-4">
                {project.screenshots.map((screenshot, idx) => (
                  <div 
                    key={idx} 
                    className="relative group cursor-pointer border border-neon-blue/20 hover:border-neon-blue/50 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-neon-blue hologram-projection float-effect"
                    onClick={(e) => {
                      clickSound.play();
                      openLightbox(idx, e);
                    }}
                  >
                    <div className="aspect-video relative bg-black/50">
                      <Image 
                        src={screenshot.url}
                        alt={screenshot.caption}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                      />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 scanner-effect">
                      <Eye size={20} className="text-white" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-black/20 rounded-lg border border-neon-blue/10 p-4 flex items-center justify-center h-[100px]">
              <p className="text-gray-400 italic text-base">Aucune capture d'écran disponible</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Barre de progression et pagination */}
      <div className="px-8 py-4 border-t border-neon-blue/20 flex items-center space-x-3 mt-auto">
        <div className="flex-1 bg-black/50 h-1.5 rounded-full overflow-hidden scanner-effect">
          <div 
            className="h-full bg-gradient-to-r from-neon-blue to-neon-cyan rounded-full"
            style={{ width: `${(project.id / (projects.length)) * 100}%` }}
          ></div>
        </div>
        <div className="text-sm text-neon-blue font-display">
          {project.id}/{projects.length}
        </div>
      </div>
    </div>
  );
};

// Données des projets - définies au niveau du module pour être accessibles dans ProjectSlider
const projects: Project[] = [
  {
    id: 1,
    title: "Site Internet Tiki Au bord de l'eau",
    description: "Un site internet pour un restaurant de cuisine traditionnelle française.",
    tags: ["React", "Nest.js", "PostgreSQL"],
    gradientFrom: "from-blue-500",
    gradientTo: "to-purple-600",
    githubUrl: "",
    imageUrl: "/Tiki.png",
    longDescription: "Un site internet pour un restaurant de cuisine traditionnelle française, avec une interface de connexion, une gestion de réservation en ligne, et une interface d&apos;administration.",
    features: [
      "Authentification des utilisateurs avec JWT",
      "Gestion de réservation en ligne",
      "Interface de connexion",
      "Interface d'administration complète"
    ],
    technologies: [
      "Frontend: Next.js, Tailwind CSS",
      "Backend: Nest.js, Express",
      "Base de données: PostgreSQL",
      "Authentification: JWT, bcrypt",
    ],
    screenshots: [
      {
        url: "/Tiki.png",
        caption: "Page d'accueil"
      },
      {
        url: "/Tiki1.png",
        caption: "Réservation en ligne"
      },
      {
        url: "/Tiki2.png",
        caption: "Interface de connexion"
      }
    ]
  },
  {
    id: 2,
    title: "Area",
    description: "Site internet permettant l'automatisation de tâches un peu à la n8n",
    tags: ["Nuxt.js", "Nest.js", "PostgreSQL"],
    gradientFrom: "from-green-500",
    gradientTo: "to-blue-600",
    imageUrl: "/projetArea.png",
    longDescription: "Site internet permettant l'automatisation de tâches un peu à la n8n",
    features: [
      "Graphiques interactifs et personnalisables",
      "Interface de connexion",
      "Gestion des workflows",
      "Alertes et notifications"
    ],
    technologies: [
      "Frontend: Vue.js, Nuxt.js",
      "Visualisation: Chart.js",
      "Backend: Nest.js, Go, Architecture microservices",
      "Authentification: JWT",
      "Base de données: PostgreSQL"
    ],
    screenshots: [
      {
        url: "/projetArea.png",
        caption: "Dashboard principal"
      },
      {
        url: "/projetArea1.png",
        caption: "Interface de connexion"
      },
      {
        url: "/projetArea2.png",
        caption: "Gestion des workflows"
      },
      {
        url: "/projetArea3.png",
        caption: "Tableaux de bord personnalisés"
      }
    ]
  },
  {
    id: 3,
    title: "Portfolio Innovant",
    description: "Un portfolio créatif et interactif avec animations 3D, effets de parallaxe et transitions fluides.",
    tags: ["Next.js", "Three.js", "Tailwind CSS"],
    gradientFrom: "from-yellow-500",
    gradientTo: "to-red-600",
    imageUrl: "/portfolio.png",
    longDescription: "Un portfolio créatif et interactif avec animations 3D, effets de parallaxe et transitions fluides.",
    features: [
      "Suivi du parcours",
      "Suivi des compétences",
      "Suivi des projets",
      "Formulaire de contact",
    ],
    technologies: [
      "Frontend: Next.js, Tailwind CSS",
    ],
    screenshots: [
      {
        url: "/portfolio.png",
        caption: "Page d'accueil"
      }
    ]
  },
];

const Projects: React.FC = () => {
  const { styles } = useTheme();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [sliderOpen, setSliderOpen] = useState(false);
  
  // État pour la lightbox
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [currentScreenshotIndex, setCurrentScreenshotIndex] = useState<number>(0);
  
  // Sons
  const modalSound = useSoundEffect('modal', 0.4);
  const clickSound = useSoundEffect('click', 0.5);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  // Ouvrir le slider de détail du projet
  const openProjectDetails = (project: Project) => {
    modalSound.play();
    setSelectedProject(project);
    setSliderOpen(true);
  };
  
  // Fermer le slider de détail
  const closeProjectDetails = useCallback(() => {
    clickSound.play();
    setSliderOpen(false);
    setTimeout(() => {
      setSelectedProject(null);
    }, 500);
  }, [clickSound]);

  // Navigation entre les projets dans le slider
  const navigateToNextProject = useCallback(() => {
    if (selectedProject && selectedProject.id < projects.length) {
      clickSound.play();
      setSelectedProject(projects.find(p => p.id === selectedProject.id + 1) || null);
    }
  }, [selectedProject, clickSound]);

  const navigateToPrevProject = useCallback(() => {
    if (selectedProject && selectedProject.id > 1) {
      clickSound.play();
      setSelectedProject(projects.find(p => p.id === selectedProject.id - 1) || null);
    }
  }, [selectedProject, clickSound]);

  // Ouvrir la lightbox pour afficher une capture d'écran en plein écran
  const openLightbox = useCallback((index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    modalSound.play();
    setCurrentScreenshotIndex(index);
    setLightboxOpen(true);
  }, [modalSound]);

  // Fermer la lightbox
  const closeLightbox = useCallback(() => {
    clickSound.play();
    setLightboxOpen(false);
  }, [clickSound]);

  // Navigation dans la lightbox
  const nextScreenshot = useCallback(() => {
    if (selectedProject?.screenshots) {
      clickSound.play();
      setCurrentScreenshotIndex((prevIndex) => 
        (prevIndex + 1) % selectedProject.screenshots!.length
      );
    }
  }, [selectedProject, clickSound]);

  const prevScreenshot = useCallback(() => {
    if (selectedProject?.screenshots) {
      clickSound.play();
      setCurrentScreenshotIndex((prevIndex) => 
        prevIndex === 0 ? selectedProject.screenshots!.length - 1 : prevIndex - 1
      );
    }
  }, [selectedProject, clickSound]);

  // Gestion des touches du clavier pour la navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxOpen) {
        switch (e.key) {
          case 'Escape':
            closeLightbox();
            break;
          case 'ArrowRight':
            nextScreenshot();
            break;
          case 'ArrowLeft':
            prevScreenshot();
            break;
          default:
            break;
        }
      } else if (sliderOpen) {
        switch (e.key) {
          case 'Escape':
            closeProjectDetails();
            break;
          case 'ArrowRight':
            navigateToNextProject();
            break;
          case 'ArrowLeft':
            navigateToPrevProject();
            break;
          default:
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxOpen, closeLightbox, nextScreenshot, prevScreenshot, sliderOpen, closeProjectDetails, navigateToNextProject, navigateToPrevProject]);

  return (
    <div className={`max-w-6xl mx-auto px-4 py-16 ${isVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}>
      <h2 className="title-futuristic text-4xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-neon-blue via-neon-cyan to-neon-blue animate-glow glitch-text" data-text="PROJETS">
        PROJETS
      </h2>
      <p className="text-gray-300 text-center mb-16">Découvrez une sélection de mes projets récents</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <div 
            key={project.id}
            className={`${styles.glassPanel} rounded-lg overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-neon-blue ${styles.futuristicElement} animate-fade-in-up cursor-pointer group relative holographic float-effect`}
            style={{ animationDelay: `${index * 150}ms` }}
            onClick={() => openProjectDetails(project)}
          >
            {/* Image de couverture du projet */}
            {project.imageUrl ? (
              <div className="relative h-48 overflow-hidden hologram-projection">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover transform transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cyber-black to-transparent opacity-60"></div>
                
                {/* Overlay au survol */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center scanner-effect">
                  <div className="h-12 w-12 rounded-full flex items-center justify-center border border-neon-blue bg-black/60 text-neon-blue">
                    <Eye size={20} />
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-48 bg-gradient-to-br from-neon-blue/20 to-neon-cyan/20"></div>
            )}
            
            {/* Contenu */}
            <div className="p-5">
              <h3 className="text-lg font-display font-semibold mb-2 text-neon-blue glitch-text" data-text={project.title}>{project.title}</h3>
              <p className="text-gray-300 text-sm mb-4 line-clamp-2 distortion-overlay">{project.description}</p>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <span 
                    key={tag} 
                    className="text-xs py-1 px-2 rounded-md bg-neon-blue/10 text-neon-blue border border-neon-blue/30 font-display float-effect"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              {/* Bouton voir plus */}
              <div className="flex justify-end">
                <button className="text-neon-blue text-sm font-display group-hover:underline flex items-center focus:outline-none scanner-effect">
                  Voir détails 
                  <ChevronRight size={16} className="ml-1 group-hover:ml-2 transition-all" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Slider de détail du projet */}
      <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${sliderOpen ? 'visible' : 'invisible'} transition-all duration-300`}>
        <div 
          className={`absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-500 ${sliderOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={closeProjectDetails}
        />
        
        <div 
          className={`transition-all duration-500 transform ${
            sliderOpen ? 'scale-100 opacity-100 teleport-animation' : 'scale-95 opacity-0 teleport-out'
          }`}
        >
          {selectedProject && (
            <ProjectSlider 
              project={selectedProject}
              onClose={closeProjectDetails}
              onNext={navigateToNextProject}
              onPrev={navigateToPrevProject}
              isFirst={selectedProject.id === 1}
              isLast={selectedProject.id === projects.length}
              openLightbox={openLightbox}
            />
          )}
        </div>
      </div>
      
      {/* Lightbox pour les captures d'écran */}
      {lightboxOpen && selectedProject?.screenshots && (
        <Lightbox 
          screenshots={selectedProject.screenshots}
          currentIndex={currentScreenshotIndex}
          onClose={closeLightbox}
          onNext={nextScreenshot}
          onPrev={prevScreenshot}
        />
      )}
    </div>
  );
};

export default Projects;