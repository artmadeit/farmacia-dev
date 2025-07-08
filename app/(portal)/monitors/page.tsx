"use client";

import AddIcon from "@mui/icons-material/Add";
import { Fab, Stack, Tooltip, Typography } from "@mui/material";
import Link from "next/link";

export default function ListMonitors() {
  return (
    <Stack direction="column">
      <Stack direction="row" alignItems="center">
        <Typography variant="h4">Monitores</Typography>
        <Tooltip title="Registrar" style={{ paddingLeft: "10px" }}>
          <Link href="/patients">
            <Fab color="primary" aria-labelledby="add">
              <AddIcon />
            </Fab>
          </Link>
        </Tooltip>
      </Stack>
    </Stack>
  );
}
