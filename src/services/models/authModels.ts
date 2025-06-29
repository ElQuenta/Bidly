import type { User } from "../../interfaces/userInterface";

export interface signInResponse {
  user: User;
  token: string;
}

export interface signUpRequest {
  name: string;
  lastname: string;
  nickname: string;
  email: string;
  password: string;
  role: string;
  avatar?: string | null;
}