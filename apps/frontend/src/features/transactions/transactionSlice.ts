import { ITransaction } from '@andarna/common';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApiEndpoints } from '../../enum/apiEndpoints';
import { axiosInstanceAuthorized } from '../../axios';

interface ITransactionInitialState {
  transactions: ITransaction[] | [];
  isLoading: boolean;
}

const initialState: ITransactionInitialState = {
  transactions: [],
  isLoading: false,
};

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllTransactions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getAllTransactions.fulfilled,
        (state, action: PayloadAction<ITransaction[]>) => {
          state.isLoading = false;
          state.transactions = action.payload;
        }
      )
      .addCase(getAllTransactions.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const getAllTransactions = createAsyncThunk(
  'transactions/getAll',
  async () => {
    const { data: transactionsFromDb } = await axiosInstanceAuthorized.get<
      ITransaction[]
    >(ApiEndpoints.GET_TRANSACTIONS);
    return transactionsFromDb;
  }
);

const transactionReducer = transactionSlice.reducer;
export default transactionReducer;
