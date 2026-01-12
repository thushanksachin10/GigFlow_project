import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../api/axiosClient";

export const submitBid = createAsyncThunk("bids/submit", async (data) => {
  const res = await axiosClient.post("/bids", data);
  return res.data;
});

export const fetchBids = createAsyncThunk("bids/fetch", async (gigId) => {
  const res = await axiosClient.get(`/bids/${gigId}`);
  return res.data;
});

export const hireBid = createAsyncThunk("bids/hire", async (bidId) => {
  const res = await axiosClient.patch(`/bids/${bidId}/hire`);
  return res.data;
});

const bidSlice = createSlice({
  name: "bids",
  initialState: { list: [] },
  extraReducers: (builder) => {
    builder.addCase(fetchBids.fulfilled, (state, action) => {
      state.list = action.payload;
    });
  },
});

export default bidSlice.reducer;
