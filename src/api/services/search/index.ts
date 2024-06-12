import { ApiRepository } from "../..";
import { Prisma, Search } from "@prisma/client";

export async function getSearches() {
  const api = new ApiRepository("/search");
  const res = await api.apiRequestWrapper<Search[]>({
    method: "get",
    url: `/`,
  });

  return res;
}

export async function getActiveSearches() {
  const api = new ApiRepository("/search");
  const res = await api.apiRequestWrapper<Search[]>({
    method: "get",
    url: `/active`,
  });

  return res;
}

export async function getSearchById(id: number) {
  const api = new ApiRepository("/search");
  const res = await api.apiRequestWrapper<Search>({
    method: "get",
    url: `/${id}`,
  });

  return res;
}

export async function createSearch(data: Prisma.SearchCreateInput) {
  const api = new ApiRepository("/search");
  const res = await api.apiRequestWrapper<Search>({
    method: "post",
    url: `/`,
    data,
  });

  return res;
}

export async function updateSearch(
  searchId: number,
  data: Prisma.SearchUpdateInput
) {
  const api = new ApiRepository("/search");
  const res = await api.apiRequestWrapper<Search>({
    method: "patch",
    url: `/${searchId}`,
    data,
  });

  return res;
}

export async function toggleActiveSearch(id: number, active: boolean) {
  const data = { active };
  const api = new ApiRepository("/search");
  const res = await api.apiRequestWrapper<Search>({
    method: "patch",
    url: `/${id}/active`,
    data,
  });

  return res;
}
