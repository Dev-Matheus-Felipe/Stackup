"server-only"

import { cookies } from "next/headers";

const NODE_ENV = process.env.NODE_ENV;

export async function getToken(): Promise<string | null> {
	const c = await cookies();

	return c.get("JWT_TOKEN")?.value || null;
}

export async function setToken({token} : {token: string}) {
	const c = await cookies();

	c.set("JWT_TOKEN", token, {
		httpOnly: true,
		sameSite: "lax",
		secure: NODE_ENV == "production" ? true : false,
		maxAge: 3600 * 8,
		path: "/"
	});
}