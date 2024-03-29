"use client";

import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { FastField } from "formik";
import { TextField } from "formik-mui";
import React from "react";

export const VitalFunctions = () => {
  return (
    <Grid container spacing={2}>
      <Grid xs={4}>
        <FastField
          component={TextField}
          name="vitalFunctions.heartRate"
          label="Frecuencia cárdiaca (LPM):"
          variant="outlined"
          fullWidth
        />
      </Grid>
      <Grid xs={4}>
        <FastField
          component={TextField}
          name="vitalFunctions.breathingRate"
          label="Frecuencia respiratoria (rpm):"
          variant="outlined"
          fullWidth
        />
      </Grid>
      <Grid xs={4}>
        <FastField
          component={TextField}
          name="vitalFunctions.temperature"
          label="Temperatura (C°):"
          variant="outlined"
          fullWidth
        />
      </Grid>
      <Grid xs={4}>
        <FastField
          component={TextField}
          name="vitalFunctions.bloodPressureSystolic"
          label="PA sistólica:"
          variant="outlined"
          fullWidth
        />
      </Grid>
      <Grid xs={4}>
        <FastField
          component={TextField}
          name="vitalFunctions.bloodPressureDiastolic"
          label="PA diastólica"
          variant="outlined"
          fullWidth
        />
      </Grid>
      <Grid xs={4}>
        <FastField
          component={TextField}
          name="vitalFunctions.additionalInformation"
          label="Información Adicional"
          multiline
          rows={4}
          variant="outlined"
          fullWidth
        />
      </Grid>
    </Grid>
  );
};
