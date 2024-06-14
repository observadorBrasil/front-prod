/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../..'
import { Client } from '@prisma/client'

interface ClientModalInitialStateProps {
  isOpen: boolean
  isCreate: boolean
  client: Client | null
  modalProps: Record<string, unknown>
}

const clientModalInitialState: ClientModalInitialStateProps = {
  isOpen: false,
  isCreate: true,
  client: null as Client | null,
  modalProps: {},
}
const clientModalSlice = createSlice({
  name: 'clientModal',
  initialState: clientModalInitialState,
  reducers: {
    onOpen: (
      state,
      action: PayloadAction<{ isCreate: boolean; client: Client | null }>,
    ) => {
      state.isOpen = true
      state.isCreate = action.payload.isCreate
      state.client = action.payload.client
      state.modalProps = action.payload
    },
    onClose: (state) => {
      state.isOpen = false
      state.modalProps = {}
    },
  },
})

export const { onOpen, onClose } = clientModalSlice.actions
export const clientModal = clientModalSlice.reducer
export const selectClientModal = (state: RootState) => state.clientModal
