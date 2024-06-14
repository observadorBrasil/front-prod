import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Prisma } from "@prisma/client";
import { PropositionInterface } from "../../../../src/api/services/propositions/interfaces/proposition.interface";
import { RootState } from "../..";

export type PropositionState = {
  data?: PropositionInterface;
  loading: boolean;
  metaDataLoading: boolean;
};

export const initialState: PropositionState = {
  data: undefined,
  loading: false,
  metaDataLoading: false,
};

export const propositionSlice = createSlice({
  name: "proposition",
  initialState,
  reducers: {
    refreshPropositionData: (state) => state,
    setPropositionData: (
      state,
      action: PayloadAction<PropositionInterface>
    ) => {
      state.data = action.payload;
    },
    requestGetPropositionById: (
      state,
      action: PayloadAction<{ propositionId: number }>
    ) => {
      state.loading = true;
    },
    successfulGetPropositionById: (
      state,
      action: PayloadAction<PropositionInterface>
    ) => {
      state.loading = false;
      state.data = action.payload;
    },
    failedGetPropositionById: (state) => {
      state.loading = false;
    },
    requestPatchProposition: (
      state,
      action: PayloadAction<{
        propositionId: number;
        data: Prisma.PropositionUpdateInput;
      }>
    ) => {
      state.metaDataLoading = true;
    },
    sucessfulPatchProposition: (state) => {
      state.metaDataLoading = false;
    },
    failedPatchProposition: (state) => {
      state.metaDataLoading = false;
    },
  },
});

// Exportando acoes criadas pelo RTK
export const PropositionActions = propositionSlice.actions;

// exporting the reducer here, as we need to add this to the store
export default propositionSlice.reducer;

// Selector para pegar state do usuario da store
export const selectProposition = (state: RootState) => state.proposition;
