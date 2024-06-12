import { Prisma } from "@prisma/client";
import { ApiRepository } from "../..";
import { PropositionInterface } from "../propositions/interfaces/proposition.interface";
import { PropositionFolderInterface } from "./interfaces/proposition-folder.interface";

export async function removePropositionFolderById(propositionFolderId: number) {
  const api = new ApiRepository("/proposition-folder");
  const res = await api.apiRequestWrapper<PropositionFolderInterface>({
    method: "delete",
    url: `/${propositionFolderId}`,
  });

  return res;
}

export async function createPropositionFolder(
  propositionId: number,
  folderId: number
) {
  const api = new ApiRepository("/proposition");
  const res = await api.apiRequestWrapper<PropositionInterface>({
    method: "patch",
    url: `/${propositionId}`,
    data: {
      folders: {
        create: {
          folderId: +folderId,
        },
      },
    },
  });

  return res;
}

export async function patchPropositionFolder(
  propositionFolderId: number,
  data: Prisma.PropositionFolderUpdateInput
) {
  const api = new ApiRepository("/proposition-folder");
  const res = await api.apiRequestWrapper<PropositionFolderInterface>({
    method: "patch",
    url: `/${propositionFolderId}`,
    data,
  });

  return res;
}
