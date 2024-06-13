import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface EventsState {
  activeTab: string | null;
}

const initialState: EventsState = {
  activeTab: "All",
};

export const bookSlice = createSlice({
  name: "eventsFilter",
  initialState,
  reducers: {
    setActiveTab: (state, data) => {
      state.activeTab = data.payload;
    },
  },
});

export const { setActiveTab } = bookSlice.actions;
export default bookSlice.reducer;
