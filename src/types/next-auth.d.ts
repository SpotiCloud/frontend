import NextAuth from "next-auth";
 
declare module "next-auth" {
  interface Session {
    token: Token;
    user: {
      id: number;
      name: string;
      email: string;
    };
  }
}
 
interface Token {
  name: string;
  email: string;
  sub: string;
  accessToken: string;
  refreshToken: string;
  accessTokenExpired: number;
  user: {
    id: string;
    name: string;
    email: string;
  };
  iat: number;
  exp: number;
  jti: string;
}