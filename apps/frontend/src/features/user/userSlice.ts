import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IUserData } from '../../interface/user';
import { IUser } from '@andarna/common';
import axiosInstance from '../../axios';
import { ApiEndpoints } from '../../enum/apiEndpoints';
interface IInitialState {
  user: IUser | null;
  isLoading: boolean;
}
const initialState: IInitialState = {
  user: null,
  isLoading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    signOut: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createUser.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(createUser.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

const createUser = createAsyncThunk(
  'users/createUser',
  async (createUserData: {
    firstName: string;
    lastName: string;
    email: string;
    firebaseId: string;
  }) => {
    const response = await axiosInstance.post<IUser>(
      ApiEndpoints.CREATE_USER,
      createUserData
    );

    return response.data;
  }
);

const userReducer = userSlice.reducer;

export const { signIn, signOut } = userSlice.actions;
export default userReducer;
