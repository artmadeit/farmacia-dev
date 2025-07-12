"use client";

import { Button, Grid, Stack, Tooltip, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {
  DataGrid,
  esES,
  GridActionsCellItem,
  GridColDef,
  GRID_CHECKBOX_SELECTION_COL_DEF,
} from "@mui/x-data-grid";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-mui";
import React from "react";
import { useRouter } from "next/navigation";
import { withOutSorting } from "@/app/(components)/helpers/withOutSorting";

type Pharmacologist = {
  id?: number;
  name: string;
  email: string;
};

const EditMonitors = ({ params }: { params: { email: string } }) => {
  const { email } = params;

  const router = useRouter();
  const [pharmacalogist, setPharmacalogist] = React.useState({
    _embedded: {
      pharmacalogist: [
        {
          id: 1,
          name: "Daniel",
          email: "mauricio@gmail.com",
        },
      ],
    },
    page: {
      size: "",
      totalElements: "",
      totalPage: "",
      numbers: "",
    },
  });

  const columns = React.useMemo(
    () =>
      (
        [
          { field: "name", headerName: "Nombre" },
          { field: "email", headerName: "Email", width: 200 },
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
        ] as GridColDef<Pharmacologist>[]
      ).map(withOutSorting),
    [router]
  );

  console.log(email)
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
          rows={pharmacalogist._embedded.pharmacalogist}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          disableColumnFilter
          checkboxSelection
        // disableRowSelectionOnClick
        />
        <Button variant="contained" style={{ margin: "20px 0px 20px 0px" }}>
          Guardar
        </Button>
      </div>
    </Grid>
  );
};

export default EditMonitors;
