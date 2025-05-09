
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
  }
];
