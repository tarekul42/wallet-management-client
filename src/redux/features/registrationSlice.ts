import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface RegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  agentDetails: string;
  emailOtp: string;
  phoneOtp: string;
  password: string;
  confirmPassword: string;
  termsAccepted: boolean;
  emailVerified: boolean;
  phoneVerified: boolean;
}

// Use Partial<RegistrationData> here
interface RegistrationState {
  currentStep: number;
  registrationData: Partial<RegistrationData>;
  isLoading: boolean;
  otpTimer: number;
  canResendOtp: boolean;
}

const initialState: RegistrationState = {
  currentStep: 1,
  // This is now valid because {} is a Partial<RegistrationData>
  registrationData: {},
  isLoading: false,
  otpTimer: 0,
  canResendOtp: false,
};

const registrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    // The payload type is already Partial<RegistrationData>, which is perfect
    updateRegistrationData: (
      state,
      action: PayloadAction<Partial<RegistrationData>>,
    ) => {
      state.registrationData = { ...state.registrationData, ...action.payload };
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setOtpTimer: (state, action: PayloadAction<number>) => {
      state.otpTimer = action.payload;
    },
    setCanResendOtp: (state, action: PayloadAction<boolean>) => {
      state.canResendOtp = action.payload;
    },
    resetRegistration: () => initialState,
  },
});

export const {
  setCurrentStep,
  updateRegistrationData,
  setIsLoading,
  setOtpTimer,
  setCanResendOtp,
  resetRegistration,
} = registrationSlice.actions;

export default registrationSlice.reducer;
