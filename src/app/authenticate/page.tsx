
'use client';
import { getSession, signIn } from "next-auth/react";
import { useEffect } from "react";

export default async function Home(req) {
  const session = await getSession({ req });

  const accessToken = session.token.accessToken;
  console.log(accessToken);
  //const { data: session } = useSession();

  return (
    <div>
      { session ? 
        <button>
          {session.token.accessToken}
          Logout
        </button>
      : 
        <button onClick={() => signIn("keycloak")}>
          Login
        </button>
      }
    </div>
  );
}