/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../..'

interface MonitoringDeleteModalInitalStateProps {
    isOpen: boolean,
    filterId: null | number
}

const monitoringDeleteModalInitalState: MonitoringDeleteModalInitalStateProps = {
    isOpen: false,
    filterId: null
}

const monitoringDeleteModalSlice = createSlice({
  name: 'monitoringDeleteModal',
  initialState: monitoringDeleteModalInitalState,
  reducers: {
    onOpenDeleteModal: (state, action: PayloadAction<any>) => {
        state.isOpen = true
        state.filterId = action.payload.filterId
    },
    onCloseDeleteModal: (state) => {
        state.isOpen = false
        state.filterId = null
    },
  },
})

export const { onOpenDeleteModal, onCloseDeleteModal } =
  monitoringDeleteModalSlice.actions
export const monitoringDeleteModal = monitoringDeleteModalSlice.reducer
export const selectMonitoringDeleteModal = (state: RootState) => state.monitoringDeleteModal;
