import { ApiRepository } from "../..";
import { HouseInterface } from "./interfaces/house.interface";

export async function getHouses() {
  const api = new ApiRepository("/house");
  const res = await api.apiRequestWrapper<HouseInterface[]>({
    method: "get",
    url: `/`,
  });

  return res;
}
