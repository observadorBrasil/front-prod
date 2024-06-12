import { ApiRepository } from "../..";
import { Prisma, Tramitacao } from "@prisma/client";

export async function patchTramitacao(
  id: number,
  data: Prisma.TramitacaoUpdateInput
) {
  const api = new ApiRepository("/tramitacao");
  const res = await api.apiRequestWrapper<Tramitacao>({
    method: "patch",
    url: `/${id}`,
    data,
  });

  return res;
}
