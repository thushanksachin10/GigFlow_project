import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../api/axiosClient";

// Fetch list of gigs
export const fetchGigs = createAsyncThunk("gigs/fetch", async (query = "") => {
  const res = await axiosClient.get(`/gigs?search=${query}`);
  return res.data;
});

// Fetch single gig (detailed)
export const fetchGigById = createAsyncThunk("gigs/fetchOne", async (id) => {
  const res = await axiosClient.get(`/gigs/details/${id}`);
  return res.data;
});

// Create a gig
export const createGig = createAsyncThunk(
  "gigs/create",
  async (data, { getState }) => {
    const userId = getState().auth.user._id;

    const res = await axiosClient.post("/gigs", {
      ...data,
      clientId: userId, // ensures gig has owner
    });

    return res.data;
  }
);

const gigSlice = createSlice({
  name: "gigs",
  initialState: {
    list: [],
    selectedGig: null,
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    // -------- FETCH GIGS ----------
    builder.addCase(fetchGigs.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchGigs.fulfilled, (state, action) => {
      state.list = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchGigs.rejected, (state) => {
      state.loading = false;
      state.error = "Failed to load gigs";
    });

    // -------- FETCH SINGLE GIG ----------
    builder.addCase(fetchGigById.fulfilled, (state, action) => {
      state.selectedGig = action.payload;
    });

    // -------- CREATE GIG ----------
    builder.addCase(createGig.fulfilled, (state, action) => {
      state.list.push(action.payload); // insert new gig in list
    });
  },
});

export default gigSlice.reducer;
