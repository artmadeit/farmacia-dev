"use client";

import {
  Button,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import { ArrayHelpers, Field, FieldArray, Form, Formik } from "formik";
import { TextField } from "formik-mui";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { DatePicker } from "formik-mui-x-date-pickers";

const emptyTestingRow = {
  diagnosis: "",
  symptoms: "",
  medicine: "",
  prm: "",
};

export default function NesPage() {
  return (
    <div>
      {/* <Typography variant="h6" style={{ paddingBottom: "10px" }}>
        PARA LA EVALUACIÓN Y EL ANÁLISIS DE DATOS E IDENTIFICACIÓN DEL PRM.
      </Typography> */}
      <Formik
        initialValues={{
          testing: [
            {
              ...emptyTestingRow,
            },
          ],
        }}
        onSubmit={() => {}}
      >
        {({ values }) => (
          <Form>
            <Grid container>
              <Grid
                xs={8}
                style={{
                  marginBottom: "10px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <strong>
                  PARA LA EVALUACIÓN Y EL ANÁLISIS DE DATOS E IDENTIFICACIÓN DEL
                  PRM.
                </strong>
              </Grid>
              <Grid
                xs={4}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                sx={{ pb: 1 }}
              >
                <span style={{ fontSize: "14px" }}> FECHA DEL ANÁLISIS:</span>
                {/* <Field component={DatePicker} sx={{ width: "180px" }} /> */}
              </Grid>
            </Grid>

            <TableContainer component={Paper}>
              <FieldArray name="testing">
                {(arrayHelpers: ArrayHelpers) => (
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: "bold" }}>
                          Datos de Salud
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>
                          Evaluación de datos de salud
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>
                          Datos de farmacoterapia
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold" }} colSpan={3}>
                          Evaluación de datos de farmacoterapia
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>
                          PRM identificado
                        </TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell rowSpan={2}>Diagnóstico(s)</TableCell>
                        <TableCell rowSpan={2}>
                          Signos y sintomas que se relacionan con el Dx
                        </TableCell>
                        <TableCell rowSpan={2}>
                          Medicamentos que consume el paciente
                        </TableCell>
                        <TableCell colSpan={3}>
                          Evaluar c/u de los medicamentos si son:
                          {/* <span style={{ fontWeight: "bold" }}>NES</span> */}
                        </TableCell>
                        <TableCell rowSpan={2}>
                          De acuerdo a la evaluación realizada determinar el o
                          los PRM identificados en el paciente
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>N</TableCell>
                        <TableCell>E</TableCell>
                        <TableCell>S</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {values.testing.map((x, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <Field
                              component={TextField}
                              name={`testing.${index}.diagnosis`}
                              label="Diagnostico"
                            />
                          </TableCell>
                          <TableCell>
                            <Field
                              component={TextField}
                              name={`testing.${index}.symptoms`}
                              label="Sintomas"
                            />
                          </TableCell>
                          <TableCell>
                            <Field
                              component={TextField}
                              name={`.${index}.medicine`}
                              label="Medicina"
                            />
                          </TableCell>
                          <TableCell>Si y No</TableCell>
                          <TableCell>Si y No</TableCell>
                          <TableCell>Si y No</TableCell>
                          {/* <TableCell>
                      <Field component={TextField} name="nes" label="NES" />
                    </TableCell> */}
                          <TableCell>
                            <Field
                              component={TextField}
                              name={`testing.${index}.prm`}
                              label="PRM identificado"
                            />
                          </TableCell>
                          <TableCell>
                            <Tooltip title="Eliminar">
                              <IconButton
                                aria-label="delete"
                                onClick={() => arrayHelpers.remove(index)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TableCell colSpan={3}>
                          <Button
                            startIcon={<AddIcon />}
                            onClick={() => arrayHelpers.push(emptyTestingRow)}
                          >
                            Agrega Columna
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableFooter>
                  </Table>
                )}
              </FieldArray>
            </TableContainer>
          </Form>
        )}
      </Formik>
    </div>
  );
}
