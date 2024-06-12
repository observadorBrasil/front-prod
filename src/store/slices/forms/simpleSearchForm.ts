import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../..";

interface SimpleSearchFormData {
  number: string;
  year: number;
  houseIds: number[];
  sort: any;
}

export type SimpleSearchFormState = {
  data: SimpleSearchFormData;
  loading: boolean;
};

export const simpleSearchInitialState: SimpleSearchFormState = {
  loading: false,
  data: {
    number: "",
    year: 0,
    houseIds: [],
    sort: null,
  },
};

export const simpleSearchFormSlice = createSlice({
  name: "simpleSearchForm",
  initialState: simpleSearchInitialState,
  reducers: {
    reset: () => simpleSearchInitialState,
    updateNumber: (state, action: PayloadAction<string>) => {
      state.data.number = action.payload;
    },
    updateYear: (state, action: PayloadAction<number>) => {
      state.data.year = action.payload;
    },
    updateHouseIds: (state, action: PayloadAction<number[]>) => {
      state.data.houseIds = action.payload;
    },
    updateSort: (state, action: PayloadAction<any>) => {
      state.data.sort = action.payload;
    },
  },
});

export const FormActions = simpleSearchFormSlice.actions;
export const simpleSearchForm = simpleSearchFormSlice.reducer;
export const selectSimpleSearchForm = (state: RootState) =>
  state.simpleSearchForm;
