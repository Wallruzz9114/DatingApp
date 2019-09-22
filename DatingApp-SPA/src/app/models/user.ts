import { Photo } from './photo';

export interface User {

  id: number;
  username: string;
  alias: string;
  age: number;
  dateCreated: Date;
  lastActive: Date;
  photoURL: string;
  city: string;
  country: string;
  interests?: string;
  about?: string;
  lookingFor?: string;
  photos?: Photo[];
  gender: string;

}
