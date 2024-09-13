import { createSlice } from "@reduxjs/toolkit";

interface EventInfo {
  eventInfo: number | null;
}

const initialState: EventInfo = {
  eventInfo: null,
};

export const createEventSlice = createSlice({
  name: "createEvent",
  initialState,
  reducers: {
    setEventInfo: (state, data) => {
      state.eventInfo = data.payload;
    },
  },
});

export const { setEventInfo } = createEventSlice.actions;
export default createEventSlice.reducer;
