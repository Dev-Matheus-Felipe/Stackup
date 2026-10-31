"use server"

import { cookies } from "next/headers";
import apiFetch from "../apiFetch"

export async function getPartialData(endpoint: string) {
    const res = await apiFetch({endpoint, options: {method: "GET"}});
    return res
};


export async function logoutAction(){
    const req = await cookies();
    req.delete("stackup_token");
}