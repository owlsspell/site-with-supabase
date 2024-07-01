import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

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
    subcategory:[],
    date: "",
    price: "",
    format: "",
    language: [],
    currency: "",
  },
};

export const eventSlice = createSlice({
  name: "eventsFilter",
  initialState,
  reducers: {
    setActiveTab: (state, data) => {
      state.activeTab = data.payload;
    },
    changeFilters: (state, data) => {
      state.filters = data.payload;
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
    changeFilterCheckbox: (state, data) => {
      // const { name, value, checked } = data.payload;
      
      // checked
      //   ? ([...state.filters[name]] = [...state.filters[name], value])
      //   : (state.filters[name] = state.filters[name].filter(
      //       (item) => item !== value
      //     ));
    },
  },
});

export const {
  setActiveTab,
  changeFilters,
  clearFilter,
  changeFilter,
  changeFilterCheckbox,
} = eventSlice.actions;
export default eventSlice.reducer;
