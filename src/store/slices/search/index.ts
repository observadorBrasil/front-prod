import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Search } from "@prisma/client";
import { RootState } from "../..";

export type SearchState = {
  loading: boolean;
  searches: Search[];
  currentUpdatingSearchId: number | null;
};

export const initialState: SearchState = {
  loading: false,
  searches: [],
  currentUpdatingSearchId: null,
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setSearches: (state, action: PayloadAction<Search[]>) => {
      state.searches = action.payload;
    },
    requestSearchDelete: (state, action: PayloadAction<number>) => {
      state.currentUpdatingSearchId = action.payload;
    },
    sucessfulSearchDelete: (state, action: PayloadAction<number>) => {
      const deletedSearchId = action.payload;
      const oldSearches = [...state.searches];
      state.currentUpdatingSearchId = null;
      state.searches = oldSearches.filter((s) => s.id !== deletedSearchId);
    },
  },
});

export const SearchActions = searchSlice.actions;
export default searchSlice.reducer;
export const selectSearch = (state: RootState) => state.search;
