"use client";

import { Button, Grid, Stack, Tooltip, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {
  DataGrid,
  esES,
  GridActionsCellItem,
  GridColDef,
  GRID_CHECKBOX_SELECTION_COL_DEF,
  GridRowSelectionModel,
} from "@mui/x-data-grid";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-mui";
import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { withOutSorting } from "@/app/(components)/helpers/withOutSorting";
import { User } from "../User";
import { Page } from "@/app/(api)/pagination";
import useSWR from "swr";
import { useAuthApi } from "@/app/(api)/api";
import { SnackbarContext } from "@/app/(components)/SnackbarContext";

const EditMonitors = ({ params }: { params: { email: string } }) => {
  const { email } = params;

  const router = useRouter();
  const { data } = useSWR<Page<User>>(`/users/pharmacologists`);
  const pharmacologists = data?._embedded?.users;
  const getApi = useAuthApi();

  const columns = React.useMemo(
    () =>
      (
        [
          { field: "email", headerName: "Email", flex: 1 },
          {
            field: "actions",
            type: "actions",
            width: 80,
            getActions: (params) => {
              return [
                <Tooltip title="" key="see">
                  <GridActionsCellItem
                    icon={<SearchIcon />}
                    label="Edit"
                    onClick={() => router.push(`${params}/`)}
                  />
                </Tooltip>,
              ];
            },
          },
          {
            ...GRID_CHECKBOX_SELECTION_COL_DEF,
            width: 100,
          },
        ] as GridColDef<User>[]
      ).map(withOutSorting),
    [router]
  );

  const [rowSelectionModel, setRowSelectionModel] =
    useState<GridRowSelectionModel>([]);
  const snackbar = useContext(SnackbarContext);

  const assignPharmacologists = async () => {
    const api = await getApi();
    await api.post(`/monitors/pharmacologists-assignments`,
      rowSelectionModel.map(x => ({
        monitorEmail: email,
        pharmacologistEmail: x
      })));
    snackbar.showMessage("Farmacologos asignados a monitor");
    router.push("/monitors");
  };

  return (
    <Grid container style={{ display: "flex", flexDirection: "column" }}>
      <Grid item xs={6}>
        <Typography variant="h4" style={{ paddingBottom: "20px" }}>
          Monitor: <span>{decodeURIComponent(email)}</span>
        </Typography>
      </Grid>
      <div style={{ width: "100", height: "70vh" }}>
        <Typography variant="h5" style={{ padding: "40px 0px 20px 0px" }}>
          Farmacólogos
        </Typography>
        <DataGrid
          columns={columns}
          rows={pharmacologists || []}
          getRowId={user => user.email}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          disableColumnFilter
          checkboxSelection
          onRowSelectionModelChange={(newRowSelectionModel) => {
            setRowSelectionModel(newRowSelectionModel);
          }}
          rowSelectionModel={rowSelectionModel}
        />
        <Button variant="contained" style={{ margin: "20px 0px 20px 0px" }}
          onClick={assignPharmacologists}>
          Guardar
        </Button>
      </div>
    </Grid>
  );
};

export default EditMonitors;
