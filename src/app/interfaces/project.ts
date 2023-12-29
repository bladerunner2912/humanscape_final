import { IImages } from './image';

export interface IProject {
  title: string;
  id: string;
  name: string;
  loc: string;
  place: string;
  completed: string;
  website: string;
  primaryImage: string;
  secondaryImage: string;
  bio: string;
  tagLine: string;
  artist: any;
  tagBio: string;
  images: Array<IImages>;
}
