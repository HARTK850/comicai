
export interface User {
  username: string;
  apiKey?: string;
}

export interface StoryGenre {
  value: string;
  label: string;
}

export interface StoryLength {
  value: string;
  label: string;
}

export interface ArtStyle {
  value: string;
  label: string;
  preview: string;
}

export interface ComicPanel {
  id: string;
  text: string;
  imageStyle: string;
  dialogues: string[];
  position: number;
}

export interface ProjectStats {
  totalComics: number;
  totalUsers: number;
  apiCalls: number;
}
