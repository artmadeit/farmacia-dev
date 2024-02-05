"use client";

import AddIcon from "@mui/icons-material/Add";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import {
  ArrayHelpers,
  FastField,
  Field,
  FieldArray,
  Form,
  Formik,
  useFormikContext,
} from "formik";
import { TextField } from "formik-mui";
import React, { useState } from "react";
import {
  NesTableCells,
  emptyDrugNesEvaluation,
  nesTableCellsHead2,
  nesTableCellsHead3,
} from "./table";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { NesForm } from "./page";
import DeleteIcon from "@mui/icons-material/Delete";
import { AsyncAutocomplete } from "@/app/(components)/autocomplete";
import { useAuthApi } from "@/app/(api)/api";
import { Page } from "@/app/(api)/pagination";
import { DiseaseCie10 } from "@/app/(portal)/cie10/DiseaseCie10";
import { GridExpandMoreIcon } from "@mui/x-data-grid";

export const DrugEvaluations = ({
  diagnosisNotRelated,
  enableDelete = false,
}: {
  diagnosisNotRelated: any;
  enableDelete?: boolean;
}) => (
  <>
    <Typography variant="h6" pt={4} pb={2}>
      Evaluación de medicamentos relacionados al diagnóstico
    </Typography>
    <DiagnosisTable enableDelete={enableDelete} />
    <Typography variant="h6" pt={4} pb={2}>
      Evaluación de signos y síntomas que no se relacionan con el diagnóstico
    </Typography>
    <EvaluationNesTable
      values={diagnosisNotRelated}
      name="diagnosisNotRelated"
    />
  </>
);

export const emptyEvaluationRow = {
  symptoms: "",
  ...emptyDrugNesEvaluation,
};

const DiagnosisTable = ({ enableDelete = false }) => {
  const { values } = useFormikContext<NesForm>();
  const [open, setOpen] = useState(false);
  const getApi = useAuthApi();

  const searchDiseases = (searchText: string) =>
    getApi().then((api) =>
      api
        .get<Page<DiseaseCie10>>(
          "/diseases/search/findByNameContainingIgnoringCase",
          {
            params: { searchText },
          }
        )
        .then((x) => x.data._embedded.diseases)
    );

  const initialValues: {
    disease: null | DiseaseCie10;
  } = {
    disease: null,
  };
  return (
    <FieldArray name="diagnosisRelated">
      {(arrayHelpers: ArrayHelpers) => (
        <>
          <Dialog
            open={open}
            onClose={() => setOpen(false)}
            fullWidth
            maxWidth="md"
          >
            <Formik
              initialValues={initialValues}
              onSubmit={(values) => {
                arrayHelpers.insert(0, {
                  disease: values.disease?.name || values.disease,
                  symptoms: "",
                  drugEvaluations: [],
                });
                setOpen(false);
              }}
            >
              <Form>
                <DialogContent>
                  <AsyncAutocomplete
                    label="Diagnóstico"
                    name={`disease`}
                    filter={searchDiseases}
                  />
                </DialogContent>
                <DialogActions sx={{ padding: "20px 24px" }}>
                  <Button variant="contained" type="submit">
                    Guardar
                  </Button>
                </DialogActions>
              </Form>
            </Formik>
          </Dialog>
          {enableDelete && (
            <Button startIcon={<AddIcon />} onClick={() => setOpen(true)}>
              Agregar enfermedad
            </Button>
          )}
          <Stack spacing={2}>
            {values.diagnosisRelated.map((x, index) => (
              <Box key={index} component={Paper}>
                <Grid container spacing={2} padding={2}>
                  <Grid xs={6}>
                    <FastField
                      label="Diagnóstico"
                      component={TextField}
                      fullWidth
                      name={`diagnosisRelated.${index}.disease`}
                      disabled
                    />
                  </Grid>
                  <Grid sx={{ display: "flex" }} xs={6}>
                    <FastField
                      component={TextField}
                      fullWidth
                      name={`diagnosisRelated.${index}.symptoms`}
                      label="Signos y sintomas que se relacionan con el diagnóstico"
                      multiline
                      rows={4}
                    />
                    {enableDelete && (
                      <IconButton
                        aria-label="delete"
                        onClick={arrayHelpers.handleRemove(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </Grid>
                </Grid>
                <Accordion defaultExpanded elevation={0}>
                  <AccordionSummary
                    expandIcon={<GridExpandMoreIcon />}
                    aria-controls="panel3-content"
                    id="panel3-header"
                  >
                    Medicamentos
                  </AccordionSummary>
                  <AccordionDetails>
                    <TableContainer sx={{ pt: 0, overflowX: "hidden" }}>
                      <Table>
                        <TableBody>
                          <TableRow>
                            <TableCell colSpan={3}>
                              <EvaluationNesTable
                                values={
                                  values.diagnosisRelated[index].drugEvaluations
                                }
                                name={`diagnosisRelated.${index}.drugEvaluations`}
                              />
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </AccordionDetails>
                </Accordion>
              </Box>
            ))}
          </Stack>
        </>
      )}
    </FieldArray>
  );
};

const EvaluationNesTable = ({ name, values }: { name: any; values: any[] }) => {
  return (
    <TableContainer component={Paper} elevation={0}>
      <FieldArray name={name}>
        {(arrayHelpers: ArrayHelpers) => (
          <Table size="small">
            <TableHead>
              {/* <TableRow>
                {name === "diagnosisNotRelated" && (
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Evaluación de datos de salud
                  </TableCell>
                )}
                {nesTableCellsHead1}
              </TableRow> */}
              <TableRow>
                {name === "diagnosisNotRelated" && (
                  <TableCell rowSpan={2} sx={{ minWidth: 300 }}>
                    Signos y sintomas que no se relacionan con el diagnóstico
                  </TableCell>
                )}
                {nesTableCellsHead2}
              </TableRow>
              <TableRow>{nesTableCellsHead3}</TableRow>
            </TableHead>
            <TableBody>
              {values.map((x, index) => (
                <TableRow key={index}>
                  {name === "diagnosisNotRelated" && (
                    <TableCell sx={{ verticalAlign: "top" }}>
                      <Field
                        component={TextField}
                        fullWidth
                        name={`${name}.${index}.symptoms`}
                        label="Sintomas"
                        multiline
                        rows={4}
                      />
                    </TableCell>
                  )}
                  <NesTableCells
                    name={name}
                    index={index}
                    values={x}
                    onRemove={arrayHelpers.handleRemove(index)}
                  />
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={4} sx={{ border: "none" }}>
                  <Button
                    startIcon={<AddIcon />}
                    onClick={() => arrayHelpers.push(emptyEvaluationRow)}
                  >
                    Agregar medicamento
                  </Button>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        )}
      </FieldArray>
    </TableContainer>
  );
};
