import { NextResponse } from "next/server";

export function middleware(request) {
  const pathname = request.nextUrl.pathname;
  const reducedPadding = ["/aprender-a-invertir", "/video-clase"].includes(
    pathname
  );

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-reduced-padding", reducedPadding.toString());

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/aprender-a-invertir", "/video-clase", "/"],
};
