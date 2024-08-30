import { createSlice } from "@reduxjs/toolkit";

interface DrawerSteps {
  activeStep: number;
}

const initialState: DrawerSteps = {
  activeStep: 0,
};

export const drawerStepsSlice = createSlice({
  name: "drawerSteps",
  initialState,
  reducers: {
    setActiveStep: (state, data) => {
      state.activeStep = data.payload;
    },
  },
});

export const { setActiveStep } = drawerStepsSlice.actions;
export default drawerStepsSlice.reducer;
