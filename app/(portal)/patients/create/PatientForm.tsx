"use client";

import { useAuthApi } from "@/app/(api)/api";
import { SnackbarContext } from "@/app/(components)/SnackbarContext";
import { Button, FormLabel, Grid, Stack, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-mui";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { Patient } from "./Patient";

type PatientFormProps = {
  patient: Patient;
};

const inline = {
  display: "flex",
  alignItems: "center",
};

const PatientForm = ({ patient }: PatientFormProps) => {
  const snackbar = useContext(SnackbarContext);
  const router = useRouter();
  const getApi = useAuthApi();

  return (
    <Formik
      initialValues={patient}
      onSubmit={async (values) => {
        const api = await getApi();
        try {
          const response = await (patient.id ? api.put(`/patients/${patient.id}`, values) : api.post("/patients", values))
          router.push(`/patients/${response.data.id}/selection`);
        } catch (e: any) {
          console.log(e.response)
          if (e.response.status === 409) {
            snackbar.showMessage("Código de paciente debe ser único");
          } else {
            snackbar.showMessage(e.response.data.message);
          }
        }
      }}
    >
      <Form>
        <Stack spacing={2}>
          <Typography variant="h5" gutterBottom>
            Datos generales del paciente
          </Typography>
          <Grid container rowGap={2}>
            <Grid item xs={12} sm={2} sx={inline}>
              <FormLabel required>Código</FormLabel>
            </Grid>
            <Grid item xs={10}>
              <Field
                name="code"
                component={TextField}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12} sm={2} sx={inline}>
              <FormLabel required>Nombre(s)</FormLabel>
            </Grid>
            <Grid item xs={10}>
              <Field
                name="firstName"
                component={TextField}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12} sm={2} sx={inline}>
              <FormLabel required>Apellido(s)</FormLabel>
            </Grid>
            <Grid item xs={10}>
              <Field
                name="lastName"
                component={TextField}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs>
              <Button type="submit" variant="contained">
                Guardar
              </Button>
            </Grid>
          </Grid>
        </Stack>
      </Form>
    </Formik>
  );
};

export default PatientForm;
