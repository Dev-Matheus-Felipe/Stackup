"use client"

import { LoginSchema, LoginSchemaType, RegisterSchema, RegisterSchemaType } from "@/lib/zod/authSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { authAction } from "@/lib/actions/auth";
import { useForm } from "react-hook-form";
import { useState } from "react"

// MANAGE AUTH METHODS DYNAMICLY INSTEAD OF CREATING ONE FOR EACH OF THEM

type FormStateType = {
  type: "login" | "register",
  schema: typeof LoginSchema | typeof RegisterSchema,
};

const authMethods: Record<FormStateType["type"], FormStateType> = {
  register: {
    type: "register",
    schema: RegisterSchema
  },
  
  login: {
    type: "login",
    schema: LoginSchema
  },
};

export default function AuthContent(){

  // (LOGIN OR REGISTER) STATES, AND ITS DATA
  const [formState, setFormState] = useState<FormStateType["type"]>("login");
  const selectedAuth = authMethods[formState];

  const {
    register,
    handleSubmit,
    formState: {errors},
  
  } = useForm<LoginSchemaType | RegisterSchemaType>({
    resolver: zodResolver(selectedAuth.schema)
  });

  const handleLogin = async (data: LoginSchemaType | RegisterSchemaType) => {
    const res: {message: string} = await authAction({data, type: selectedAuth.type});
    alert(res.message);
  };


  return (
    <div className="flex flex-1 shrink-0 items-center justify-center">
      
    </div>
  )
}