
// Definição dos tipos para templates
export interface ThemeTemplate {
  id: string;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  buttonTextColor?: string;
  menuTextColor?: string;
}

// Definição para CSS Variables
export interface CSSVariables {
  [key: string]: string;
}
