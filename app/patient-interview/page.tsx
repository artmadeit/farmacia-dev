"use client";

import { FormControlLabel, Radio } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Field, Form, Formik } from "formik";
import { RadioGroup, TextField } from "formik-mui";

export default function PatientInterview() {
  const code = "AJK-203";
  const age = 18; // TODO: computed from fecha de nacimiento

  return (
    <Formik
      initialValues={{
        occupation: "",
        sex: "",
      }}
      onSubmit={() => {
        // TODO:
      }}
    >
      <Form>
        <Grid container spacing={2}>
          <Grid xs={10}>
            <strong>1. Datos personales</strong>
          </Grid>
          <Grid xs={2}>Fecha: {new Date().toDateString()}</Grid>
          <Grid xs={12}>Código del paciente: {code}</Grid>
          <Grid xs={5} display="flex" alignItems="center">
            Ocupación:
            <Field name="occupation" component={TextField} variant="outlined" />
          </Grid>
          <Grid xs={3}>Fecha Nac: {code}</Grid>
          <Grid xs={2}>Edad: {age}</Grid>
          <Grid xs={2}>
            Sexo:
            <Field component={RadioGroup} name="sex" row>
              <FormControlLabel value="MALE" control={<Radio />} label="M" />
              <FormControlLabel value="FEMALE" control={<Radio />} label="F" />
            </Field>
          </Grid>
        </Grid>
      </Form>
    </Formik>
  );
}
