declare namespace NodeJS {
    export interface ProcessEnv {
      KEYCLOAK_CLIENT_ID: string
      KEYCLOAK_CLIENT_SECRET: string
      KEYCLOAK_ISSUER: string
      MUSIC_API_URL: string
      SESSION_API_URL: string
    }
}