import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface RegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  agentDetails: string;
  password: string;
  confirmPassword: string;
  termsAccepted: boolean;
}

interface RegistrationState {
  currentStep: number;
  registrationData: Partial<RegistrationData>;
  isLoading: boolean;
}

const initialState: RegistrationState = {
  currentStep: 1,
  registrationData: {},
  isLoading: false,
};

const registrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    updateRegistrationData: (
      state,
      action: PayloadAction<Partial<RegistrationData>>,
    ) => {
      state.registrationData = { ...state.registrationData, ...action.payload };
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    resetRegistration: () => initialState,
  },
});

export const {
  setCurrentStep,
  updateRegistrationData,
  setIsLoading,
  resetRegistration,
} = registrationSlice.actions;

export default registrationSlice.reducer;
