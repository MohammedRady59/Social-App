import { ILogin, IRegister } from "../Interface";

export const formRegister: IRegister[] = [
  {
    name: "name",
    type: "text",
    id: "name",
    lable: "First name",
    validtion: {
      required: true,
      minLength: 3,
    },
  },
  {
    name: "email",
    type: "email",
    id: "email",
    lable: "Email address",
    validtion: {
      required: true,
      pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
    },
  },
  {
    name: "password",
    type: "password",
    id: "password",
    lable: "Password",
    validtion: {
      required: true,
      pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
    },
  },
  {
    name: "rePassword",
    type: "password",
    id: "rePassword",
    lable: "Confirm password",
    validtion: {
      required: true,
      pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
    },
  },
];

export const formLogin: ILogin[] = [
  {
    name: "email",
    type: "email",
    id: "email",
    lable: "Email address",
    validtion: {
      required: true,
      pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
    },
  },
  {
    name: "password",
    type: "password",
    id: "password",
    lable: "Password",
    validtion: {
      required: true,
      pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
    },
  },
];
