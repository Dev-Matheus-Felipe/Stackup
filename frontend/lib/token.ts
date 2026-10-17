"server-only"

import { cookies } from "next/headers";

const NODE_ENV = process.env.NODE_ENV;

export async function getToken(): Promise<string | null> {
	const c = await cookies();

	return c.get("stackup_token")?.value || null;
}

export async function setToken({token} : {token: string}) {
	const c = await cookies();

	c.set("stackup_token", token, {
		httpOnly: true,
		sameSite: "lax",
		secure: NODE_ENV == "production" ? true : false,
		maxAge: 3600 * 8,
		path: "/"
	});
}