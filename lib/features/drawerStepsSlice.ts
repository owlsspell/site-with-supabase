import { createSlice } from "@reduxjs/toolkit";

interface DrawerSteps {
  activeStep: number | null;
}

const initialState: DrawerSteps = {
  activeStep: null,
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
