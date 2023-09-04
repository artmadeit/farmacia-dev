"use client";

import { Fab, Stack, Tooltip, Typography } from "@mui/material";
import Link from "next/link";
import AddIcon from "@mui/icons-material/Add";
import React from "react";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import { useRouter } from "next/navigation";
import { withOutSorting } from "@/app/(components)/helpers/withOutSorting";
import { Drug } from "./Drug";

const DrugsPage = () => {
  const router = useRouter();
  const [drugs, setDrugs] = React.useState({
    _embedded: {
      drugs: [],
    },
    // _links: any;
    page: {
      size: "",
      totalElements: "",
      totalPages: "",
      number: "",
    },
  })

  const columns = React.useMemo(
    () =>
      (
        [
          { field: "name", headerName: "Nombre" },
          { field: "description", headerName: "Descripción" },
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
                    onClick={() => router.push(`categories/${params.row.id}`)}
                  />
                </Tooltip>,
              ];
            },
          },
        ] as GridColDef<Drug>[]
      ).map(withOutSorting),
    [router]
  );

  return (
    <Stack direction="column" spacing={2}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Typography variant="h4">Medicamentos</Typography>
        <Tooltip title="Crear">
          <Link href="drugs/create">
            <Fab color="primary" aria-labelledby="add">
              <AddIcon />
            </Fab>
          </Link>
        </Tooltip>
      </Stack>
      <div style={{ height: "70vh", width: "100%" }}>
        <DataGrid columns={columns} rows={drugs._embedded.drugs} />
      </div>
    </Stack>
  );
};

export default DrugsPage;
