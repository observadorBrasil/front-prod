import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Search } from "@prisma/client";
import { RootState } from "../..";

export interface LegislativeHousesStepInput {
  federal?: { [id: number]: boolean }[];
  state?: { houseIds: number[]; houses: HouseOption[] };
  municipal?: { [id: number]: boolean }[];
  keyword: string;
}

export interface FiltersStepInput {
  author: string;
  number: string;
  presentationDate: string;
  filterKeywords: string[];
  mustNotKeywords: string[];
  propositionTypeIds: number[];
  situationIds: number[];
  // type: string;
  year: string;
  initialDate: string;
  finalDate: string;
  searchTerm: string;
}

export interface HouseOption {
  id: number;
  value: string;
  label: string;
}

interface AdvancedSearchFormData extends FiltersStepInput {
  houseIds: number[];
  houseForm: LegislativeHousesStepInput;
}

export type ScheduledFilter = Pick<Search, "name" | "description">;

export type AdvancedSearchFormState = {
  loading: boolean;
  step: number;
  data: AdvancedSearchFormData;
  query?: string;
  scheduledFilter: ScheduledFilter;
  sort: any;
};

const today = new Date().toISOString().split("T")[0];
export const advancedSearchInitialState: AdvancedSearchFormState = {
  step: 0,
  loading: false,
  query: "",
  scheduledFilter: {
    name: "",
    description: "",
  },
  data: {
    houseForm: {
      keyword: "",
      federal: undefined,
      state: undefined,
      municipal: undefined,
    },
    filterKeywords: [],
    mustNotKeywords: [],
    houseIds: [],
    propositionTypeIds: [],
    situationIds: [],
    author: "",
    // house: "",
    number: "",
    presentationDate: "",
    // type: "",
    year: "",
    initialDate: today,
    finalDate: today,
    searchTerm: "",
  },
  sort: null,
};

export const advancedSearchFormSlice = createSlice({
  name: "advancedSearchForm",
  initialState: advancedSearchInitialState,
  reducers: {
    reset: () => advancedSearchInitialState,
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setStep: (state, action: PayloadAction<number>) => {
      state.step = action.payload;
    },
    setScheduledFilter: (state, action: PayloadAction<ScheduledFilter>) => {
      state.scheduledFilter = action.payload;
    },
    setData: (state, action: PayloadAction<AdvancedSearchFormData>) => {
      state.data = { ...advancedSearchInitialState.data, ...action.payload };
    },
    setFormHouses: (
      state,
      action: PayloadAction<LegislativeHousesStepInput>
    ) => {
      const payload = action.payload;

      const federalHouseIds = Object.entries(payload.federal || {})
        .filter(([_, value]) => value)
        .map(([key, _]) => Number(key.split("-").pop()));

      const municipalHouseIds = Object.entries(payload.municipal || {})
        .filter(([_, value]) => value)
        .map(([key, _]) => Number(key.split("-").pop()));

      const stateHouseIds = payload.state?.houseIds || [];

      const houseIds = [
        ...federalHouseIds,
        ...stateHouseIds,
        ...municipalHouseIds,
      ];
      state.data.houseForm = payload;
      state.data.houseIds = houseIds;
      state.step = state.step + 1;
    },
    setFormFilters: (
      state,
      action: PayloadAction<Partial<FiltersStepInput>>
    ) => {
      state.data = { ...state.data, ...action.payload };
    },
    setKeywords: (state, action: PayloadAction<string[]>) => {
      state.data.filterKeywords = action.payload;
    },
    setExcludeKeywords: (state, action: PayloadAction<string[]>) => {
      state.data.mustNotKeywords = action.payload;
    },
    setPropositionTypeIds: (state, action: PayloadAction<number[]>) => {
      state.data.propositionTypeIds = action.payload;
    },
    setSituationIds: (state, action: PayloadAction<number[]>) => {
      state.data.situationIds = action.payload;
    },
    setElasticQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setSort: (state, action: PayloadAction<any>) => {
      state.sort = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.data.searchTerm = action.payload;
    },
  },
});

export const FormActions = advancedSearchFormSlice.actions;
export const advancedSearchForm = advancedSearchFormSlice.reducer;
export const selectAdvancedSearchForm = (state: RootState) =>
  state.advancedSearchForm;
