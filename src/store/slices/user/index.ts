import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  CreateUserRequest,
  LoginRequest,
  UserInterface,
} from "@observatorio-brasil/atores/src/api/services/user/interfaces/user.interface";
import { RootState } from "../..";

export type UserState = {
  user?: UserInterface;
  loading: boolean;
  currentDeletingUserId: number | null;
};

export const userInitialState: UserState = {
  user: undefined,
  loading: false,
  currentDeletingUserId: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    requestUserLogin: (
      state: UserState,
      _action: PayloadAction<LoginRequest>
    ) => {
      state.loading = true;
    },
    requestUserLoginSuccess: (
      state: UserState,
      action: PayloadAction<UserInterface>
    ) => {
      state.loading = false;
      state.user = action.payload;
    },
    requestUserLoginFailed: (state: UserState) => {
      state.loading = false;
      state.user = undefined;
    },
    logoutUser: (state: UserState) => {
      state.user = undefined;
    },
    requestUserRegister: (
      state: UserState,
      _action: PayloadAction<CreateUserRequest>
    ) => {
      state.loading = true;
    },
    requestUserRegisterSuccess: (state: UserState) => {
      state.loading = false;
    },
    requestUserRegisterFailed: (state: UserState) => {
      state.loading = false;
    },

    requestUserDelete: (
      state: UserState,
      action: PayloadAction<{ userId: number }>
    ) => {
      state.loading = true;
      state.currentDeletingUserId = action.payload.userId;
    },
    requestUserDeleteSuccess: (state: UserState) => {
      state.loading = false;
      state.currentDeletingUserId = null;
    },
    requestUserDeleteFailed: (state: UserState) => {
      state.loading = false;
      state.currentDeletingUserId = null;
    },
  },
});

// Exportando acoes criadas pelo RTK
export const UserActions = userSlice.actions;

// exporting the reducer here, as we need to add this to the store
export const user = userSlice.reducer;

// Selector para pegar state do usuario da store
export const selectUser = (state: RootState) => state.user;
