"use client";

import { Title } from "@/app/(components)/Title";
import { formatDate } from "@/app/date";
import { Divider, FormControlLabel, Radio, Stack } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { blue } from "@mui/material/colors";
import { subYears } from "date-fns";
import { Field, Form, Formik } from "formik";
import { CheckboxWithLabel, RadioGroup, TextField } from "formik-mui";
import React, { ChangeEvent } from "react";
import yup from "../../../../validation";
import { PersonalInformation } from "./PersonalInformation";
import {
  antecedents,
  foodConsumptions,
  foodHabits,
  healthProblems,
} from "./data";
import { LabTests } from "./LabTests";
import { Subtitle } from "./Subtitle";
import { OutlinedPaper } from "./OutlinedPaper";
import { PhysicalExercises } from "./PhysicalExercises";
import { VitalFunctions } from "./VitalFunctions";
import { CheckboxGroup } from "./CheckboxGroup";
import { ConsumptionHabits } from "./ConsumptionHabits";

export const minYear = subYears(new Date(), 103);

export const today = new Date();
export const EMPTY = "-";

const foodConsumptionsGroup1 = {
  ...foodConsumptions,
  items: foodConsumptions.items.slice(0, 4),
};

const foodConsumptionsGroup2 = {
  ...foodConsumptions,
  items: foodConsumptions.items.slice(4),
};

const initialValues = {
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
  physicalExercises: "",
  existLabTests: null,
  labTests: [],
};

export type Anamnesis = {
  occupation: string;
  sex: string;
  birthdate: Date;
  weight: number;
  size: number;
  other: string;
  antecedents: never[];
  problems_other: never[];
  problems_cardio: never[];
  problems_digestive: never[];
  problems_loc: never[];
  problems_snc: never[];
  fc: number;
  fr: number;
  t: number;
  pa: number;
  consumptions_alcohol: never[];
  consumptions_tobacco: never[];
  consumptions_tea: never[];
  other2: string;
  salt_consumption: never[];
  salt_addition: never[];
  other3: string;
  physicalExercises: string;
  existLabTests: boolean;
  labTests: never[];
};

export const emptyLabTest = {
  name: "",
  date: null,
  result: "",
  normalRange: "",
  comments: "",
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
        {({ values, errors }) => (
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
            </Stack>
          </Form>
        )}
      </Formik>
    </div>
  );
}

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
        name="other3"
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
);
