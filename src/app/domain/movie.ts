import {Genre} from "./genre";
import {Rating} from "./rating";

export interface Movie {
  id: number;
  name: string;
  length: number;
  releaseYear: number;
  description: string;
  director: string;
  actors: string;
  audio: string;
  subtitles: string;
  added: Date;
  premiered: boolean;
  active: boolean;
  imagepath: string;
  trailerurl: string;

  genres: Set<Genre>;
  ratings: Set<Rating>;

  averageRating: number;
}
