import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        accessToken?: string;
        refreshToken?: string;
        userId?: string;
    }

    interface JWT {
        accessToken?: string;
        refreshToken?: string;
        userId?: string;
    }
}