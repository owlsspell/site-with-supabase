import { createSlice } from "@reduxjs/toolkit";

interface EventsState {
  title: string;
  summary: string;
}

const initialState: EventsState = {
  title: "",
  summary: "",
};

export const eventDataSlice = createSlice({
  name: "eventsData",
  initialState,
  reducers: {
    setRow: (state, data) => {
      state[data.payload.key as keyof EventsState] = data.payload.value;
    },
  },
});

export const { setRow } = eventDataSlice.actions;
export default eventDataSlice.reducer;
