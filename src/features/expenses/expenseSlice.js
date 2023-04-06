import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { addExpenseApi, getExpenseApi } from "../../services/ExpenseService";

export const getExpense = createAsyncThunk('expenses/getExpense',  async () => {
    try{
        const response = await getExpenseApi();
        return response.data;
    }catch (error) {
        return error;
    }
    
})

export const expenseSlice = createSlice({
    name: 'expenses',
    initialState:{
        expenseData: [],
        loading: 'idle',
        error: null,
    },
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(getExpense.pending, (state, action) => {
          if (state.loading === 'idle') {
            state.loading = 'pending'
          }
        })
        builder.addCase(getExpense.fulfilled, (state, action) => {
          if (state.loading === 'pending') {
            state.data = action.payload
            state.loading = 'idle'
          }
        })
        builder.addCase(getExpense.rejected, (state, action) => {
          if (state.loading === 'pending') {
            state.loading = 'idle'
            state.error = 'Error occured'
          }
        })
      }
})

export default expenseSlice.reducer