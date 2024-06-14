import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { House } from "@prisma/client";
import { RootState } from "../../../../../src/store";

export type SimpleSearchFormState = {
  houses: House[];
  loading: boolean;
};

export const houseInitialState: SimpleSearchFormState = {
  loading: false,
  houses: [],
};

export const houseSlice = createSlice({
  name: "house",
  initialState: houseInitialState,
  reducers: {
    reset: () => houseInitialState,
    setHouses: (state, action: PayloadAction<House[]>) => {
      state.houses = action.payload;
    },
  },
});

export const HouseActions = houseSlice.actions;
export const house = houseSlice.reducer;
export const selectHouse = (state: RootState) => state.house;
