"use client";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Field } from "formik";
import { TextField } from "formik-mui";
import React from "react";

export const VitalFunctions = () => {
  return (
    <Grid container spacing={2}>
      <Grid xs={4}>
        <Field
          component={TextField}
          name="fc"
          label="Frecuencia cárdiaca (LPM):"
          variant="outlined"
          fullWidth
        />
      </Grid>
      <Grid xs={4}>
        <Field
          component={TextField}
          name="fr"
          label="Frecuencia Respiratoria (rpm):"
          variant="outlined"
          fullWidth
        />
      </Grid>
      <Grid xs={4}>
        <Field
          component={TextField}
          name="t"
          label="Temperatura (C°):"
          variant="outlined"
          fullWidth
        />
      </Grid>
      <Grid container>
        <Grid xs={12}>
          <Typography>Presión arterial (PA)</Typography>
        </Grid>
        <Grid xs={6}>
          <Field
            component={TextField}
            name="pas"
            label="PA sistólica:"
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid xs={6}>
          <Field
            component={TextField}
            name="pad"
            label="PA diastólica"
            variant="outlined"
            fullWidth
          />
        </Grid>
      </Grid>

      {/* </Grid> */}
    </Grid>
  );
};
