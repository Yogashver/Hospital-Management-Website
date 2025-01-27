import { createSlice, current } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      const token = localStorage.getItem('token');
      if(!token) return;
      const decode = jwtDecode(token);
      if(decode){
        state.user = decode;
      }else{
        state.user = null;
      }
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;