
import { useState, useEffect } from 'react';
import { fetchSiteTexts } from './supabaseClient';

export function useFavicon() {
  const [faviconUrl, setFaviconUrl] = useState<string | null>(null);

  useEffect(() => {
    const loadFavicon = async () => {
      try {
        // Tentar carregar do Supabase primeiro
        const siteTexts = await fetchSiteTexts();
        
        if (siteTexts && siteTexts.faviconUrl) {
          setFaviconUrl(siteTexts.faviconUrl as string);
        } else {
          // Fallback para localStorage
          const savedTexts = localStorage.getItem('siteTexts');
          if (savedTexts) {
            const parsedTexts = JSON.parse(savedTexts);
            if (parsedTexts.faviconUrl) {
              setFaviconUrl(parsedTexts.faviconUrl);
            }
          }
        }
      } catch (error) {
        console.error('Erro ao carregar favicon:', error);
      }
    };

    loadFavicon();
  }, []);

  useEffect(() => {
    if (faviconUrl) {
      const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
      link.type = 'image/png';
      link.rel = 'shortcut icon';
      link.href = faviconUrl;
      document.getElementsByTagName('head')[0].appendChild(link);
    }
  }, [faviconUrl]);

  return faviconUrl;
}
