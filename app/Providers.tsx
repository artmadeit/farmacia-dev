"use client";
import { Auth0Provider } from "@auth0/auth0-react";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <Auth0Provider
      domain="dev-jeb53xnc.us.auth0.com"
      clientId="pDkQvT0xx52T29ot6CLhTG2CwuKIDs4e"
      authorizationParams={{
        redirect_uri: globalThis.location?.origin + "/patients",
        organization: "org_DFJ8phNPTZWumbyj",
      }}
    >
      {children}
    </Auth0Provider>
  );
};
