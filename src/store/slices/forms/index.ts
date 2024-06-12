import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../..";

export type ClientRegistrationFormState = {
  loading: boolean;
};

export const clientRegistrationFormInitialState: ClientRegistrationFormState = {
  loading: false,
};

export const clientRegistrationFormSlice = createSlice({
  name: "forms",
  initialState: clientRegistrationFormInitialState,
  reducers: {
    reset: () => clientRegistrationFormInitialState,
    requestClientRegistrationFormSubmit: (
      state
      // action: PayloadAction<CreateClientInterface>
    ) => {
      state.loading = true;
    },
    clientRegistrationFormSubmitSuccessful: (state) => {
      state.loading = false;
    },
    clientRegistrationFormSubmitFailed: (state) => {
      state.loading = false;
    },
  },
});

// Exportando acoes criadas pelo RTK
export const FormsActions = clientRegistrationFormSlice.actions;

// exporting the reducer here, as we need to add this to the store
export const clientRegistrationForm = clientRegistrationFormSlice.reducer;

export const selectClientRegistrationForm = (state: RootState) =>
  state.clientRegistrationForm;
