"use client";

import { Fab, Stack, Tooltip, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import { withOutSorting } from "../(components)/helpers/withOutSorting";
import { api } from "../(api)/api";
import { Patient } from "./create/Patient";
import useSWR from "swr";
import { Page } from "../(api)/pagination";
import { usePagination } from "../(components)/hook-customization/usePagination";

export default function ListPatients() {
  const [itemToDelete, setItemToDelete] = React.useState<Patient | null>(null);

  const router = useRouter();

  const deleteListPatients = async () => {
    // if (itemToDelete === null) {
    //   return;
    // }

    // await api.delete("");
    console.log("Eliminando =D");
    await getListPatients();
  };

  const { paginationModel, setPaginationModel } = usePagination();

  const { data: patients, mutate: getListPatients } = useSWR<Page<Patient>>([
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
          { field: "firstName", headerName: "Nombre" },
          { field: "lastName", headerName: "Apellido" },
          { field: "code", headerName: "Código" },
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
                    onClick={() => router.push(`drugs/${params.row.id}`)}
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
        <Tooltip title="Crear">
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
        />
      </div>
    </Stack>
  );
}
