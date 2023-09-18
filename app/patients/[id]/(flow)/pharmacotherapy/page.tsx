"use client";
import { Title } from "@/app/(components)/Title";
import {
  Divider,
  FormControlLabel,
  Paper,
  Radio,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Field, Form, Formik } from "formik";
import { RadioGroup, TextField } from "formik-mui";
import { DatePicker } from "formik-mui-x-date-pickers";

export default function Pharmacotherapy() {
  return (
    <div>
      <Title>Hoja Farmacoterapéutica</Title>
      <Divider />
      <Formik
        initialValues={{
          drug: "",
          startDate: null,
          mode: "",
        }}
        onSubmit={() => {}}
      >
        {({ values, errors }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid xs={10} style={{ marginTop: "10px" }}>
                <strong>
                  3. Historia Farmacoterapéutica (P) Prescrito (A) Automedicado{" "}
                </strong>
              </Grid>
            </Grid>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell style={{ minWidth: 200 }}>Medicamento</TableCell>
                    <TableCell>P/A</TableCell>
                    <TableCell style={{ minWidth: 200 }} align="center">
                      Dosis
                    </TableCell>
                    <TableCell style={{ minWidth: 200 }} align="center">
                      Fecha inicio
                    </TableCell>
                    <TableCell style={{ minWidth: 200 }} align="center">
                      Fecha susp
                    </TableCell>
                    <TableCell style={{ minWidth: 200 }} align="center">
                      Fecha rein.
                    </TableCell>
                    <TableCell style={{ minWidth: 200 }} align="center">
                      Motivo de uso
                    </TableCell>
                    <TableCell style={{ minWidth: 200 }} align="center">
                      Aceptación
                    </TableCell>
                    <TableCell style={{ minWidth: 200 }} align="center">
                      Administración
                    </TableCell>
                    <TableCell style={{ minWidth: 200 }} align="center">
                      Dificultades para tomarlo y/o tolerarlo
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableCell>
                    <Field
                      name="drug"
                      component={TextField}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <Field component={RadioGroup} name="mode" row>
                      <FormControlLabel
                        value="P"
                        control={<Radio />}
                        label="P"
                      />
                      <FormControlLabel
                        value="A"
                        control={<Radio />}
                        label="A"
                      />
                    </Field>
                  </TableCell>
                  <TableCell>
                    <Field
                      name="dose"
                      component={TextField}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <Field
                      component={DatePicker}
                      slotProps={{
                        textField: {
                          helperText: errors.startDate ? errors.startDate : "",
                        },
                      }}
                      name="startDate"
                    />
                  </TableCell>
                  <TableCell>
                    <Field
                      component={DatePicker}
                      slotProps={{
                        textField: {
                          helperText: errors.startDate ? errors.startDate : "",
                        },
                      }}
                      name="startDate"
                    />
                  </TableCell>
                  <TableCell>
                    <Field
                      component={DatePicker}
                      slotProps={{
                        textField: {
                          helperText: errors.startDate ? errors.startDate : "",
                        },
                      }}
                      name="startDate"
                    />
                  </TableCell>
                  <TableCell>
                    <Field
                      name="reasonForUse"
                      component={TextField}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <Field
                      name="acceptance"
                      component={TextField}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <Field
                      name="administration"
                      component={TextField}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <Field
                      name="difficulties"
                      component={TextField}
                      variant="outlined"
                    />
                  </TableCell>
                </TableBody>
              </Table>
            </TableContainer>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore,
              sint ratione voluptatem veniam quisquam porro excepturi repellat,
              reprehenderit id dignissimos deleniti quibusdam. Hic beatae
              officia minus adipisci qui voluptate recusandae.
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
}
