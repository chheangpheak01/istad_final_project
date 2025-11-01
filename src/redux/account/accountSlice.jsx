import { createSlice } from "@reduxjs/toolkit";
import { fetchAccountId } from "./accountAction";

const initialState = {
    accountId: null,
    status: "idle",
    error: null,
};

const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAccountId.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchAccountId.fulfilled, (state, action) => {
                state.accountId = action.payload;
                state.status = "succeeded";
            })
            .addCase(fetchAccountId.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export default accountSlice.reducer;
