"use client";

import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { es as dateFnsEs } from "date-fns/locale";
// import { SWRConfig } from "swr";
// import { fetcher } from "./../app/api";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    // <SWRConfig value={{ fetcher }}>
      <LocalizationProvider
        dateAdapter={AdapterDateFns}
        adapterLocale={dateFnsEs}
      >
         {children}
      </LocalizationProvider>
    // </SWRConfig>
  );
};
