import { ReactElement } from 'react';

export type GetPolaroidsResponse = {
  polaroids: PolaroidResponse[];
};

export type GetPolaroidsRequest = {
  top: number;
  previous_ids: string[];
};

type Polaroid = {
  id: string;
  image: string;
  context: string;
  tags: string[];
  views: number;
  comments: number;
  type: 'text-image' | 'text' | 'match' | 'premium-match';
  reactions: Reaction[];
  media_path: string;
  post?: string;
};

type PolaroidResponse = {
  id: string;
  is_image: boolean;
  media_path?: string;
  movie?: string;
  score: number;
  speaker_name?: string;
  author_name?: string;
  book_name?: string;
  text: string;
  media_file?: any;
  keyphrases: Keyphrase[];
  keywords: Keyword[];
  type: 'movie' | 'book';
};

type Reaction = {
  id: string;
  type: 'like' | 'fire' | 'one-hundred';
  count: number;
};

export type Keyword = {
  id: number;
  word: string;
};

export type Keyphrase = {
  id: number;
  phrase: string;
};
