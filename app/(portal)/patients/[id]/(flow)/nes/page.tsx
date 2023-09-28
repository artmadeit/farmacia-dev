"use client";

import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-mui";

export default function NesPage() {
  return (
    <div>
      {/* <Typography variant="h6" style={{ paddingBottom: "10px" }}>
        PARA LA EVALUACIÓN Y EL ANÁLISIS DE DATOS E IDENTIFICACIÓN DEL PRM.
      </Typography> */}
      <Formik
        initialValues={{
          name: "",
          symptoms: "",
          medicine: "",
          nes: "",
          prm: "",
        }}
        onSubmit={() => {}}
      >
        {({ values }) => (
          <Form>
            <Grid container>
              <Grid xs={10} style={{ marginBottom: "10px" }}>
                <strong>
                  PARA LA EVALUACIÓN Y EL ANÁLISIS DE DATOS E IDENTIFICACIÓN DEL
                  PRM.
                </strong>
              </Grid>
            </Grid>
            <TableContainer component={Paper}>
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
                    <TableCell sx={{ fontWeight: "bold" }}>
                      Evaluación de datos de farmacoterapia
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      PRM identificado
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableHead>
                  <TableRow>
                    <TableCell>Diagnóstico(s)</TableCell>
                    <TableCell>
                      Signos y sintomas que se relacionan con el Dx
                    </TableCell>
                    <TableCell>Medicamentos que consume el paciente</TableCell>
                    <TableCell>
                      Evaluar c/u de los medicamentos si son:{" "}
                      <span style={{ fontWeight: "bold" }}>NES</span>
                    </TableCell>
                    <TableCell>
                      De acuerdo a la evaluación realizada determinar el o los
                      PRM identificados en el paciente
                    </TableCell>
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
                    <TableCell>
                      <Field component={TextField} name="nes" label="NES" />
                    </TableCell>
                    <TableCell>
                      <Field
                        component={TextField}
                        name="prm"
                        label="PRM identificado"
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Form>
        )}
      </Formik>
    </div>
  );
}
