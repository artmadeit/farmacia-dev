"use client";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  Input,
  Stack,
  Typography,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-mui";
import { useRouter } from "next/navigation";

const inline = {
  // display: "flex",
  // gap: 2,
  // alignItems: "center",
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
      onSubmit={() => {
        router.push("/patients/1/selection");
      }}
    >
      <Form>
        <Typography variant="h5" gutterBottom>
          Datos generales del paciente
        </Typography>
        <Grid container rowGap={2} pt={2}>
          <Grid xs={2} sx={inline}>
            <FormLabel>Código</FormLabel>
          </Grid>
          <Grid xs={10}>
            <Field name="code" component={TextField} variant="outlined" />
          </Grid>
          <Grid xs={2} sx={inline}>
            <FormLabel>Nombre(s)</FormLabel>
          </Grid>
          <Grid xs={10}>
            <Field name="firstName" component={TextField} variant="outlined" />
          </Grid>
          <Grid xs={2} sx={inline}>
            <FormLabel>Apellido(s)</FormLabel>
          </Grid>
          <Grid xs={10}>
            <Field name="lastName" component={TextField} variant="outlined" />
          </Grid>
          <Grid xs={12}>
            <Button type="submit" variant="outlined">
              Guardar
            </Button>
          </Grid>
        </Grid>
      </Form>
    </Formik>
  );
}
