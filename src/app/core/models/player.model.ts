export interface Player {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  phone: string;
  picture: string;
  country: string;
  state: string;
  city: string;
  score: number;
}

export interface RandomUserResponse {
  results: RandomUserResult[];
  info: { seed: string; results: number; page: number; version: string };
}

export interface RandomUserResult {
  name: { first: string; last: string };
  email: string;
  dob: { age: number };
  phone: string;
  picture: { large: string; medium: string; thumbnail: string };
  location: { country: string; state: string; city: string };
}
