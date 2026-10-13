"use server"

import { LoginSchema, LoginSchemaType, RegisterSchema, RegisterSchemaType } from "../zod/authSchemas";
import apiFetch from "../apiFetch";
import { setToken } from "../token";

export async function authAction({
  data,
  type,

} : {
  data: RegisterSchemaType | LoginSchemaType,
  type: "register" | "login",

}): Promise<{message: string}> {

  const validBody = (type == "register" ? RegisterSchema : LoginSchema).safeParse(data);

  if(validBody.error) {
    return {message: "Invalid credentials!"};
  }

  const options = {
    method: "POST",
    body: JSON.stringify(validBody.data),
  };

  const res = await apiFetch<{message: string, token?: string}>({endpoint: `/auth/${type}`, options});

  if(res.token){
    await setToken({token: res.token});
  }
  
  return {message: res.message};
}