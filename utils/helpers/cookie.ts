"use server";
import { cookies } from "next/headers";

const PROFILE_ID_COOKIE_NAME = "CURRENT_PROFILE_ID";
export async function getProfileIdCookie() {
  return cookies().get(PROFILE_ID_COOKIE_NAME)?.value;
}
export async function setProfileIdCookie(id: string) {
  cookies().set(PROFILE_ID_COOKIE_NAME, id);
}
