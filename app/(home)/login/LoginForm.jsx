"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useForm } from "react-hook-form";
// import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const LoginForm = () => {
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
  };

  const onSubmit = async (data) => {
    try {
      setSubmitting(true);
      if (!data.email || !data.password) {
        toast.error("Please fill all fields");
        return;
      }
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res= await response.json();
   
    

      if (response.status===200) {
        router.push("/products");
        toast.success("Logged in successfully");
        router.refresh();
      } else {
        toast.error(res.message);
      }
      setSubmitting(false);
    } catch (error) {
      toast.error("Error logging in");
      console.log(error);
      setSubmitting(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
    

      <div className="border-[1px] px-10 py-5  max-w-md mx-auto dark:bg-gray-800 dark:border-gray-700 justify-center align-middle rounded-3xl mt-20">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
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
                required: "Email is required",
                minLength: {
                  value: 1,
                  message: "Minimum length is 1",
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
            {errors.password && (
              <p className="text-red-400">{errors.password.message}</p>
            )}
          </div>
          <div className="mb-4 -mt-2">
            <p>
              New here ?
              <Button variant={"link"} asChild className="-mx-1">
                <Link href={"/signup"}>Signup</Link>
              </Button>
            </p>
          </div>
          
          <Button type="submit" variant={"submit"} disabled={submitting}>
            Login
          </Button>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
