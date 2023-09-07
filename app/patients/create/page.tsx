"use client";

import { Button, Grid } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-mui";
import { useRouter } from "next/navigation";

export default function CreatePatient() {
  const router = useRouter();

  return (
    <Formik
      initialValues={{
        code: "",
        firstName: "",
        lastName: "",
      }}
      onSubmit={() => {
        router.push("/patients/1/selection");
      }}
    >
      <Form>
        <Grid container spacing={2}>
          <Grid xs={12}>
            <strong>Datos generales del paciente</strong>
          </Grid>
          <Grid xs={12} display="flex" alignItems="center">
            Código:
            <Field name="code" component={TextField} variant="outlined" />
          </Grid>
          <Grid xs={12} display="flex" alignItems="center">
            Nombre(s):
            <Field name="firstName" component={TextField} variant="outlined" />
          </Grid>
          <Grid xs={12} display="flex" alignItems="center">
            Apellido(s):
            <Field name="lastName" component={TextField} variant="outlined" />
          </Grid>
        </Grid>
        <Button type="submit" variant="outlined">Guardar</Button>
      </Form>
    </Formik>
  );
}
