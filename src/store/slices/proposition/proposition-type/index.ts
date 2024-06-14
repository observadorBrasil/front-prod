import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PropositionType } from "@prisma/client";
import { RootState } from "../../../../../src/store";

export type PropositionTypeState = {
  propositionTypes: PropositionType[];
  loading: boolean;
};

export const propositionTypeInitialState: PropositionTypeState = {
  loading: false,
  propositionTypes: [],
};

export const propositionTypeSlice = createSlice({
  name: "propositionType",
  initialState: propositionTypeInitialState,
  reducers: {
    reset: () => propositionTypeInitialState,
    setPropositionTypes: (state, action: PayloadAction<PropositionType[]>) => {
      state.propositionTypes = action.payload;
    },
  },
});

export const PropositionTypeActions = propositionTypeSlice.actions;
export const propositionType = propositionTypeSlice.reducer;
export const selectPropositionType = (state: RootState) =>
  state.propositionType;
