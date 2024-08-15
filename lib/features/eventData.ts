import { createSlice } from "@reduxjs/toolkit";

interface EventsState {
  overview: {
    title: string;
    summary: string;
  };
}

const initialState: EventsState = {
  overview: {
    title: "",
    summary: "",
  },
};

export const eventDataSlice = createSlice({
  name: "eventsData",
  initialState,
  reducers: {
    setRow: (state, data) => {
      console.log(data.payload);
      const { section, key, value } = data.payload;
      state[section as keyof EventsState] = {
        ...state[section as keyof EventsState],
        [key]: value,
      };
    },
  },
});

export const { setRow } = eventDataSlice.actions;
export default eventDataSlice.reducer;
