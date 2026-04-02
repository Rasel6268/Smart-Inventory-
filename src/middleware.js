// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('token');
  const { pathname } = request.nextUrl;

  // Define routes
  const authRoutes = ['/auth/login', '/auth/register'];
  const protectedRoutes = ['/dashboard', '/profile', '/settings'];
  
  // Check if current path is an auth route (login/register)
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));
  
  // Check if current path is a protected route
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

  // Case 1: User is logged in (has token) and tries to access auth pages
  if (token && isAuthRoute) {
    // Redirect to dashboard or home
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Case 2: User is NOT logged in and tries to access protected routes
  if (!token && isProtectedRoute) {
    // Redirect to login page with the intended destination
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Case 3: Special handling for /auth/login exact match
  if (pathname === '/auth/login' && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Allow all other requests
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/auth/:path*',
    '/dashboard/:path*',
    '/profile/:path*',
    '/settings/:path*'
  ]
};