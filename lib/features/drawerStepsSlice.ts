import { createSlice } from "@reduxjs/toolkit";

export interface DrawerSteps {
  activeStep: number | null;
  stepsStatus: {
    general: boolean;
    tickets: boolean;
    publish: boolean;
  };
}

const initialState: DrawerSteps = {
  activeStep: null,
  stepsStatus: {
    general: false,
    tickets: false,
    publish: false,
  },
};

export const drawerStepsSlice = createSlice({
  name: "drawerSteps",
  initialState,
  reducers: {
    setActiveStep: (state, data) => {
      state.activeStep = data.payload;
    },
    toogleStepsStatus: (state, data) => {
      state.stepsStatus = { ...state.stepsStatus, ...data.payload };
    },
  },
});

export const { setActiveStep, toogleStepsStatus } = drawerStepsSlice.actions;
export default drawerStepsSlice.reducer;
