
// Utility para animar elementos conforme aparecem na viewport durante o scroll

export function setupScrollReveal(): void {
  // Verifica se estamos no navegador
  if (typeof window === 'undefined') return;

  // Função para verificar se o elemento está visível
  const checkVisibility = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      // Se o elemento está visível na viewport
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      } else {
        // Opcional: remover a classe quando sair da viewport
        // entry.target.classList.remove('visible');
      }
    });
  };

  // Opções para o Intersection Observer
  const options = {
    root: null, // viewport
    rootMargin: '0px',
    threshold: 0.1 // 10% do elemento deve estar visível
  };

  // Criação do observer
  const observer = new IntersectionObserver(checkVisibility, options);

  // Selecionando todos os elementos com classe 'reveal' ou 'scroll-fade'
  const revealElements = document.querySelectorAll('.reveal, .scroll-fade');
  revealElements.forEach((el) => {
    observer.observe(el);
  });
}

// Função para aplicar delay de animação em cascata
export function applyCascadeAnimations(selector: string, baseDelay: number = 0.1): void {
  const elements = document.querySelectorAll(selector);

  elements.forEach((el, index) => {
    if (el instanceof HTMLElement) {
      el.style.animationDelay = `${baseDelay * index}s`;
    }
  });
}
