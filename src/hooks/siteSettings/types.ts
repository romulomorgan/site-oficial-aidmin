
// Definições de tipos para configurações do site
export interface ColorTemplate {
  id: string;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  buttonTextColor: string;
  menuTextColor: string;
}

export interface SiteTextsState {
  faviconUrl: string;
  webhookUrl: string;
  robotImage: string;
  contactImage: string;
  siteTitle: string;
  copyrightText: string;
  embedButtonColor: string;
  embedButtonIcon: string;
}

export interface EmbedConfigState {
  embedCode: string;
  embedPosition: 'left' | 'right';
  embedActive: boolean;
}

export interface TemplateState {
  templates: ColorTemplate[];
  selectedTemplate: string;
  customTemplate: ColorTemplate;
  editingTemplate: ColorTemplate | null;
  openTemplateDialog: boolean;
}

export interface SiteSettingsState extends SiteTextsState, EmbedConfigState {
  templates: ColorTemplate[];
  selectedTemplate: string;
  customTemplate: ColorTemplate;
  editingTemplate: ColorTemplate | null;
  openTemplateDialog: boolean;
  isLoading: boolean;
  isInitialLoading: boolean;
  webhookLogs: any[];
}
