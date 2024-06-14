import { ApiRepository } from "../..";
import { Prisma } from "@prisma/client";
import { FolderInterface } from "./interfaces/folder.interface";
import { FolderWithClientAndPropositions } from "../../../../prisma/interfaces/folder";

export async function createFolder(data: Prisma.FolderUncheckedCreateInput) {
  const api = new ApiRepository("/folder");
  const res = await api.apiRequestWrapper<FolderInterface>({
    method: "post",
    url: `/`,
    data,
  });

  return res;
}

export async function getFolder(folderId: number) {
  const api = new ApiRepository("/folder");
  const res = await api.apiRequestWrapper<FolderInterface>({
    method: "get",
    url: `/${folderId}`,
  });

  return res;
}

export async function getFoldersByClientId(clientId: number) {
  const api = new ApiRepository("/folder");
  const res = await api.apiRequestWrapper<FolderInterface[]>({
    method: "get",
    url: `/client/${clientId}`,
  });

  return res;
}

export async function searchFolderByName(
  clientId: number,
  name: string,
  skip = 0,
  take = 10
) {
  const api = new ApiRepository("/folder");
  const res = await api.apiRequestWrapper<FolderInterface[]>({
    method: "get",
    url: `/search?skip=${skip}&take=${take}&clientId=${clientId}&name=${name}`,
  });

  return res;
}

export async function getFolderByIdsWithPropositions(
  folderId: string,
  clientId: string
) {
  const api = new ApiRepository("/folder");
  const res = await api.apiRequestWrapper<FolderWithClientAndPropositions>({
    method: "get",
    url: `/${folderId}/client/${clientId}/proposition`,
  });

  return res;
}

export async function patchFolder(
  folderId: number,
  data: Prisma.FolderUpdateInput
) {
  const api = new ApiRepository("/folder");
  const res = await api.apiRequestWrapper<FolderInterface>({
    method: "patch",
    url: `/${folderId}`,
    data,
  });

  return res;
}

export async function deleteFolder(folderId: number) {
  const api = new ApiRepository("/folder");
  const res = await api.apiRequestWrapper<FolderInterface>({
    method: "delete",
    url: `/${folderId}`,
  });

  return res;
}
