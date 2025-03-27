import { NextRequest, NextResponse } from 'next/server';
import { auth, UserRole } from './auth';

const routesConfig: Record<UserRole, string[]> = {
    admin: ['/', '/dashboard', '/system', '/users'],
    manager: ['/', '/dashboard'],
};

export default async function middleware(req: NextRequest) {
    const session = await auth();

    const currentPath = req.nextUrl.pathname;

    if (!session && currentPath !== '/') {
        return NextResponse.redirect(new URL('/', req.nextUrl));
    }

    if (session && currentPath === '/') {
        return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
    }

    const currentRole = session?.user?.role;
    if (currentRole) {
        if (routesConfig[currentRole].includes(currentPath)) {
            return NextResponse.next();
        } else {
            return NextResponse.rewrite(new URL('/404', req.nextUrl.origin));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|icon.png|manifest.json).*)'],
};
