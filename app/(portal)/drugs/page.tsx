"use client";

import { Fab, Stack, Tooltip, Typography } from "@mui/material";
import Link from "next/link";
import AddIcon from "@mui/icons-material/Add";
import React from "react";

const DrugsPage = () => {
  return (
    <Stack direction="column" spacing={2}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Typography variant="h4">Medicamentos</Typography>
        <Tooltip title="Crear">
          <Link href="/">
            <Fab color="primary" aria-labelledby="add">
              <AddIcon />
            </Fab>
          </Link>
        </Tooltip>
      </Stack>
      <div>Tabla</div>
    </Stack>
  );
};

export default DrugsPage;
