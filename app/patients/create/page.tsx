"use client";

import { api } from "@/app/(api)/api";
import { Title } from "@/app/(components)/Title";
import { Button, FormLabel, Grid, Stack } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-mui";
import { useRouter } from "next/navigation";

const inline = {
  display: "flex",
  alignItems: "center",
};

export default function CreatePatient() {
  const router = useRouter();

  return (
    <Formik
      initialValues={{
        code: "",
        firstName: "",
        lastName: "",
      }}
      onSubmit={async (values) => {
        const response = await api.post("/patients", values);
        router.push(`/patients/${response.data.id}/selection`);
      }}
    >
      <Form>
        <Stack spacing={2}>
          <Title>Datos generales del paciente</Title>
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
}
