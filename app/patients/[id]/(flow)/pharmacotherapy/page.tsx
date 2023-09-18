"use client";
import { Title } from "@/app/(components)/Title";
import { Divider, FormControlLabel, Radio } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Field, Form, Formik } from "formik";
import { RadioGroup, TextField } from "formik-mui";
import { DatePicker } from "formik-mui-x-date-pickers";

export default function Pharmacotherapy() {
  return (
    <div>
      <Title>Hoja Farmacoterapéutica</Title>
      <Divider />
      <Formik
        initialValues={{
          drug: "",
          startDate: null,
          mode: "",
        }}
        onSubmit={() => {}}
      >
        {({ values, errors }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid xs={10} style={{ marginTop: "10px" }}>
                <strong>
                  3. Historia Farmacoterapéutica (P) Prescrito (A) Automedicado{" "}
                </strong>
              </Grid>
              <Grid xs={3}>
                <Field
                  label="Medicamento"
                  name="drug"
                  component={TextField}
                  variant="outlined"
                />
              </Grid>
              <Grid xs={2}>
                P/A:
                <Field component={RadioGroup} name="mode" row>
                  <FormControlLabel value="P" control={<Radio />} label="P" />
                  <FormControlLabel value="A" control={<Radio />} label="A" />
                </Field>
              </Grid>
              <Grid xs={3}>
                <Field
                  label="Dosis"
                  name="dose"
                  component={TextField}
                  variant="outlined"
                />
              </Grid>
              <Grid xs={3}>
                <Field
                  component={DatePicker}
                  slotProps={{
                    textField: {
                      label: "Fecha inicio",
                      helperText: errors.startDate ? errors.startDate : "",
                    },
                  }}
                  name="startDate"
                />
              </Grid>
              <Grid xs={3}>
                <Field
                  component={DatePicker}
                  slotProps={{
                    textField: {
                      label: "Fecha Susp.",
                      helperText: errors.startDate ? errors.startDate : "",
                    },
                  }}
                  name="startDate"
                />
              </Grid>
              <Grid xs={3}>
                <Field
                  component={DatePicker}
                  slotProps={{
                    textField: {
                      label: "Fecha rein.",
                      helperText: errors.startDate ? errors.startDate : "",
                    },
                  }}
                  name="startDate"
                />
              </Grid>
              <Grid xs={3}>
                <Field
                  label="Motivo de uso"
                  name="reasonForUse"
                  component={TextField}
                  variant="outlined"
                />
              </Grid>
              <Grid xs={3}>
                <Field
                  label="Aceptación"
                  name="acceptance"
                  component={TextField}
                  variant="outlined"
                />
              </Grid>
              <Grid xs={3}>
                <Field
                  label="Administración"
                  name="administration"
                  component={TextField}
                  variant="outlined"
                />
              </Grid>
              <Grid xs={3}>
                <Field
                  label="Dificultades para tomarlo y/o tolerarlo"
                  name="difficulties"
                  component={TextField}
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </div>
  );
}
