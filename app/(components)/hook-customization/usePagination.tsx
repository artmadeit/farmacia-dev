import { GridFeatureMode } from "@mui/x-data-grid";
import React from "react";

export const usePagination = () => {
  const [pageSize, setPageSize] = React.useState(25);
  const [page, setPage] = React.useState(0);

  const pagination = {
    paginationMode: "server" as GridFeatureMode,
    onPageChange: (page: number) => setPage(page),
    page,
    pageSize,
    onPageSizeChange: (newPageSize: number) => {
      setPage(0);
      setPageSize(newPageSize);
    },
  };

  return { page, pageSize, pagination };
};
