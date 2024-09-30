import NextAuth from "next-auth/next";
import KakaoProvider from "next-auth/providers/kakao";

const handler = NextAuth({
    providers: [
        KakaoProvider({
            clientId: process.env.KAKAO_CLIENT_ID as string,
            clientSecret: process.env.KAKAO_CLIENT_SECRET as string,
        }),
    ],
    callbacks: {
        async jwt({ token, account, profile }) {
            if (account && profile ) {
                // console.log("Profile:", JSON.stringify(profile, null, 2));
                // console.log("Account:", JSON.stringify(account, null, 2));

                token.accessToken = account.access_token;
                token.refreshToken = account.refresh_token;
                token.userId = account.providerAccountId;
            }

            return token;
        },
        async session({ session, token }) {
            session.accessToken = token.accessToken as string;
            session.refreshToken = token.refreshToken as string;
            session.userId = token.userId as string;

            return session;
        }
    },
    // debug: true,
});

export { handler as GET, handler as POST };