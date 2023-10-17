"use client";

import { Title } from "@/app/(components)/Title";
import { formatDate, minYear, today } from "@/app/date";
import {
  AutocompleteRenderInputParams,
  Box,
  Button,
  Divider,
  FormControlLabel,
  Radio,
  Stack,
  TextField as MuiTextField,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { blue } from "@mui/material/colors";
import { Field, Form, Formik, useFormikContext } from "formik";
import {
  Autocomplete,
  CheckboxWithLabel,
  RadioGroup,
  TextField,
} from "formik-mui";
import React from "react";
import yup from "../../../../../validation";
import { CheckboxGroup } from "./CheckboxGroup";
import { ConsumptionHabits } from "./ConsumptionHabits";
import { LabTest, LabTests } from "./LabTests";
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
import { debounce } from "lodash";
import { DiseaseCie10 } from "@/app/(portal)/cie10/DiseaseCie10";
import { Page } from "@/app/(api)/pagination";
import { useAuthApi } from "@/app/(api)/api";
import { object } from "yup";

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
  pas: null,
  pad: null,

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
  diagnosis: [],
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
  pas: number | null;
  pad: number | null;
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
  labTests: LabTest[];
  diagnosis: string[];
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
          fc: yup.number().required().min(40).max(250).label("Frecuencia cardíaca"),
          fr: yup.number().required().min(8).max(40).label("Frecuencia respiratoria"),
          pas: yup.number().required().min(60).max(240).label("PA sistólica"),
          pad: yup.number().required().min(30).max(160).label("PA diastólica"),
          t: yup.number().required().min(34).max(42).label("Temperatura"),
          physicalExercises: yup.string().required().label("Ejercicio físico"),
          existLabTests: yup.string().required(),
          labTests: yup.array().of(yup.object({
            name: yup.string().required(),
            date: yup.date().required().max(today),
            result: yup.string().required(),
            normalRange: yup.string().required(),

          }))
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
          <Box
            display="flex"
            justifyContent="flex-end"
            sx={{ marginTop: "10px" }}
          >
            <Button variant="contained" type="submit">
              Guardar
            </Button>
          </Box>
        </Form>
      </Formik>
    </div>
  );
}

const Diagnosis = () => {
  const { touched, errors } = useFormikContext<Anamnesis>();
  const getApi = useAuthApi();

  const [diseases, setDiseases] = React.useState<DiseaseCie10[]>([]);
  const searchDiseases = debounce(async (newInputValue: string) => {
    if (newInputValue) {
      const api = await getApi();
      const page = await api
        .get<Page<DiseaseCie10>>(
          "/diseases/search/findByNameContainingIgnoringCase",
          {
            params: { searchText: newInputValue },
          }
        )
        .then((x) => x.data);
      setDiseases(page._embedded.diseases);
    } else {
      setDiseases([]);
    }
  }, 500);

  const name = "diagnosis";
  return (
    <Field
      name={name}
      multiple
      component={Autocomplete}
      options={diseases}
      renderInput={(params: AutocompleteRenderInputParams) => (
        <MuiTextField
          label="Diagnosis"
          variant="outlined"
          {...params}
          name={name}
          error={touched[name] && !!errors[name]}
          helperText={errors[name] as string}
        />
      )}
      getOptionLabel={(option: any) =>
        typeof option === "string" ? option : option.name
      }
      isOptionEqualToValue={(option: DiseaseCie10, value: DiseaseCie10) =>
        option.id === value.id
      }
      filterSelectedOptions
      filterOptions={(x: any) => x}
      onInputChange={(_event: any, newInputValue: any) => {
        searchDiseases(newInputValue);
      }}
    />
  );
};

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
