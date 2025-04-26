"use client";

import React, { useState, useEffect } from 'react';
import { Send, Phone, Mail, MapPin, Linkedin, Github, FileText } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { useSounds } from '../hooks/useSounds';
import SoundButton from './SoundButton';
import SoundLink from './SoundLink';

const Contact: React.FC = () => {
  const { styles } = useTheme();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const { playModal } = useSounds();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name: fieldName, value } = e.target;
    
    if (fieldName === 'name') {
      setName(value);
    } else if (fieldName === 'email') {
      setEmail(value);
    } else if (fieldName === 'message') {
      setMessage(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    playModal(); // Jouer un son lors de la soumission
    setSubmitted(true);
    setError('');
    
    // Simuler un envoi de formulaire
    try {
      // En production, remplacez par votre logique d'envoi de formulaire
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulation d'une réponse réussie
      setError("Votre message a été envoyé avec succès!");
      
      // Réinitialiser le formulaire après un envoi réussi
      setName('');
      setEmail('');
      setMessage('');
    } catch {
      setError("Une erreur s'est produite lors de l'envoi du message.");
    } finally {
      setSubmitted(false);
    }
  };

  return (
    <div className={`max-w-5xl mx-auto py-16 px-4 sm:px-6 lg:px-8 ${isVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}>
      <h2 className="title-futuristic text-4xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-neon-blue via-neon-cyan to-neon-blue animate-glow">
        CONTACT
      </h2>
      
      <div className={`${styles.glassPanel} rounded-xl overflow-hidden shadow-neon-blue ${styles.futuristicElement}`}>
        <div className="md:flex">
          {/* Sidebar avec infos de contact */}
          <div className="md:w-2/5 bg-gradient-to-br from-neon-blue/20 to-neon-cyan/10 p-8 text-white border-r border-neon-blue/20">
            <div className="mb-12">
              <h3 className="font-display text-xl font-bold mb-8 relative inline-block text-neon-blue">
                COORDONNÉES
                <span className="absolute bottom-0 left-0 w-3/4 h-0.5 bg-neon-blue/50 rounded"></span>
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-center group" >
                  <div className="bg-black/30 p-3 rounded-full mr-4 border border-neon-blue/30 shadow-neon-blue group-hover:shadow-neon-blue/80 transition-all">
                    <Mail size={20} className="text-neon-blue" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <p className="font-medium group-hover:text-neon-blue transition-colors">cialonequentin@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-center group" >
                  <div className="bg-black/30 p-3 rounded-full mr-4 border border-neon-blue/30 shadow-neon-blue group-hover:shadow-neon-blue/80 transition-all">
                    <Phone size={20} className="text-neon-blue" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Téléphone</p>
                    <p className="font-medium group-hover:text-neon-blue transition-colors">+33 6 62 49 54 24</p>
                  </div>
                </div>
                
                <div className="flex items-center group" >
                  <div className="bg-black/30 p-3 rounded-full mr-4 border border-neon-blue/30 shadow-neon-blue group-hover:shadow-neon-blue/80 transition-all">
                    <MapPin size={20} className="text-neon-blue" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Localisation</p>
                    <p className="font-medium group-hover:text-neon-blue transition-colors">Lyon, France</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-display text-sm uppercase tracking-wider mb-6 text-neon-cyan">Retrouvez-moi sur</h4>
              <div className="flex space-x-5">
                <SoundLink 
                  href="https://www.linkedin.com/in/quentin-cialone-6b3003271/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-black/30 p-3 rounded-full border border-neon-blue/30 hover:border-neon-blue/80 transition-all cursor-pointer shadow-neon-blue hover:shadow-neon-blue/80"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open("https://www.linkedin.com/in/quentin-cialone-6b3003271/", "_blank");
                  }}
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} className="text-neon-blue" />
                </SoundLink>
                
                <SoundLink 
                  href="https://github.com/Quentin693" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-black/30 p-3 rounded-full border border-neon-blue/30 hover:border-neon-blue/80 transition-all cursor-pointer shadow-neon-blue hover:shadow-neon-blue/80"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open("https://github.com/Quentin693", "_blank");
                  }}
                  aria-label="GitHub"
                >
                  <Github size={20} className="text-neon-blue" />
                </SoundLink>
                
                <SoundLink 
                  href="/CV_Cialone_Quentin.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-neon-blue/20 p-3 rounded-full border border-neon-blue/50 hover:border-neon-blue transition-all cursor-pointer shadow-neon-blue hover:shadow-neon-blue/80 group transform hover:scale-110"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  download
                  aria-label="Télécharger mon CV"
                >
                  <FileText size={20} className="text-neon-blue group-hover:animate-pulse" />
                  <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black/80 border border-neon-blue/20 text-neon-blue text-xs py-1 px-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    Télécharger mon CV
                  </span>
                </SoundLink>
              </div>
            </div>
          </div>
          
          {/* Formulaire de contact */}
          <div className="md:w-3/5 p-8 relative z-10">
            <h3 className="font-display text-xl font-bold mb-8 relative inline-block text-neon-blue">
              ENVOYEZ-MOI UN MESSAGE
              <span className="absolute bottom-0 left-0 w-3/4 h-0.5 bg-neon-blue/50 rounded"></span>
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1 ml-1 text-gray-300">
                    Nom
                  </label>
                  <input 
                    type="text" 
                    id="name"
                    name="name"
                    value={name}
                    onChange={handleChange}
                    onClick={(e) => e.stopPropagation()}
                    className="w-full px-4 py-3 bg-black/30 border border-neon-blue/30 rounded-lg focus:outline-none focus:border-neon-blue focus:shadow-neon-blue transition-all cursor-text relative z-10 text-white placeholder-gray-500" 
                    required
                    autoComplete="name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1 ml-1 text-gray-300">
                    Email
                  </label>
                  <input 
                    type="email" 
                    id="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    onClick={(e) => e.stopPropagation()}
                    className="w-full px-4 py-3 bg-black/30 border border-neon-blue/30 rounded-lg focus:outline-none focus:border-neon-blue focus:shadow-neon-blue transition-all cursor-text relative z-10 text-white placeholder-gray-500" 
                    required
                    autoComplete="email"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1 ml-1 text-gray-300">
                  Message
                </label>
                <textarea 
                  id="message"
                  name="message"
                  value={message}
                  onChange={handleChange}
                  onClick={(e) => e.stopPropagation()}
                  rows={5}
                  className="w-full px-4 py-3 bg-black/30 border border-neon-blue/30 rounded-lg focus:outline-none focus:border-neon-blue focus:shadow-neon-blue transition-all cursor-text relative z-10 text-white placeholder-gray-500 resize-none" 
                  required
                />
              </div>
              
              <div className="flex items-center justify-between">
                {error && (
                  <div className={`text-sm ${error.includes("succès") ? 'text-green-400' : 'text-red-400'}`}>
                    {error}
                  </div>
                )}
                
                <SoundButton
                  type="submit"
                  disabled={submitted}
                  className={`px-6 py-3 bg-neon-blue/20 hover:bg-neon-blue/30 border border-neon-blue/50 text-neon-blue rounded-lg font-display font-medium transition-all shadow-inner hover:shadow-neon-blue ml-auto ${submitted ? 'opacity-70 cursor-not-allowed' : ''} relative overflow-hidden group scanner-effect`}
                >
                  {submitted ? (
                    <div className="flex items-center">
                      <div className="w-5 h-5 border-t-2 border-r-2 border-neon-blue rounded-full animate-spin mr-2" />
                      <span>Envoi...</span>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <span className="relative z-10">Envoyer</span>
                      <Send size={16} className="ml-2 relative z-10" />
                      <div className="absolute inset-0 w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r from-transparent to-neon-blue/20 rounded-lg" />
                    </div>
                  )}
                </SoundButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;