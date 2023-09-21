"use client";
import { FormControlLabel, Radio } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { differenceInYears } from "date-fns";
import { Field } from "formik";
import { RadioGroup, TextField } from "formik-mui";
import { DatePicker } from "formik-mui-x-date-pickers";
import { formatDate } from "../../../../date";
import {
  EMPTY,
  PersonalInformationProps,
  Subtitle,
  minYear,
  today,
} from "./page";

const getImc = ({ size, weight }: { size: number; weight: number }) => {
  if (size && weight) {
    return weight / size ** 2;
  }

  return EMPTY;
};

// Adapted from: https://stackoverflow.com/questions/66470624/date-fns-format-date-and-age-calculation-problem-in-react
function calculateAge(date: Date) {
  const age = differenceInYears(new Date(), date);
  if (isNaN(age)) {
    return EMPTY;
  }

  return age;
}

export const PersonalInformation = ({
  values,
  errors,
}: PersonalInformationProps) => {
  return (
    <Grid container spacing={2}>
      <Grid xs={10} style={{ marginTop: "10px" }}>
        <Subtitle component="h4">1. Datos personales</Subtitle>
      </Grid>
      <Grid xs={2} style={{ marginTop: "10px" }}>
        Fecha: {formatDate(new Date())}
      </Grid>
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
              fullWidth: true,
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
