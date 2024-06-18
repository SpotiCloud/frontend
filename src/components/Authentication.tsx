"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButton() {
  const { data: session } = useSession();

  return (
    <div>
      {!session ? (
        <button onClick={() => signIn("keycloak")}>Sign in</button>
      ) : (
        <button onClick={() => signOut()}>Sign out</button>
      )}
    </div>
  );
}