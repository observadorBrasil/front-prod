import { User } from "@prisma/client";

export interface UserInterface extends Omit<User, "password"> {
  accessToken: string;
}

export interface LoginRequest {
  username: string; //email
  password: string;
}

export interface LoginResponse {
  accessToken: string;
}

export interface CreateUserRequest {
  email: string;
  password: string;
}
