import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../api/axiosClient";

// CREATE A BID
export const createBid = createAsyncThunk("bids/create", async (data) => {
  const res = await axiosClient.post("/bids", {
    gigId: data.gigId,
    message: data.message,
    amount: Number(data.amount), // ensure numeric
  });
  return res.data;
});

// GET BIDS FOR GIG
export const fetchBids = createAsyncThunk("bids/fetch", async (gigId) => {
  const res = await axiosClient.get(`/bids/${gigId}`);
  return res.data;
});

// HIRE A BID
export const hireBid = createAsyncThunk("bids/hire", async (bidId) => {
  const res = await axiosClient.patch(`/bids/${bidId}/hire`);
  return res.data;
});

const bidSlice = createSlice({
  name: "bids",
  initialState: {
    list: [],
  },
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchBids.fulfilled, (state, action) => {
      state.list = action.payload;
    });

    builder.addCase(createBid.fulfilled, (state, action) => {
      state.list.push(action.payload);
    });

    builder.addCase(hireBid.fulfilled, () => {
      // refresh happens externally
    });
  },
});

export default bidSlice.reducer;
