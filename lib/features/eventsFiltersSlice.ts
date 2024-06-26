import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface EventsState {
  activeTab: string | null;
  filters: {
    category: string;
    date: string;
    price: string;
    format: string;
    language: string;
    currency: string;
  };
}

const initialState: EventsState = {
  activeTab: "All",
  filters: {
    category: "",
    date: "",
    price: "",
    format: "",
    language: "",
    currency: "",
  },
};

export const bookSlice = createSlice({
  name: "eventsFilter",
  initialState,
  reducers: {
    setActiveTab: (state, data) => {
      state.activeTab = data.payload;
    },
    changeFilters: (state, data) => {
      state.filters = data.payload;
    },
  },
});

export const { setActiveTab, changeFilters } = bookSlice.actions;
export default bookSlice.reducer;
