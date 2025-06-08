"use client";

import { useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { registerUser } from "@/actions";
import { SubmitHandler, useForm } from "react-hook-form";

type FormInputs = {
  name: string;
  lastName: string;
  email: string;
  password: string;
};

export const RegisterForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();
  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    const { name, lastName, email, password } = data;
    const response = await registerUser(name, lastName, email, password);
    if (!response.ok) {
      setErrorMessage(response.message);
      console.error(response.message);
      return;
    }

    console.log("User registered successfully:", response);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <label htmlFor="firstname">First Name</label>
      <input
        className={clsx("px-5 py-2 border bg-gray-200 rounded mb-2", {
          "border-red-500": errors.name,
        })}
        type="text"
        autoFocus
        {...register("name", { required: true })}
      />
      {/* {errors.name?.type === "required" && (
        <span className="text-red-500">This field is required</span>
      )} */}

      <label htmlFor="lastname">Last Name</label>
      <input
        className={clsx("px-5 py-2 border bg-gray-200 rounded mb-2", {
          "border-red-500": errors.lastName,
        })}
        type="text"
        {...register("lastName", { required: true })}
      />

      <label htmlFor="email">Email</label>
      <input
        className={clsx("px-5 py-2 border bg-gray-200 rounded mb-2", {
          "border-red-500": errors.email,
        })}
        type="email"
        {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
      />

      <label htmlFor="password">Password</label>
      <input
        className={clsx("px-5 py-2 border bg-gray-200 rounded mb-2", {
          "border-red-500": errors.password,
        })}
        type="password"
        {...register("password", { required: true, minLength: 6 })}
      />

      <span className="text-red-500">{errorMessage}</span>

      <button className="btn-primary">Create account</button>

      {/* divisor l ine */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-300"></div>
        <div className="px-2 text-gray-800">Or</div>
        <div className="flex-1 border-t border-gray-300"></div>
      </div>

      <Link href="/auth/login" className="btn-secondary text-center">
        Log in
      </Link>
    </form>
  );
};
