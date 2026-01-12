import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../api/axiosClient";


export const fetchGigs = createAsyncThunk("gigs/fetch", async (query = "") => {
  const res = await axiosClient.get(`/gigs?search=${query}`);
  return res.data;
});

export const fetchGigById = createAsyncThunk("gigs/fetchOne", async (id) => {
  const res = await axiosClient.get(`/gigs/details/${id}`);
  return res.data;
});

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
