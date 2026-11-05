"use server"

import { cookies } from "next/headers";
import apiFetch from "../apiFetch"
import { ApiResponse } from "@/types/api";
import { getToken } from "../token";
import { cacheLife, cacheTag } from "next/cache";

type cacheTimeType = "days" | "hours" | "minutes" | "seconds" | "max";

export async function getCached<T>({
  cache,
  token,
  endpoint,

} : {
  cache: {tag: string, time: cacheTimeType }, 
  token: string | null,
  endpoint: string, 

}): Promise<ApiResponse<T>> {
  "use cache"

  cacheTag(cache.tag);
  cacheLife(cache.time as "default");

  const res = await apiFetch({endpoint, options: {method: "GET"}, token});
  return await res.json();
};


export async function getData<T>({
  endpoint,
  cache,

} : {
  endpoint: string, 
  cache?: {tag: string, time: cacheTimeType},

}): Promise<ApiResponse<T>> {
  const token = await getToken();
  
  if(cache){
    return await getCached<T>({endpoint, cache, token});
  }
  
  const res = await apiFetch({endpoint, options: {method: "GET"}, token});
  return await res.json();
}


export async function logoutAction(){
  const req = await cookies();
  req.delete("stackup_token");
}


