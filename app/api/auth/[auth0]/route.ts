import { handleAuth, handleLogin } from "@auth0/nextjs-auth0";

// see:
// https://auth0.github.io/nextjs-auth0/types/handlers_auth.Handlers.html
// https://community.auth0.com/t/add-organization-id-dynamically-to-next-js-login-route/112696

export const GET = handleAuth({
  login: handleLogin({
    returnTo: "/patients",
    authorizationParams: {
      organization: "org_DFJ8phNPTZWumbyj",
    },
  }),
});
