import { CreatedEventState } from "@/types/custom-types";
import { createSlice } from "@reduxjs/toolkit";

interface EventInfo {
  eventInfo: CreatedEventState;
  ticketsInfo: null;
  eventImage: null | File;
}

const initialState: EventInfo = {
  eventInfo: {
    category: null,
    description: null,
    endDate: null,
    endTime: null,
    format: null,
    language: ["English"],
    location: null,
    name: null,
    startDate: null,
    startTime: null,
    subcategory: null,
    text: null,
  },
  ticketsInfo: null,
  eventImage: null,
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
    setEventImage: (state, data) => {
      state.eventImage = data.payload;
    },
  },
});

export const { setEventInfo, setEventTicketsInfo, setEventImage } =
  createEventSlice.actions;
export default createEventSlice.reducer;
