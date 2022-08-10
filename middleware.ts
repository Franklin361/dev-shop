import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const seed = process.env.NEXTAUTH_SECRET as string;

export async function middleware(req: NextRequest) {
    // if (req.nextUrl.pathname.startsWith("/checkout")) {
    //     const token = req.cookies.get('token') || ''

    //     try {
    //         await jwtVerify(token, new TextEncoder().encode(seed));
    //         return NextResponse.next();
    //     } catch (error) {
    //         console.error(`JWT Invalid or not signed in`, { error });
    // const { protocol, host, pathname } = req.nextUrl;
    // return NextResponse.redirect(`${protocol}//${host}/auth/login?p=${pathname}`)
    //     }
    // }
    const { protocol, host, pathname } = req.nextUrl;

    if (pathname.startsWith("/checkout")) {
        const session = await getToken({ req, secret: seed })
        if (!session) return NextResponse.redirect(`${protocol}//${host}/auth/login?p=${pathname}`)
    }

    if (pathname.startsWith("/admin")) {
        const session: any = await getToken({ req, secret: seed })

        if (!session) return NextResponse.redirect(`${protocol}//${host}/auth/login?p=${pathname}`)

        const validRoles = ['admin']
        if (!validRoles.includes(session.user.role)) return NextResponse.redirect(`${protocol}//${host}/`)
    }

    if (pathname.startsWith("/api/admin/")) {

        const session: any = await getToken({ req, secret: seed })

        const url = req.nextUrl.clone()
        url.pathname = '/api/bad-request'
        url.search = `?message=Not authorized&status=401`

        if (!session) return NextResponse.rewrite(url)

        const validRoles = ['admin']
        if (!validRoles.includes(session.user.role)) return NextResponse.rewrite(url)
    }


    return NextResponse.next();
}


export const config = {
    matcher: ["/checkout/:path*", "/admin/:path*", "/api/admin/:path*"],
}  