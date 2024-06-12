import { ApiRepository } from "../..";
import { SearchResultStatus } from "@prisma/client";
import { SearchResultInterface } from "./interfaces/search-result.interface";

export async function getNewSearchResults() {
  const api = new ApiRepository("/search-result");
  const res = await api.apiRequestWrapper<SearchResultInterface[]>({
    method: "get",
    url: `/`,
  });

  return res;
}

export async function getResultsBySearchId(id: number, query: string) {
  const api = new ApiRepository("/search-result");
  const res = await api.apiRequestWrapper<SearchResultInterface[]>({
    method: "get",
    url: `/search/${id}?query=${query}`,
  });

  return res;
}

export async function getSearchResultStatuses() {
  const api = new ApiRepository("/search-result");
  const res = await api.apiRequestWrapper<SearchResultStatus[]>({
    method: "get",
    url: `/status`,
  });

  return res;
}

export async function updateResultById(id: number, status: "read" | "ignored") {
  const statusIds = { read: 2, ignored: 3 };
  const data = { searchResultStatusId: statusIds[status] };

  const api = new ApiRepository("/search-result");
  const res = await api.apiRequestWrapper<SearchResultInterface>({
    method: "patch",
    url: `/${id}`,
    data,
  });

  return res;
}
