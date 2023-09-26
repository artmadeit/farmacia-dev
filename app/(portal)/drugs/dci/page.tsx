"use client";

import React from "react";
import { Stack, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { withOutSorting } from "@/app/(components)/helpers/withOutSorting";
import { usePagination } from "@/app/(components)/hook-customization/usePagination";
import { DrugDci } from "./DrugDci";
import useSWR from "swr";
import { Page } from "@/app/(api)/pagination";

const DciList = () => {
  const { paginationModel, setPaginationModel } = usePagination();

  const { data: drugDcis } = useSWR<Page<DrugDci>>([
    "/drugDcis",
    { params: { page: paginationModel.page, size: paginationModel.pageSize } },
  ]);

  const columns = React.useMemo(
    () =>
      (
        [
          { field: "name", headerName: "Nombre", width: 200 },
        ] as GridColDef<DrugDci>[]
      ).map(withOutSorting),
    []
  );

  if (!drugDcis) return <div>Loading</div>;
  return (
    <Stack spacing={2}>
      <Stack spacing={2}>
        <Typography variant="h4">
          Denominación común internacional (DCI)
        </Typography>
      </Stack>
      <div>
        <DataGrid
          columns={columns}
          rowCount={drugDcis.page.totalElements}
          rows={drugDcis._embedded.drugDcis}
          paginationModel={paginationModel}
          paginationMode="server"
          onPaginationModelChange={setPaginationModel}
          // localeText={}
        />
      </div>
    </Stack>
  );
};

export default DciList;
