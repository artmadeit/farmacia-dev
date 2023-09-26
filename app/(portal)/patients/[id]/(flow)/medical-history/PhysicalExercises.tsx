"use client";
import { FormControlLabel, Radio } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { blue } from "@mui/material/colors";
import { Field } from "formik";
import { RadioGroup } from "formik-mui";
import React from "react";
import { OutlinedPaper } from "./OutlinedPaper";

export const PhysicalExercises = () => {
  return (
    <Field component={RadioGroup} name="physicalExercises">
      <Grid container component={OutlinedPaper}>
        <Grid xs>
          <FormControlLabel
            value="Eventualmente"
            control={
              <Radio
                sx={{
                  color: blue[700],
                }}
              />
            }
            label="Eventualmente"
          />
        </Grid>
        <Grid xs>
          <FormControlLabel
            value="10-30 min/día"
            control={
              <Radio
                sx={{
                  color: blue[700],
                }}
              />
            }
            label="10-30 min/día"
          />
        </Grid>
        <Grid xs>
          <FormControlLabel
            value="30-60 min/día"
            control={
              <Radio
                sx={{
                  color: blue[700],
                }}
              />
            }
            label="30-60 min/día"
          />
        </Grid>
        <Grid xs>
          <FormControlLabel
            value=">60 min/día"
            control={
              <Radio
                sx={{
                  color: blue[700],
                }}
              />
            }
            label=">60 min/día"
          />
        </Grid>
        <Grid xs>
          <FormControlLabel
            value="Nunca"
            control={
              <Radio
                sx={{
                  color: blue[700],
                }}
              />
            }
            label="Nunca"
          />
        </Grid>
      </Grid>
    </Field>
  );
};
