import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HouseInterface } from "@observatorio-brasil/atores/src/api/services/houses/interfaces/house.interface";
import { RootState } from "../..";

export type HouseState = {
  loading: boolean;
  houses: HouseInterface[];
};

export const initialState: HouseState = {
  loading: false,
  houses: [],
};

export const houseSlice = createSlice({
  name: "house",
  initialState,
  reducers: {
    setHouses: (state, action: PayloadAction<HouseInterface[]>) => {
      state.houses = action.payload;
    },
  },
});

export const HouseActions = houseSlice.actions;
export default houseSlice.reducer;
export const selectHouse = (state: RootState) => state.house;
