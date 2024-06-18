import { Token } from "@/types/next-auth";
import { AuthOptions } from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";
 
export const authOptions: AuthOptions = {
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_CLIENT_ID as string,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET as string,
      issuer: process.env.KEYCLOAK_URL,
      wellKnown: `${process.env.KEYCLOAK_URL}/.well-known/openid-configuration`
      //idToken: true
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.accessTokenExpired = account.expires_at! * 1000;
        token.user = user;
 
        return token;
      }
      return token;
    },
    async session({ session, token }) {
      session.token = token as unknown as Token;
        
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};