import { cookies } from "next/headers";
import { VOTER_ID_COOKIE } from "./constants";

export async function getVoterId(): Promise<string> {
  const cookieStore = await cookies();
  return cookieStore.get(VOTER_ID_COOKIE)?.value ?? "";
}

export function createVoterId(): string {
  return crypto.randomUUID();
}

export const VOTER_COOKIE_OPTIONS = {
  name: VOTER_ID_COOKIE,
  maxAge: 60 * 60 * 24 * 365,
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
};
