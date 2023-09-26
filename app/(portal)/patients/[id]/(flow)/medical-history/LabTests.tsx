"use client";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Fab,
  FormControlLabel,
  Radio,
  Stack,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { blue } from "@mui/material/colors";
import { ArrayHelpers, Field, FieldArray, useFormikContext } from "formik";
import { RadioGroup, TextField } from "formik-mui";
import { DatePicker } from "formik-mui-x-date-pickers";
import React from "react";
import { Anamnesis } from "./page";

const emptyLabTest = {
  name: "",
  date: null,
  result: "",
  normalRange: "",
  comments: "",
};

export const LabTests = () => {
  const { values, setFieldValue } = useFormikContext<Anamnesis>();

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
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const existLabTests = e.target.value === "true";
            setFieldValue("labTests", existLabTests ? [emptyLabTest] : []);
            setFieldValue("existLabTests", existLabTests);
          }}
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
        <FieldArray name="labTests">
          {(arrayHelpers: ArrayHelpers) => (
            <Stack spacing={2}>
              {values.labTests.map((x, index) => (
                <Grid container spacing={1} key={index}>
                  {values.labTests.length > 1 && (
                    <Grid xs={12} display="flex" justifyContent="end">
                      <Fab
                        color="primary"
                        aria-label="delete"
                        onClick={arrayHelpers.handleRemove(index)}
                      >
                        <CloseIcon />
                      </Fab>
                    </Grid>
                  )}
                  <Grid xs={6}>
                    <Field
                      name={`labTests.${index}.name`}
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
                      name={`labTests.${index}.date`}
                    />
                  </Grid>
                  <Grid xs={3}>
                    <Field
                      name={`labTests.${index}.result`}
                      label="Resultado"
                      component={TextField}
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid xs={6}>
                    <Field
                      name={`labTests.${index}.normalRange`}
                      label="Rango de valor normal"
                      component={TextField}
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid xs={6}>
                    <Field
                      name={`labTests.${index}.comments`}
                      label="Evaluacion/comentarios"
                      component={TextField}
                      variant="outlined"
                      fullWidth
                      multiline
                      rows={4}
                    />
                  </Grid>
                </Grid>
              ))}
              {values.labTests.length > 0 && (
                <Button
                  startIcon={<AddIcon />}
                  onClick={() => {
                    arrayHelpers.push(emptyLabTest);
                  }}
                >
                  Agregar otra prueba de laboratorio
                </Button>
              )}
            </Stack>
          )}
        </FieldArray>
      </Stack>
    </Box>
  );
};
