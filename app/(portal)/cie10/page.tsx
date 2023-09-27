"use client";

import { withOutSorting } from "@/app/(components)/helpers/withOutSorting";
import { usePagination } from "@/app/(components)/hook-customization/usePagination";
import { Stack, Typography } from "@mui/material";
import { DataGrid, GridColDef, esES } from "@mui/x-data-grid";
import React from "react";
import { DiseaseCie10 } from "./DiseaseCie10";
import useSWR from "swr";
import { Page } from "@/app/(api)/pagination";

const Cie10 = () => {
  const { paginationModel, setPaginationModel } = usePagination();

  const { data: diseaseCie10 } = useSWR<Page<DiseaseCie10>>([
    "/diseases",
    { params: { page: paginationModel.page, size: paginationModel.pageSize } },
  ]);

  const columns = React.useMemo(
    () =>
      (
        [
          { field: "name", headerName: "Nombre", width: 150 },
        ] as GridColDef<DiseaseCie10>[]
      ).map(withOutSorting),
    []
  );

  if (!diseaseCie10) return <div>Loading</div>;
  return (
    <Stack spacing={2}>
      <Stack spacing={2}>
        <Typography variant="h4">CIE10</Typography>
      </Stack>
      <div style={{ height: "70vh", width: "100%" }}>
        <DataGrid
          columns={columns}
          rowCount={diseaseCie10.page.totalElements}
          rows={diseaseCie10._embedded.diseases}
          paginationModel={paginationModel}
          paginationMode="server"
          onPaginationModelChange={setPaginationModel}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        />
      </div>
    </Stack>
  );
};

export default Cie10;
