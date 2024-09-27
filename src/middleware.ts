import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

type Role = keyof typeof RoleBaseRoute

const AuthRoutes = ["/login", "/register"];
const RoleBaseRoute = {
  USER: [/^\/profile/],
  ADMIN: [/^\/admin/],
};
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
    role: "USER",
  };

  //   const user = undefined;
  if (!user) {
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (user?.role && RoleBaseRoute[user?.role as Role] ) {
    const routes = RoleBaseRoute[user?.role as Role];
    if(routes.some((route)=>pathname.match(route))){
        return NextResponse.next();
    }
  }
  return NextResponse.redirect(new URL("/", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/profile", "/admin"],
};
