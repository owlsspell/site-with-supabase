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
    image: null,
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
    publish: false,
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
    tooglePublicEventStatus: (state, data) => {
      state.eventInfo.publish = data.payload;
    },
    clearEventData: (state) => {
      state.ticketsInfo = null;
      state.eventInfo = {
        id: null,
        image: null,
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
        publish: false,
      };
    },
  },
});

export const {
  setEventInfo,
  setEventTicketsInfo,
  toogleEventStatus,
  tooglePublicEventStatus,
  clearEventData
} = createEventSlice.actions;
export default createEventSlice.reducer;
