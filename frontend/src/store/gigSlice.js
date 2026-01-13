import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../api/axiosClient";

// Fetch list of gigs
export const fetchGigs = createAsyncThunk("gigs/fetch", async (query = "") => {
  const res = await axiosClient.get(`/gigs?search=${query}`);
  return res.data;
});

// Fetch one gig via ID
export const fetchGigById = createAsyncThunk("gigs/fetchOne", async (id) => {
  const res = await axiosClient.get(`/gigs/details/${id}`);
  return res.data;
});

// Create a gig
export const createGig = createAsyncThunk("gigs/create", async (data) => {
  const res = await axiosClient.post("/gigs", data);
  return res.data;
});

const gigSlice = createSlice({
  name: "gigs",
  initialState: {
    list: [],
    selectedGig: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchGigs.fulfilled, (state, action) => {
      state.list = action.payload;
    });

    builder.addCase(createGig.fulfilled, (state, action) => {
      state.list.push(action.payload);
    });

    builder.addCase(fetchGigById.fulfilled, (state, action) => {
      state.selectedGig = action.payload;
    });
  },
});

export default gigSlice.reducer;
