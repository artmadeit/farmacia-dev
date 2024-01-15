"use client";

import AddIcon from "@mui/icons-material/Add";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Paper,
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

import { NesForm } from "./page";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { AsyncAutocomplete } from "@/app/(components)/autocomplete";
import { useAuthApi } from "@/app/(api)/api";
import { SpringPage } from "@/app/(api)/pagination";
import { DrugProduct } from "@/app/(portal)/drugs/pharmaceutical-product/Drug";

export const DrugEvaluations = ({
  diagnosisNotRelated,
  enableDelete = false,
}: {
  diagnosisNotRelated: any;
  enableDelete?: boolean;
}) => (
  <>
    <Typography variant="h6" pt={4}>
      Evaluación de medicamentos relacionados al diagnóstico
    </Typography>
    <DiagnosisTable enableDelete={enableDelete} />
    <Typography variant="h6" pt={4}>
      Evaluación de medicamentos que no se relacionan con el diagnóstico
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

  const searchDrugs = (searchText: string) =>
    getApi().then((api) =>
      api
        .get<SpringPage<DrugProduct>>("drugs", {
          params: { page: 0, searchText },
        })
        .then((x) => x.data.content)
    );

  const initialValues: {
    disease: null | {
      fullName: string;
    };
  } = {
    disease: null,
  };
  return (
    <TableContainer component={Paper} sx={{ pt: 2 }}>
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
                    disease: values.disease?.fullName,
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
                      getLabel={(option) => option.fullName}
                      filter={searchDrugs}
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
            <Button startIcon={<AddIcon />} onClick={() => setOpen(true)}>
              Agregar enfermedad
            </Button>
            <Table>
              <TableBody>
                {values.diagnosisRelated.map((x, index) => (
                  <React.Fragment key={index}>
                    <TableRow>
                      <TableCell sx={{ verticalAlign: "top" }}>
                        <FastField
                          label="Diagnóstico"
                          component={TextField}
                          fullWidth
                          name={`diagnosisRelated.${index}.disease`}
                          disabled
                        />
                      </TableCell>
                      <TableCell sx={{ verticalAlign: "top" }}>
                        <FastField
                          component={TextField}
                          fullWidth
                          name={`diagnosisRelated.${index}.symptoms`}
                          label="Signos y sintomas que se relacionan con el diagnóstico"
                          multiline
                          rows={4}
                        />
                      </TableCell>
                      <TableCell sx={{ maxWidth: 20, verticalAlign: "top" }}>
                        {enableDelete && (
                          <IconButton
                            aria-label="delete"
                            onClick={arrayHelpers.handleRemove(index)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        )}
                      </TableCell>
                    </TableRow>
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
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </>
        )}
      </FieldArray>
    </TableContainer>
  );
};

const EvaluationNesTable = ({ name, values }: { name: any; values: any[] }) => {
  return (
    <TableContainer component={Paper} sx={{ pt: 2 }}>
      <FieldArray name={name}>
        {(arrayHelpers: ArrayHelpers) => (
          <Table>
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
                <TableCell colSpan={3}>
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
