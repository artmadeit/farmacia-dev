"use client";

import { Title } from "@/app/(components)/Title";
import { Divider, FormControlLabel, Radio, Stack } from "@mui/material";
import { blue, pink } from "@mui/material/colors";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { addDays, differenceInYears, sub, subYears } from "date-fns";
import { Field, Form, Formik } from "formik";
import { CheckboxWithLabel, RadioGroup, TextField } from "formik-mui";
import yup from "../../../../validation";
import { formatDate } from "../../../../date";
import { DatePicker } from "formik-mui-x-date-pickers";

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

const consumptionHabits = [
  {
    label: "Alcohol",
    id: "consumptions_alcohol",
    items: [
      { label: "No", name: "NO" },
      { label: "Eventual", name: "EVENTUALLY" },
      { label: "1/4-1/2 vasos/día", name: "1/4-1/2 VASOS/DIA" },
      { label: "1 o más vasos/día", name: "1 O MAS VASOS/DIA" },
    ],
  },
  {
    label: "Tabaco",
    id: "consumptions_tobacco",
    items: [
      { label: "No", name: "NO" },
      { label: "Eventual", name: "EVENTUALLY" },
      { label: "1/2 cajetilla/día", name: "1/2 CAJETILLA/DIA" },
      { label: "1 cajetilla/día", name: "1 CAJETILLA/DIA" },
      { label: "Más de 1 cajetilla/día", name: "MAS DE 1 CAJETILLA/DIA" },
    ],
  },
  {
    label: "Té",
    id: "consumptions_tea",
    items: [
      { label: "No", name: "NO" },
      { label: "Eventual", name: "EVENTUALLY" },
      { label: "1/2 tazas/día", name: "" },
      { label: "Más de 3 tazas/día", name: "" },
    ],
  },
];

const minYear = subYears(new Date(), 103);

const today = new Date();
const EMPTY = "-";

export default function PatientInterview() {
  const code = "AJK-203";

  const getImc = ({ size, weight }: { size: number; weight: number }) => {
    if (size && weight) {
      return weight / size ** 2;
    }

    return EMPTY;
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
          consumptions_alcohol: [],
          consumptions_tobacco: [],
          consumptions_tea: [],
        }}
        validationSchema={yup.object({
          occupation: yup.string().required().label("La ocupación"),
          birthdate: yup
            .date()
            .min(
              minYear,
              `La fecha de nacimiento no puede ser menor del año ${minYear.getFullYear()}`
            )
            .max(today),
          weight: yup.number().required().min(10).max(200).label("El peso"),
          size: yup.number().required().min(0.4).max(2.5).label("La talla"),
        })}
        onSubmit={() => {
          // TODO:
        }}
      >
        {({ values, errors }) => (
          <Form>
            {/* {JSON.stringify(values)}
            {JSON.stringify(errors)} */}
            <Grid container spacing={2}>
              <Grid xs={10} style={{ marginTop: "10px" }}>
                <strong>1. Datos personales</strong>
              </Grid>
              <Grid xs={2} style={{ marginTop: "10px" }}>
                Fecha: {formatDate(new Date())}
              </Grid>
              <Grid xs={12}>Código del paciente: {code}</Grid>
              <Grid xs={3} display="flex" alignItems="center">
                <Field
                  label="Ocupación"
                  name="occupation"
                  fullWidth
                  component={TextField}
                  variant="outlined"
                />
              </Grid>
              <Grid xs={3} display="flex" alignItems="center">
                <Field
                  component={DatePicker}
                  minDate={minYear}
                  maxDate={today}
                  slotProps={{
                    textField: {
                      label: "Fecha de Nacimiento",
                      helperText: errors.birthdate ? errors.birthdate : "",
                    },
                  }}
                  name="birthdate"
                />
              </Grid>
              <Grid xs={2} display="flex" alignItems="center">
                Edad:{" "}
                {values.birthdate ? calculateAge(values.birthdate) : EMPTY}
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
              <Grid xs={3} display="flex" alignItems="center">
                <Field
                  label="Peso (kg):"
                  name="weight"
                  component={TextField}
                  type="number"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid xs={3} display="flex" alignItems="center">
                <Field
                  label="Talla (m):"
                  name="size"
                  component={TextField}
                  type="number"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid xs={4} display="flex" alignItems="center">
                IMC: {getImc(values)}
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid xs={12} style={{ marginTop: "10px" }}>
                <strong>2. Historia de salud</strong>
                <Divider />
              </Grid>
              <Grid xs={12}>
                <strong>2.1 Antecedentes patológicos</strong>
              </Grid>
              <div
                style={{
                  display: "flex",
                  border: "1px solid #E5EAF2",
                  margin: "10px",
                }}
              >
                <Grid xs={8} container>
                  <Grid xs={12} container style={{ padding: "20px" }}>
                    {antecedents.map((item) => (
                      <Grid xs={4} key={item.name}>
                        <Field
                          component={CheckboxWithLabel}
                          type="checkbox"
                          name="antecedents"
                          value={item.name}
                          Label={{ label: item.label }}
                          sx={{
                            color: blue[700],
                          }}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
                <Grid xs={4} style={{ padding: "20px" }}>
                  <Field
                    name="other"
                    label="Otros:"
                    component={TextField}
                    variant="outlined"
                    multiline
                    rows={4}
                  />
                </Grid>
              </div>
              {/* <Grid xs={8} container>
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
                </Grid> */}
            </Grid>
            <Grid container spacing={2}>
              <Grid xs={12} style={{ margin: "20px 0px 10px 0px" }}>
                <strong>2.2 Problemas de salud</strong>
              </Grid>
              <Grid
                xs={12}
                container
                style={{
                  border: "1px solid #E5EAF2",
                  padding: "20px",
                  margin: "10px",
                }}
              >
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
                        sx={{
                          color: blue[700],
                        }}
                      />
                    ))}
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid xs={12} style={{ margin: "20px 0px 10px 0px" }}>
                <strong>2.3 Funciones vitales</strong>
              </Grid>
              <Stack direction="row">
                <Field
                  component={TextField}
                  name="FC"
                  label="FC:"
                  variant="outlined"
                />
                <Field
                  component={TextField}
                  name="FR"
                  label="FR:"
                  variant="outlined"
                />
                <Field
                  component={TextField}
                  name="T"
                  label="T°:"
                  variant="outlined"
                />
                <Field
                  component={TextField}
                  name="PA"
                  label="PA:"
                  variant="outlined"
                />
              </Stack>
            </Grid>
            <Grid container spacing={2}>
              <Grid xs={12} style={{ margin: "20px 0px 10px 0px" }}>
                <strong>2.4 Hábitos de consumo</strong>
              </Grid>
              <Grid xs={12} container style={{ border: "1px solid #E5EAF2" }}>
                {consumptionHabits.map((group, index) => (
                  <Grid
                    key={index}
                    container
                    xs={3}
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
                        label={{ label: item.label }}
                        sx={{
                          color: blue[700],
                        }}
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
  if (isNaN(age)) {
    return EMPTY;
  }

  return age;
}
