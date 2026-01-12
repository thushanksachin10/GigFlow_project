import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../api/axiosClient";

export const fetchGigs = createAsyncThunk("gigs/fetch", async (query = "") => {
  const res = await axiosClient.get(`/gigs?search=${query}`);
  return res.data;
});

export const createGig = createAsyncThunk("gigs/create", async (data) => {
  const res = await axiosClient.post("/gigs", data);
  return res.data;
});

const gigSlice = createSlice({
  name: "gigs",
  initialState: { list: [] },
  extraReducers: (builder) => {
    builder.addCase(fetchGigs.fulfilled, (state, action) => {
      state.list = action.payload;
    });
    builder.addCase(createGig.fulfilled, (state, action) => {
      state.list.push(action.payload);
    });
  },
});

export default gigSlice.reducer;
