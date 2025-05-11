
// Utility para animar elementos conforme aparecem na viewport durante o scroll

export const setupScrollAnimations = () => {
  // Verifica se estamos no navegador
  if (typeof window === 'undefined') return;

  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    const windowHeight = window.innerHeight;

    elements.forEach((element) => {
      if (element instanceof HTMLElement) {
        const elementPosition = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementPosition < windowHeight - elementVisible) {
          element.classList.add('animate-visible');
        } else {
          // Opcional: remover classe quando elemento sai da viewport
          // element.classList.remove('animate-visible');
        }
      }
    });
  };

  // Inicializa animações no carregamento da página
  animateOnScroll();
  
  // Adiciona listener para o scroll
  window.addEventListener('scroll', animateOnScroll);

  // Retorna função para remover listener (cleanup)
  return () => window.removeEventListener('scroll', animateOnScroll);
};

// Função para aplicar delay de animação em cascata para múltiplos elementos
export const applyCascadeAnimation = (selector: string, baseDelay: number = 0.1) => {
  const elements = document.querySelectorAll(selector);
  
  elements.forEach((element, index) => {
    if (element instanceof HTMLElement) {
      element.style.transitionDelay = `${baseDelay * index}s`;
      element.style.animationDelay = `${baseDelay * index}s`;
    }
  });
};

// Animar elementos quando se tornam visíveis
export const setupIntersectionObserver = () => {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

  const options = {
    root: null, // viewport
    rootMargin: '0px',
    threshold: 0.15 // 15% do elemento deve estar visível
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-visible');
      }
    });
  }, options);

  document.querySelectorAll('.animate-on-scroll').forEach(element => {
    observer.observe(element);
  });
};

// Hook para usar em componentes React
export const useAnimations = () => {
  return {
    setupScrollAnimations,
    applyCascadeAnimation,
    setupIntersectionObserver
  };
};
