import { ApiRepository } from "../..";
import { ApiRequestWrapperResponse } from "../../interfaces/api-request-wrapper-response.interface";
import { CreateUserInterface } from "./interfaces/user-client.interface";
import {
  UserInterface,
  LoginRequest,
  LoginResponse,
} from "./interfaces/user.interface";

export async function createUser(params: any): Promise<any> {
  const api = new ApiRepository("/user");
  const res = await api.apiRequestWrapper<any>({
    method: "post",
    url: "/",
    data: params,
  });

  return res;
}
export async function login(params: LoginRequest) {
  const api = new ApiRepository("/auth");
  const res = await api.apiRequestWrapper<LoginResponse>({
    method: "post",
    url: "/login",
    data: params,
  });

  return res;
}

export async function getAllUsers() {
  const api = new ApiRepository("/user");
  const res = await api.apiRequestWrapper<{ users: UserInterface[] }>({
    method: "get",
    url: "/",
  });

  return res;
}

export async function deleteUserById(userId: number) {
  const api = new ApiRepository("/user");
  const res = await api.apiRequestWrapper<UserInterface>({
    method: "delete",
    url: `/${userId}`,
  });

  return res;
}
