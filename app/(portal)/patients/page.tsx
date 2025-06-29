"use client";

import AddIcon from "@mui/icons-material/Add";
import { FileDownload } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import {
  Fab,
  InputAdornment,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  esES,
} from "@mui/x-data-grid";
import { useQueryState } from "next-usequerystate";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import useSWR from "swr";
import { Page } from "../../(api)/pagination";
import { withOutSorting } from "../../(components)/helpers/withOutSorting";
import { usePagination } from "../../(components)/hook-customization/usePagination";
import { Patient } from "./create/Patient";
import useDebounce from "@/app/(components)/helpers/useDebounce";
import { CSVLink } from "react-csv";
import Loading from "@/app/(components)/Loading";

export default function ListPatients() {
  const router = useRouter();
  const { paginationModel, setPaginationModel } = usePagination();
  const [searchText, setSearchText] = useQueryState("searchText", {
    defaultValue: "",
  });
  const debouncedSearch = useDebounce(searchText, 1000);

  const { data: patients, isLoading } = useSWR<Page<Patient>>([
    `/patients?searchText=${debouncedSearch}`,
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
                <Tooltip title="Ver" key="edit">
                  <GridActionsCellItem
                    icon={<SearchIcon />}
                    label="ver"
                    onClick={() =>
                      router.push(`patients/${params.row.id}/selection`)
                    }
                  />
                </Tooltip>,
              ];
            },
          },
        ] as GridColDef<Patient>[]
      ).map(withOutSorting),
    [router]
  );

  const handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (event) => {
    const searchText = event.target.value;
    setSearchText(searchText);
  };

  const csvData = patients?._embedded.patients || [];

  return (
    <Stack direction="column" spacing={2}>
      <Stack
        direction="row"
        sx={{ display: "flex", justifyContent: "space-between" }}
        alignItems="center"
        spacing={2}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h4">Pacientes</Typography>
          <Tooltip title="Registrar">
            <Link href="patients/create" style={{ paddingLeft: "10px" }}>
              <Fab color="primary" aria-labelledby="add">
                <AddIcon />
              </Fab>
            </Link>
          </Tooltip>
        </div>
        <div>
          <CSVLink
            data={csvData}
            headers={[
              { label: "Código", key: "code" },
              { label: "Nombre", key: "firstName" },
              { label: "Apellido", key: "lastName" },
              { label: "Registrado por", key: "createdByEmail" },
            ]}
            filename="pacientes.csv"
          >
            <Tooltip title="Descargar en CSV">
              <Fab aria-labelledby="add">
                <FileDownload />
              </Fab>
            </Tooltip>
          </CSVLink>
        </div>
      </Stack>
      <TextField
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
        fullWidth
      />
      <div style={{ height: "70vh", width: "100%" }}>
        {
          patients ?
            <DataGrid
              loading={isLoading}
              columns={columns}
              rowCount={patients?.page.totalElements || 0}
              paginationModel={paginationModel}
              paginationMode="server"
              onPaginationModelChange={setPaginationModel}
              disableColumnFilter
              rows={patients?._embedded?.patients || []}
              localeText={esES.components.MuiDataGrid.defaultProps.localeText}
            /> : <Loading />
        }
      </div>
    </Stack>
  );
}
