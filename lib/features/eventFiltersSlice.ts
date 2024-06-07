import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface EventsState {
  activeFilter: string | null;
}

const initialState: EventsState = {
  activeFilter: null,
};

export const bookSlice = createSlice({
  name: "eventsFilter",
  initialState,
  reducers: {},
});

export const {} = bookSlice.actions;
export default bookSlice.reducer;
