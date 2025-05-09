
import React, { useEffect } from 'react';
import { setupScrollReveal, applyCascadeAnimations } from './scrollReveal';

// Componente para carregar e aplicar animações
export const AnimationsLoader: React.FC = () => {
  useEffect(() => {
    // Aplicar detecção de scroll para animações
    setupScrollReveal();

    // Aplicar animações em cascata para menus, cards e listas
    applyCascadeAnimations('.nav-item', 0.1);
    applyCascadeAnimations('.card', 0.15);
    applyCascadeAnimations('.list-item', 0.08);

    // Adicionar classes aos elementos após carregamento da página
    const heroElements = document.querySelectorAll('.hero-section *');
    heroElements.forEach((el, index) => {
      if (el instanceof HTMLElement) {
        el.style.animationDelay = `${0.2 * index}s`;
        el.classList.add('fade-in');
      }
    });

    // Converter elementos com atributo data-animation
    const animatedElements = document.querySelectorAll('[data-animation]');
    animatedElements.forEach((el) => {
      if (el instanceof HTMLElement) {
        const animationType = el.getAttribute('data-animation');
        if (animationType) {
          el.classList.add(animationType);
          
          // Adicionar delay se especificado
          const delay = el.getAttribute('data-delay');
          if (delay && !isNaN(parseFloat(delay))) {
            el.style.animationDelay = `${delay}s`;
          }
        }
      }
    });
  }, []);

  return null;
};

// Hook para usar animações em componentes específicos
export const useAnimations = () => {
  useEffect(() => {
    // Aplicar animações específicas para o componente atual
    setupScrollReveal();
  }, []);
};

export default AnimationsLoader;
