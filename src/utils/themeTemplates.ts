
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
  // Adicionando 8 novos templates super modernos
  {
    id: "neon",
    name: "Neon",
    primaryColor: "#00F5A0",
    secondaryColor: "#000B1C",
    accentColor: "#00D9F5",
    backgroundColor: "#0A0A0A",
    textColor: "#FFFFFF",
    buttonTextColor: "#000B1C",
    menuTextColor: "#000B1C"
  },
  {
    id: "coral",
    name: "Coral",
    primaryColor: "#FF6F61",
    secondaryColor: "#455A64",
    accentColor: "#FFA07A",
    backgroundColor: "#FFFFFF",
    textColor: "#37474F",
    buttonTextColor: "#FFFFFF",
    menuTextColor: "#FFFFFF"
  },
  {
    id: "monochrome",
    name: "Monocromático",
    primaryColor: "#10101E",
    secondaryColor: "#303035",
    accentColor: "#494950",
    backgroundColor: "#F5F5F7",
    textColor: "#10101E",
    buttonTextColor: "#F5F5F7",
    menuTextColor: "#F5F5F7"
  },
  {
    id: "cyberpunk",
    name: "Cyberpunk",
    primaryColor: "#F4FA9C",
    secondaryColor: "#242582",
    accentColor: "#FB62F6",
    backgroundColor: "#121212",
    textColor: "#FFFFFF",
    buttonTextColor: "#121212",
    menuTextColor: "#121212"
  },
  {
    id: "wellness",
    name: "Bem-estar",
    primaryColor: "#78C091",
    secondaryColor: "#2C5741",
    accentColor: "#AAD9BB",
    backgroundColor: "#FAFBF6",
    textColor: "#383838",
    buttonTextColor: "#FFFFFF",
    menuTextColor: "#FFFFFF"
  },
  {
    id: "luxury",
    name: "Luxo",
    primaryColor: "#C9B037",
    secondaryColor: "#202020",
    accentColor: "#D4AF37",
    backgroundColor: "#FFFFFF",
    textColor: "#202020",
    buttonTextColor: "#FFFFFF",
    menuTextColor: "#FFFFFF"
  },
  {
    id: "autumn",
    name: "Outono",
    primaryColor: "#D96941",
    secondaryColor: "#592C1C",
    accentColor: "#F2A65A",
    backgroundColor: "#F8F4E9",
    textColor: "#402E32",
    buttonTextColor: "#FFFFFF",
    menuTextColor: "#FFFFFF"
  },
  {
    id: "future",
    name: "Futuro",
    primaryColor: "#3A86FF",
    secondaryColor: "#1E1E24",
    accentColor: "#8ECAE6",
    backgroundColor: "#F8F9FA",
    textColor: "#1E1E24",
    buttonTextColor: "#FFFFFF",
    menuTextColor: "#FFFFFF"
  }
];
