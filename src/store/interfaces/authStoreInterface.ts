import type { User } from "../../interfaces/userInterface";

export interface AuthStoreInterface {
  user: User;
  token: string;
  isAuth: boolean;

  signIn: (user: User, token: string) => void;
  signOut: () => void;
}