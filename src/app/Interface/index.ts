import { Interface } from "readline";

export interface IRegister {
  name: "name" | "email" | "password" | "rePassword" | "dateOfBirth" | "gender";
  id: string;
  lable: string;
  type: string;
  validtion: {
    required?: boolean;
    minLength?: number;
    pattern?: RegExp;
  };
}

export interface ILogin {
  name: "email" | "password";
  id: string;
  lable: string;
  type: string;
  validtion: {
    required?: boolean;
    minLength?: number;
    pattern?: RegExp;
  };
}

export interface IFormData {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  dateOfBirth: string;
  gender: string;
}
export interface ILoginData {
  email: string;
  password: string;
}

export interface IErrorResponse {
  error: {
    // details?: {
    //   errors: {
    //     message: string;
    //   }[];
    // };
    message?: string;
  };
}

export interface IUser {
  _id: string;
  name: string;
  photo: string;
  email?: string;
  dateOfBirth?: string;
  gender?: string;
}
export interface IComment {
  _id: string;
  content: string;
  commentCreator: IUser;
  createdAt: string;
  post: string;
}
export interface Post {
  _id: string;
  body: string;
  image: string;
  user: IUser;
  createdAt: string;
  comments: IComment[];
}
