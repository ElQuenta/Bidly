import { v4 as uuidv4 } from "uuid";

import jsonServerInstance from "../api/jsonServerInstanceUsers";
import type { User } from "../interfaces/userInterface";
import type { signInResponse, signUpRequest } from "./models/authModels";

const AUTH_PATH = "users";

export const signIn = async (user: string, password: string): Promise<signInResponse> => {
  try {
    const params = user.includes('@')
      ? { email: user, password }
      : { nickname: user, password };

    const { data } = await jsonServerInstance.get<User[]>(AUTH_PATH, { params });
    if (data.length === 0) {
      throw new Error("Credenciales inválidas");
    }
    return {
      user: data[0],
      token: "jwt:123"
    } as signInResponse;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(`Error en login: ${err.message}`);
    }
    throw err;
  }
}

export const signUp = async ({
  nickname,
  name,
  lastname,
  email,
  password,
  role,
  avatar
}: signUpRequest): Promise<User> => {
  try {
    const { data: existingEmail } = await jsonServerInstance.get<User[]>(AUTH_PATH, {
      params: { email }
    })
    if (existingEmail.length > 0) {
      throw new Error('El correo ya está en uso')
    }
    const { data: existingNickname } = await jsonServerInstance.get<User[]>(AUTH_PATH, {
      params: { nickname }
    })
    if (existingNickname.length > 0) {
      throw new Error('El nickname ya está en uso')
    }
    const user = {
      id: uuidv4(),
      nickname,
      name,
      lastname,
      email,
      password,
      role,
      avatar
    } as User;
    const { data } = await jsonServerInstance.post(AUTH_PATH, user)
    return data
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(`Error en registro: ${err.message}`)
    }
    throw err
  }
}