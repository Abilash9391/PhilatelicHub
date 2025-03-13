import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  currentUser: undefined,
  isLoading: false,
  error: null,
};
const URL = "http://localhost:3000/api/user";

export const signup = createAsyncThunk(
  "auth/signup",
  async (body, thunkAPI) => {
    console.log("Sending data to backend:", body);
    try {
      const response = await axios.post(`${URL}/signup`, body);
      if (response.data.success) {
        return response.data.tokens;
      } else {
        return thunkAPI.rejectWithValue(response.data.message);
      }
    } catch (error) {
      console.error("Error during signup:", error);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Signup failed",
      );
    }
  },
);
export const login = createAsyncThunk("auth/login", async (body, thunkAPI) => {
  console.log("Sending data to backend:", body);
  try {
    const response = await axios.post(`${URL}/login`, body);
    if (response.data.success) {
      localStorage.setItem("userId",response.data.userId);
      localStorage.setItem("name",response.data.name);
      return response.data.tokens;
    } else {
      return thunkAPI.rejectWithValue(response.data.message);
    }
  } catch (error) {
    console.error("Error during login:", error);
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Login  failed",
    );
  }
});

export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async (thunkAPI) => {
    try {
      const token = localStorage.getItem("token") ?? "";
      if (!token) {
        return thunkAPI.rejectWithValue("Token not found");
      }
      return token;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  },
);
export const logout = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("token");
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
        state.error = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
        state.error = null;
      })
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.currentUser = null;
        state.error = action.payload;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.currentUser = null;
      });
  },
});

export default authSlice.reducer;
