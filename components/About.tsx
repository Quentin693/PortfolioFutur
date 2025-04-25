"use client";

import React, { useState, useEffect } from 'react';
import { Briefcase, GraduationCap, Award, MapPin, Calendar, X, Image as ImageIcon, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useTheme } from './ThemeProvider';
import { useSounds } from '../hooks/useSounds';
import SoundButton from './SoundButton';

interface TimelineItem {
  id: number;
  title: string;
  subtitle: string;
  period: string;
  location: string;
  description: string;
  type: 'education' | 'experience' | 'achievement';
  details: string[];
  images?: {
    src: string;
    alt: string;
    caption?: string;
  }[];
}

const About: React.FC = () => {
  const { styles } = useTheme();
  const [selectedItem, setSelectedItem] = useState<TimelineItem | null>(null);
  const [animating, setAnimating] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { playHover, playClick, playModal } = useSounds();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Données du parcours (combiné mais triées par date) avec images
  const timelineItems: TimelineItem[] = [
    {
      id: 1,
      title: "Baccalauréat Scientifique",
      subtitle: "Lycée Chalie Chaplin",
      period: "2017-2020",
      location: "Decines, France",
      description: "Spécialité Mathématiques, Mention Assez Bien",
      type: "education",
      details: [
        "J'ai acquis de solides bases en mathématiques et en sciences",
        "Découverte des bases de l'algorithmique"
      ],
    },
    {
      id: 2,
      title: "Licence Mathématique-Informatique",
      subtitle: "Université Claude Bernard Lyon 1",
      period: "2020 - 2022",
      location: "Villeurbanne, France",
      description: "Spécialisation en mathématiques appliquées et informatique",
      type: "education",
      details: [
        "Apprentissage langages de programmation PHP, HTML, CSS, C++",
        "Apprentissage des mathématiques appliquées",
        "Travail en équipe",
      ],
    },
    {
      id: 3,
      title: "École d'informatique",
      subtitle: "Epitech",
      period: "2022 - 2025",
      location: "Lyon, France",
      description: "Formation par projets en informatique",
      type: "education",
      details: [
        "Réalisation de plus de 40 projets informatiques",
        "Spécialisation en développement full-stack",
        "Membre de la junior entreprise",
      ],
    },
    {
      id: 4,
      title: "Stage - Développeur Frontend",
      subtitle: "INSA Lyon",
      period: "Septembre 2023 - Décembre 2023",
      location: "Lyon, France",
      description: "Développement d'interfaces utilisateur modernes",
      type: "experience",
      details: [
        "Refonte complète de l'interface utilisateur avec React",
        "Optimisation des performances de l'application web",
        "Implémentation d'un design system cohérent",
        "Apprentissage des bonnes pratiques en entreprise"
      ],
      images: [
        {
          src: "/Insa.png",
          alt: "Projet Frontend",
          caption: "Page d'accueil de l'application web"
        },
        {
          src: "/Insa1.png", 
          alt: "Projet Frontend",
          caption: "Interface que j'ai développée pendant mon stage"
        },
        {
          src: "/Insa2.png",
          alt: "Projet Frontend",
          caption: "Interface que j'ai développée pendant mon stage"
        },
      ]
    },
    {
      id: 5,
      title: "Junior Conseil Taker",
      subtitle: "Taker",
      period: " Juin 2023 - Aujourd'hui",
      location: "Lyon, France",
      description: "Chargé d'affaires & Responsable de la Taker Academy",
      type: "experience",
      details: [
        "Gestion de projets clients en équipe",
        "Développement de la Taker Academy",
        "Gestion de prospection et de communication",
        "Formation de nouveaux membres"
      ],
      images: [
        {
          src: "/Taker1.jpeg",
          alt: "Équipe Taker",
          caption: "Notre équipe lors d'un événement"
        },
        {
            src: "/Taker2.jpeg",
            alt: "Equipe Taker",
            caption: "Notre équipe lors d'un événement"
        }
      ]
    },
    {
      id: 6,
      title: "Développeur Fullstack",
      subtitle: "Reactime",
      period: "Avril 2025 - Juillet 2025",
      location: "Lyon, France",
      description: "Site internet du restaurant Tiki Au bord de l'eau",
      type: "experience",
      details: [
        "Développement du site avec Next.js et Tailwind CSS, Nest.js et PostgreSQL",
        "Methode Agile",
        "Au bureau et sur le terrain",
      ],
      images: [
        {
          src: "/ProjetTiki.png",
          alt: "Projet Tiki",
          caption: "Un des projets développés chez Reactime"
        },
        {
          src: "/ProjetTiki1.png",
          alt: "Réservation en ligne",
          caption: "Interface de réservation en ligne"
        },
        {
          src: "/ProjetTiki2.png",
          alt: "Interface de connexion",
          caption: "Interface de connexion à l'application"
        }
      ]
    },
  ];

  // Fonction pour afficher l'icône appropriée selon le type d'élément
  const getIcon = (type: string) => {
    switch (type) {
      case 'education':
        return <GraduationCap className="text-neon-blue" />;
      case 'experience':
        return <Briefcase className="text-neon-cyan" />;
      case 'achievement':
        return <Award className="text-neon-purple" />;
      default:
        return <MapPin className="text-neon-purple" />;
    }
  };

  // Fonction pour obtenir la couleur de fond selon le type d'élément
  const getCardColor = (type: string) => {
    switch (type) {
      case 'education':
        return 'border-neon-blue/30 shadow-neon-blue';
      case 'experience':
        return 'border-neon-cyan/30 shadow-neon-cyan';
      case 'achievement':
        return 'border-neon-purple/30 shadow-neon-purple';
      default:
        return 'border-neon-purple/30 shadow-neon-purple';
    }
  };

  // Gestion du clic sur une carte
  const handleCardClick = (item: TimelineItem) => {
    if (selectedItem?.id === item.id) {
      closeDetail();
    } else {
      playModal();
      setAnimating(true);
      
      // Si un élément est déjà ouvert, on le ferme d'abord
      if (selectedItem) {
        setSelectedItem(null);
        setTimeout(() => {
          setSelectedItem(item);
          setTimeout(() => setAnimating(false), 500);
        }, 300);
      } else {
        setSelectedItem(item);
        setTimeout(() => setAnimating(false), 500);
      }
    }
  };

  // Fermeture du détail
  const closeDetail = () => {
    playClick();
    setAnimating(true);
    setSelectedItem(null);
    setTimeout(() => setAnimating(false), 300);
  };

  // Ouverture d'une image en plein écran
  const openFullscreenImage = (src: string) => {
    playModal();
    setSelectedImage(src);
  };

  // Fermeture de l'image en plein écran
  const closeFullscreenImage = () => {
    playClick();
    setSelectedImage(null);
  };

  return (
    <div className={`max-w-6xl mx-auto px-4 py-16 ${isVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}>
      <h2 className="title-futuristic text-4xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-neon-blue via-neon-cyan to-neon-blue animate-glow">
        PARCOURS
      </h2>

      <div className="flex items-center justify-center space-x-12 mb-12">
        <div className="flex items-center">
          <div className={`${styles.glassPanel} p-2 rounded-full mr-3 group transition-all duration-300 hover:shadow-neon-cyan`}>
            <Briefcase className="text-neon-cyan" />
          </div>
          <span className="font-display text-sm uppercase tracking-wider text-neon-cyan">Expérience</span>
        </div>
        <div className="flex items-center">
          <div className={`${styles.glassPanel} p-2 rounded-full mr-3 group transition-all duration-300 hover:shadow-neon-blue`}>
            <GraduationCap className="text-neon-blue" />
          </div>
          <span className="font-display text-sm uppercase tracking-wider text-neon-blue">Formation</span>
        </div>
      </div>

      {/* Timeline verticale */}
      <div className="relative">
        {/* Ligne verticale */}
        <div className="absolute left-6 lg:left-1/2 transform lg:-translate-x-px top-0 h-full w-0.5 bg-gradient-to-b from-neon-blue via-neon-cyan to-neon-blue opacity-30"></div>

        {/* Items de la timeline */}
        <div className="relative z-10">
          {timelineItems.map((item, index) => (
            <div 
              key={item.id}
              className={`relative mb-12 ${index % 2 === 0 ? 'lg:pr-10 lg:text-right' : 'lg:pl-10'} lg:w-1/2 ${index % 2 === 0 ? 'lg:ml-auto' : 'lg:mr-auto'} animate-fade-in-up`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Point sur la ligne de temps */}
              <div 
                className={`absolute ${index % 2 === 0 ? 'left-0 lg:left-auto lg:right-0 lg:-mr-3' : 'left-0 lg:-ml-3'} w-12 h-12 flex items-center justify-center`}
              >
                <div className={`${styles.glassPanel} w-8 h-8 rounded-full flex items-center justify-center z-20 ${
                  item.type === 'education' ? 'border-neon-blue/50' : 'border-neon-cyan/50'
                } transition-all duration-300 ${
                  selectedItem?.id === item.id ? 'scale-125 shadow-lg' : ''
                } group-hover:shadow-${item.type === 'education' ? 'neon-blue' : 'neon-cyan'}`}>
                  {getIcon(item.type)}
                </div>
              </div>

              {/* Carte contenant les infos */}
              <div 
                className={`group ml-16 lg:ml-0 ${styles.glassPanel} rounded-lg overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-md ${getCardColor(item.type)} ${
                  selectedItem?.id === item.id ? 'ring-1 ring-opacity-50 ring-offset-2 ring-offset-black' : ''
                } ${selectedItem?.id === item.id ? (item.type === 'education' ? 'ring-neon-blue' : 'ring-neon-cyan') : ''} ${styles.futuristicElement}`}
                onClick={() => handleCardClick(item)}
                onMouseEnter={playHover}
              >
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-display text-lg font-semibold mb-1 group-hover:text-glow">
                      {item.title}
                      <span className={`block text-sm ${item.type === 'education' ? 'text-neon-blue' : 'text-neon-cyan'}`}>
                        {item.subtitle}
                      </span>
                    </h3>
                  </div>

                  <div className="flex flex-wrap text-sm text-gray-300 mb-3">
                    <div className="flex items-center mr-4 mb-1">
                      <Calendar size={14} className="mr-1 opacity-70" />
                      {item.period}
                    </div>
                    <div className="flex items-center mb-1">
                      <MapPin size={14} className="mr-1 opacity-70" />
                      {item.location}
                    </div>
                  </div>

                  <p className="text-sm text-gray-400">
                    {item.description}
                  </p>

                  <div className="flex justify-end mt-2">
                    <ChevronRight 
                      size={16} 
                      className={`transition-transform duration-300 ${selectedItem?.id === item.id ? 'rotate-90' : 'rotate-0'} ${item.type === 'education' ? 'text-neon-blue' : 'text-neon-cyan'}`} 
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Affichage détaillé de l'élément sélectionné */}
      <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${selectedItem ? 'visible' : 'invisible'}`}>
        <div 
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={closeDetail}
        />
        
        <div 
          className={`${styles.glassPanel} max-w-3xl w-full max-h-[80vh] overflow-y-auto rounded-lg border border-neon-blue/40 shadow-neon-blue transition-all duration-300 transform ${
            selectedItem && !animating ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          } ${styles.futuristicElement}`}
        >
          {selectedItem && (
            <>
              <div className="flex justify-between items-center border-b border-neon-blue/20 p-4">
                <h3 className="text-xl font-display font-semibold text-white">
                  {selectedItem.title}
                  <span className="block text-sm text-neon-blue">
                    {selectedItem.subtitle}
                  </span>
                </h3>
                <SoundButton 
                  className="p-1 hover:bg-neon-blue/20 rounded-full transition-colors"
                  onClick={closeDetail}
                >
                  <X size={20} />
                </SoundButton>
              </div>
              
              <div className="p-5">
                <div className="flex flex-wrap text-sm text-gray-300 mb-4">
                  <div className="flex items-center mr-6 mb-2">
                    <Calendar size={16} className="mr-2 opacity-70" />
                    {selectedItem.period}
                  </div>
                  <div className="flex items-center mb-2">
                    <MapPin size={16} className="mr-2 opacity-70" />
                    {selectedItem.location}
                  </div>
                </div>
                
                <p className="text-gray-200 mb-4">
                  {selectedItem.description}
                </p>
                
                <div className="mb-5">
                  <h4 className="text-neon-blue font-display text-sm uppercase tracking-wider mb-2">Détails</h4>
                  <ul className="space-y-2">
                    {selectedItem.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-neon-blue mr-2">•</span>
                        <span className="text-gray-300">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {selectedItem.images && selectedItem.images.length > 0 && (
                  <div>
                    <h4 className="text-neon-blue font-display text-sm uppercase tracking-wider mb-3">Galerie</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {selectedItem.images.map((image, idx) => (
                        <div 
                          key={idx} 
                          className="relative group cursor-pointer border border-neon-blue/20 hover:border-neon-blue/50 rounded-md overflow-hidden transition-all duration-300 hover:shadow-neon-blue"
                          onClick={() => openFullscreenImage(image.src)}
                          onMouseEnter={playHover}
                        >
                          <div className="aspect-video relative bg-black/50">
                            <Image 
                              src={image.src}
                              alt={image.alt}
                              fill
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                              onError={(e) => {
                                const target = e.currentTarget as HTMLImageElement;
                                target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%232d3748'/%3E%3Ctext x='50' y='50' font-family='Arial' font-size='20' text-anchor='middle' fill='white' dominant-baseline='middle'%3EImage%3C/text%3E%3C/svg%3E";
                              }}
                            />
                          </div>
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50">
                            <ImageIcon size={24} className="text-white" />
                          </div>
                          {image.caption && (
                            <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-xs text-gray-200 p-1 text-center truncate">
                              {image.caption}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Affichage image en plein écran */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md"
          onClick={closeFullscreenImage}
        >
          <SoundButton 
            className="absolute top-4 right-4 z-50 p-2 text-white hover:text-neon-blue"
            onClick={closeFullscreenImage}
          >
            <X size={24} />
          </SoundButton>
          <div className="relative w-full max-w-5xl max-h-[90vh] h-[90vh]">
            <Image 
              src={selectedImage}
              alt="Image en plein écran"
              fill
              sizes="100vw"
              className="object-contain"
              onError={(e) => {
                const target = e.currentTarget as HTMLImageElement;
                target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%232d3748'/%3E%3Ctext x='50' y='50' font-family='Arial' font-size='20' text-anchor='middle' fill='white' dominant-baseline='middle'%3EImage%3C/text%3E%3C/svg%3E";
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default About;