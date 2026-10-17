"use client"

import { LoginSchema, LoginSchemaType, RegisterSchema, RegisterSchemaType } from "@/lib/zod/authSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { authAction } from "@/lib/actions/auth";
import { useForm } from "react-hook-form";
import { useState } from "react"
import { Eye, EyeOff, LibraryBig } from "lucide-react";

// MANAGE AUTH METHODS DYNAMICLY INSTEAD OF CREATING ONE FOR EACH OF THEM

type FormStateType = {
  type: "login" | "register",
  schema: typeof LoginSchema | typeof RegisterSchema,

  uptitle: string,
  title: string,
  sub: string,
  text: string,
  span: string
};

const authMethods: Record<FormStateType["type"], FormStateType> = {
  register: {
    type: "register",
    schema: RegisterSchema,

    uptitle: "CREATE A NEW ACCOUNT",
    title: "Log in to your account",
    sub: "Continue where you stopped and look at it's new.",
    text: "Doesn't have an account yet?",
    span: "Sin up"
  },
  
  login: {
    type: "login",
    schema: LoginSchema,

    uptitle: "WELCOME BACK",
    title: "Start your jorney",
    sub: "Join to the community in a few seconds.",
    text: "Already have an account?",
    span: "Log in"
  },
};

export default function AuthContent(){

  // (LOGIN OR REGISTER) STATES
  const [formState, setFormState] = useState<FormStateType["type"]>("login");
  const [passwordEnable, setPasswordEnalbe] = useState<boolean>(false);

  const selectedAuth = authMethods[formState];
  const EyeIcon = passwordEnable ? Eye : EyeOff

  const {
    register,
    handleSubmit,
    formState: {errors, isLoading},
  
  } = useForm<LoginSchemaType | RegisterSchemaType>({
    resolver: zodResolver(selectedAuth.schema)
  });

  const handleAuth = async (data: LoginSchemaType | RegisterSchemaType) => {
    const res: string = await authAction({data, type: selectedAuth.type});
  };


  return (
    <div className="flex flex-1 flex-col items-end gap-5 es:p-5 p-2">
      <div className="flex w-full flex-1 flex-col es:gap-10 gap-5 items-center justify-center">

        {/* HEADER */}
        <div className="lg:hidden flex gap-2 items-center justify-start max-es:justify-center mb-5 es:w-110 w-full">
          <div className="p-2 rounded-md bg-(--orange)"><LibraryBig size={25} /></div>
          <h1 className="font-bold text-lg">
            Stack
            <span className="text-(--orange-dark)">up</span>
          </h1>
        </div>

        {/* FORM */}
        <div className="flex flex-col es:gap-10 gap-5 max-es:w-full">

          {/* TITLE */}
          <div className=" flex flex-col gap-2 max-es:items-center">
            <h3 className="font-semibold text-(--orange-dark) text-xs tracking-wider">{selectedAuth.uptitle}</h3>
            <h1 className="font-semibold text-3xl">{selectedAuth.title}</h1>
            <p className="text-(--muted) font-light text-xs">{selectedAuth.sub}</p>
          </div>

          <form className="flex flex-col gap-5" onSubmit={handleSubmit(handleAuth)}>
            { formState == "register" &&
              <div className="flex flex-col gap-2 text-xs">
                <label htmlFor="username" className="font-bold">Username</label>

                <input 
                  {...register("username")} 
                  id="username"
                  type="text"
                  placeholder="How do we can call you?"
                  className="bg-(--bg) es:w-110 w-full max-es:w-full p-4  border border-(--border) rounded-md focus:ring-1 focus:ring-(--orange-dark) outline-none"
                  />

                  <p>username wrong!</p>
              </div>
            }

            <div className="flex flex-col gap-2 text-xs">
              <label htmlFor="email" className="text-xs font-bold">E-mail</label>
              <input 
                {...register("email")} 
                id="email"
                type="email"
                placeholder="you@example.com"
                className="bg-(--bg) es:w-110 w-full max-es:w-full p-4 border border-(--border) rounded-md  focus:ring-1 focus:ring-(--orange-dark) outline-none"
                />

              { errors.email && <p className="text-red-500 mb-2">{errors.email.message}</p> }
            </div>

            <div className="flex flex-col gap-2 text-xs">
              <label htmlFor="password" className="font-bold">Password</label>
              <div className="es:w-110 w-full max-es:w-full relative">
                <input 
                  {...register("password")} 
                  id="password"
                  type={passwordEnable ? "text" : "password"}
                  placeholder="Minimumn of 8 characters"
                  className="bg-(--bg) w-full p-4 pr-10 border border-(--border) rounded-md focus:ring-1 focus:ring-(--orange-dark) outline-none"
                />

                <button 
                  type="button" 
                  onClick={() => setPasswordEnalbe(prev => !prev)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 p-1.5 rounded hover:bg-(--button-hover) cursor-pointer"
                >
                  <EyeIcon size={16} color="var(--muted)" />
                </button>
              </div>

                { errors.password && <p className="text-red-500 mb-2">{errors.password.message}</p> }
            </div>

            <button 
              disabled={isLoading}
              type="submit" 
              className="cursor-pointer hover:bg-(--orange-dark) text-center w-full es;py-4 py-3 bg-(--orange) text-sm rounded-md font-medium"
              >
              {formState == "login" ? "Login in the community" : "Create my account"}
            </button>


            <div className="flex w-full gap-3 items-center text-xs text-(--muted)">
              <div className="border-b border-(--border) flex-1  rounded"/>
              <span>or continue with</span>
              <div className="border-b border-(--border) flex-1  rounded"/>
            </div>
          </form>


          <div className="flex gap-3 text-sm">
            <button className="hover:border-(--muted) cursor-pointer w-1/2 text-center py-2.5 font-semibold border border-(--border) rounded">
              Google
            </button>
            
            <button className="hover:border-(--muted) cursor-pointer w-1/2 text-center py-2.5 font-semibold border border-(--border) rounded">
              Github
            </button>
          </div>
        </div>

        {/* MESSAGE */}
        <p className="text-(--muted) text-xs w-full flex gap-2 justify-center-safe">
          {selectedAuth.text} 
          <span 
            onClick={() => setFormState(prev => prev == "login" ? "register" : "login")}
            className="text-(--orange-dark) font-bold cursor-pointer hover:underline"
          > 
            {selectedAuth.span}
            </span>
        </p>
      </div>

      <p className="text-xs text-(--muted)">© 2026 Stackup. Built by builders, for builders.</p>
    </div>
  )
}