import { NextResponse, type NextRequest } from "next/server";

const localHost = /^(localhost|127\.0\.0\.1|\[::1\])(:\d+)?$/;

/**
 * Optional https redirect for self-hosted deployments behind a TLS proxy.
 * Set ENFORCE_HTTPS=true to switch it on. Vercel already redirects http to https
 * at the edge, and localhost is never redirected.
 */
export function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  const proto = request.headers.get("x-forwarded-proto");
  if (process.env.ENFORCE_HTTPS === "true" && proto === "http" && !localHost.test(host)) {
    const target = new URL(`${request.nextUrl.pathname}${request.nextUrl.search}`, `https://${host}`);
    return NextResponse.redirect(target, 308);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon.png|apple-icon.png).*)"],
};
