
import { ThemeTemplate } from './types';

export const defaultTemplates: ThemeTemplate[] = [
  {
    id: 'default',
    name: 'IAdmin (Padrão)',
    primaryColor: '#FF196E', // Rosa forte
    secondaryColor: '#2D0A16', // Roxo escuro
    accentColor: '#FF4F8E', // Rosa claro
    backgroundColor: '#FFFFFF', // Branco
    textColor: '#222222', // Preto
    buttonTextColor: '#FFFFFF', // Branco
    menuTextColor: '#FFFFFF' // Branco
  },
  {
    id: 'modern-dark',
    name: 'Moderno Escuro',
    primaryColor: '#6A5AE0', // Roxo
    secondaryColor: '#1A1F2C', // Azul escuro
    accentColor: '#9B87F5', // Roxo claro
    backgroundColor: '#0F1117', // Preto azulado
    textColor: '#FFFFFF', // Branco
    buttonTextColor: '#FFFFFF', // Branco
    menuTextColor: '#FFFFFF' // Branco
  },
  {
    id: 'modern-light',
    name: 'Moderno Claro',
    primaryColor: '#5D5FEF', // Roxo azulado
    secondaryColor: '#F3F4F6', // Cinza claro
    accentColor: '#8286FF', // Azul claro
    backgroundColor: '#FFFFFF', // Branco
    textColor: '#111827', // Preto
    buttonTextColor: '#FFFFFF', // Branco
    menuTextColor: '#FFFFFF' // Branco
  }
];
