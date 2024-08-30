import { configureStore } from "@reduxjs/toolkit";
import eventsSlice from "./features/eventsFiltersSlice";
import drawerStepsSlice from "./features/drawerStepsSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      events: eventsSlice,
      drawerSteps: drawerStepsSlice,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
