"use client";

import { Fab, Stack, Tooltip, Typography } from "@mui/material";
import Link from "next/link";
import AddIcon from "@mui/icons-material/Add";
import React from "react";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/navigation";
import { withOutSorting } from "@/app/(components)/helpers/withOutSorting";
import { Drug } from "./Drug";
import { esES } from "@mui/x-data-grid";
import useSWR from "swr";
import { usePagination } from "@/app/(components)/hook-customization/usePagination";
import { Page } from "@/app/(api)/pagination";
import { api } from "@/app/(api)/api";
import { SnackbarContext } from "@/app/(components)/SnackbarContext";
import DialogDelete from "@/app/(components)/DialogDelete";

const DrugsPage = () => {
  const router = useRouter();
  const [itemToDelete, setItemToDelete] = React.useState<Drug | null>(null);
  const alert = React.useContext(SnackbarContext);

  const deleteDrugs = async () => {
    if (itemToDelete === null) {
      return;
    }

    await api.delete(`drugs/${itemToDelete}`);
    alert.showMessage("La medicina se ha eliminado");
    setItemToDelete(null);
    await getDrugs();
  };

  const { page, pageSize, pagination } = usePagination();

  const { data: drugs, mutate: getDrugs } = useSWR<Page<Drug>>([
    "/drugs",
    { params: { page: page, size: pageSize } },
  ]);

  const columns = React.useMemo(
    () =>
      (
        [
          { field: "name", headerName: "Nombre", width: 150 },
          // { field: "description", headerName: "Descripción", width: 120 },
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
                <Tooltip title="Eliminar" key="delete">
                  <GridActionsCellItem
                    icon={<DeleteIcon />}
                    label="Eliminar"
                    onClick={() => setItemToDelete(params.row)}
                  />
                </Tooltip>,
              ];
            },
          },
        ] as GridColDef<Drug>[]
      ).map(withOutSorting),
    [router]
  );

  if (!drugs) return <div>Loading</div>;

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
        <DataGrid
          columns={columns}
          rowCount={drugs.page.totalElements}
          {...pagination}
          rows={drugs._embedded.drugs}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        />
      </div>
      <DialogDelete
        itemToDelete={itemToDelete}
        handleClose={() => setItemToDelete(null)}
        onDelete={deleteDrugs}
        itemName="esta medicina"
      />
    </Stack>
  );
};

export default DrugsPage;
