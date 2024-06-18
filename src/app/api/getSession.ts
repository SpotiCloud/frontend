/*import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]/authOptions";

export async function getSession(req) {
  try {
    const session = await getServerSession(authOptions, req);

    if (!session) {
      return null;
    }

    return {
      user: session.user,
      accessToken: session.accessToken,
    };
  } catch (error) {
    console.error("Error fetching session:", error);
    return null;
  }
}*/