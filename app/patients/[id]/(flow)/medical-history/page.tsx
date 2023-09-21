"use client";

import { Title } from "@/app/(components)/Title";
import { formatDate } from "@/app/date";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Divider,
  Fab,
  FormControlLabel,
  Paper,
  PaperProps,
  Radio,
  Stack,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { blue } from "@mui/material/colors";
import { subYears } from "date-fns";
import { Field, Form, Formik } from "formik";
import { CheckboxWithLabel, RadioGroup, TextField } from "formik-mui";
import { DatePicker } from "formik-mui-x-date-pickers";
import React from "react";
import yup from "../../../../validation";
import { PersonalInformation } from "./PersonalInformation";
import {
  GroupItems,
  antecedents,
  consumptionHabits,
  foodConsumptions,
  foodHabits,
  healthProblems,
} from "./data";

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
          physicalExercises: "",
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
            <Stack spacing={2} pt={2}>
              <Grid container>
                <Grid xs={10}>
                  <Subtitle component="h4">1. Datos personales</Subtitle>
                </Grid>
                <Grid xs={2}>Fecha: {formatDate(new Date())}</Grid>
              </Grid>
              <PersonalInformation values={values} errors={errors} />
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
              <div>{JSON.stringify(values)}</div>
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

const ConsumptionHabits = () => (
  <Grid container component={OutlinedPaper}>
    <Grid xs={8} container>
      {consumptionHabits.map((group, index) => (
        <Grid key={index} xs={4}>
          <Subtitle component="h6">{group.label}</Subtitle>
          <Field component={RadioGroup} name={group.id}>
            <FormControlLabel
              value={group.no.name}
              control={<Radio sx={{ color: blue[700] }} />}
              label={group.no.label}
            />
            <Subtitle component="h6">Tipos: </Subtitle>
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
    <Grid xs={4}>
      <Stack spacing={2}>
        <Field
          component={TextField}
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
      </Stack>
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

const LabTests = () => {
  return (
    <Box>
      <Stack spacing={2} direction="row" alignItems="center">
        <label htmlFor="existLabTests">
          ¿Se realizaron examenes de laboratorio u otra prueba diagnostica?
        </label>
        <Field
          component={RadioGroup}
          id="existLabTests"
          name="existLabTests"
          row
        >
          <FormControlLabel
            value={true}
            control={<Radio sx={{ color: blue[700] }} />}
            label="Si"
          />
          <FormControlLabel
            value={false}
            control={<Radio sx={{ color: blue[700] }} />}
            label="No"
          />
        </Field>
      </Stack>
      <Stack>
        <Grid container spacing={1}>
          <Grid xs={12} display="flex" justifyContent="end">
            <Fab color="primary" aria-label="delete" onClick={() => {}}>
              <CloseIcon />
            </Fab>
          </Grid>
          <Grid xs={6}>
            <Field
              name="other"
              label="Examen de laboratorio o prueba diagnostica"
              component={TextField}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid xs={3}>
            <Field
              component={DatePicker}
              slotProps={{
                textField: {
                  fullWidth: true,
                  label: "Fecha",
                },
              }}
              name="birthdate"
            />
          </Grid>
          <Grid xs={3}>
            <Field
              name="other"
              label="Resultado"
              component={TextField}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid xs={6}>
            <Field
              name="other"
              label="Rango de valor normal"
              component={TextField}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid xs={6}>
            <Field
              name="other"
              label="Evaluacion/comentariosl"
              component={TextField}
              variant="outlined"
              fullWidth
              multiline
              rows={4}
            />
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
};

export const Subtitle = ({
  children,
  component,
}: {
  children: React.ReactNode;
  component: React.ElementType;
}) => (
  <Typography component={component} sx={{ fontWeight: "bold" }} gutterBottom>
    {children}
  </Typography>
);

const OutlinedPaper = ({ children, ...rest }: PaperProps) => (
  <Paper variant="outlined" sx={{ p: 2 }} {...rest}>
    {children}
  </Paper>
);

const PhysicalExercises = () => {
  return (
    <Field component={RadioGroup} name="physicalExercises">
      <Grid container component={OutlinedPaper}>
        <Grid xs>
          <FormControlLabel
            value="Eventualmente"
            control={
              <Radio
                sx={{
                  color: blue[700],
                }}
              />
            }
            label="Eventualmente"
          />
        </Grid>
        <Grid xs>
          <FormControlLabel
            value="10-30 min/día"
            control={
              <Radio
                sx={{
                  color: blue[700],
                }}
              />
            }
            label="10-30 min/día"
          />
        </Grid>
        <Grid xs>
          <FormControlLabel
            value="30-60 min/día"
            control={
              <Radio
                sx={{
                  color: blue[700],
                }}
              />
            }
            label="30-60 min/día"
          />
        </Grid>
        <Grid xs>
          <FormControlLabel
            value=">60 min/día"
            control={
              <Radio
                sx={{
                  color: blue[700],
                }}
              />
            }
            label=">60 min/día"
          />
        </Grid>
        <Grid xs>
          <FormControlLabel
            value="Nunca"
            control={
              <Radio
                sx={{
                  color: blue[700],
                }}
              />
            }
            label="Nunca"
          />
        </Grid>
      </Grid>
    </Field>
  );
};

const CheckboxGroup = ({ group }: { group: GroupItems }) => {
  return (
    <Grid xs={3}>
      <Subtitle component="h6">{group.label}</Subtitle>
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
  );
};

const VitalFunctions = () => {
  return (
    <Grid container spacing={2}>
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

export type PersonalInformationProps = {
  //TODO: Arthur revisar
  values: any;
  errors: any;
};
