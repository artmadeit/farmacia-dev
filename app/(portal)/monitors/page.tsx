"use client";

import { Page } from "@/app/(api)/pagination";
import { withOutSorting } from "@/app/(components)/helpers/withOutSorting";
import SearchIcon from "@mui/icons-material/Search";
import {
  Stack,
  Tooltip,
  Typography
} from "@mui/material";
import {
  DataGrid,
  esES,
  GridActionsCellItem,
  GridColDef,
} from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import React from "react";
import useSWR from "swr";
import { User } from "./User";

export default function ListMonitors() {
  const router = useRouter();
  const { data } = useSWR<Page<User>>([
    `/users/monitors`,
    { params: { size: 200 } }, // TODO: paginate this
  ]);
  const monitors = data?._embedded?.users;

  const columns = React.useMemo(
    () =>
      (
        [
          { field: "email", headerName: "Email", flex: 1 },
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
                    onClick={() => router.push(`monitors/${params.row.email}`)}
                  />
                </Tooltip>,
              ];
            },
          },
        ] as GridColDef<User>[]
      ).map(withOutSorting),
    [router]
  );

  return (
    <Stack direction="column" spacing={2}>
      <Stack direction="row" alignItems="center">
        <Typography variant="h4">Monitores</Typography>
        {/* <Tooltip title="Registrar" style={{ paddingLeft: "10px" }}>
          <Link href="/patients">
            <Fab color="primary" aria-labelledby="add">
              <AddIcon />
            </Fab>
          </Link>
        </Tooltip> */}
      </Stack>
      {/* <TextField
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
      />*/}
      <div style={{ width: "100", height: "70vh" }}>
        <DataGrid
          columns={columns}
          rows={monitors || []}
          getRowId={monitor => monitor.email}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        />
      </div>
    </Stack>
  );
}
