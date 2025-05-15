
import { useState } from 'react';
import { toast } from 'sonner';
import { fetchSiteTexts, updateSiteText } from '@/utils/supabaseClient';
import { SiteTextsState } from './types';

export function useSiteTexts() {
  const [faviconUrl, setFaviconUrl] = useState("");
  const [webhookUrl, setWebhookUrl] = useState("");
  const [robotImage, setRobotImage] = useState("");
  const [contactImage, setContactImage] = useState("");
  const [siteTitle, setSiteTitle] = useState("");
  const [copyrightText, setCopyrightText] = useState("");
  const [embedButtonColor, setEmbedButtonColor] = useState("#FF196E");
  const [embedButtonIcon, setEmbedButtonIcon] = useState("chat");

  const loadSiteTexts = async () => {
    try {
      const texts = await fetchSiteTexts();
      if (texts) {
        if (texts.faviconUrl) setFaviconUrl(texts.faviconUrl as string);
        if (texts.webhookUrl) setWebhookUrl(texts.webhookUrl as string);
        if (texts.robotImage) setRobotImage(texts.robotImage as string);
        if (texts.contactImage) setContactImage(texts.contactImage as string);
        if (texts.siteTitle) setSiteTitle(texts.siteTitle as string);
        if (texts.copyrightText) setCopyrightText(texts.copyrightText as string);
        if (texts.embedButtonColor) setEmbedButtonColor(texts.embedButtonColor as string);
        if (texts.embedButtonIcon) setEmbedButtonIcon(texts.embedButtonIcon as string);
      }
    } catch (error) {
      console.error('Erro ao carregar textos do site:', error);
      toast.error('Erro ao carregar textos do site');
    }
  };

  const saveSiteTexts = async () => {
    try {
      await Promise.all([
        updateSiteText('faviconUrl', faviconUrl),
        updateSiteText('webhookUrl', webhookUrl),
        updateSiteText('robotImage', robotImage),
        updateSiteText('contactImage', contactImage),
        updateSiteText('siteTitle', siteTitle),
        updateSiteText('copyrightText', copyrightText),
        updateSiteText('embedButtonColor', embedButtonColor),
        updateSiteText('embedButtonIcon', embedButtonIcon)
      ]);
      return true;
    } catch (error) {
      console.error('Erro ao salvar textos do site:', error);
      return false;
    }
  };

  return {
    faviconUrl,
    webhookUrl,
    robotImage,
    contactImage,
    siteTitle,
    copyrightText,
    embedButtonColor,
    embedButtonIcon,
    setFaviconUrl,
    setWebhookUrl,
    setRobotImage,
    setContactImage,
    setSiteTitle,
    setCopyrightText,
    setEmbedButtonColor,
    setEmbedButtonIcon,
    loadSiteTexts,
    saveSiteTexts
  };
}
