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

const problems = [
  {
    id: "problems_snc",
    label: "SNC",
    items: [
      { label: "Tos", name: "tos" },
      { label: "Mareos", name: "mareo" },
      { label: "Sueño", name: "sueño" },
      { label: "Desvanecimiento", name: "des"},
      { label: "Vision borrosa", name: "vborrosa"},
      { label: "Pérdida de apetito", name: "p.apetito"},
      { label: "Dolor de cabeza", name: "dolor_cabeza"},
    ],
  },
  {
    label: "Digestivo",
    id: "problems_digestive",
    items: [
      {
        label: "Dolor y/o ardor de estómago",
        name: "d.estomago"
       
      },
      { label: "Náuseas y/o vómitos", name: "nausea" },
      { label: "Diarreas", name: "diarrea"},
      { label: "Estreñimiento", name: "este"},
      { label: "Sequeda bucal", name: "seq"},
    ],
  },
  {
    label: "Cardiovascular",
    id: "problems_cardio",
    items: [
      { label: "Palpitaciones", name: "pal" },
      { label: "Taquicardia", name: "taq" },
      { label: "Hipotensión", name: "hip" },
      { label: "Arritmias", name: "arr" },
      { label: "Angina", name: "an" },
      { label: "Bradicardia", name: "br" },
      { label: "Broncoespasmo", name: "bro" },
    ],
  },
  {
    label: "Otros",
    id: "problems_others",
    items: [{ label: "Disgeusia", name: "disg" }],
  },
  {
    label: "Ap. Locomotor",
    id: "problems_loc",
    items: [
      { label: "Debilidad muscular", name: "deb"},
    ],
  },
  {
    label: "Metabólicas",
    id: "problems_metabolics",
    items: [
      { label: "Hiponatremia", name: "hipo"},
    ],
  },
  {
    label: "Piel",
    id: "problems_piel",
    items: [
      { label: "Erupciones", name: "eru"},
    ],
  },
];

export default function PatientInterview() {
  const code = "AJK-203";

  const getImc = ({ size, weight }: { size: number; weight: number }) => {
    if (size && weight) {
      return weight / size ** 2;
    }

    return "N/A";
  };

  return (
    <Formik
      initialValues={{
        occupation: "",
        sex: "",
        birthdate: null,
        weight: 0,
        size: 0,
        other: "",
     
        antecedents: [],
        problems_other: [],
        problems_cardio: [],
        problems_digestive: [],
        problems_loc: [],
        problems_snc: [],
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
              Peso (kg):
              <Field
                name="weight"
                component={TextField}
                type="number"
                variant="outlined"
              />
            </Grid>
            <Grid xs={4} display="flex" alignItems="center">
              Talla (m):
              <Field
                name="size"
                component={TextField}
                type="number"
                variant="outlined"
              />
            </Grid>
            <Grid xs={4} display="flex" alignItems="center">
              IMC:
              {getImc(values)}
            </Grid>
          </Grid>
          <strong>2. Historia de salud</strong>
          <Grid container spacing={2}>
            <Grid xs={12}>
              <strong>2.1 Antecedentes patologicos</strong>
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

          <Grid container spacing={2}>
            <Grid xs={12}>
              <strong>2.2 Problemas de salud</strong>
            </Grid>
            <Grid xs={12} container>
              {problems.map((group, index) => (
                <Grid key={index} xs={3} container  
                direction="column"
                justifyContent="flex-start"
                alignItems="stretch">
                  <strong>{group.label }</strong>
                  {group.items.map((item, idx) => (
                    <Field
                      key={idx} 
                      component={CheckboxWithLabel}
                      type="checkbox"
                      name={group.id}
                      value={item.name}
                      Label={{ label: item.label }}
                    />
                  ))}
                </Grid>
              ))}
            </Grid>
          </Grid>
                      <br></br>
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
