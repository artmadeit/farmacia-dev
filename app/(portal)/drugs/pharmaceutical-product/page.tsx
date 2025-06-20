"use client";

import { Page } from "@/app/(api)/pagination";
import { withOutSorting } from "@/app/(components)/helpers/withOutSorting";
import { usePagination } from "@/app/(components)/hook-customization/usePagination";
import { Fab, Stack, Tooltip, Typography } from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  esES,
} from "@mui/x-data-grid";
import React from "react";
import useSWR from "swr";
import { DrugProduct } from "./Drug";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";
import EditIcon from "@mui/icons-material/Edit";
import { useRouter } from "next/navigation";
import Loading from "@/app/(components)/Loading";

const DrugsPage = () => {
  const { paginationModel, setPaginationModel } = usePagination();

  const { data: drugs, isLoading } = useSWR<Page<DrugProduct>>([
    "/drugPharmaceuticalProducts",
    { params: { page: paginationModel.page, size: paginationModel.pageSize } },
  ]);

  const router = useRouter();

  const columns = React.useMemo(
    () =>
      (
        [
          { field: "name", headerName: "Nombre", width: 150 },
          { field: "concentration", headerName: "Concentración", width: 150 },
          { field: "form", headerName: "Forma", width: 150 },
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
                      router.push(
                        `/drugs/pharmaceutical-product/${params.row.id}`
                      )
                    }
                  />
                </Tooltip>,
              ];
            },
          },
        ] as GridColDef<DrugProduct>[]
      ).map(withOutSorting),
    [router]
  );

  return (
    <Stack direction="column" spacing={2}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Typography variant="h4">Productos farmacéuticos</Typography>
        <Tooltip title="Registrar">
          <Link href="pharmaceutical-product/create">
            <Fab color="primary" aria-labelledby="add">
              <AddIcon />
            </Fab>
          </Link>
        </Tooltip>
      </Stack>
      <div style={{ height: "70vh", width: "100%" }}>
        {
          drugs ?
            <DataGrid
              loading={isLoading}
              columns={columns}
              rowCount={drugs?.page.totalElements}
              paginationModel={paginationModel}
              paginationMode="server"
              onPaginationModelChange={setPaginationModel}
              disableColumnFilter
              rows={drugs?._embedded.drugPharmaceuticalProducts || []}
              localeText={esES.components.MuiDataGrid.defaultProps.localeText}
            />
            : <Loading />
        }
      </div>
    </Stack>
  );
};

export default DrugsPage;
