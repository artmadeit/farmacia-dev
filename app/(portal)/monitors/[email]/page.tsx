"use client";

import { useAuthApi } from "@/app/(api)/api";
import { Page } from "@/app/(api)/pagination";
import { withOutSorting } from "@/app/(components)/helpers/withOutSorting";
import { SnackbarContext } from "@/app/(components)/SnackbarContext";
import SearchIcon from "@mui/icons-material/Search";
import { Button, Grid, Tooltip, Typography } from "@mui/material";
import {
  DataGrid,
  esES,
  GRID_CHECKBOX_SELECTION_COL_DEF,
  GridActionsCellItem,
  GridColDef,
  GridRowSelectionModel,
} from "@mui/x-data-grid";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import useSWR from "swr";
import { User } from "../User";

type MonitorAssignmentPharmacologist = {
  monitorEmail: string;
  pharmacologistEmail: string;
}

const EditMonitors = ({ params }: { params: { email: string } }) => {
  const email = decodeURIComponent(params.email);

  const router = useRouter();
  const { data } = useSWR<Page<User>>([
    `/users/pharmacologists`,
    { params: { size: 200 } }, // TODO: paginate this
  ]);
  const pharmacologists = data?._embedded?.users;

  const { data: assignments, mutate: mutateAssignments } = useSWR<MonitorAssignmentPharmacologist[]>([
    `/users/monitors/pharmacologists-assignments`,
    { params: { email } },
  ]);

  const [rowSelectionModel, setRowSelectionModel] =
    useState<GridRowSelectionModel>([]);

  useEffect(() => {
    if (assignments) {
      setRowSelectionModel(assignments.map(x => x.pharmacologistEmail));
    }
  }, [assignments])

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

  const snackbar = useContext(SnackbarContext);

  const assignPharmacologists = async () => {
    try {
      const api = await getApi();
      await api.post(`/users/monitors/pharmacologists-assignments`,
        rowSelectionModel.map(x => ({
          monitorEmail: email,
          pharmacologistEmail: x
        })));
      mutateAssignments();
      snackbar.showMessage("Farmacologos asignados a monitor");
      router.push("/monitors");
    } catch (e) {
      if (e instanceof AxiosError) {
        snackbar.showMessage(e.response?.data.message);
      } else {
        snackbar.showMessage("Upss ocurrio un error intentelo de nuevo");
      }
    }
  };

  return (
    <Grid container style={{ display: "flex", flexDirection: "column" }}>
      <Grid item xs={6}>
        <Typography variant="h4" style={{ paddingBottom: "20px" }}>
          Monitor: <span>{email}</span>
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
