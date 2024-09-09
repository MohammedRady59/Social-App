import { axiosInstance } from "@/app/config/axiosInstanse";
import { IErrorResponse, IFormData } from "@/app/Interface";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

export interface IProps {
  isloading: boolean;
  message: string;
}

const initialState: IProps = {
  isloading: false,
  message: "",
};

export const setAccount = createAsyncThunk(
  "register/setAccount",
  async (dataRe: IFormData, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const res = await axiosInstance.post("/users/signup", dataRe);
      if (res.status === 201) {
        toast.success("You will navgite to Login page!", {
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
      const errobj = error as AxiosError<IErrorResponse>;
      toast.error(`${errobj.response?.data.error}`, {
        position: "bottom-center",
        duration: 1500,
      });
      return rejectWithValue(errobj.response?.data.error);
    }
  }
);
export const RegisterSlice = createSlice({
  name: "register",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(setAccount.pending, (state, action) => {
      state.isloading = true;
      state.message = "";
    });
    builder.addCase(setAccount.fulfilled, (state, action) => {
      state.isloading = false;
      state.message = action.payload.message;
    });
    builder.addCase(setAccount.rejected, (state, action) => {
      state.isloading = false;
      state.message = action.payload as string;
    });
  },
});

export const {} = RegisterSlice.actions;

export default RegisterSlice.reducer;
