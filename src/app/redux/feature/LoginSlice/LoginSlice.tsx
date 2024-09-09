import { axiosInstance } from "@/app/config/axiosInstanse";
import { IErrorResponse, ILoginData } from "@/app/Interface";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

export interface IProps {
  isloading: boolean;
  token: string | null;
}

const initialState: IProps = {
  isloading: false,
  token: "",
};

export const getAccount = createAsyncThunk(
  "login/getAccount",
  async (data: ILoginData, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const res = await axiosInstance.post("/users/signin", data);
      console.log(res);
      if (res.status === 200) {
        toast.success("Login Successfully", {
          position: "bottom-center",
          duration: 1500,
          style: {
            backgroundColor: "black",
            color: "white",
            width: "fit-content",
          },
        });
      }
      return res.data;
    } catch (error) {
      console.log(error);
      const errobj = error as AxiosError<IErrorResponse>;
      toast.error(`${errobj.response?.data.error}`, {
        position: "bottom-center",
        duration: 1500,
      });
      return rejectWithValue(errobj.response?.data.error);
    }
  }
);

export const LoginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    clearToken: (state) => {
      state.token = "";
      localStorage.removeItem("TokenRedux");
    },
    getToken: (state) => {
      if (localStorage.getItem("TokenRedux")) {
        state.token = localStorage.getItem("TokenRedux");
      } else {
        state.token = null;
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(getAccount.pending, (state, action) => {
      state.isloading = true;
      state.token = "";
    });
    builder.addCase(getAccount.fulfilled, (state, action) => {
      state.isloading = false;
      state.token = action.payload.token;
      localStorage.setItem("TokenRedux", action.payload.token);
    });
    builder.addCase(getAccount.rejected, (state) => {
      state.isloading = false;
    });
  },
});

// Action creators are generated for each case reducer function
export const { clearToken, getToken } = LoginSlice.actions;

export default LoginSlice.reducer;
