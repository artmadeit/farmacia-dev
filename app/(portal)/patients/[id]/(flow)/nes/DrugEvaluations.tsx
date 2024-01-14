"use client";

import AddIcon from "@mui/icons-material/Add";
import {
  Button,
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
  useFormikContext,
} from "formik";
import { TextField } from "formik-mui";
import React from "react";
import {
  NesTableCells,
  emptyDrugNesEvaluation,
  nesTableCellsHead2,
  nesTableCellsHead3,
} from "./table";

import { NesForm } from "./page";

export const DrugEvaluations = ({
  diagnosisNotRelated,
}: {
  diagnosisNotRelated: any;
}) => (
  <>
    <Typography variant="h6" pt={4}>
      Evaluación de medicamentos relacionados al diagnóstico
    </Typography>
    <DiagnosisTable />
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

const DiagnosisTable = () => {
  const { values } = useFormikContext<NesForm>();

  return (
    <TableContainer component={Paper} sx={{ pt: 2 }}>
      <FieldArray name="diagnosis">
        {(arrayHelpers: ArrayHelpers) => (
          <Table>
            {/* <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Datos de Salud
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Evaluación de datos de salud
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell rowSpan={2} sx={{ minWidth: 300 }}>
                  Diagnóstico(s)
                </TableCell>
                <TableCell rowSpan={2} sx={{ minWidth: 300 }}>
                  Signos y sintomas que se relacionan con el diagnóstico
                </TableCell>
              </TableRow>
            </TableHead> */}
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
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2}>
                      <EvaluationNesTable
                        values={values.diagnosisRelated[index].drugEvaluations}
                        name={`diagnosisRelated.${index}.drugEvaluations`}
                      />
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
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
