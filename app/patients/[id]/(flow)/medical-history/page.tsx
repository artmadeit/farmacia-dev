"use client";

import { Title } from "@/app/(components)/Title";
import { formatDate, minYear, today } from "@/app/date";
import { Box, Divider, FormControlLabel, Radio, Stack } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { blue } from "@mui/material/colors";
import { Field, Form, Formik } from "formik";
import { CheckboxWithLabel, RadioGroup, TextField } from "formik-mui";
import React from "react";
import yup from "../../../../validation";
import { CheckboxGroup } from "./CheckboxGroup";
import { ConsumptionHabits } from "./ConsumptionHabits";
import { LabTests } from "./LabTests";
import { OutlinedPaper } from "./OutlinedPaper";
import { PersonalInformation } from "./PersonalInformation";
import { PhysicalExercises } from "./PhysicalExercises";
import { Subtitle } from "./Subtitle";
import { VitalFunctions } from "./VitalFunctions";
import {
  antecedents,
  foodConsumptions,
  foodHabits,
  healthProblems,
} from "./data";

const foodConsumptionsGroup1 = {
  ...foodConsumptions,
  items: foodConsumptions.items.slice(0, 4),
};

const foodConsumptionsGroup2 = {
  ...foodConsumptions,
  items: foodConsumptions.items.slice(4),
};

const initialValues: Anamnesis = {
  occupation: "",
  sex: "",
  birthdate: null,
  weight: null,
  size: null,

  antecedents: [],
  otherAntecedents: "",

  sncProblems: [],
  digestiveProblems: [],
  cardioProblems: [],
  otherProblems: [],
  locomotiveProblems: [],
  metabolicProblems: [],
  skinProblems: [],

  fc: null,
  fr: null,
  t: null,
  pa: null,

  alcoholConsumption: "",
  tobaccoConsumption: "",
  teaConsumption: "",
  waterConsumption: "",
  otherConsumptionHabits: "",

  saltConsumption: "",
  saltAddition: "",
  foodHabits: [],
  otherFoodHabits: "",

  physicalExercises: "",
  existLabTests: null,
  labTests: [],
  diagnosis: "",
};

export type Anamnesis = {
  occupation: string;
  sex: string;
  birthdate: Date | null;
  weight: number | null;
  size: number | null;
  otherAntecedents: string;
  antecedents: string[];
  otherProblems: string[];
  cardioProblems: string[];
  digestiveProblems: string[];
  locomotiveProblems: string[];
  sncProblems: string[];
  metabolicProblems: string[];
  skinProblems: string[];
  fc: number | null;
  fr: number | null;
  t: number | null;
  pa: number | null;
  alcoholConsumption: string;
  tobaccoConsumption: string;
  teaConsumption: string;
  waterConsumption: string;
  otherConsumptionHabits: string;
  saltConsumption: string;
  saltAddition: string;
  foodHabits: string[];
  otherFoodHabits: string;
  physicalExercises: string;
  existLabTests: boolean | null;
  labTests: never[];
  diagnosis: string;
};

export default function PatientInterview() {
  return (
    <div>
      <Title>Ficha de anamnesis farmacológica</Title>
      <Divider />
      <Formik
        initialValues={initialValues}
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
        <Form>
          <Stack spacing={2} pt={2}>
            <Grid container>
              <Grid xs={10}>
                <Subtitle component="h4">1. Datos personales</Subtitle>
              </Grid>
              <Grid xs={2}>Fecha: {formatDate(new Date())}</Grid>
            </Grid>
            <PersonalInformation />
            <Subtitle component="h4">2. Historia de salud</Subtitle>
            <Subtitle component="h5">2.1 Antecedentes patológicos</Subtitle>
            <PathologicalAntecedents />
            <Subtitle component="h5">2.2 Problemas de salud</Subtitle>
            <HealthProblems />
            <Subtitle component="h5">2.3 Funciones vitales</Subtitle>
            <VitalFunctions />
            <Subtitle component="h5">2.4 Hábitos de consumo</Subtitle>
            <ConsumptionHabits />
            <Subtitle component="h5">
              2.5 Hábitos alimenticios y/o dietéticos
            </Subtitle>
            <FoodHabits />
            <Subtitle component="h5">2.6 Ejercicios físicos</Subtitle>
            <PhysicalExercises />
            <Subtitle component="h5">2.7 Pruebas de laboratorio</Subtitle>
            <LabTests />
            <Subtitle component="h5">2.8 Diagnóstico</Subtitle>
            <Diagnosis />
          </Stack>
        </Form>
      </Formik>
    </div>
  );
}

const Diagnosis = () => (
  <Box>
    <Field
      name="diagnosis"
      component={TextField}
      variant="outlined"
      fullWidth
    />
  </Box>
);

const FoodHabits = () => (
  <Grid container component={OutlinedPaper}>
    <Grid xs={3}>
      {foodHabits.map((group) => (
        <React.Fragment key={group.id}>
          <Subtitle component="h6">{group.label}</Subtitle>
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
    <CheckboxGroup group={foodConsumptionsGroup1} />
    <CheckboxGroup group={foodConsumptionsGroup2} />
    <Grid xs={3}>
      <Field
        component={TextField}
        name="otherFoodHabits"
        label="Otros:"
        variant="outlined"
        multiline
        rows={4}
        fullWidth
      />
    </Grid>
  </Grid>
);

const HealthProblems = () => (
  <Grid container component={OutlinedPaper}>
    {healthProblems.map((group, index) => (
      <CheckboxGroup key={index} group={group} />
    ))}
  </Grid>
);

const PathologicalAntecedents = () => (
  <Grid container component={OutlinedPaper}>
    <Grid xs={8} container>
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
    <Grid xs={4}>
      <Field
        name="otherAntecedents"
        label="Otros:"
        component={TextField}
        variant="outlined"
        multiline
        rows={4}
        fullWidth
      />
    </Grid>
  </Grid>
);
