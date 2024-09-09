import * as yup from "yup";

export const schemaRegister = yup.object({
  name: yup
    .string()
    .required("YourName Is Required")
    .min(3, "Should Be At Least 3 Charecter"),
  email: yup
    .string()
    .required("YourName Is Required")
    .email("Enter Vaild Email"),
  password: yup
    .string()
    .required("Password Is Required")
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "Should Be ex:Bahnasy@123"
    ),
  rePassword: yup
    .string()
    .required("Password Is Required")
    .oneOf([yup.ref("password")], "Password and Repassword Must be Match"),
  dateOfBirth: yup.string().required("dateOfBirth Is Required"),
  gender: yup.string().required("Gender Is Required"),
});

export const schemaLogin = yup.object({
  email: yup
    .string()
    .required("YourName Is Required")
    .email("Enter Vaild Email"),
  password: yup
    .string()
    .required("Password Is Required")
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "Should Be ex:Bahnasy@123"
    ),
});
