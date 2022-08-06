import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const seed = process.env.NEXT_PUBLIC_SEED as string;

export async function middleware(req: NextRequest) {
    if (req.nextUrl.pathname.startsWith("/checkout")) {
        const token = req.cookies.get('token') || ''

        try {
            await jwtVerify(token, new TextEncoder().encode(seed));
            return NextResponse.next();
        } catch (error) {
            console.error(`JWT Invalid or not signed in`, { error });
            const { protocol, host, pathname } = req.nextUrl;
            return NextResponse.redirect(`${protocol}//${host}/auth/login?p=${pathname}`)
        }
    }
}


export const config = {
    matcher: ["/checkout/:path*"],
}  