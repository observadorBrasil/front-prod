import { Prisma } from "@prisma/client";
import { ApiRepository } from "../..";
import { PropositionInterface } from "../propositions/interfaces/proposition.interface";

export async function createTechnicalNote(data: Prisma.NotaTecnicaCreateInput) {
  const api = new ApiRepository("/nota-tecnica");
  const res = await api.apiRequestWrapper<PropositionInterface>({
    method: "post",
    url: `/`,
    data,
  });

  return res;
}

export async function updateTechnicalNote(
  technicalNoteId: number,
  data: Prisma.NotaTecnicaUpdateInput
) {
  const api = new ApiRepository("/nota-tecnica");
  const res = await api.apiRequestWrapper<PropositionInterface>({
    method: "patch",
    url: `/${technicalNoteId}`,
    data,
  });

  return res;
}

export async function removeTechnicalNote(technicalNoteId: number) {
  const api = new ApiRepository("/nota-tecnica");
  const res = await api.apiRequestWrapper<PropositionInterface>({
    method: "delete",
    url: `/${technicalNoteId}`,
    data: {},
  });

  return res;
}
