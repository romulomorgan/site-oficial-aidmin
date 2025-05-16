
import React from 'react';
import { 
  LayoutDashboard, 
  MessageSquare, 
  Settings,
  Users, 
  MessageCircleQuestion,
  Layers,
  FileText
} from 'lucide-react';

export type MenuItem = {
  name: string;
  path: string;
  icon: React.ReactNode;
};

export const getMenuItems = (): MenuItem[] => [
  {
    name: 'Dashboard',
    path: '/admin',
    icon: <LayoutDashboard size={20} />,
  },
  {
    name: 'Seções da Home',
    path: '/admin/secoes',
    icon: <Layers size={20} />,
  },
  {
    name: 'Seções de Páginas',
    path: '/admin/paginas',
    icon: <FileText size={20} />,
  },
  {
    name: 'Depoimentos',
    path: '/admin/depoimentos',
    icon: <Users size={20} />,
  },
  {
    name: 'Perguntas Frequentes',
    path: '/admin/faq',
    icon: <MessageCircleQuestion size={20} />,
  },
  {
    name: 'Mensagens',
    path: '/admin/mensagens',
    icon: <MessageSquare size={20} />,
  },
  {
    name: 'Configurações',
    path: '/admin/configuracoes',
    icon: <Settings size={20} />,
  },
];
