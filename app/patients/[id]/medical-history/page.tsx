"use client";

import { FormControlLabel, Radio, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { differenceInYears } from "date-fns";
import { Field, Form, Formik } from "formik";
import { CheckboxWithLabel, RadioGroup, TextField } from "formik-mui";
import { DatePicker } from "formik-mui-x-date-pickers";
import { formatDate } from "../../../date";
import { HorizontalStepper } from "../HorizontalStepper";

const antecedents = [
  { label: "IMA", name: "ima" },
  { label: "Diabetes", name: "diabetes" },
  { label: "Enf. Hepática", name: "hepatica" },
  { label: "ACV", name: "acv" },
  { label: "Enf. Renal", name: "renal" },
  { label: "Úlcera", name: "ulcera" },
  { label: "ICC", name: "icc" },
  { label: "Obesidad", name: "obesidad" },
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
      { label: "Desvanecimiento", name: "des" },
      { label: "Visión borrosa", name: "vborrosa" },
      { label: "Pérdida de apetito", name: "p.apetito" },
      { label: "Dolor de cabeza", name: "dolor_cabeza" },
    ],
  },
  {
    label: "Digestivo",
    id: "problems_digestive",
    items: [
      {
        label: "Dolor y/o ardor de estómago",
        name: "d.estomago",
      },
      { label: "Náuseas y/o vómitos", name: "nausea" },
      { label: "Diarreas", name: "diarrea" },
      { label: "Estreñimiento", name: "este" },
      { label: "Sequedad bucal", name: "seq" },
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
      { label: "Hipotensión ortostática", name: "hp" },
    ],
  },
  {
    label: "Otros",
    id: "problems_others",
    items: [
      { label: "Broncoespasmo", name: "bro" },
      { label: "Disgeusia", name: "disg" },
      { label: "Angioedema", name: "disg" },
      { label: "Neutropenia", name: "disg" },
      { label: "Proteinuria", name: "disg" },
      { label: "Leucopenia", name: "disg" },
      { label: "Fatiga", name: "disg" },
      { label: "Impotencia", name: "disg" },
      { label: "Astenia", name: "disg" },
    ],
  },
  {
    label: "Ap. Locomotor",
    id: "problems_loc",
    items: [
      { label: "Debilidad muscular", name: "deb" },
      { label: "Dolores articulares", name: "disg" },
      { label: "Calambres", name: "disg" },
      { label: "Dolor/rigidez de cuello ", name: "disg" },
    ],
  },
  {
    label: "Metabólicas",
    id: "problems_metabolics",
    items: [
      { label: "Hiponatremia", name: "hipo" },
      { label: "Hipopotasemia", name: "disg" },
      { label: "Hiperglicemia", name: "disg" },
      { label: "Hipercalcemia", name: "disg" },
      { label: "Hipercolesterolemia", name: "disg" },
      { label: "Edema", name: "disg" },
      { label: "Hiperpotasemia", name: "disg" },
    ],
  },
  {
    label: "Piel",
    id: "problems_piel",
    items: [
      { label: "Erupciones", name: "eru" },
      { label: "Prurito", name: "eru" },
      { label: "Rubefacción", name: "eru" },
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
    <div>
      <HorizontalStepper activeStep={1} />
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
                Edad:{" "}
                {values.birthdate ? calculateAge(values.birthdate) : "N/A"}
              </Grid>
              <Grid xs={2}>
                Sexo:
                <Field component={RadioGroup} name="sex" row>
                  <FormControlLabel
                    value="MALE"
                    control={<Radio />}
                    label="M"
                  />
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
                <strong>2.1 Antecedentes patológicos</strong>
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
                <Field
                  name="other"
                  component={TextField}
                  variant="outlined"
                  multiline
                  rows={4}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid xs={12}>
                <strong>2.2 Problemas de salud</strong>
              </Grid>
              <Grid xs={12} container>
                {problems.map((group, index) => (
                  <Grid
                    key={index}
                    xs={3}
                    container
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="stretch"
                  >
                    <strong>{group.label}</strong>
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
    </div>
  );
}

// Adapted from: https://stackoverflow.com/questions/66470624/date-fns-format-date-and-age-calculation-problem-in-react
function calculateAge(date: Date) {
  const age = differenceInYears(new Date(), date);
  return age;
}
