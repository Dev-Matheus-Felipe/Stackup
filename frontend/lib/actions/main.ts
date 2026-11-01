"use server"

import { cookies } from "next/headers";
import apiFetch from "../apiFetch"
import { ApiResponse } from "@/types/api";

export async function getPartialData<T>(endpoint: string): Promise<ApiResponse<T>> {
    const res = await apiFetch({endpoint, options: {method: "GET"}});
    return await res.json();
};

export async function logoutAction(){
    const req = await cookies();
    req.delete("stackup_token");
}