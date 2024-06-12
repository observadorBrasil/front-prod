import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Prisma } from "@prisma/client";
import { RootState } from "../..";

export type TramitacaoState = {
  loading: boolean;
  error: boolean;
  updatedTramitacaoId: number | null;
};

export const initialState: TramitacaoState = {
  loading: false,
  error: false,
  updatedTramitacaoId: null,
};

export const tramitacaoSlice = createSlice({
  name: "tramitacao",
  initialState,
  reducers: {
    requestTramitacaoUpdate: (
      state,
      action: PayloadAction<{
        tramitacaoId: number;
        data: Prisma.TramitacaoUpdateInput;
      }>
    ) => {
      state.loading = true;
      state.updatedTramitacaoId = action.payload.tramitacaoId;
    },
    successfulTramitacaoUpdateUpdate: (state) => {
      state.loading = false;
      state.error = false;
      state.updatedTramitacaoId = null;
    },
    failedTramitacaoUpdateUpdate: (state) => {
      state.loading = false;
      state.error = true;
      state.updatedTramitacaoId = null;
    },
  },
});

// Exportando acoes criadas pelo RTK
export const TramitacaoActions = tramitacaoSlice.actions;

// exporting the reducer here, as we need to add this to the store
export default tramitacaoSlice.reducer;

// Selector para pegar state do usuario da store
export const selectTramitacao = (state: RootState) => state.tramitacao;
