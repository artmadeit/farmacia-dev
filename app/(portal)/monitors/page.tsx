"use client";

import AddIcon from "@mui/icons-material/Add";
import {
  Fab,
  InputAdornment,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  DataGrid,
  esES,
  GridActionsCellItem,
  GridColDef,
} from "@mui/x-data-grid";
import Link from "next/link";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/navigation";
import { withOutSorting } from "@/app/(components)/helpers/withOutSorting";
import { useQueryState } from "next-usequerystate";

type Monitor = {
  id?: number;
  code: string;
  firstName: string;
  lastName: string;
};

export default function ListMonitors() {
  const router = useRouter();
  const [searchText, setSearchText] = useQueryState("searchText", {
    defaultValue: "",
  });
  const [monitor, setMonitor] = React.useState({
    _embedded: {
      monitor: [],
    },
    page: {
      size: "",
      totalElements: "",
      totalPage: "",
      numbers: "",
    },
  });

  const columns = React.useMemo(
    () =>
      (
        [
          { field: "code", headerName: "Código" },
          { field: "firstName", headerName: "Nombre" },
          { field: "lastName", headerName: "Apellido" },
          {
            field: "actions",
            type: "actions",
            width: "80",
            getActions: (params) => {
              return [
                <Tooltip title="Ver" key="edit">
                  <GridActionsCellItem
                    icon={<SearchIcon />}
                    label="ver"
                    onClick={() => router.push(`${params}/selection`)}
                  />
                </Tooltip>,
              ];
            },
          },
        ] as GridColDef<Monitor>[]
      ).map(withOutSorting),
    [router]
  );

  const handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (event) => {
    const searchText = event.target.value;
    setSearchText(searchText);
  };

  return (
    <Stack direction="column" spacing={2}>
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
      <TextField
        placeholder="Buscar..."
        variant="outlined"
        value={searchText}
        onChange={handleChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <div style={{ width: "100", height: "70vh" }}>
        <DataGrid
          columns={columns}
          rows={monitor._embedded.monitor}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        />
      </div>
    </Stack>
  );
}
