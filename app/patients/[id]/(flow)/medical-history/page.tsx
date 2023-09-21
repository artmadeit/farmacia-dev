"use client";

import { Title } from "@/app/(components)/Title";
import {
  Box,
  Divider,
  FormControlLabel,
  Paper,
  Radio,
  Stack,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { blue } from "@mui/material/colors";
import { subYears } from "date-fns";
import { Field, Form, Formik } from "formik";
import { CheckboxWithLabel, RadioGroup, TextField } from "formik-mui";
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
            <PersonalInformation values={values} errors={errors} />
            <Grid container spacing={2}>
              <Grid xs={12} style={{ marginTop: "10px" }}>
                <Subtitle component="h4">2. Historia de salud</Subtitle>
                <Divider />
              </Grid>
              <Grid xs={12}>
                <Subtitle component="h5">2.1 Antecedentes patológicos</Subtitle>
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
                <Subtitle component="h5">2.2 Problemas de salud</Subtitle>
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
                {healthProblems.map((group, index) => (
                  <CheckboxGroup key={index} group={group} />
                ))}
              </Grid>
            </Grid>
            <VitalFunctions />
            <Grid container spacing={2}>
              <Grid xs={12} style={{ margin: "20px 0px 10px 0px" }}>
                <Subtitle component="h5">2.4 Hábitos de consumo</Subtitle>
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
                <Subtitle component="h5">
                  2.5 Hábitos alimenticios y/o dietéticos
                </Subtitle>
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
            </Grid>
            <PhysicalExercises />
            <LabTests />
            <br></br>
            <div>{JSON.stringify(values)}</div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

const LabTests = () => {
  return (
    <Box>
      <Subtitle component="h5">2.7 Pruebas de laboratorio</Subtitle>
      <Grid
        container
        xs={12}
        style={{
          border: "1px solid #E5EAF2",
          margin: "10px",
          padding: "20px",
        }}
      ></Grid>
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

const PhysicalExercises = () => {
  return (
    <Stack component="section" spacing={2}>
      <Subtitle component="h5">2.6 Ejercicios físicos</Subtitle>
      <Field component={RadioGroup} name="physicalExercises">
        <Grid container component={Paper} variant="outlined" p={2}>
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
    </Stack>
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
      <Grid xs={12}>
        <Subtitle component="h5">2.3 Funciones vitales</Subtitle>
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

export type PersonalInformationProps = {
  //TODO: Arthur revisar
  values: any;
  errors: any;
};
