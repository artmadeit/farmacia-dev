"use client";

import { withOutSorting } from "@/app/(components)/helpers/withOutSorting";
import { usePagination } from "@/app/(components)/hook-customization/usePagination";
import { Fab, Stack, Tooltip, Typography } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridColDef, esES } from "@mui/x-data-grid";
import React from "react";
import { DiseaseCie10 } from "./DiseaseCie10";
import useSWR from "swr";
import { Page } from "@/app/(api)/pagination";
import Loading from "@/app/(components)/Loading";
import Link from "next/link";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DialogDelete from "@/app/(components)/DialogDelete";
import { SnackbarContext } from "@/app/(components)/SnackbarContext";
import { useRouter } from "next/navigation";
import { useAuthApi } from "@/app/(api)/api";

const Cie10 = () => {
  const router = useRouter();
  const getApi = useAuthApi();
  const { paginationModel, setPaginationModel } = usePagination();
  const [itemToDelete, setItemToDelete] = React.useState<DiseaseCie10 | null>(null);
  const alert = React.useContext(SnackbarContext);

  const { data: diseases, isLoading, mutate: getDiseases } = useSWR<Page<DiseaseCie10>>([
    "/diseases",
    { params: { page: paginationModel.page, size: paginationModel.pageSize } },
  ]);

  const deleteDisease = async () => {
    if (itemToDelete === null) {
      return;
    }

    await getApi().then((api) =>
      api.delete(`/diseases/${itemToDelete.id}`)
    );
    alert.showMessage("Enfermedad eliminada");
    setItemToDelete(null);
    await getDiseases();
  };

  const columns = React.useMemo(
    () =>
      (
        [
          { field: "code", headerName: "Código", height: 100 },
          { field: "name", headerName: "Nombre", flex: 1 },
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
                    onClick={() =>
                      router.push(`/cie10/${params.row.id}`)
                    }
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
        ] as GridColDef<DiseaseCie10>[]
      ).map(withOutSorting),
    [router]
  );

  return (
    <Stack spacing={2}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Typography variant="h4">CIE10</Typography>
        <Tooltip title="Registrar">
          <Link href="cie10/create">
            <Fab color="primary" aria-labelledby="add">
              <AddIcon />
            </Fab>
          </Link>
        </Tooltip>
      </Stack>
      <div style={{ height: "70vh", width: "100%" }}>
        {
          diseases ?
            <DataGrid
              loading={isLoading}
              columns={columns}
              rowCount={diseases?.page.totalElements}
              rows={diseases?._embedded.diseases || []}
              paginationModel={paginationModel}
              paginationMode="server"
              onPaginationModelChange={setPaginationModel}
              disableColumnFilter
              localeText={esES.components.MuiDataGrid.defaultProps.localeText}
            /> :
            <Loading />
        }
      </div>
      <DialogDelete
        itemToDelete={itemToDelete}
        handleClose={() => setItemToDelete(null)}
        onDelete={deleteDisease}
        itemName="esta enfermedad"
      />
    </Stack>
  );
};

export default Cie10;
