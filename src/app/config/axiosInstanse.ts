import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://linked-posts.routemisr.com",
});
