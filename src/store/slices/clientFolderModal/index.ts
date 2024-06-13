/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../..'

const clientFolderModalInitialState = {
  isOpen: false,
  clientId: null,
  folderId: null,
  isCreate: true,
  modalProps: {},
}
const clientFolderModalSlice = createSlice({
  name: ' clientFolderModal',
  initialState: clientFolderModalInitialState,
  reducers: {
    onOpen: (state, action: PayloadAction<any>) => {
      state.isOpen = true
      state.clientId = action.payload.clientId
      state.folderId = action.payload.folderId
      state.isCreate = action.payload.isCreate
      state.modalProps = action.payload
    },
    onClose: (state) => {
      state.isOpen = false
      state.clientId = null
      state.folderId = null
      state.modalProps = {}
    },
  },
})

export const { onOpen, onClose } = clientFolderModalSlice.actions
export const clientFolderModal = clientFolderModalSlice.reducer
export const selectFolderModal = (state: RootState) => state.clientFolderModal
