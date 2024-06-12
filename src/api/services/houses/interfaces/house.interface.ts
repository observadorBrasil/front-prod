import { House, HouseType } from "@prisma/client";

export interface HouseInterface extends House {
  houseType: HouseType;
}
