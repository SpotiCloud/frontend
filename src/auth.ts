/*import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";
import KeycloakProvider from "next-auth/providers/keycloak";

const params = {
    client_id: process.env.KEYCLOAK_CLIENT_ID,
    client_secret: process.env.KEYCLOAK_CLIENT_SECRET,
    grant_type: "refresh_token",
}

function refreshAccessToken(refresh_token: string){
    return fetch(`${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/token`, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
            ...params,
            refresh_token
        }),
        method: "POST"
    });
}

export const { auth, handlers: { GET, POST } , signIn, signOut } = NextAuth({
    session: {
        strategy: "jwt",
        maxAge: 60 * 30
    },
    callbacks: {
        async session({ session, token }){
            session.idToken = token.idToken
            session.refreshToken = token.refreshToken
            return session;
        },
        async jwt({ token, account }) {
            if(account){
                token.idToken = account.id_token;
                token.accessToken = account.access_token;
                token.refreshToken = account.refresh_token;
                token.expiresAt = account.expires_at;
                token.userId = account.userId;
                return token;
            }
            if(Date.now() < (token.expiresAt!)){
                return token;
            }
            try{
                const response = await refreshAccessToken(token.refreshToken);
                if(!response.ok) throw new Error();
                const newToken = await response.json();
                const updatedToken: JWT = {
                    ...token,
                    idToken: newToken.id_token,
                    accessToken: newToken.access_token,
                    expiresAt: newToken.expires_at
                }
                return updatedToken;
            }
            catch(error){
                return { ...token, error: "RefreshAccessTokenError" }
            }
        }
    },
    providers: [KeycloakProvider({
        clientId: process.env.KEYCLOAK_CLIENT_ID, 
        clientSecret: process.env.KEYCLOAK_CLIENT_SECRET, 
        issuer: process.env.KEYCLOAK_URL,
    })]
})*/