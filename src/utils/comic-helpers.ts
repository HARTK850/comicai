
export interface ComicPanel {
  id: string;
  text: string;
  imageStyle: string;
  dialogues: string[];
  position: number;
}

export const splitTextToPanels = (text: string): string[] => {
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const panels: string[] = [];
  
  for (let i = 0; i < sentences.length; i += 2) {
    const panelText = sentences.slice(i, i + 2).join('. ').trim();
    if (panelText) {
      panels.push(panelText);
    }
  }
  
  return panels;
};

export const validateApiKey = (key: string): boolean => {
  return key.trim().length > 0;
};

export const createNewPanel = (position: number, style: string = "comic"): ComicPanel => {
  return {
    id: Date.now().toString(),
    text: "הזן טקסט לפנל החדש...",
    imageStyle: style,
    dialogues: [],
    position
  };
};
