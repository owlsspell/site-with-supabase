import { CreatedEventState, TicketsInfo } from "@/types/custom-types";
import { createSlice } from "@reduxjs/toolkit";

interface EventInfo {
  isEventCreated: boolean;
  eventInfo: CreatedEventState;
  ticketsInfo: TicketsInfo | null;
}

const initialState: EventInfo = {
  isEventCreated: false,
  eventInfo: {
    id: null,
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
    toogleEventStatus: (state, data) => {
      state.isEventCreated = data.payload;
    },
  },
});

export const { setEventInfo, setEventTicketsInfo, toogleEventStatus } =
  createEventSlice.actions;
export default createEventSlice.reducer;
