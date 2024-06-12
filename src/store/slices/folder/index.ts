import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Prisma } from "@prisma/client";
import { RootState } from "../..";

export type FolderState = {
  loading: boolean;
};

export const initialState: FolderState = {
  loading: false,
};

export const folderSlice = createSlice({
  name: "folder",
  initialState,
  reducers: {
    requestFolderUpdate: (
      state,
      action: PayloadAction<{
        folderId: number;
        data: Prisma.FolderUpdateInput;
      }>
    ) => {
      state.loading = true;
    },
    successfulFolderUpdate: (state) => {
      state.loading = false;
    },
    failedFolderUpdate: (state) => {
      state.loading = false;
    },
  },
});

// Exportando acoes criadas pelo RTK
export const FolderActions = folderSlice.actions;

// exporting the reducer here, as we need to add this to the store
export default folderSlice.reducer;

// Selector para pegar state do usuario da store
export const selectFolder = (state: RootState) => state.folder;
