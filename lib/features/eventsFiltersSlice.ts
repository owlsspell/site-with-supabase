import { createSlice } from "@reduxjs/toolkit";
interface FiltersType {
  category: string;
  subcategory: string[];
  date: string;
  price: string;
  format: string;
  language: string[];
  currency: string;
}
interface EventsState {
  activeTab: string | null;
  filters: FiltersType;
}

const initialState: EventsState = {
  activeTab: "All",
  filters: {
    category: "",
    subcategory: [],
    date: "",
    price: "",
    format: "",
    language: [],
    currency: "",
  },
};

export const eventFiltersSlice = createSlice({
  name: "eventsFilter",
  initialState,
  reducers: {
    setActiveTab: (state, data) => {
      state.activeTab = data.payload;
    },
    clearFilter: (state, data) => {
      state.filters = { ...state.filters, [data.payload]: "" };
    },
    changeFilter: (state, data) => {
      state.filters = {
        ...state.filters,
        [data.payload.name]: data.payload.value,
      };
    },
  },
});

export const { setActiveTab, clearFilter, changeFilter } =
  eventFiltersSlice.actions;
export default eventFiltersSlice.reducer;
