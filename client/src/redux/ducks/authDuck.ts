import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { publicRequest } from "../../requestMethods";


interface UserCredential {
    username: string;
    password: string;
}

const initialState = {
    //@ts-ignore
  user: JSON.parse(localStorage.getItem("login") || null),
  accessToken: localStorage.getItem("accessToken") || "",
  isFetching: false,
  error: false,
};

  
  
export const login = createAsyncThunk("api/auth/login", async (userCredential: UserCredential) => {
  try{
    const response = await publicRequest.post("/auth/login", userCredential);
    console.log(userCredential)
    const data = response.data;
  return data;
  }catch (error) {
    console.log(error);
    throw error;
  }
});

export const register = createAsyncThunk("api/auth/register", async (user) => {
  try {
    await publicRequest.post("/auth/register", user);

  } catch (error) {
    console.log(error);
    throw error;
  }
});


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isFetching = true;
        state.error = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.accessToken = action.payload.accessToken;
        state.isFetching = false;
        localStorage.setItem("login", JSON.stringify(state.user));
        localStorage.setItem("accessToken", state.accessToken);
        state.error = false;
      })
      .addCase(login.rejected, (state) => {
        state.user = null;
        state.isFetching = false;
        state.error = true;
      })
      .addCase(register.pending, (state) => {
        state.isFetching = true;
        state.error = false;
      })
      .addCase(register.fulfilled, (state) => {
        state.isFetching = false;
        state.error = false;
      })
      .addCase(register.rejected, (state) => {
        state.isFetching = false;
        state.error = true;
      });
  },
});


export default authSlice;
