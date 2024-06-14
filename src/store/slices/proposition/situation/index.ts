import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Situation } from "@prisma/client";
import { RootState } from "../../../../../src/store";

export type SimpleSearchFormState = {
  situations: Situation[];
  loading: boolean;
};

export const situationInitialState: SimpleSearchFormState = {
  loading: false,
  situations: [],
};

export const situationSlice = createSlice({
  name: "situation",
  initialState: situationInitialState,
  reducers: {
    reset: () => situationInitialState,
    setSituations: (state, action: PayloadAction<Situation[]>) => {
      state.situations = action.payload;
    },
  },
});

export const SituationActions = situationSlice.actions;
export const situation = situationSlice.reducer;
export const selectSituation = (state: RootState) => state.situation;
