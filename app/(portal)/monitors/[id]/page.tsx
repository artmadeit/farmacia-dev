"use client";

import { Button, Grid, Stack, Tooltip, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {
  DataGrid,
  esES,
  GridActionsCellItem,
  GridColDef,
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

const EditMonitors = () => {
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
        ] as GridColDef<Pharmacologist>[]
      ).map(withOutSorting),
    [router]
  );

  return (
    <Grid container style={{ display: "flex", flexDirection: "column" }}>
      <Grid item xs={6}>
        <Formik
          initialValues={{
            name: "",
            email: "",
          }}
          onSubmit={() => console.log("Enviando")}
        >
          {({ isSubmitting }) => (
            <Form>
              <Typography variant="h4" style={{ paddingBottom: "20px" }}>
                Datos Generales del monitor
              </Typography>
              <Grid>
                <Stack spacing={2}>
                  <Field
                    component={TextField}
                    name="name"
                    label="Nombre"
                    variant="outlined"
                  />
                  <Field
                    component={TextField}
                    type="email"
                    name="email"
                    label="Email"
                    variant="outlined"
                  />
                </Stack>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting}
                  style={{ marginTop: "20px" }}
                >
                  Guardar
                </Button>
              </Grid>
            </Form>
          )}
        </Formik>
      </Grid>
      <div style={{ width: "100", height: "70vh" }}>
        <Typography variant="h5" style={{ padding: "40px 0px 20px 0px" }}>
          Farmacólogos
        </Typography>
        <DataGrid
          columns={columns}
          rows={pharmacalogist._embedded.pharmacalogist}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        />
      </div>
    </Grid>
  );
};

export default EditMonitors;
