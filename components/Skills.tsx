import React, { useState, useEffect } from 'react';
import { Code, Server, Laptop, Database, Code2, Wrench } from 'lucide-react';
import Image from 'next/image';
import { useTheme } from './ThemeProvider';
import { useSounds } from '../hooks/useSounds';
import SoundButton from './SoundButton';

// Définir les types pour les compétences
interface Skill {
  name: string;
  logo: string;
  color: string;
  description: string;
}

// Définir le type pour les catégories de compétences
interface SkillCategories {
  [key: string]: Skill[];
}

const SkillsComponent = () => {
  // Utiliser notre thème futuriste
  const { styles } = useTheme();
  
  // État pour suivre quel groupe de compétences est sélectionné
  const [activeTab, setActiveTab] = useState<'frontend' | 'backend' | 'database' | 'other'>('frontend');
  // État pour l'animation
  const [isVisible, setIsVisible] = useState(false);
  // Sons
  const { playClick } = useSounds();
  
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  // Regrouper les langages par catégorie avec niveau de compétence (1-5)
  const skillCategories: SkillCategories = {
    frontend: [
      { name: 'React', logo: '/logos/react.png', color: 'text-neon-blue', description: 'Développement d\'interfaces utilisateur complexes et performantes' },
      { name: 'Vue.js', logo: '/logos/vue.png', color: 'text-neon-cyan', description: 'Création d\'applications web progressives' },
      { name: 'Nuxt.js', logo: '/logos/nuxt.png', color: 'text-neon-cyan', description: 'Framework Vue.js pour applications universelles' },
      { name: 'TypeScript', logo: '/logos/ts.png', color: 'text-neon-blue', description: 'Typage statique pour JavaScript' },
      { name: 'Next.js', logo: '/logos/next.png', color: 'text-white', description: 'Framework React pour applications avec rendu côté serveur' },
      { name: 'Tailwind CSS', logo: '/logos/tailwind.png', color: 'text-neon-blue', description: 'Framework CSS utilitaire pour designs personnalisés' },
    ],
    backend: [
      { name: 'Node.js', logo: '/logos/nodejs.png', color: 'text-neon-cyan', description: 'Environnement d\'exécution JavaScript côté serveur' },
      { name: 'Nest.js', logo: '/logos/nestjs.png', color: 'text-neon-purple', description: 'Framework Node.js progressif pour applications côté serveur' },
      { name: 'Python', logo: '/logos/python.png', color: 'text-yellow-500', description: 'Automatisation, traitement de données et scripts' },
    ],
    database: [
      { name: 'PostgreSQL', logo: '/logos/PostgresSQL.png', color: 'text-neon-blue', description: 'Système de gestion de base de données relationnelle' },
      { name: 'MongoDB', logo: '/logos/mongoDB.png', color: 'text-neon-cyan', description: 'Base de données NoSQL orientée documents' },
    ],
    other: [
      { name: 'C', logo: '/logos/langageC.png', color: 'text-neon-blue', description: 'Programmation système et embarquée' },
      { name: 'C++', logo: '/logos/langageCpp.png', color: 'text-neon-blue', description: 'Développement de logiciels performants' },
    ]
  };

  // Outils avec niveau de compétence
  const tools: Skill[] = [
    { name: 'VSCode', logo: '/logos/vscode.png', color: 'text-neon-blue', description: 'Éditeur de code principal' },
    { name: 'GitHub', logo: '/logos/github.png', color: 'text-white', description: 'Gestion de versions et collaboration' },
    { name: 'Docker', logo: '/logos/docker.png', color: 'text-neon-blue', description: 'Containerisation d\'applications' },
    { name: 'Figma', logo: '/logos/figma.png', color: 'text-neon-purple', description: 'Design d\'interfaces et prototypage' },
    { name: 'Notion', logo: '/logos/notion.png', color: 'text-white', description: 'Gestion de projets et documentation' },
    { name: 'CursorAI', logo: '/logos/cursorAi.png', color: 'text-neon-purple', description: 'Assistance au développement par IA' },
  ];


  // Fonction pour afficher les skills avec description et niveau
  const renderSkills = (skills: Skill[]) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((skill: Skill, index: number) => (
          <div 
            key={skill.name}
            className={`${styles.glassPanel} rounded-lg p-5 transition-all duration-300 transform hover:scale-105 hover:shadow-neon-blue ${styles.futuristicElement} animate-fade-in-up`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center mb-3">
              <div className="h-12 w-12 flex items-center justify-center mr-4 relative bg-black/30 rounded-lg overflow-hidden border border-neon-blue/20">
                <Image 
                  src={skill.logo} 
                  alt={skill.name}
                  width={48}
                  height={48}
                  className="object-contain w-10 h-10 p-1" 
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%232d3748'/%3E%3Ctext x='50' y='50' font-family='Arial' font-size='20' text-anchor='middle' fill='white' dominant-baseline='middle'%3E%3F%3C/text%3E%3C/svg%3E";
                  }}
                />
              </div>
              <p className={`font-display text-sm font-bold ${skill.color}`}>{skill.name}</p>
            </div>
            <p className="text-sm text-gray-300 mt-2">{skill.description}</p>
          </div>
        ))}
      </div>
    );
  };

  // Tabs pour les catégories
  const tabs = [
    { id: 'frontend' as const, label: 'Frontend', icon: <Laptop size={16} /> },
    { id: 'backend' as const, label: 'Backend', icon: <Server size={16} /> },
    { id: 'database' as const, label: 'Bases de données', icon: <Database size={16} /> },
    { id: 'other' as const, label: 'Autres', icon: <Code2 size={16} /> }
  ];

  // Fonction de changement d'onglet
  const handleTabChange = (tabId: 'frontend' | 'backend' | 'database' | 'other') => {
    playClick();
    setActiveTab(tabId);
  };

  return (
    <div className={`max-w-6xl mx-auto py-16 px-4 sm:px-6 lg:px-8 ${isVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}>
      <h2 className="title-futuristic text-4xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-neon-blue via-neon-cyan to-neon-blue animate-glow">COMPÉTENCES</h2>
      <p className="text-gray-300 text-center mb-16">Expertise technique et outils que j&apos;utilise quotidiennement</p>
      
      {/* Section des langages avec tabs */}
      <div className="mb-20 relative">
        <h3 className="title-futuristic text-2xl font-bold mb-8 flex items-center">
          <Code className="mr-2 text-neon-blue" />
          <span>LANGAGES & FRAMEWORKS</span>
        </h3>
        
        <div className="mb-8 relative">
          <div className="flex flex-wrap border-b border-neon-blue/20 mb-8 relative z-10">
            {tabs.map((tab) => (
              <SoundButton
                key={tab.id}
                onClick={() => {
                  handleTabChange(tab.id);
                }}
                type="button"
                className={`relative z-20 flex items-center px-6 py-3 rounded-t-lg transition-all duration-300 mr-2 mb-2 cursor-pointer focus:outline-none font-display text-sm uppercase ${
                  activeTab === tab.id 
                    ? 'bg-neon-blue/20 text-neon-blue font-bold border-t border-l border-r border-neon-blue/40 shadow-neon-blue' 
                    : 'bg-cyber-surface hover:bg-neon-blue/10 text-gray-300 border-t border-l border-r border-neon-blue/10'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                <span>{tab.label}</span>
              </SoundButton>
            ))}
          </div>
          
          <div className="transition-all duration-500 relative z-0">
            {skillCategories[activeTab] && renderSkills(skillCategories[activeTab])}
          </div>
        </div>
      </div>
      
      {/* Section des outils */}
      <div className="mb-16">
        <h3 className="title-futuristic text-2xl font-bold mb-8 flex items-center">
          <Wrench className="mr-2 text-neon-cyan" />
          <span>OUTILS & ENVIRONNEMENTS</span>
        </h3>
        
        {renderSkills(tools)}
      </div>
    </div>
  );
};

export default SkillsComponent;