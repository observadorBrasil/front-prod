import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Prisma } from "@prisma/client";
import { RootState } from "../../../../../src/store";

export type PropositionFolderState = {
  loading: boolean;
  currentPropositionFolderId: number | null;
};

export const initialState: PropositionFolderState = {
  loading: false,
  currentPropositionFolderId: null,
};

export const propositionFolderSlice = createSlice({
  name: "propositionFolder",
  initialState,
  reducers: {
    requestRemovePropositionFolderById: (
      state,
      action: PayloadAction<{ propositionFolderId: number }>
    ) => {
      state.loading = true;
      state.currentPropositionFolderId = action.payload.propositionFolderId;
    },
    sucessfulRemovePropositionFolderById: (state) => {
      state.loading = false;
      state.currentPropositionFolderId = null;
    },
    failedRemovePropositionFolderById: (state) => {
      state.loading = false;
      state.currentPropositionFolderId = null;
    },

    requestCreatePropositionFolder: (
      state,
      action: PayloadAction<{ folderId: number; propositionId: number }>
    ) => {
      state.loading = true;
    },
    sucessfulCreatePropositionFolder: (state) => {
      state.loading = false;
    },
    failedCreatePropositionFolder: (state) => {
      state.loading = false;
    },

    requestUpdatePropositionFolder: (
      state,
      action: PayloadAction<{
        propositionFolderId: number;
        data: Prisma.PropositionFolderUpdateInput;
      }>
    ) => {
      state.loading = true;
    },
    successfulPropositionFolderUpdate: (state) => {
      state.loading = false;
    },
    failedPropositionFolderUpdate: (state) => {
      state.loading = false;
    },
  },
});

export const PropositionFolderActions = propositionFolderSlice.actions;
export default propositionFolderSlice.reducer;
export const selectPropositionFolder = (state: RootState) =>
  state.propositionFolder;
