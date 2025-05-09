export interface ThemeTemplate {
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

export const defaultTemplates: ThemeTemplate[] = [
  {
    id: "default",
    name: "Padrão",
    primaryColor: "#FF196E",
    secondaryColor: "#2D0A16",
    accentColor: "#FF4F8E",
    backgroundColor: "#FFFFFF",
    textColor: "#222222",
    buttonTextColor: "#FFFFFF",
    menuTextColor: "#FFFFFF"
  },
  {
    id: "dark",
    name: "Escuro",
    primaryColor: "#4A148C",
    secondaryColor: "#12005E",
    accentColor: "#7C43BD",
    backgroundColor: "#121212",
    textColor: "#FFFFFF",
    buttonTextColor: "#FFFFFF",
    menuTextColor: "#FFFFFF"
  },
  {
    id: "blue",
    name: "Azul",
    primaryColor: "#1976D2",
    secondaryColor: "#004BA0",
    accentColor: "#63A4FF",
    backgroundColor: "#FFFFFF",
    textColor: "#222222",
    buttonTextColor: "#FFFFFF",
    menuTextColor: "#FFFFFF"
  },
  {
    id: "green",
    name: "Verde",
    primaryColor: "#2E7D32",
    secondaryColor: "#005005",
    accentColor: "#60AD5E",
    backgroundColor: "#FFFFFF",
    textColor: "#222222",
    buttonTextColor: "#FFFFFF",
    menuTextColor: "#FFFFFF"
  },
  {
    id: "orange",
    name: "Laranja",
    primaryColor: "#E65100",
    secondaryColor: "#AC1900",
    accentColor: "#FF833A",
    backgroundColor: "#FFFFFF",
    textColor: "#222222", 
    buttonTextColor: "#FFFFFF",
    menuTextColor: "#FFFFFF"
  },
  // 8 novos templates modernos
  {
    id: "minimalist",
    name: "Minimalista",
    primaryColor: "#000000",
    secondaryColor: "#333333",
    accentColor: "#666666",
    backgroundColor: "#FFFFFF",
    textColor: "#111111",
    buttonTextColor: "#FFFFFF",
    menuTextColor: "#FFFFFF"
  },
  {
    id: "nordic",
    name: "Nórdico",
    primaryColor: "#3A4750",
    secondaryColor: "#303841",
    accentColor: "#00ADB5",
    backgroundColor: "#EEEEEE",
    textColor: "#303841",
    buttonTextColor: "#FFFFFF",
    menuTextColor: "#FFFFFF"
  },
  {
    id: "sunset",
    name: "Pôr do Sol",
    primaryColor: "#F9A826",
    secondaryColor: "#F15BB5",
    accentColor: "#9B5DE5",
    backgroundColor: "#FEF9EF",
    textColor: "#333333",
    buttonTextColor: "#FFFFFF",
    menuTextColor: "#FFFFFF"
  },
  {
    id: "ocean",
    name: "Oceânico",
    primaryColor: "#006D77",
    secondaryColor: "#083D77",
    accentColor: "#00AFB9",
    backgroundColor: "#EDFAFD",
    textColor: "#212529",
    buttonTextColor: "#FFFFFF",
    menuTextColor: "#FFFFFF"
  },
  {
    id: "nature",
    name: "Natureza",
    primaryColor: "#588157",
    secondaryColor: "#3A5A40",
    accentColor: "#A3B18A",
    backgroundColor: "#F8F9FA",
    textColor: "#212529",
    buttonTextColor: "#FFFFFF",
    menuTextColor: "#FFFFFF"
  },
  {
    id: "tech",
    name: "Tecnologia",
    primaryColor: "#7209B7",
    secondaryColor: "#3A0CA3",
    accentColor: "#F72585",
    backgroundColor: "#0F0E17",
    textColor: "#FFFFFE",
    buttonTextColor: "#FFFFFF",
    menuTextColor: "#FFFFFF"
  },
  {
    id: "pastel",
    name: "Tons Pastéis",
    primaryColor: "#DEC0F1",
    secondaryColor: "#B79CED",
    accentColor: "#957FEF",
    backgroundColor: "#FBFBFE",
    textColor: "#452C63",
    buttonTextColor: "#FFFFFF",
    menuTextColor: "#FFFFFF"
  },
  {
    id: "professional",
    name: "Profissional",
    primaryColor: "#0466C8",
    secondaryColor: "#023E7D",
    accentColor: "#0353A4",
    backgroundColor: "#FFFFFF",
    textColor: "#212529",
    buttonTextColor: "#FFFFFF",
    menuTextColor: "#FFFFFF"
  },
  // Adicionando 5 novos templates modernos
  {
    id: "gradientPurple",
    name: "Gradiente Roxo",
    primaryColor: "#9b87f5",
    secondaryColor: "#7E69AB",
    accentColor: "#D6BCFA",
    backgroundColor: "#F8F9FC",
    textColor: "#1A1F2C",
    buttonTextColor: "#FFFFFF",
    menuTextColor: "#FFFFFF"
  },
  {
    id: "modernMinimal",
    name: "Minimalista Moderno",
    primaryColor: "#3A4750",
    secondaryColor: "#303841",
    accentColor: "#00ADB5",
    backgroundColor: "#F7F7F7",
    textColor: "#303841",
    buttonTextColor: "#FFFFFF",
    menuTextColor: "#FFFFFF"
  },
  {
    id: "vibrantGradient",
    name: "Gradiente Vibrante",
    primaryColor: "#8B5CF6",
    secondaryColor: "#D946EF",
    accentColor: "#F97316",
    backgroundColor: "#FFFFFF",
    textColor: "#452C63",
    buttonTextColor: "#FFFFFF",
    menuTextColor: "#FFFFFF"
  },
  {
    id: "softNature",
    name: "Natureza Suave",
    primaryColor: "#588157",
    secondaryColor: "#3A5A40",
    accentColor: "#A3B18A",
    backgroundColor: "#F2FCE2",
    textColor: "#344E41",
    buttonTextColor: "#FFFFFF",
    menuTextColor: "#FFFFFF"
  },
  {
    id: "oceanBreeze",
    name: "Brisa Oceânica",
    primaryColor: "#0EA5E9",
    secondaryColor: "#0284C7",
    accentColor: "#38BDF8",
    backgroundColor: "#F0F9FF",
    textColor: "#0C4A6E",
    buttonTextColor: "#FFFFFF",
    menuTextColor: "#FFFFFF"
  }
];
