import { withAuth, NextRequestWithAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"
import { SessionApi } from "../types"

export default withAuth(
    function middleware(request: NextRequestWithAuth) {
        // console.log('request path:', request.nextUrl.pathname)
        // console.log('token:', request.nextauth.token)

        // Mengakses role dari objek user di dalam token
        const userRole = (request.nextauth.token as unknown as SessionApi)?.user?.role

        // Perubahan di sini: mencegah akses ke /user untuk peran "user"
        // if (request.nextUrl.pathname.startsWith("/user")
        //     && (userRole !== "admin" && userRole !== "su")) {
        //     return NextResponse.rewrite(
        //         new URL("/access-denied", request.url)
        //     )
        // }

        // if (request.nextUrl.pathname.startsWith("/kabid")
        //     && (userRole !== "admin" && userRole !== "su")) {
        //     return NextResponse.rewrite(
        //         new URL("/access-denied", request.url)
        //     )
        // }
        // if (request.nextUrl.pathname.startsWith("/narasumber")
        //     && (userRole !== "admin" && userRole !== "su")) {
        //     return NextResponse.rewrite(
        //         new URL("/access-denied", request.url)
        //     )
        // }

        // if (request.nextUrl.pathname.startsWith("/opd")
        //     && (userRole !== "admin" && userRole !== "su")) {
        //     return NextResponse.rewrite(
        //         new URL("/access-denied", request.url)
        //     )
        // }
        // if (request.nextUrl.pathname.startsWith("/layanan")
        //     && (userRole !== "admin" && userRole !== "su")) {
        //     return NextResponse.rewrite(
        //         new URL("/access-denied", request.url)
        //     )
        // }
        // if (request.nextUrl.pathname.startsWith("/permohonan/proses-permohonan")
        //     && (userRole !== "admin" && userRole !== "su")) {
        //     return NextResponse.rewrite(
        //         new URL("/access-denied", request.url)
        //     )
        // }
        // if (request.nextUrl.pathname.startsWith("/kegiatan")
        //     && (userRole !== "admin" && userRole !== "su")) {
        //     return NextResponse.rewrite(
        //         new URL("/access-denied", request.url)
        //     )
        // }

        // Jika bukan kondisi di atas, izinkan akses
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
    ]
}