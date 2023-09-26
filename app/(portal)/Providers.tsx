"use client";

import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { es as dateFnsEs } from "date-fns/locale";
import { SWRConfig } from "swr";
import { fetcher } from "../(api)/api";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { SnackbarProvider } from "../(components)/SnackbarContext";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <UserProvider>
      <SWRConfig value={{ fetcher }}>
        <LocalizationProvider
          dateAdapter={AdapterDateFns}
          adapterLocale={dateFnsEs}
        >
          <SnackbarProvider>{children}</SnackbarProvider>
        </LocalizationProvider>
      </SWRConfig>
    </UserProvider>
  );
};
