"use client";

import { Title } from "@/app/(components)/Title";
import { Divider } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Field, Form, Formik } from "formik";
import {
  PharmacotherapyTable,
  emptyHistoryRow,
} from "../../pharmacotherapy/PharmacotherapyTable";
import { TextField } from "formik-mui";

export default function CreateSoap() {
  return (
    <div>
      <Title>Hoja de seguimiento</Title>
      <Divider />
      <Formik
        initialValues={{
          history: [{ ...emptyHistoryRow }],
          subjective: "",
          objective: "",
          analysis: "",
          plan: "",
        }}
        onSubmit={() => {}}
      >
        {({ values, errors }) => (
          <Form>
            <Grid container spacing={4}>
              <Grid xs={10} pt={4}>
                <strong>Farmacoterapia (P) Prescrito (A) Automedicado </strong>
              </Grid>
              <Grid xs={12}>
                <PharmacotherapyTable name="history" values={values} />
              </Grid>
              <Grid xs={12} container spacing={1}>
                <Grid xs={1} alignItems="center" display="flex">
                  S
                </Grid>
                <Grid xs={11}>
                  <Field
                    component={TextField}
                    name="subjective"
                    label="Subjetivo"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid xs={1} alignItems="center" display="flex">
                  O
                </Grid>
                <Grid xs={11}>
                  <Field
                    component={TextField}
                    name="objective"
                    label="Objetivo"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid xs={1} alignItems="center" display="flex">
                  A
                </Grid>
                <Grid xs={11}>
                  <Field
                    component={TextField}
                    name="analysis"
                    label="Análisis"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid xs={1} alignItems="center" display="flex">
                  P
                </Grid>
                <Grid xs={11}>
                  <Field
                    component={TextField}
                    name="plan"
                    label="Plan"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </div>
  );
}
