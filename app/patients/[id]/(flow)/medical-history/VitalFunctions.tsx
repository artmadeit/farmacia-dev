"use client";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Field } from "formik";
import { TextField } from "formik-mui";
import React from "react";

export const VitalFunctions = () => {
  return (
    <Grid container spacing={2}>
      <Grid xs={3}>
        <Field
          component={TextField}
          name="fc"
          label="Frecuencia cárdiaca (LPM):"
          variant="outlined"
          fullWidth
        />
      </Grid>
      <Grid xs={3}>
        <Field
          component={TextField}
          name="fr"
          label="Frecuencia Respiratoria (rpm):"
          variant="outlined"
          fullWidth
        />
      </Grid>
      <Grid xs={3}>
        <Field
          component={TextField}
          name="t"
          label="Temperatura (C°):"
          variant="outlined"
          fullWidth
        />
      </Grid>
      <Grid xs={3}>
        <Field
          component={TextField}
          name="pa"
          label="Presión arterial:"
          variant="outlined"
          fullWidth
        />
      </Grid>
    </Grid>
  );
};
