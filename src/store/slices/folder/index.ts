/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Folder, Prisma } from '@prisma/client'
import { RootState } from '../..'

export type FolderState = {
  folders: Folder[]
  clientId: number | null
  loading: boolean
}

export const initialState: FolderState = {
  folders: [],
  clientId: null,
  loading: false,
}

export const folderSlice = createSlice({
  name: 'folder',
  initialState,
  reducers: {
    requestFolders: (state, action: PayloadAction<any>) => {
      state.loading = true
      state.clientId = action.payload.clientId
    },
    successfulFolderRequest: (state, action: PayloadAction<any>) => {
      state.loading = false
      state.folders = action.payload.folders
    },
    searchFolders: (state, action: PayloadAction<any>) => {
      state.loading = true
      state.folders = action.payload.folders
    },
    deleteFolder: (state, action: PayloadAction<any>) => {
      state.folders = state.folders.filter(
        (f) => f.id !== action.payload.folderId,
      )
    },
    editFolder: (state, action: PayloadAction<any>) => {
      const { folderId, data } = action.payload
      const folders = state.folders
      const index = folders.findIndex((f) => f.id === folderId)
      if (index !== -1) {
        const updateFolder = { ...state.folders[index], ...data }

        state.folders = [
          ...state.folders.slice(0, index),
          updateFolder,
          ...state.folders.slice(index + 1),
        ]
      }
    },
    requestFolderUpdate: (
      state,
      action: PayloadAction<{
        folderId: number
        data: Prisma.FolderUpdateInput
      }>,
    ) => {
      console.log(action)
      state.loading = true
    },
    successfulFolderUpdate: (state) => {
      state.loading = false
    },
    failedFolderUpdate: (state) => {
      state.loading = false
    },
  },
})

// Exportando acoes criadas pelo RTK
export const FolderActions = folderSlice.actions

// exporting the reducer here, as we need to add this to the store
export default folderSlice.reducer

// Selector para pegar state do usuario da store
export const selectFolder = (state: RootState) => state.folder
