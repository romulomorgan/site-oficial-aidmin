
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
  // Adicionando 8 novos templates modernos
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
  }
];
