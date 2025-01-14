import { withAuth, NextRequestWithAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
    function middleware(request: NextRequestWithAuth) {
        // Debug logs yang lebih detail
        // console.log('Full Token Structure:', JSON.stringify(request.nextauth.token, null, 2))

        const token = request.nextauth.token as any;
        // console.log('Direct role check:', token?.role)
        // console.log('Nested user role check:', token?.user?.role)

        // Coba kedua kemungkinan struktur
        const userRole = token?.role || token?.user?.role

        if (request.nextUrl.pathname.startsWith("/market")) {
            // console.log('Attempting market access with role:', userRole)

            // Ubah pengecekan untuk lebih longgar
            const allowedRoles = ['admin', 'su', 'ADMIN', 'SU', 'Admin', 'Su']
            if (!allowedRoles.includes(userRole)) {
                // console.log('Access denied. Role not in allowed list:', userRole)
                return NextResponse.rewrite(
                    new URL("/access-denied", request.url)
                )
            }
        }

        return NextResponse.next()
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token
        },
    }
)

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/product/:path*",
        "/market/:path*",
        "/transaction/:path*",
        "/rekap/:path*",
    ]
}