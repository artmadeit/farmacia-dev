"use client";

import {
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
} from "@mui/material";
import { ArrayHelpers, Field, FieldArray, Form, Formik } from "formik";
import { TextField } from "formik-mui";
import AddIcon from "@mui/icons-material/Add";
import { DatePicker } from "formik-mui-x-date-pickers";

const emptyTestRow = {
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
          test: [
            {
              ...emptyTestRow,
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
              <FieldArray name="">
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
                      <TableRow>
                        <TableCell>
                          <Field
                            component={TextField}
                            name="diagnosis"
                            label="Diagnostico"
                          />
                        </TableCell>
                        <TableCell>
                          <Field
                            component={TextField}
                            name="symptoms"
                            label="Sintomas"
                          />
                        </TableCell>
                        <TableCell>
                          <Field
                            component={TextField}
                            name="medicine"
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
                            name="prm"
                            label="PRM identificado"
                          />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TableCell colSpan={3}>
                          <Button
                            startIcon={<AddIcon />}
                            onClick={() => arrayHelpers.push(emptyTestRow)}
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
