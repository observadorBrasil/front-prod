import { ApiRepository } from "../..";
import {
  Prisma,
  Proposition,
  PropositionType,
  Situation,
} from "@prisma/client";
import { PropositionInterface } from "./interfaces/proposition.interface";

export async function getPropositionById(id: number) {
  const api = new ApiRepository("/proposition");
  const res = await api.apiRequestWrapper<Proposition>({
    method: "get",
    url: `/${id}`,
  });

  return res;
}

export async function getPropositionTypes() {
  const api = new ApiRepository("/proposition");
  const res = await api.apiRequestWrapper<PropositionType[]>({
    method: "get",
    url: `/type`,
  });

  return res;
}

export async function getPropositionSituations() {
  const api = new ApiRepository("/proposition");
  const res = await api.apiRequestWrapper<Situation[]>({
    method: "get",
    url: `/situation`,
  });

  return res;
}

export async function patchProposition(
  propositionId: number,
  data: Prisma.PropositionUpdateInput
) {
  const api = new ApiRepository("/proposition");
  const res = await api.apiRequestWrapper<PropositionInterface>({
    method: "patch",
    url: `/${propositionId}`,
    data,
  });

  return res;
}

export async function simpleSearchProposition(
  propositionType: string,
  skip = 0,
  take = 10
) {
  const api = new ApiRepository("/proposition");
  const res = await api.apiRequestWrapper<PropositionInterface[]>({
    method: "get",
    url: `/simple/search?skip=${skip}&take=${take}&type=${propositionType}`,
  });

  return res;
}

export async function exportFolderPropositions(folderId: number) {
  const api = new ApiRepository("/proposition");
  const res = await api.apiRequestWrapper<PropositionInterface[]>({
    method: "get",
    url: `/folder/${folderId}`,
  });

  return res;
}
