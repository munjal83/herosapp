import { Photo } from './photo';

export interface Hero {
  id: number;
  username: string;
  photoUrl: string;
  age: number;
  knownAs: string;
  createdAt: Date;
  lastActive: Date;
  gender: string;
  introduction: string;
  lookingFor: string;
  interests: string;
  city: string;
  country: string;
  photos: Photo[];
}
