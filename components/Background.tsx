"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  connections: number;
}

interface CanvasSize {
  width: number;
  height: number;
}

const InteractiveBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gridCanvasRef = useRef<HTMLCanvasElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [canvasSize, setCanvasSize] = useState<CanvasSize>({
    width: typeof window !== 'undefined' ? window.innerWidth : 1000,
    height: typeof window !== 'undefined' ? window.innerHeight : 800
  });
  const [isMobile, setIsMobile] = useState(false);
  const mousePosition = { x: 0, y: 0 };
  const [isMouseMoving, setIsMouseMoving] = useState(false);
  
  
  // Configuration des particules
  const particleConfig = useCallback(() => {
    // Réduire le nombre de particules et les paramètres sur mobile pour de meilleures performances
    return {
      particleCount: isMobile ? 50 : 100,
      particleBaseSize: isMobile ? 1 : 1.5,
      particleAddedSize: isMobile ? 1 : 1.5,
      particleBaseSpeed: 0.1,
      particleAddedSpeed: 0.1,
      particleVariance: 0.5,
      connectionDistance: isMobile ? 150 : 200, // Distance réduite sur mobile
      maxConnections: isMobile ? 3 : 5, // Moins de connexions sur mobile
      colors: {
        primary: "#00a2ff",
        secondary: "#0051ff",
        accent: "#00f2ff",
      }
    };
  }, [isMobile]);
  
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
  
  // Fonction pour initialiser les particules
  const initialiseParticles = useCallback(() => {
    if (!canvasRef.current) return;
    
    const config = particleConfig();
    const newParticles: Particle[] = [];
    const { width, height } = canvasSize;
    
    for (let i = 0; i < config.particleCount; i++) {
      // Position aléatoire dans le canvas
      const x = Math.random() * width;
      const y = Math.random() * height;
      
      // Vitesse aléatoire (légère)
      const vx = (Math.random() - 0.5) * (config.particleBaseSpeed + Math.random() * config.particleAddedSpeed);
      const vy = (Math.random() - 0.5) * (config.particleBaseSpeed + Math.random() * config.particleAddedSpeed);
      
      // Taille aléatoire
      const size = config.particleBaseSize + Math.random() * config.particleAddedSize;
      
      // Couleur avec variation légère
      const colorIndex = Math.floor(Math.random() * 3);
      const opacity = 0.3 + Math.random() * 0.4;
      let color;
      
      switch (colorIndex) {
        case 0:
          color = `rgba(0, 162, 255, ${opacity})`;  // primary
          break;
        case 1:
          color = `rgba(0, 81, 255, ${opacity})`;   // secondary
          break;
        case 2:
          color = `rgba(0, 242, 255, ${opacity})`;  // accent
          break;
        default:
          color = `rgba(0, 162, 255, ${opacity})`;
      }
      
      newParticles.push({
        x,
        y,
        vx,
        vy,
        size,
        color,
        connections: 0
      });
    }
    
    setParticles(newParticles);
  }, [canvasSize, particleConfig]);
  
  // Fonction pour connecter les particules entre elles
  const connectParticles = useCallback((particle: Particle, ctx: CanvasRenderingContext2D) => {
    particle.connections = 0;
    const config = particleConfig();
    
    for (let i = 0; i < particles.length; i++) {
      const otherParticle = particles[i];
      
      // Ne pas connecter à soi-même
      if (particle === otherParticle) continue;
      
      // Limiter le nombre de connexions par particule
      if (particle.connections >= config.maxConnections) break;
      
      // Calculer la distance entre les particules
      const dx = particle.x - otherParticle.x;
      const dy = particle.y - otherParticle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Si la distance est inférieure à la limite, connecter les particules
      if (distance < config.connectionDistance) {
        // Opacité basée sur la distance
        const opacity = 1 - (distance / config.connectionDistance);
        
        ctx.beginPath();
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(otherParticle.x, otherParticle.y);
        
        // Créer un dégradé pour la ligne
        const gradient = ctx.createLinearGradient(
          particle.x, particle.y, otherParticle.x, otherParticle.y
        );
        
        const particleColor = particle.color.replace(/[^,]+(?=\))/, `${opacity * 0.5}`);
        const otherColor = otherParticle.color.replace(/[^,]+(?=\))/, `${opacity * 0.5}`);
        
        gradient.addColorStop(0, particleColor);
        gradient.addColorStop(1, otherColor);
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = isMobile ? 0.5 : 1; // Lignes plus fines sur mobile
        ctx.stroke();
        
        particle.connections++;
      }
    }
  }, [particles, particleConfig, isMobile]);
  
  // Fonction pour dessiner la grille futuriste
  const drawGrid = useCallback(() => {
    if (!gridCanvasRef.current) return;
    
    const canvas = gridCanvasRef.current;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;
    
    // Effacer le canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Paramètres de la grille
    const gridSize = isMobile ? 40 : 60;
    const fadeDistance = isMobile ? 300 : 500;
    
    // Fonction pour calculer l'opacité basée sur la distance du centre
    const getOpacity = (x: number, y: number) => {
      if (!isMouseMoving) {
        // Grille statique quand la souris ne bouge pas
        return 0.08 - (Math.min(y / canvas.height, 1) * 0.05);
      }
      
      const dx = x - mousePosition.x;
      const dy = y - mousePosition.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance > fadeDistance) return 0.03;
      
      // Plus lumineux près de la souris
      return 0.15 * (1 - distance / fadeDistance) + 0.03;
    };
    
    // Dessiner les lignes verticales
    for (let x = 0; x <= canvas.width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      
      // Les lignes principales sont plus épaisses
      if (x % (gridSize * 5) === 0) {
        ctx.lineWidth = 0.5;
      } else {
        ctx.lineWidth = 0.2;
      }
      
      for (let y = 0; y < canvas.height; y += 2) {
        ctx.strokeStyle = `rgba(0, 162, 255, ${getOpacity(x, y)})`;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, y + 2);
        ctx.stroke();
      }
    }
    
    // Dessiner les lignes horizontales
    for (let y = 0; y <= canvas.height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      
      // Les lignes principales sont plus épaisses
      if (y % (gridSize * 5) === 0) {
        ctx.lineWidth = 0.5;
      } else {
        ctx.lineWidth = 0.2;
      }
      
      for (let x = 0; x < canvas.width; x += 2) {
        ctx.strokeStyle = `rgba(0, 162, 255, ${getOpacity(x, y)})`;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + 2, y);
        ctx.stroke();
      }
    }
  }, [mousePosition, isMouseMoving, isMobile]);
  
  // Initialisation et gestion du redimensionnement
  useEffect(() => {
    // Fonction pour redimensionner le canvas
    const handleResize = () => {
      if (canvasRef.current && gridCanvasRef.current) {
        setCanvasSize({
          width: window.innerWidth,
          height: window.innerHeight
        });
      }
    };
    
    // Appeler handleResize immédiatement
    handleResize();
    
    // Ajouter un écouteur d'événement de redimensionnement
    window.addEventListener('resize', handleResize);
    
    // Nettoyer l'écouteur d'événement lors du démontage
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Réinitialiser les particules lors du changement de taille ou de mode (mobile/desktop)
  useEffect(() => {
    initialiseParticles();
  }, [initialiseParticles, isMobile, canvasSize]);

  // Animation des particules
  useEffect(() => {
    if (!canvasRef.current || particles.length === 0) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;
    
    // Fonction d'animation
    let animationFrameId: number;
    
    const render = () => {
      if (!ctx) return;
      
      // Effacer le canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Mettre à jour et dessiner chaque particule
      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];
        
        // Mise à jour de la position
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Rebond sur les bords
        if (particle.x <= 0 || particle.x >= canvas.width) {
          particle.vx *= -1;
        }
        
        if (particle.y <= 0 || particle.y >= canvas.height) {
          particle.vy *= -1;
        }
        
        // Dessiner la particule avec effet de glow
        ctx.shadowBlur = 10;
        ctx.shadowColor = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        ctx.shadowBlur = 0;
        
        // Connexions avec d'autres particules
        connectParticles(particle, ctx);
      }
      
      animationFrameId = requestAnimationFrame(render);
    };
    
    render();
    
    // Nettoyage
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [particles, canvasSize, connectParticles, particleConfig]);
  
  // Animation de la grille
  useEffect(() => {
    if (!gridCanvasRef.current) return;
    
    let animationFrameId: number;
    
    const render = () => {
      drawGrid();
      animationFrameId = requestAnimationFrame(render);
    };
    
    render();
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [drawGrid]);

  return (
    <>
      <div className="fixed inset-0 w-full h-full z-0 bg-black"></div>
      <canvas
        ref={gridCanvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
        className="fixed inset-0 w-full h-full z-0"
      />
      <canvas
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
        className="fixed inset-0 w-full h-full z-0"
      />
      {/* Effet de vignette pour plus de profondeur */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-gradient-radial from-transparent to-black opacity-80"></div>
    </>
  );
};

export default InteractiveBackground;