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

}): Promise<{ok: boolean, message: string}> {

  const validBody = (type == "register" ? RegisterSchema : LoginSchema).safeParse(data);

  if(validBody.error) {
    return {ok: false, message: "Invalid credentials!"};
  }

  const options = {
    method: "POST",
    body: JSON.stringify(validBody.data),
  };

  const res = await apiFetch<{message: string, token?: string}>({endpoint: `/auth/${type}`, options});
  const body = await res.json();
  
  if(res.ok && body.token){
    await setToken({token: body.token});
  }
  
  return {
    ok: res.ok,
    message: body.message,
  };
}