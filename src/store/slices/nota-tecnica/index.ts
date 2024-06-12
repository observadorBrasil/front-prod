import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Prisma } from "@prisma/client";
import { RootState } from "../..";

export type NotaTecnicaState = {
  loading: boolean;
  error: boolean;
  updatedTechnicalNoteId: number | null;
  removingTechnicalNoteId: number | null;
};

export const initialState: NotaTecnicaState = {
  loading: false,
  error: false,
  updatedTechnicalNoteId: null,
  removingTechnicalNoteId: null,
};

export const technicalNoteSlice = createSlice({
  name: "folder",
  initialState,
  reducers: {
    requestTechnicalNoteCreation: (
      state,
      action: PayloadAction<{
        data: Prisma.NotaTecnicaCreateInput;
      }>
    ) => {
      state.loading = true;
    },
    successfulTechnicalNoteCreation: (state) => {
      state.loading = false;
      state.error = false;
    },
    failedTechnicalNoteCreation: (state) => {
      state.loading = false;
      state.error = true;
    },

    requestTechnicalNoteUpdate: (
      state,
      action: PayloadAction<{
        technicalNoteId: number;
        data: Prisma.NotaTecnicaUpdateInput;
      }>
    ) => {
      state.loading = true;
      state.updatedTechnicalNoteId = action.payload.technicalNoteId;
    },
    successfulTechnicalNoteUpdate: (state) => {
      state.loading = false;
      state.error = false;
      state.updatedTechnicalNoteId = null;
    },
    failedTechnicalNoteUpdate: (state) => {
      state.loading = false;
      state.error = true;
      state.updatedTechnicalNoteId = null;
    },

    requestTechnicalNoteRemoval: (
      state,
      action: PayloadAction<{
        technicalNoteId: number;
      }>
    ) => {
      state.loading = true;
      state.removingTechnicalNoteId = action.payload.technicalNoteId;
    },
    successfulTechnicalNoteRemoval: (state) => {
      state.loading = false;
      state.error = false;
      state.removingTechnicalNoteId = null;
    },
    failedTechnicalNoteRemoval: (state) => {
      state.loading = false;
      state.error = true;
      state.removingTechnicalNoteId = null;
    },
  },
});

// Exportando acoes criadas pelo RTK
export const TechnicalNoteActions = technicalNoteSlice.actions;

// exporting the reducer here, as we need to add this to the store
export default technicalNoteSlice.reducer;

// Selector para pegar state do usuario da store
export const selectTechnicalNote = (state: RootState) => state.technicalNote;
