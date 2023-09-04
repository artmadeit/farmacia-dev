"use client";

import { FormControlLabel, Radio } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Field, Form, Formik } from "formik";
import {
  CheckboxWithLabel,
  RadioGroup,
  TextField,
  ToggleButtonGroup,
} from "formik-mui";
import { DatePicker } from "formik-mui-x-date-pickers";
import { formatDate } from "../date";
import {
  differenceInCalendarYears,
  differenceInYears,
  intervalToDuration,
  parse,
} from "date-fns";

const antecedents = [
  { label: "IMA", name: "ima" },
  { label: "ACV", name: "acv" },
  { label: "ICC", name: "icc" },
  { label: "Diabetes", name: "diabetes" },
  { label: "Enf. Renal", name: "renal" },
  { label: "Obesidad", name: "obesidad" },
  { label: "Enf. Hepática", name: "hepatica" },
  { label: "Úlcera", name: "ulcera" },
  { label: "Enf. tiroides", name: "tiroides" },
];

export default function PatientInterview() {
  const code = "AJK-203";

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  return (
    <Formik
      initialValues={{
        occupation: "",
        sex: "",
        birthdate: null,
        weight: 0,
        size: 0,
        imc: 0,
        other: "",
        antecedents: [],
      }}
      onSubmit={() => {
        // TODO:
      }}
    >
      {({ values }) => (
        <Form>
          <Grid container spacing={2}>
            <Grid xs={10}>
              <strong>1. Datos personales</strong>
            </Grid>
            <Grid xs={2}>Fecha: {formatDate(new Date())}</Grid>
            <Grid xs={12}>Código del paciente: {code}</Grid>
            <Grid xs={5} display="flex" alignItems="center">
              Ocupación:
              <Field
                name="occupation"
                component={TextField}
                variant="outlined"
              />
            </Grid>
            <Grid xs={3}>
              Fecha Nac:
              <Field component={DatePicker} label="Fecha" name="birthdate" />
            </Grid>
            <Grid xs={2}>
              Edad: {values.birthdate ? calculateAge(values.birthdate) : "N/A"}
            </Grid>
            <Grid xs={2}>
              Sexo:
              <Field component={RadioGroup} name="sex" row>
                <FormControlLabel value="MALE" control={<Radio />} label="M" />
                <FormControlLabel
                  value="FEMALE"
                  control={<Radio />}
                  label="F"
                />
              </Field>
            </Grid>
            <Grid xs={4} display="flex" alignItems="center">
              Peso:
              <Field name="weigth" component={TextField} variant="outlined" />
            </Grid>
            <Grid xs={4} display="flex" alignItems="center">
              Talla:
              <Field name="size" component={TextField} variant="outlined" />
            </Grid>
            <Grid xs={4} display="flex" alignItems="center">
              IMC:
              <Field name="imc" component={TextField} variant="outlined" />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid xs={12}>
              <strong>2. Historia de salud</strong>
            </Grid>
            <Grid xs={8} container>
              <Grid xs={12} container>
                {antecedents.map((item) => (
                  <Grid xs={4} key={item.name}>
                    <Field
                      component={CheckboxWithLabel}
                      type="checkbox"
                      name="antecedents"
                      value={item.name}
                      Label={{ label: item.label }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid xs={4}>
              Otros:
              <Field name="other" component={TextField} variant="outlined" />
            </Grid>
          </Grid>

          <div>{JSON.stringify(values)}</div>
        </Form>
      )}
    </Formik>
  );
}

// Adapted from: https://stackoverflow.com/questions/66470624/date-fns-format-date-and-age-calculation-problem-in-react
function calculateAge(date: Date) {
  const age = differenceInYears(new Date(), date);
  return age;
}
