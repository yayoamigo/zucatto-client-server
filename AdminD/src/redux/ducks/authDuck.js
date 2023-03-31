import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { publicRequest } from "../../requestMethods";

const initialState = {
  adminUser: localStorage.getItem("adminUser") ? JSON.parse(localStorage.getItem("adminUser")) : null,
  accessTokenAdmin: localStorage.getItem("accessTokenAdmin") || null,
  isFetching: false,
  error: false,
};

  
  
export const login = createAsyncThunk("api/auth/login", async (userCredential) => {
  try{
    const response = await publicRequest.post("/auth/login", userCredential);
    const data = response.data;
  return data;
  }catch (error) {
    console.log(error);
    throw error;
  }
});



const authSlice = createSlice({
  name: "authadmin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isFetching = true;
        state.error = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.adminUser = action.payload;
        state.accessTokenAdmin = action.payload.accessToken;
        state.isFetching = false;
        localStorage.setItem("adminUser", JSON.stringify(state.adminUser));
        localStorage.setItem("accessTokenAdmin", state.accessTokenAdmin);
        state.error = false;
      })
      .addCase(login.rejected, (state) => {
        state.adminUser = null;
        state.isFetching = false;
        state.error = true;
      });
  },
});


export default authSlice;
