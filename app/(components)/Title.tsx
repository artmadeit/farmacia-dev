import { Typography } from "@mui/material";
import React from "react";

export const Title = ({ children }: { children: React.ReactNode }) => {
  return (
    <Typography variant="h5" gutterBottom>
      {children}
    </Typography>
  );
};
