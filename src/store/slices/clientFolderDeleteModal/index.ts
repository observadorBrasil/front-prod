/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const clientFolderDeleteModalInitialState = {
  isOpen: false,
  clientId: null,
  folderId: null,
}

const clientFolderDeleteModalSlice = createSlice({
  name: 'clientFolderDeleteModal',
  initialState: clientFolderDeleteModalInitialState,
  reducers: {
    onOpenDeleteModal: (state, action: PayloadAction<any>) => {
      state.isOpen = true
      state.clientId = action.payload.clientId
      state.folderId = action.payload.folderId
    },
    onCloseDeleteModal: (state) => {
      state.isOpen = false
      state.clientId = null
      state.folderId = null
    },
  },
})

export const { onOpenDeleteModal, onCloseDeleteModal } =
  clientFolderDeleteModalSlice.actions
export const clientFolderDeleteModal = clientFolderDeleteModalSlice.reducer
