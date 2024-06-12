import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Search } from "@prisma/client";
import { SearchResultInterface } from "@observatorio-brasil/atores/src/api/services/search-result/interfaces/search-result.interface";
import { RootState } from "../..";

export type SearchResultState = {
  loading: boolean;
  currentSearch?: Search;
  searchResults: SearchResultInterface[];
  currentUpdatingSearchResultId: number | null;
};

export const initialState: SearchResultState = {
  loading: false,
  currentSearch: undefined,
  searchResults: [],
  currentUpdatingSearchResultId: null,
};

export const searchResultSlice = createSlice({
  name: "searchResult",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    requestSearchResults: (
      state,
      action: PayloadAction<{ searchId: number }>
    ) => {
      state.loading = true;
    },
    setCurrentSearch: (state, action: PayloadAction<Search>) => {
      state.currentSearch = action.payload;
    },
    setSearchResults: (
      state,
      action: PayloadAction<SearchResultInterface[]>
    ) => {
      state.searchResults = action.payload;
    },
    requestUpdateSearchResult: (
      state,
      action: PayloadAction<{ status: "ignored" | "read"; id: number }>
    ) => {
      state.currentUpdatingSearchResultId = action.payload.id;
    },
    sucessfulUpdateSearchResult: (
      state,
      action: PayloadAction<SearchResultInterface>
    ) => {
      const updatedResult = action.payload;
      const resultIndex = state.searchResults.findIndex(
        (r) => r.id === updatedResult.id
      );
      const oldResult = { ...state.searchResults[resultIndex] };
      state.searchResults[resultIndex] = { ...oldResult, ...updatedResult };
      state.currentUpdatingSearchResultId = null;
    },
  },
});

export const SearchResultActions = searchResultSlice.actions;
export default searchResultSlice.reducer;
export const selectSearchResult = (state: RootState) => state.searchResult;
