"use client";
import Lottie from "lottie-react";
import registerAn from "../../assets/Images/register.json";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { formLogin } from "@/app/data";
import { schemaLogin } from "@/app/Validtion";
import InputErrormsg from "@/app/_components/UI/InputErrormsg";
import { RootState, useAppDispatch } from "@/app/redux/store";
import { useSelector } from "react-redux";
import Button from "@/app/_components/UI/Button";
import { getAccount } from "@/app/redux/feature/LoginSlice/LoginSlice";
import { useRouter } from "next/navigation";

export default function Login() {
  const { push } = useRouter();
  const { isloading } = useSelector((state: RootState) => state.login);
  const dispatch = useAppDispatch();
  interface FormData {
    email: string;
    password: string;
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(schemaLogin) });
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const result = await dispatch(getAccount(data));
    console.log(result);
    if (result.payload.message === "success") {
      push("/home");
    }
  };

  const renderForm = formLogin.map((el, idx) => (
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
        <div className=" flex md:items-center md:h-screen  container ">
          <div className="flex justify-between md:items-center md:flex-row flex-col md:gap-0 gap-4   w-full ">
            <div className=" ">
              <Lottie className="" animationData={registerAn} />{" "}
            </div>
            <div className="w-full ">
              <form className=" p-4" onSubmit={handleSubmit(onSubmit)}>
                {renderForm}

                <Button
                  isloading={isloading}
                  className="text-white flex disabled:bg-blue-400 justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
