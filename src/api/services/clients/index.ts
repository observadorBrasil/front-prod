import { ClientWithFolder } from "@observatorio-brasil/atores/prisma/interfaces/client";
import { ApiRepository } from "../..";
import { ClientInterface } from "./interfaces/client.interface";

export async function createClient(params: FormData) {
  const api = new ApiRepository("/client");
  const res = await api.apiRequestWrapper<ClientInterface>({
    method: "post",
    url: "/",
    data: params,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res;
}

export async function getClientById(clientId: string) {
  const api = new ApiRepository("/client");
  const res = await api.apiRequestWrapper<ClientWithFolder>({
    method: "get",
    url: `/${clientId}`,
  });

  return res;
}

export async function searchClientByName(name: string, skip = 0, take = 10) {
  const api = new ApiRepository("/client");
  const res = await api.apiRequestWrapper<ClientInterface[]>({
    method: "get",
    url: `/search?skip=${skip}&take=${take}&name=${name}`,
  });

  return res;
}

export async function updateClient(clientId: number, data: FormData) {
  const api = new ApiRepository("/client");
  const res = await api.apiRequestWrapper<ClientInterface>({
    method: "patch",
    url: `/${clientId}`,
    data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res;
}

export async function deleteClient(clientId: number) {
  const api = new ApiRepository("/client");
  const res = await api.apiRequestWrapper<ClientInterface>({
    method: "delete",
    url: `/${clientId}`,
  });

  return res;
}
