"use client";
import { FormControlLabel, Radio } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { differenceInYears } from "date-fns";
import { Field, useFormikContext } from "formik";
import { RadioGroup, TextField } from "formik-mui";
import { DatePicker } from "formik-mui-x-date-pickers";
import { Anamnesis, EMPTY, minYear, today } from "./page";

const getImc = ({
  size,
  weight,
}: {
  size: number | null;
  weight: number | null;
}) => {
  if (size && weight) {
    return (weight / size ** 2).toFixed(1);
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

export const PersonalInformation = () => {
  const { values, errors } = useFormikContext<Anamnesis>();

  return (
    <Grid container spacing={2}>
      <Grid xs={3}>
        <Field
          label="Ocupación"
          name="occupation"
          fullWidth
          component={TextField}
          variant="outlined"
        />
      </Grid>
      <Grid xs={3}>
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
      <Grid xs={2} p={3}>
        Edad: {values.birthdate ? calculateAge(values.birthdate) : EMPTY}
      </Grid>
      <Grid xs={2}>
        Sexo:
        <Field component={RadioGroup} name="sex" row>
          <FormControlLabel value="MALE" control={<Radio />} label="M" />
          <FormControlLabel value="FEMALE" control={<Radio />} label="F" />
        </Field>
      </Grid>
      <Grid xs={3}>
        <Field
          label="Peso (kg):"
          name="weight"
          component={TextField}
          type="number"
          variant="outlined"
          fullWidth
        />
      </Grid>
      <Grid xs={3}>
        <Field
          label="Talla (m):"
          name="size"
          component={TextField}
          type="number"
          variant="outlined"
          fullWidth
        />
      </Grid>
      <Grid xs={4} p={3}>
        IMC: {getImc(values)}
      </Grid>
    </Grid>
  );
};
