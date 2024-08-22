import { createSlice } from "@reduxjs/toolkit";

export interface EventsState {
  overview: {
    title: string;
    summary: string;
  };
  dateAndLocation: {
    date: string;
    startTime: string;
    endTime: string;
    location: string;
    isOnline: boolean;
  };
  about: {
    info: string;
  };
}

const initialState: EventsState = {
  overview: {
    title: "",
    summary: "",
  },
  dateAndLocation: {
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    isOnline: false,
  },
  about: {
    info: "",
  },
};

export const eventDataSlice = createSlice({
  name: "eventsData",
  initialState,
  reducers: {
    setRow: (state, data) => {
      const { section, key, value } = data.payload;
      const newField = {
        ...state[section as keyof EventsState],
        [key]: value,
      };
      Object.assign(state, { [section]: newField });
    },
  },
});

export const { setRow } = eventDataSlice.actions;
export default eventDataSlice.reducer;
