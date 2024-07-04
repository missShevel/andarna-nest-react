import { createSlice } from '@reduxjs/toolkit';
import mapFirebaseUser from '../../utils/firebaseMapper';

const initialState: any = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signIn: (state, action) => {
      state.user = action.payload;
    },
    signOut: (state) => {
      state.user = null;
    },
  },
});

const userReducer = userSlice.reducer;

export const { signIn, signOut } = userSlice.actions;
export default userReducer;
