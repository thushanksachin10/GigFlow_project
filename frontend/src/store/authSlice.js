import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../api/axiosClient";

export const login = createAsyncThunk("auth/login", async (data) => {
  const res = await axiosClient.post("/auth/login", data);
  return res.data.user;
});

export const register = createAsyncThunk("auth/register", async (data) => {
  const res = await axiosClient.post("/auth/register", data);
  return res.data.user;
});

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export default authSlice.reducer;
