import { Box, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import { formatDate } from "../date";

export const Title = ({ children }: { children: React.ReactNode }) => {
  return (
    <Typography variant="h5" gutterBottom>
      {children}
    </Typography>
  );
};

export const Title2 = ({
  children,
  date,
}: {
  children: React.ReactNode;
  date: Date;
}) => {
  return (
    <Stack>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h5" gutterBottom>
          {children}
        </Typography>
        <Typography>Fecha: {formatDate(date)}</Typography>
      </Box>
      <Divider />
    </Stack>
  );
};
