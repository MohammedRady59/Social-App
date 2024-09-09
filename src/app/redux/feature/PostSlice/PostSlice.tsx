"use client";
import { axiosInstance } from "@/app/config/axiosInstanse";
import { Post } from "@/app/Interface";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export interface IProps {
  isloading: boolean;
  allPost: Post[];
  allPosts: Post[];
  addLoad: boolean;
  singlePost: Post | null;
}

const initialState: IProps = {
  isloading: false,
  allPost: [],
  allPosts: [],
  addLoad: false,
  singlePost: null,
};
export const getAllposts = createAsyncThunk(
  "post/getAllposts",
  async (_, thunlApi) => {
    const { rejectWithValue } = thunlApi;
    try {
      const { data } = await axiosInstance.get(
        "/users/664bcf3e33da217c4af21f00/posts?limit=50",
        {
          headers: {
            token: localStorage.getItem("TokenRedux"),
          },
        }
      );
      return data.posts;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const getSingle = createAsyncThunk(
  "post/getSingle",
  async (id: string, thunlApi) => {
    const { rejectWithValue } = thunlApi;
    try {
      const { data } = await axiosInstance.get(`/posts/${id}`, {
        headers: {
          token: localStorage.getItem("TokenRedux"),
        },
      });
      return data.post;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const getposts = createAsyncThunk(
  "post/getposts",
  async (_, thunlApi) => {
    const { rejectWithValue } = thunlApi;
    try {
      const { data } = await axiosInstance.get("/posts?limit=30", {
        headers: {
          token: localStorage.getItem("TokenRedux"),
        },
      });
      return data.posts;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const addPost = createAsyncThunk(
  "post/addPost",
  async (dataForm: FormData, thunlApi) => {
    const { rejectWithValue } = thunlApi;
    try {
      const res = await axiosInstance.post("/posts", dataForm, {
        headers: {
          token: localStorage.getItem("TokenRedux"),
        },
      });
      console.log(res);
      if (res.status === 201) {
        toast.success("Post Add Successfully", {
          position: "bottom-center",
          duration: 1500,
        });
      }
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deletePost = createAsyncThunk(
  "post/deletePost",
  async (id: string, thunlApi) => {
    const { rejectWithValue } = thunlApi;
    try {
      const res = await axiosInstance.delete(`/posts/${id}`, {
        headers: {
          token: localStorage.getItem("TokenRedux"),
        },
      });
      console.log(res);
      if (res.status === 200) {
        toast.success("Post Deleted", {
          position: "bottom-center",
          duration: 1500,
        });
      }
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const addComment = createAsyncThunk(
  "post/addComment",
  async (dataForm: { content: string; post: string }, thunlApi) => {
    const { rejectWithValue } = thunlApi;
    try {
      const res = await axiosInstance.post("/comments", dataForm, {
        headers: {
          token: localStorage.getItem("TokenRedux"),
        },
      });
      if (res.status === 201) {
        toast.success("Comment Add Successfully", {
          position: "bottom-center",
          duration: 1500,
        });
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const PostSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getAllposts.pending, (state) => {
      state.isloading = true;
    });
    builder.addCase(getAllposts.fulfilled, (state, action) => {
      state.isloading = false;
      state.allPost = action.payload;
    });
    builder.addCase(getposts.pending, (state) => {
      state.isloading = true;
    });
    builder.addCase(getposts.fulfilled, (state, action) => {
      state.isloading = false;
      state.allPosts = action.payload;
    });
    builder.addCase(getSingle.pending, (state) => {
      state.isloading = true;
    });
    builder.addCase(getSingle.fulfilled, (state, action) => {
      state.isloading = false;
      state.singlePost = action.payload;
    });
    builder.addCase(addPost.pending, (state) => {
      state.addLoad = true;
    });
    builder.addCase(addPost.fulfilled, (state) => {
      state.addLoad = false;
    });
  },
});

export default PostSlice.reducer;
