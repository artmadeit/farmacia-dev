"use client";

import { FormControlLabel, Radio } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Field, Form, Formik } from "formik";
import { RadioGroup, TextField, ToggleButtonGroup } from "formik-mui";
import { DatePicker } from "formik-mui-x-date-pickers";
import { formatDate } from "../date";
//import Checkbox from "@mui/material/Checkbox";

export default function PatientInterview() {
  const code = "AJK-203";
  const age = 18; // TODO: computed from fecha de nacimiento
  const antecedents: any[] = [
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
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  return (
    <Formik
      initialValues={{
        occupation: "",
        sex: "",
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
      <Form>
        <Grid container spacing={2}>
          <Grid xs={10}>
            <strong>1. Datos personales</strong>
          </Grid>
          <Grid xs={2}>Fecha: {formatDate(new Date())}</Grid>
          <Grid xs={12}>Código del paciente: {code}</Grid>
          <Grid xs={5} display="flex" alignItems="center">
            Ocupación:
            <Field name="occupation" component={TextField} variant="outlined" />
          </Grid>
          <Grid xs={3}>
            Fecha Nac:
            <Field component={DatePicker} label="Fecha" name="date" />
          </Grid>
          <Grid xs={2}>Edad: {age}</Grid>
          <Grid xs={2}>
            Sexo:
            <Field component={RadioGroup} name="sex" row>
              <FormControlLabel value="MALE" control={<Radio />} label="M" />
              <FormControlLabel value="FEMALE" control={<Radio />} label="F" />
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
            <Field
              component={ToggleButtonGroup}
              name="antecedents"
              type="checkbox"
            >
              <Grid xs={12} container>
                {antecedents.map((item, index) => (
                  <Grid xs={4} key={index}>
                    {/* <Field
                    key={index}
                    component={CheckboxWithLabel}
                    type="checkbox"
                    name={item.name}
                    Label={{ label: item.label }}
                  /> */}
                    <FormControlLabel
                      key={index}
                      value={item.name}
                      control={<Radio />}
                      label={item.label}
                    />
                  </Grid>
                ))}
              </Grid>
            </Field>
          </Grid>
          <Grid xs={4}>
            Otros:
            <Field name="other" component={TextField} variant="outlined" />
          </Grid>
        </Grid>
      </Form>
    </Formik>
  );
}
