
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/animations.css';
import { setupScrollAnimations, setupIntersectionObserver, applyCascadeAnimation } from '../utils/animations';

export const AnimationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    // Configurar animações baseadas em scroll
    const cleanupScroll = setupScrollAnimations();
    
    // Configurar observer para elementos com classe animate-on-scroll
    setupIntersectionObserver();
    
    // Aplicar animações em cascata para elementos na página atual
    applyCascadeAnimation('.cascade-item', 0.1);
    applyCascadeAnimation('.nav-item', 0.05);
    applyCascadeAnimation('.feature-card', 0.15);
    applyCascadeAnimation('.testimonial-card', 0.2);
    
    // Adicionar animações para seções principais
    setTimeout(() => {
      document.querySelectorAll('.hero-content').forEach(element => {
        element.classList.add('animate-visible');
      });
    }, 100);

    return () => {
      cleanupScroll();
    };
  }, [location.pathname]); // Re-executar quando a rota muda

  return <>{children}</>;
};

export default AnimationProvider;
