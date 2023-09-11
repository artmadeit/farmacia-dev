"use client";

import { Title } from "@/app/(components)/Title";
import { Divider, FormControlLabel, Radio } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { differenceInYears } from "date-fns";
import { Field, Form, Formik } from "formik";
import { CheckboxWithLabel, RadioGroup, TextField } from "formik-mui";
import { DatePicker } from "formik-mui-x-date-pickers";
import { formatDate } from "../../../../date";

const antecedents = [
  { label: "IMA", name: "IMA" },
  { label: "Diabetes", name: "DIABETES" },
  { label: "Enf. Hepática", name: "ENF_HEPÁTICA" },
  { label: "ACV", name: "ACV" },
  { label: "Enf. Renal", name: "ENF_RENAL" },
  { label: "Úlcera", name: "ÚLCERA" },
  { label: "ICC", name: "ICC" },
  { label: "Obesidad", name: "OBESIDAD" },
  { label: "Enf. tiroides", name: "ENF_TIROIDES" },
];

const problems = [
  {
    id: "problems_snc",
    label: "SNC",
    items: [
      { label: "Tos", name: "TOS" },
      { label: "Mareos", name: "MAREOS" },
      { label: "Sueño", name: "SUEÑO" },
      { label: "Desvanecimiento", name: "DESVANECIMIENTO" },
      { label: "Visión borrosa", name: "VISIÓN_BORROSA" },
      { label: "Pérdida de apetito", name: "PÉRDIDA_DE_APETITO" },
      { label: "Dolor de cabeza", name: "DOLOR_DE_CABEZA" },
    ],
  },
  {
    label: "Digestivo",
    id: "problems_digestive",
    items: [
      {
        label: "Dolor y/o ardor de estómago",
        name: "DOLOR_ARDOR_ESTOMAGO",
      },
      { label: "Náuseas y/o vómitos", name: "NAUSEAS_VOMITOS" },
      { label: "Diarreas", name: "DIARREAS" },
      { label: "Estreñimiento", name: "ESTREÑIMIENTO" },
      { label: "Sequedad bucal", name: "SEQUEDAD_BUCAL" },
    ],
  },
  {
    label: "Cardiovascular",
    id: "problems_cardio",
    items: [
      { label: "Palpitaciones", name: "PALPITACIONES" },
      { label: "Taquicardia", name: "TAQUICARDIA" },
      { label: "Hipotensión", name: "HIPOTENSIÓN" },
      { label: "Arritmias", name: "ARRITMIAS" },
      { label: "Angina", name: "ANGINA" },
      { label: "Bradicardia", name: "BRADICARDIA" },
      { label: "Hipotensión ortostática", name: "HIPOTENSIÓN_ORTOSTÁTICA" },
    ],
  },
  {
    label: "Otros",
    id: "problems_others",
    items: [
      { label: "Broncoespasmo", name: "BRONCOESPASMO" },
      { label: "Disgeusia", name: "DISGEUSIA" },
      { label: "Angioedema", name: "ANGIOEDEMA" },
      { label: "Neutropenia", name: "NEUTROPENIA" },
      { label: "Proteinuria", name: "PROTEINURIA" },
      { label: "Leucopenia", name: "LEUCOPENIA" },
      { label: "Fatiga", name: "FATIGA" },
      { label: "Impotencia", name: "IMPOTENCIA" },
      { label: "Astenia", name: "ASTENIA" },
    ],
  },
  {
    label: "Ap. Locomotor",
    id: "problems_loc",
    items: [
      { label: "Debilidad muscular", name: "DEBILIDAD MUSCULAR" },
      { label: "Dolores articulares", name: "DOLORES ARTICULARES" },
      { label: "Calambres", name: "CALAMBRES" },
      { label: "Dolor/rigidez de cuello", name: "DOLOR/RIGIDEZ DE CUELLO" },
    ],
  },
  {
    label: "Metabólicas",
    id: "problems_metabolics",
    items: [
      { label: "Hiponatremia", name: "HIPONATREMIA" },
      { label: "Hipopotasemia", name: "HIPOPOTASEMIA" },
      { label: "Hiperglicemia", name: "HIPERGLICEMIA" },
      { label: "Hipercalcemia", name: "HIPERCALCEMIA" },
      { label: "Hipercolesterolemia", name: "HIPERCOLESTEROLEMIA" },
      { label: "Edema", name: "EDEMA" },
      { label: "Hiperpotasemia", name: "HIPERPOTASEMIA" },
    ],
  },
  {
    label: "Piel",
    id: "problems_piel",
    items: [
      { label: "Erupciones", name: "ERUPCIONES" },
      { label: "Prurito", name: "PRURITO" },
      { label: "Rubefacción", name: "RUBEFACCIÓN" },
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
      <Title>Ficha de anamnesis farmacológica</Title>
      <Divider />
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
