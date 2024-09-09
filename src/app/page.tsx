"use client";
import Lottie from "lottie-react";
import registerAn from "../app/assets/Images/login.json";
import { formRegister } from "./data";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaRegister } from "./Validtion";
import InputErrormsg from "./_components/UI/InputErrormsg";
import { RootState, useAppDispatch } from "./redux/store";
import { setAccount } from "./redux/feature/RegisterSlice/RegisterSlice";
import Button from "./_components/UI/Button";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

export default function Register() {
  const { push } = useRouter();

  const { isloading } = useSelector((state: RootState) => state.register);
  const dispatch = useAppDispatch();

  interface FormData {
    name: string;
    email: string;
    password: string;
    rePassword: string;
    dateOfBirth: string;
    gender: string;
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(schemaRegister) });
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const result = await dispatch(setAccount(data));
    console.log(result);
    if (result.payload.message === "success") {
      push("/login");
    }
  };

  const renderForm = formRegister.map((el, idx) => (
    <div className="relative z-0 w-full mb-5 group" key={idx}>
      <input
        type={el.type}
        id={el.id}
        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" "
        {...register(el.name, el.validtion)}
      />
      <label
        htmlFor={el.id}
        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
      >
        {el.lable}
      </label>
      {errors[el.name] && <InputErrormsg msg={errors[el.name]?.message} />}
    </div>
  ));
  return (
    <>
      <div className=" bg-[#F9F9F9]">
        <div className=" flex md:items-center h-screen  container ">
          <div className="flex justify-between md:flex-row flex-col md:gap-0 gap-4   w-full ">
            <div className=" ">
              <Lottie className="" animationData={registerAn} />{" "}
            </div>
            <div className="w-full">
              <form className=" p-4" onSubmit={handleSubmit(onSubmit)}>
                {renderForm}
                <div className="grid md:grid-cols-2 md:gap-6">
                  <div className="relative my-4">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                      </svg>
                    </div>
                    <input
                      id="dateOfBirth"
                      {...register("dateOfBirth", {
                        required: true,
                      })}
                      type="date"
                      className=" border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Select date"
                    />
                  </div>
                  {errors["dateOfBirth"] && (
                    <InputErrormsg msg={"Date Is Required"} />
                  )}
                </div>

                <div className="flex items-center gap-3 my-4">
                  <div className="flex items-center ">
                    <input
                      id="default-radio-1"
                      type="radio"
                      value="male"
                      {...register("gender", { required: true })}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600  dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="default-radio-1"
                      className="ms-2 text-sm font-medium text-gray-900"
                    >
                      Male
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="default-radio-2"
                      type="radio"
                      value="female"
                      {...register("gender", { required: true })}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600  dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="default-radio-2"
                      className="ms-2 text-sm font-medium text-gray-900"
                    >
                      Female
                    </label>
                  </div>
                  {errors["gender"] && (
                    <InputErrormsg msg={"Gender Is Required"} />
                  )}
                </div>

                <Button
                  isloading={isloading}
                  className="text-white flex disabled:bg-blue-400  justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Submit
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
