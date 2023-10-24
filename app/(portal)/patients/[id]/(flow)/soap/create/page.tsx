"use client";

import { Title } from "@/app/(components)/Title";
import {
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import {
  ArrayHelpers,
  Field,
  FieldArray,
  Form,
  Formik,
  useFormikContext,
} from "formik";
import { PharmacotherapyTable } from "../../pharmacotherapy/PharmacotherapyTable";
import { emptyHistoryRow } from "../../pharmacotherapy/emptyHistoryRow";
import { TextField } from "formik-mui";
import {
  NesTableCells,
  emptyDrugNesEvaluation,
  nesTableCellsHead1,
  nesTableCellsHead2,
  nesTableCellsHead3,
} from "../../nes/table";
import AddIcon from "@mui/icons-material/Add";

const initialValues = {
  history: [{ ...emptyHistoryRow }],
  drugEvaluations: [{ ...emptyDrugNesEvaluation }],
  problem: "",
  subjective: "",
  objective: "",
  analysis: "",
  plan: "",
};

type TrackingSheet = typeof initialValues;

export default function CreateTrackingSheet() {
  return (
    <div>
      <Title>Hoja de seguimiento</Title>
      <Divider />
      <Formik initialValues={initialValues} onSubmit={() => {}}>
        {({ values, errors }) => (
          <Form>
            <Grid container spacing={4}>
              <Grid xs={10} pt={4}>
                <strong>Farmacoterapia (P) Prescrito (A) Automedicado </strong>
              </Grid>
              <Grid xs={12}>
                <PharmacotherapyTable name="history" values={values} />
              </Grid>
              <Grid xs={12}>
                <NesTable />
              </Grid>
              <Grid xs={12} container spacing={1}>
                <Grid xs={12}>
                  <Field
                    component={TextField}
                    name="problem"
                    label="Problema"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid xs={1} alignItems="center" display="flex">
                  S
                </Grid>
                <Grid xs={11}>
                  <Field
                    component={TextField}
                    name="subjective"
                    label="Subjetivo"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid xs={1} alignItems="center" display="flex">
                  O
                </Grid>
                <Grid xs={11}>
                  <Field
                    component={TextField}
                    name="objective"
                    label="Objetivo"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid xs={1} alignItems="center" display="flex">
                  A
                </Grid>
                <Grid xs={11}>
                  <Field
                    component={TextField}
                    name="analysis"
                    label="Análisis"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid xs={1} alignItems="center" display="flex">
                  P
                </Grid>
                <Grid xs={11}>
                  <Field
                    component={TextField}
                    name="plan"
                    label="Plan"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </div>
  );
}

const NesTable = () => {
  const { values } = useFormikContext<TrackingSheet>();
  const name = "drugEvaluations";
  return (
    <FieldArray name={name}>
      {(arrayHelpers: ArrayHelpers) => (
        <Table>
          <TableHead>
            <TableRow>{nesTableCellsHead1}</TableRow>
            <TableRow>{nesTableCellsHead2}</TableRow>
            <TableRow>{nesTableCellsHead3}</TableRow>
          </TableHead>
          <TableBody>
            {values[name].map((x, index) => (
              <TableRow key={index}>
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
                  onClick={() => arrayHelpers.push(emptyDrugNesEvaluation)}
                >
                  Agregar fila
                </Button>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      )}
    </FieldArray>
  );
};
