import { createSlice } from '@reduxjs/toolkit'
// import { LanguagesType } from '../../Types/LanguagesType';

let initialState = {};

export const LanguagesSlice = createSlice({
  name: 'user',
  initialState: {value: initialState},
  reducers: {
    allLanguages: (state: { value: any }, action: { payload: any }) => {
      state.value = { ...state.value, ...action.payload };
    },
  },
})

// Action creators are generated for each case reducer function
export const {  allLanguages } = LanguagesSlice.actions

export default LanguagesSlice.reducer