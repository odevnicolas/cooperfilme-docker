import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'
import { authOptions } from './app/api/auth/[...nextauth]/authOptions'

export default withAuth(
  function middleware() {
    return NextResponse.next()
  },
  {
    jwt: { decode: authOptions.jwt?.decode },
    callbacks: {
      authorized: ({ token, req }) => {
        const pathname = req.nextUrl.pathname
        if (pathname === '/') {
          return true
        }
        return !!token
      },
    },
    pages: {
      signIn: '/',
      error: '/error',
    },
    secret: process.env.NEXTAUTH_SECRET,
  },
)

export const config = {
  matcher: '/((?!api|static|.*\\..*|_next).*)',
}
