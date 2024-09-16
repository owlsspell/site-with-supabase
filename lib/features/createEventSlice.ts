import { CreatedEventState } from "@/types/custom-types";
import { createSlice } from "@reduxjs/toolkit";

interface EventInfo {
  eventInfo: CreatedEventState | null;
  ticketsInfo: null;
}

const initialState: EventInfo = {
  eventInfo: null,
  ticketsInfo: null,
};

export const createEventSlice = createSlice({
  name: "createEvent",
  initialState,
  reducers: {
    setEventInfo: (state, data) => {
      state.eventInfo = data.payload;
    },
    setEventTicketsInfo: (state, data) => {
      state.ticketsInfo = data.payload;
    },
  },
});

export const { setEventInfo } = createEventSlice.actions;
export default createEventSlice.reducer;
