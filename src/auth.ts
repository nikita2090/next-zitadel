import NextAuth from 'next-auth';
import ZITADEL from 'next-auth/providers/zitadel';

export enum UserRole {
    manager = 'manager',
    admin = 'admin',
}

declare module 'next-auth' {
    interface User {
        firstName?: string;
        lastName?: string;
        loginName?: string;
        isEmailVerified?: boolean;
        gender?: string;
        role: UserRole;
    }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    //debug: true,
    providers: [
        ZITADEL({
            issuer: process.env.AUTH_ZITADEL_ISSUER,
            clientId: process.env.AUTH_ZITADEL_ID,
            clientSecret: process.env.AUTH_ZITADEL_SECRET,
            async profile(profile) {
                return {
                    id: profile.sub,
                    name: profile.name,
                    firstName: profile.given_name,
                    lastName: profile.family_name,
                    loginName: profile.preferred_username,
                    email: profile.email,
                    isEmailVerified: profile.email_verified,
                    image: profile.picture,
                    gender: profile.gender,
                    role: Object.keys(profile['urn:zitadel:iam:org:project:roles'])[0] || '',
                };
            },
            authorization: {
                params: {
                    scope: `openid email profile urn:zitadel:iam:org:role`,
                },
            },
        }),
    ],

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.user = {
                    id: user.id,
                    name: user.name,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    loginName: user.loginName,
                    email: user.email,
                    isEmailVerified: user.isEmailVerified,
                    image: user.image,
                    gender: user.gender,
                    role: user.role,
                };
            }

            return token;
        },
        async session({ session, token }) {
            session.user = token.user;
            return session;
        },
    },
});
