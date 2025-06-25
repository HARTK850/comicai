
// Type definitions for the comic creator

export interface User {
  id: string;
  username: string;
  email?: string;
  createdAt: Date;
  lastLogin: Date;
}

export interface ComicPanel {
  id: string;
  text: string;
  imageUrl?: string;
  imageStyle: ArtStyle;
  dialogues: string[];
  position: number;
  backgroundColor?: string;
  borderStyle?: string;
}

export interface Comic {
  id: string;
  title: string;
  story: string;
  panels: ComicPanel[];
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  isPublic: boolean;
  tags: string[];
  rating?: number;
  views: number;
}

export interface StoryGeneration {
  prompt: string;
  genre: StoryGenre;
  length: StoryLength;
  generatedText: string;
  timestamp: Date;
}

export type ArtStyle = 
  | 'comic'
  | 'anime' 
  | 'realistic'
  | 'cartoon'
  | 'watercolor'
  | 'sketch';

export type StoryGenre = 
  | 'adventure'
  | 'comedy'
  | 'drama'
  | 'fantasy'
  | 'mystery'
  | 'romance'
  | 'scifi'
  | 'superhero';

export type StoryLength = 
  | 'short'
  | 'medium'
  | 'long';

export interface ApiKeySettings {
  geminiApiKey: string;
  isValid: boolean;
  lastValidated: Date;
}

export interface UserSettings {
  language: 'he' | 'en';
  theme: 'light' | 'dark';
  defaultArtStyle: ArtStyle;
  autoSave: boolean;
  notifications: boolean;
}

export interface Analytics {
  totalComics: number;
  totalUsers: number;
  comicsCreatedToday: number;
  activeUsers: number;
  popularGenres: Record<StoryGenre, number>;
  averageRating: number;
}

export interface Feedback {
  id: string;
  userId: string;
  comicId?: string;
  rating: number;
  comment: string;
  category: 'bug' | 'feature' | 'general';
  status: 'pending' | 'reviewed' | 'resolved';
  createdAt: Date;
}
