
// Helper functions for the comic creator

export const generatePanelsFromStory = (story: string): string[] => {
  const sentences = story.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const panels: string[] = [];
  
  for (let i = 0; i < sentences.length; i += 2) {
    const panelText = sentences.slice(i, i + 2).join('. ').trim();
    if (panelText) {
      panels.push(panelText);
    }
  }
  
  return panels;
};

export const validateApiKey = (apiKey: string): boolean => {
  return apiKey.length > 10 && apiKey.startsWith('AIza');
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('he-IL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

export const saveToLocalStorage = (key: string, value: any): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const loadFromLocalStorage = (key: string): any => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return null;
  }
};

export const exportComicAsImage = (panels: string[]): void => {
  // This would be implemented to create an actual image export
  console.log('Exporting comic with panels:', panels);
};

export const generateStoryPrompt = (genre: string, length: string): string => {
  const prompts = {
    adventure: 'צור סיפור הרפתקאות מרגש על',
    comedy: 'צור סיפור קומי ומשעשע על',
    drama: 'צור סיפור דרמטי ומרגש על',
    fantasy: 'צור סיפור פנטזיה קסום על',
    mystery: 'צור סיפור מסתורין מותח על',
    romance: 'צור סיפור רומנטי על',
    scifi: 'צור סיפור מדע בדיוני על',
    superhero: 'צור סיפור על גיבור על'
  };

  const lengths = {
    short: 'קצר (4-6 משפטים)',
    medium: 'בינוני (8-10 משפטים)',
    long: 'ארוך (12-16 משפטים)'
  };

  return `${prompts[genre as keyof typeof prompts]} - ${lengths[length as keyof typeof lengths]}`;
};
