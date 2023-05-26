import {createSlice} from '@reduxjs/toolkit';
import {RootState} from './store';
import {UseReducerState} from '../types/typings';

const initialState: UseReducerState = {
  user: null,
  isSignedIn: false,
};

const authSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isSignedIn = true;
    },
    signOutUser: state => {
      state.user = null;
      state.isSignedIn = false;
    },
  },
});

export const {setUser, signOutUser} = authSlice.actions;
export const selectUser = (state: RootState) => state.users.user;

export default authSlice.reducer;
