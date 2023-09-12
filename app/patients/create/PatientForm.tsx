"use client";

import { api } from "@/app/(api)/api";

import { Button, FormLabel, Grid, Stack, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-mui";
import { useRouter } from "next/navigation";
import { Patient } from "./Patient";
import { Title } from "@/app/(components)/Title";

type PatientFormProps = {
  patient: Patient;
}

const inline = {
  display: "flex",
  alignItems: "center",
};

const PatientForm = ({patient: patient}: PatientFormProps) => {
  const router = useRouter();

  return (
    <Formik
      initialValues={patient}
      onSubmit={async (values) => {
        const response = await api.post("/patients", values);
        router.push(`/patients/${response.data.id}/selection`);
      }}
    >
      <Form>
        <Stack spacing={2}>
          {/* <Typography variant="h4">Datos generales del paciente</Typography> */}
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
};

export default PatientForm;
