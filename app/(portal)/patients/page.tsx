"use client";

import { Fab, Stack, Tooltip, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  esES,
} from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import { withOutSorting } from "../../(components)/helpers/withOutSorting";
import { Patient } from "./create/Patient";
import useSWR from "swr";
import { Page } from "../../(api)/pagination";
import { usePagination } from "../../(components)/hook-customization/usePagination";

export default function ListPatients() {
  const router = useRouter();
  const { paginationModel, setPaginationModel } = usePagination();

  const { data: patients } = useSWR<Page<Patient>>([
    "/patients",
    {
      params: {
        page: paginationModel.page,
        pageSize: paginationModel.pageSize,
      },
    },
  ]);

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
            width: 80,
            getActions: (params) => {
              return [
                <Tooltip title="Editar" key="edit">
                  <GridActionsCellItem
                    icon={<EditIcon />}
                    label="Editar"
                    onClick={() => router.push(`patients/${params.row.id}`)}
                  />
                </Tooltip>,
              ];
            },
          },
        ] as GridColDef<Patient>[]
      ).map(withOutSorting),
    [router]
  );

  if (!patients) return <div>Loading</div>;
  return (
    <Stack direction="column" spacing={2}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Typography variant="h4">Pacientes</Typography>
        <Tooltip title="Registrar">
          <Link href="patients/create">
            <Fab color="primary" aria-labelledby="add">
              <AddIcon />
            </Fab>
          </Link>
        </Tooltip>
      </Stack>
      <div style={{ height: "70vh", width: "100%" }}>
        <DataGrid
          columns={columns}
          rowCount={patients.page.totalElements}
          paginationModel={paginationModel}
          paginationMode="server"
          onPaginationModelChange={setPaginationModel}
          rows={patients._embedded.patients}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        />
      </div>
    </Stack>
  );
}