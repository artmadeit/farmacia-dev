"use client";

import { Title } from "@/app/(components)/Title";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Fab,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
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
import { TextField } from "formik-mui";
import {
  NesTableCells,
  emptyDrugNesEvaluation,
  nesTableCellsHead1,
  nesTableCellsHead2,
  nesTableCellsHead3,
} from "../../nes/table";
import { PharmacotherapyTable } from "../../pharmacotherapy/PharmacotherapyTable";
import { emptyHistoryRow } from "../../pharmacotherapy/emptyHistoryRow";
import useSWR from "swr";

const emptySoapRow = {
  problem: "",
  subjective: "",
  objective: "",
  analysis: "",
  plan: "",
};

const emptyInitialValues = {
  history: [{ ...emptyHistoryRow }],
  drugEvaluations: [{ ...emptyDrugNesEvaluation }],
  soapRows: [{ ...emptySoapRow }],
};

type TrackingSheet = typeof emptyInitialValues;

export default function CreateTrackingSheet({
  params,
}: {
  params: { id: number };
}) {
  const { id: patientId } = params;

  const { data: lastInterview } = useSWR<TrackingSheet>(
    patientId ? `/patients/${patientId}/soap/last` : null
  );
  const initialValues = lastInterview || emptyInitialValues;

  return (
    <div>
      <Title date={new Date()}>Hoja de seguimiento</Title>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={() => {}}
      >
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
              <Grid xs={12}>
                <Typography variant="h5">SOAP</Typography>
              </Grid>
              <Grid xs={12} container>
                <FieldArray name="soapRows">
                  {(arrayHelpers: ArrayHelpers) => (
                    <Grid xs={12} container spacing={1}>
                      {values.soapRows.map((x, index) => (
                        <Grid xs={12} container spacing={1} key={index}>
                          {values.soapRows.length > 1 && (
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
                          <Grid xs={12}>
                            <Field
                              component={TextField}
                              name={`soapRows.${index}.problem`}
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
                              name={`soapRows.${index}.subjective`}
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
                              name={`soapRows.${index}.objective`}
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
                              name={`soapRows.${index}.analysis`}
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
                              name={`soapRows.${index}.plan`}
                              label="Plan"
                              variant="outlined"
                              fullWidth
                            />
                          </Grid>
                        </Grid>
                      ))}
                      <Grid xs={12}>
                        <Button
                          startIcon={<AddIcon />}
                          onClick={() => {
                            arrayHelpers.push(emptySoapRow);
                          }}
                        >
                          Agregar otra fila
                        </Button>
                      </Grid>
                    </Grid>
                  )}
                </FieldArray>
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
