"use client";

import { Title } from "@/app/(components)/Title";
import { Box, Divider, FormControlLabel, Radio, Stack } from "@mui/material";
import { blue } from "@mui/material/colors";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { differenceInYears, subYears } from "date-fns";
import { Field, Form, Formik } from "formik";
import { CheckboxWithLabel, RadioGroup, TextField } from "formik-mui";
import yup from "../../../../validation";
import { formatDate } from "../../../../date";
import { DatePicker } from "formik-mui-x-date-pickers";
import { alimentos, antecedents, consumptionHabits, problems } from "./data";
import React from "react";

const foodHabits = [
  {
    label: "Sal en dieta",
    id: "salt_consumption",
    items: [
      { label: "Hiposódica", name: "HIPOSODICA" },
      { label: "Normosódica", name: "NORMOSODICA" },
      { label: "Hipersódica", name: "HIPERSODICA" },
    ],
  },
  {
    label: "¿Adiciona a comidas?",
    id: "salt_addition",
    items: [
      { label: "Si", name: "YES" },
      { label: "No", name: "NO" },
    ],
  },
];

const minYear = subYears(new Date(), 103);

const today = new Date();
const EMPTY = "-";

export default function PatientInterview() {
  return (
    <div>
      <Title>Ficha de anamnesis farmacológica</Title>
      <Divider />
      <Formik
        initialValues={{
          occupation: "",
          sex: "",
          birthdate: null,
          weight: null,
          size: null,
          other: "",
          antecedents: [],
          problems_other: [],
          problems_cardio: [],
          problems_digestive: [],
          problems_loc: [],
          problems_snc: [],
          fc: null,
          fr: null,
          t: null,
          pa: null,
          consumptions_alcohol: [],
          consumptions_tobacco: [],
          consumptions_tea: [],
          other2: "",
          salt_consumption: [],
          salt_addition: [],
          other3: "",
        }}
        validationSchema={yup.object({
          occupation: yup.string().required().label("La ocupación"),
          birthdate: yup
            .date()
            .min(
              minYear,
              `La fecha de nacimiento no puede ser menor del año ${minYear.getFullYear()}`
            )
            .max(today)
            .label("Fecha de nacimiento"),
          weight: yup.number().required().min(10).max(200).label("El peso"),
          size: yup.number().required().min(0.4).max(2.5).label("La talla"),
          fc: yup.number().required().min(40).max(250),
          fr: yup.number().required().min(8).max(40),
          t: yup.number().required().min(34).max(42),
        })}
        onSubmit={() => {
          // TODO:
        }}
      >
        {({ values, errors }) => (
          <Form>
            {/* {JSON.stringify(values)}
            {JSON.stringify(errors)} */}
            <PersonalInformation values={values} errors={errors} />
            <Grid container spacing={2}>
              <Grid xs={12} style={{ marginTop: "10px" }}>
                <strong>2. Historia de salud</strong>
                <Divider />
              </Grid>
              <Grid xs={12}>
                <strong>2.1 Antecedentes patológicos</strong>
              </Grid>
              <Grid
                xs={12}
                container
                style={{
                  border: "1px solid #E5EAF2",
                  margin: "10px",
                }}
              >
                <Grid xs={8} container style={{ padding: "20px" }}>
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
                <Grid xs={4} style={{ padding: "20px" }}>
                  <Field
                    name="other"
                    label="Otros:"
                    component={TextField}
                    variant="outlined"
                    multiline
                    rows={4}
                    fullWidth
                  />
                </Grid>
              </Grid>
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
                  <Grid key={index} xs={3}>
                    <strong>{group.label}</strong>
                    <Stack>
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
                    </Stack>
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <VitalFunctions />
            <Grid container spacing={2}>
              <Grid xs={12} style={{ margin: "20px 0px 10px 0px" }}>
                <strong>2.4 Hábitos de consumo</strong>
              </Grid>
              <Grid
                xs={12}
                container
                style={{
                  border: "1px solid #E5EAF2",
                  margin: "10px",
                }}
              >
                <Grid xs={8} container style={{ padding: "20px" }}>
                  {consumptionHabits.map((group, index) => (
                    <Grid key={index} xs={4}>
                      <strong>{group.label}</strong>
                      <Field component={RadioGroup} name={group.id}>
                        <FormControlLabel
                          value={group.no.name}
                          control={<Radio sx={{ color: blue[700] }} />}
                          label={group.no.label}
                        />
                        <strong>Tipos: </strong>
                        {group.types.map((type) => (
                          <FormControlLabel
                            key={type.name}
                            value={type.name}
                            control={
                              <Radio
                                sx={{
                                  color: blue[700],
                                }}
                              />
                            }
                            label={type.label}
                          />
                        ))}
                      </Field>
                    </Grid>
                  ))}
                </Grid>
                <Grid xs={4} style={{ padding: "20px" }}>
                  <Field
                    component={TextField}
                    style={{ margin: "10px 0px" }}
                    name="waterConsumption"
                    label="Cantidad de agua que consume:"
                    variant="outlined"
                    fullWidth
                  />
                  <Field
                    name="other2"
                    label="Otros:"
                    component={TextField}
                    variant="outlined"
                    multiline
                    rows={4}
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid xs={12} style={{ margin: "20px 0px 10px 0px" }}>
                <strong>2.5 Hábitos alimenticios y/o dietéticos</strong>
              </Grid>
              <Grid
                container
                xs={12}
                style={{
                  border: "1px solid #E5EAF2",
                  margin: "10px",
                  padding: "20px",
                }}
              >
                <Grid xs={3}>
                  {foodHabits.map((group) => (
                    <React.Fragment key={group.id}>
                      <strong>{group.label}</strong>
                      <Field component={RadioGroup} name={group.id}>
                        {group.items.map((item) => (
                          <FormControlLabel
                            key={item.name}
                            value={item.name}
                            control={
                              <Radio
                                sx={{
                                  color: blue[700],
                                }}
                              />
                            }
                            label={item.label}
                          />
                        ))}
                      </Field>
                    </React.Fragment>
                  ))}
                </Grid>
                <Grid xs={3}>
                  <strong>Alimentos/consume</strong>
                  <Stack>
                    {alimentos.items1.map((item, idx) => (
                      <Field
                        key={idx}
                        component={CheckboxWithLabel}
                        type="checkbox"
                        name={alimentos.id}
                        value={item.name}
                        Label={{ label: item.label }}
                        sx={{
                          color: blue[700],
                        }}
                      />
                    ))}
                  </Stack>
                </Grid>
                <Grid xs={3}>
                  <strong>Alimentos/consume</strong>
                  <Stack>
                    {alimentos.items2.map((item, idx) => (
                      <Field
                        key={idx}
                        component={CheckboxWithLabel}
                        type="checkbox"
                        name={alimentos.id}
                        value={item.name}
                        Label={{ label: item.label }}
                        sx={{
                          color: blue[700],
                        }}
                      />
                    ))}
                  </Stack>
                </Grid>
                <Grid xs={3}>
                  <Field
                    component={TextField}
                    name="other3"
                    label="Otros:"
                    variant="outlined"
                    multiline
                    rows={4}
                    fullWidth
                  />
                </Grid>
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

const VitalFunctions = () => {
  return (
    <Grid container spacing={2}>
      <Grid xs={12} style={{ margin: "20px 0px 10px 0px" }}>
        <strong>2.3 Funciones vitales</strong>
      </Grid>
      <Grid xs={3}>
        <Field
          component={TextField}
          name="fc"
          label="Frecuencia cárdiaca (LPM):"
          variant="outlined"
          fullWidth
        />
      </Grid>
      <Grid xs={3}>
        <Field
          component={TextField}
          name="fr"
          label="Frecuencia Respiratoria (rpm):"
          variant="outlined"
          fullWidth
        />
      </Grid>
      <Grid xs={3}>
        <Field
          component={TextField}
          name="t"
          label="Temperatura (C°):"
          variant="outlined"
          fullWidth
        />
      </Grid>
      <Grid xs={3}>
        <Field
          component={TextField}
          name="pa"
          label="Presión arterial:"
          variant="outlined"
          fullWidth
        />
      </Grid>
    </Grid>
  );
};

type PersonalInformationProps = {
  //TODO: Arthur revisar
  values: any;
  errors: any;
};

const PersonalInformation = ({ values, errors }: PersonalInformationProps) => {
  const code = "AJK-203";

  const getImc = ({ size, weight }: { size: number; weight: number }) => {
    if (size && weight) {
      return weight / size ** 2;
    }

    return EMPTY;
  };
  return (
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
        Edad: {values.birthdate ? calculateAge(values.birthdate) : EMPTY}
      </Grid>
      <Grid xs={2}>
        Sexo:
        <Field component={RadioGroup} name="sex" row>
          <FormControlLabel value="MALE" control={<Radio />} label="M" />
          <FormControlLabel value="FEMALE" control={<Radio />} label="F" />
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
  );
};
