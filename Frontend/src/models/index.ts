export interface Sede {
  id: number;
  name: string;
  address: string;
  horario: string;
}

export interface Movie {
  id: number;
  title: string;
  genre: string;
  color: string;
  image?: string;
  duration?: string;
  rating?: string;
  date?: string;
}
