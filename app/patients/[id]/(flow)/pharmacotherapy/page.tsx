"use client";
import { Title } from "@/app/(components)/Title";
import {
  Button,
  Divider,
  FormControlLabel,
  Paper,
  Radio,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { ArrayHelpers, Field, FieldArray, Form, Formik } from "formik";
import { RadioGroup, TextField } from "formik-mui";
import { DatePicker } from "formik-mui-x-date-pickers";
import AddIcon from "@mui/icons-material/Add";

const emptyHistoryRow = {
  administration: "",
  difficulties: "",
  acceptance: "",
  reasonForUse: "",
  suspensionDate: null,
  restartDate: null,
  startDate: null,
  dose: "",
  mode: "",
  drug: "",
};

export default function Pharmacotherapy() {
  return (
    <div>
      <Title>Hoja Farmacoterapéutica</Title>
      <Divider />
      <Formik
        initialValues={{
          history: [{ ...emptyHistoryRow }],
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
              <FieldArray name="history">
                {(arrayHelpers: ArrayHelpers) => (
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell style={{ minWidth: 200 }}>
                          Medicamento
                        </TableCell>
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
                      {values.history.map((x, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <Field
                              name={`history.${index}.drug`}
                              component={TextField}
                              variant="outlined"
                            />
                          </TableCell>
                          <TableCell>
                            <Field
                              component={RadioGroup}
                              name={`history.${index}.mode`}
                              row
                            >
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
                              name={`history.${index}.dose`}
                              component={TextField}
                              variant="outlined"
                            />
                          </TableCell>
                          <TableCell>
                            <Field
                              component={DatePicker}
                              // slotProps={{
                              //   textField: {
                              //     helperText: errors.history[index].startDate
                              //       ? errors.history[index].startDate
                              //       : "",
                              //   },
                              // }}
                              name={`history.${index}.startDate`}
                            />
                          </TableCell>
                          <TableCell>
                            <Field
                              component={DatePicker}
                              // slotProps={{
                              //   textField: {
                              //     helperText: errors.suspensionDate
                              //       ? errors.suspensionDate
                              //       : "",
                              //   },
                              // }}
                              name={`history.${index}.suspensionDate`}
                            />
                          </TableCell>
                          <TableCell>
                            <Field
                              component={DatePicker}
                              // slotProps={{
                              //   textField: {
                              //     helperText: errors.restartDate
                              //       ? errors.restartDate
                              //       : "",
                              //   },
                              // }}
                              name={`history.${index}.restartDate`}
                            />
                          </TableCell>
                          <TableCell>
                            <Field
                              name={`history.${index}.reasonForUse`}
                              component={TextField}
                              variant="outlined"
                            />
                          </TableCell>
                          <TableCell>
                            <Field
                              name={`history.${index}.acceptance`}
                              component={TextField}
                              variant="outlined"
                            />
                          </TableCell>
                          <TableCell>
                            <Field
                              name={`history.${index}.administration`}
                              component={TextField}
                              variant="outlined"
                            />
                          </TableCell>
                          <TableCell>
                            <Field
                              name={`history.${index}.difficulties`}
                              component={TextField}
                              variant="outlined"
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TableCell colSpan={3}>
                          <Button
                            startIcon={<AddIcon />}
                            onClick={() => {
                              arrayHelpers.push(emptyHistoryRow);
                            }}
                          >
                            Agregar columna
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableFooter>
                  </Table>
                )}
              </FieldArray>
            </TableContainer>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore,
              sint ratione voluptatem veniam quisquam porro excepturi repellat,
              reprehenderit id dignissimos deleniti quibusdam. Hic beatae
              officia minus adipisci qui voluptate recusandae.
            </p>
            {/* ¿se realizaron examenes de laboratorio u otra prueba diagnostica? si no

examen de laboratorio o prueba diagnostica	fecha	resultado
rango de valor normal	evaluacion/comentarios */}
          </Form>
        )}
      </Formik>
    </div>
  );
}
