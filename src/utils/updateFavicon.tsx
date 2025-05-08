
import { useEffect } from 'react';

export function useFavicon() {
  useEffect(() => {
    // Check for favicon in localStorage
    const savedTexts = localStorage.getItem('siteTexts');
    if (savedTexts) {
      const parsedTexts = JSON.parse(savedTexts);
      if (parsedTexts.faviconUrl) {
        const link = document.querySelector("link[rel*='icon']") as HTMLLinkElement;
        if (link) {
          link.href = parsedTexts.faviconUrl;
        } else {
          const newLink = document.createElement('link');
          newLink.rel = 'icon';
          newLink.href = parsedTexts.faviconUrl;
          document.head.appendChild(newLink);
        }
      }
    }
  }, []);
  
  return null;
}
