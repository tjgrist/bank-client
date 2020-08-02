import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ContainerState } from './types';
import { LOCATION_CHANGE } from 'connected-react-router';

// The initial state of the RegistrationPage container
export const initialState: ContainerState = {
  firstName: '',
  lastName: '',
  currency: '',
  email: '',
  password: '',
  pinCode: '',
  currentStep: 0,
};

export interface ICredential {
  value: string;
  reject: any;
  resolve: any;
}

const registrationPageSlice = createSlice({
  name: 'registrationPage',
  initialState,
  reducers: {
    changeInputAction(state, action: PayloadAction<any>) {
      state[action.payload.name] = action.payload.value;
    },
    selectCurrencyAction(state, action: PayloadAction<any>) {
      state.currency = action.payload;
    },
    nextStepAction(state) {
      state.currentStep += 1;
    },
    previousStepAction(state) {
      state.currentStep -= 1;
    },
    registrationRequestAction() {},
    registrationSuccessAction(state, action: PayloadAction<number>) {
      state.pinCode = action.payload;
    },
    registrationErrorAction(state, action: PayloadAction<string>) {},
    loginExpressRequestAction() {},
    loginExpressSuccessAction(state, action: PayloadAction<any>) {},
    loginExpressErrorAction(state, action: PayloadAction<any>) {},
  },
  extraReducers: {
    [LOCATION_CHANGE]: () => {
      return initialState;
    },
  },
});

export const { actions, reducer, name: sliceKey } = registrationPageSlice;
