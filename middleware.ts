import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { getToken } from "next-auth/jwt";
import { getSession } from "next-auth/react";

const seed = process.env.NEXT_AUTH_SECRET as string;

export async function middleware(req: NextRequest | any) {
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
    const session = await getToken({ req, secret: seed })
    if (!session) {
        const { protocol, host, pathname } = req.nextUrl;
        return NextResponse.redirect(`${protocol}//${host}/auth/login?p=${pathname}`)
    }

    return NextResponse.next();
}


export const config = {
    matcher: ["/checkout/:path*"],
}  