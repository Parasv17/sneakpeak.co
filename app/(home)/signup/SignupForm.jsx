"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React,{ useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";

const SignupForm = () => {
  const [submitting, setSubmitting] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const showPassword = () => {
    setIsPasswordVisible(!isPasswordVisible);
    toast.success("Password is visible");
  };

  const onSubmit = async (data) => {
    try {
      setSubmitting(true);
      console.log("Data:", data);
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
        const res= await response.json();
      console.log("Response:", res);
      if (response.status !== 200) {
        console.log(res.message); // Assuming the error message is in 'data'
        toast.error(res.message);
      } else {
        console.log("Registration successful");
        toast.success("Registration successful");
        router.push("/login");
      }
    //   console.log("Response status:", res.status);
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred");
    } finally {
      setSubmitting(false);
    }
  };
  

  return (
    <>
      <div className="border-[1px] px-10 py-5 rounded-lg max-w-md mx-auto dark:bg-gray-800 dark:border-gray-700 mb-10">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <Label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Name
            </Label>
            <Input
              type="text"
              {...register("name", {
                  required: "Name is required",
                  minLength: {
                  value: 1,
                  message: "Minimum length is ",
                },
            })}
              id="name"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            {errors.name && (
                <p className="text-red-400">{errors.name.message}</p>
                )}
          </div>

          <div className="mb-4">
            <Label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email
            </Label>
            <Input
              type="email"
              {...register("email", {
                  required: "Email is required!",
                  minLength: {
                      value: 1,
                      message: "Minimum length is ",
                },
                pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                },
            })}
              id="email"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            {errors.email && (
                <p className="text-red-400">{errors.email.message}</p>
                )}
          </div>
          <div className="mb-6">
            <Label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Password
            </Label>
            <div className="flex items-center gap-2">
              <Input
                defaultValue={"test"}
                type={isPasswordVisible ? "text" : "password"}
                {...register("password", {
                    required: true,
                    minLength: {
                        value: 1,
                        message: "Minimum length is 1",
                    },
                })}
                id="password"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              <Button type="button" onClick={showPassword}>
                {isPasswordVisible ? "Hide" : "Show"}
              </Button>
            </div>
          </div>

          <div className="mb-4">
            <Label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Phone Number
            </Label>
            <Input
              type="tel"
              {...register("phoneNumber", {
                  required: "Phone Number is required",
                  pattern: {
                      value: /^\d{10}$/,
                      message: "Invalid phone number",
                    },
                })}
              id="phoneNumber"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            {errors.phoneNumber && (
                <p className="text-red-400">{errors.phoneNumber.message}</p>
                )}
          </div>
          <hr className="my-6 border-gray-400 dark:border-gray-600" />

          <h2 className="text-xl mb-4 text-center dark:text-white">
            Address Details
          </h2>

          <div className="mb-4">
            <Label
              htmlFor="houseNumber"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              House Number
            </Label>
            <Input
              type="text"
              {...register("houseNumber", {
                  required: "House Number is required",
                })}
              id="houseNumber"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            {errors.houseNumber && (
                <p className="text-red-400">{errors.houseNumber.message}</p>
                )}
          </div>
          <div className="mb-4">
            <Label
              htmlFor="locality"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Locality
            </Label>
            <Input
              type="text"
              {...register("locality", {
                  required: "Locality is required",
                })}
              id="locality"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            {errors.locality && (
                <p className="text-red-400">{errors.locality.message}</p>
                )}
          </div>
          <div className="mb-4">
            <Label
              htmlFor="streetApartment"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Street/Apartment
            </Label>
            <Input
              type="text"
              {...register("streetApartment", {
                  required: "Street Apartment is required",
                })}
              id="streetApartment"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            {errors.streetApartment && (
                <p className="text-red-400">{errors.streetApartment.message}</p>
                )}
          </div>

          <div className="mb-4">
            <Label
              htmlFor="pincode"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Pincode
            </Label>
            <Input
              type="number"
              {...register("pincode", {
                  required: "Pincode is required",
                })}
              id="pincode"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            {errors.pincode && (
                <p className="text-red-400">{errors.pincode.message}</p>
                )}
          </div>

          <div className="mb-4">
            <Label
              htmlFor="dob"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Date of Birth
            </Label>
            <Input
              type="date"
              {...register("dob", {
                  required: "Date of Birth is required",
                })}
              id="dob"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            {errors.dob && <p className="text-red-400">{errors.dob.message}</p>}
          </div>

          {/* Add other fields here */}
          <Button type="submit" variant={"submit"} disabled={submitting}>
            Create
          </Button>
        </form>
{/* <Toaster /> */}
      </div>
    </>
  );
};

export default SignupForm;
