import { auth } from "@/auth";
import { NextResponse } from "next/server";

// Middleware authenticator
export default auth((req) => {
  const url = req.nextUrl;
  if (!req.auth) {
    // Save the url user was trying to access
    const callbackUrl = encodeURIComponent(url.pathname + url.search);
    // Create the login url with callback
    const loginUrl = new URL(`/login?callbackUrl=${callbackUrl}`, url.origin);
    // Redirect to login
    return NextResponse.redirect(loginUrl);
  }
});

// Middleware matcher
export const config = {
  matcher: ["/dashboard/:path*"],
};
