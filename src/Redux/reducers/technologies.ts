import { createSlice } from '@reduxjs/toolkit'
import { TechnologiesType } from '../../Types/TechnologiesType';


let initialState:TechnologiesType[] = [];

export const TechnologiesSlice = createSlice({
  name: 'user',
  initialState: {value: initialState},
  reducers: {
    Technologies: (state: { value: TechnologiesType[] }, action: { payload: TechnologiesType[] }) => {
      state.value = [ ...state.value, ...action.payload ];
    },
  },
})

// Action creators are generated for each case reducer function
export const {  Technologies } = TechnologiesSlice.actions

export default TechnologiesSlice.reducer