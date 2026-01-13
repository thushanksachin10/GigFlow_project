import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../api/axiosClient";

// REGISTER
export const register = createAsyncThunk("auth/register", async (data) => {
  const res = await axiosClient.post("/auth/register", data);
  return res.data.user;
});

// LOGIN
export const login = createAsyncThunk("auth/login", async (data) => {
  const res = await axiosClient.post("/auth/login", data);
  return res.data.user;
});

// CHECK LOGIN STATUS (from cookie)
export const checkAuth = createAsyncThunk("auth/checkAuth", async () => {
  const res = await axiosClient.get("/auth/me");
  return res.data.user;
});

// LOGOUT
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  await axiosClient.post("/auth/logout");
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload;
    });

    // KEEP user after register — do not null it
    builder.addCase(register.fulfilled, (state, action) => {
      state.user = action.payload;
    });

    builder.addCase(checkAuth.fulfilled, (state, action) => {
      state.user = action.payload;
    });

    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = null;
    });
  },
});

export default authSlice.reducer;
