"use server"

import apiFetch from "../apiFetch"

export async function getPartialData(endpoint: string) {
    const res = await apiFetch({endpoint, options: {method: "GET"}});
    return res
};