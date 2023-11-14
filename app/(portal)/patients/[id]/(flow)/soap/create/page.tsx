"use client";

import { useAuthApi } from "@/app/(api)/api";
import { InexactDateType } from "@/app/(components)/InexactDatePicker";
import { Title } from "@/app/(components)/Title";
import { requiredMessage } from "@/app/(components)/helpers/requiredMessage";
import { DrugProduct } from "@/app/(portal)/drugs/pharmaceutical-product/Drug";
import yup from "@/app/validation";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
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
import { isString } from "lodash";
import { useRouter } from "next/navigation";
import React from "react";
import useSWR from "swr";
import { PicoMedicine } from "../../nes/PicoMedicine";
import ClinicalQuestionDialog from "../../nes/clinicalQuestionDialog";
import { drugEvaluationSchema, emptyPicoRow } from "../../nes/page";
import { picoSheetsSchema } from "../../nes/picoSheetsSchema";
import {
  NesTableCells,
  emptyDrugNesEvaluation,
  nesTableCellsHead1,
  nesTableCellsHead2,
  nesTableCellsHead3,
} from "../../nes/table";
import { PharmacotherapyTable } from "../../pharmacotherapy/PharmacotherapyTable";
import { emptyHistoryRow } from "../../pharmacotherapy/emptyHistoryRow";
import { historySchema } from "../../pharmacotherapy/historySchema";
import { DrugTest } from "./DrugTest";

const emptySoapRow = {
  problem: "",
  subjective: "",
  objective: "",
  analysis: "",
  plan: "",
};

// type TrackingSheet = typeof emptyInitialValues;
type TrackingSheet = {
  history: {
    administration: string;
    difficulty: string;
    difficultyJustification: string;
    acceptance: string;
    reasonForUse: string;
    restartDate: InexactDateType;
    startDate: InexactDateType;
    suspensionDate: InexactDateType;
    dose: string;
    mode: string;
    drug: string | DrugProduct;
  }[];
  drugEvaluations: {
    medicine: string | DrugProduct;
    necessity: DrugTest;
    effectivity: DrugTest;
    security: DrugTest;
  }[];
  soapRows: {
    problem: string;
    subjective: string;
    objective: string;
    analysis: string;
    plan: string;
  }[];
  picoSheets: PicoMedicine[];
};

const emptyInitialValues: TrackingSheet = {
  history: [{ ...emptyHistoryRow }],
  drugEvaluations: [{ ...emptyDrugNesEvaluation }],
  soapRows: [{ ...emptySoapRow }],
  picoSheets: [],
};
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
  const [open, setOpen] = React.useState(false);
  const getApi = useAuthApi();
  const router = useRouter();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Title date={new Date()}>Hoja de seguimiento</Title>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={yup.object({
          history: historySchema,
          drugEvaluations: yup.array().of(yup.object(drugEvaluationSchema())),
          soapRows: yup.array().of(
            yup.object({
              problem: yup.string().required(requiredMessage),
              subjective: yup.string().required(requiredMessage),
              objective: yup.string().required(requiredMessage),
              analysis: yup.string().required(requiredMessage),
              plan: yup.string().required(requiredMessage),
            })
          ),
          picoSheets: picoSheetsSchema,
        })}
        onSubmit={async (values) => {
          const data = {
            history: values.history.map(({ drug, ...rest }) => {
              if (isString(drug)) {
                throw "Medicina inválida";
              }

              return {
                ...rest,
                drugId: drug.id,
              };
            }),
            drugEvaluations: values.drugEvaluations.map(
              ({ medicine, ...rest }) => {
                if (isString(medicine)) {
                  throw "Medicina inválida";
                }

                return {
                  ...rest,
                  medicineId: medicine.id,
                };
              }
            ),
            soapRows: values.soapRows,
            picoSheets: values.picoSheets,
            patientId: patientId,
          };
          const response = getApi().then((api) => api.post("soap", data));
          router.push(`/patients/${patientId}/soap`);
        }}
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
                      <div>
                        <Box sx={{ mt: 2 }}>
                          <Button
                            startIcon={<AddIcon />}
                            onClick={() => {
                              arrayHelpers.push(emptySoapRow);
                            }}
                          >
                            Agregar otra fila
                          </Button>
                        </Box>
                        <ClinicalQuestionDialog />
                      </div>
                    </Grid>
                  )}
                </FieldArray>
              </Grid>
            </Grid>
            <Box
              display="flex"
              justifyContent="flex-end"
              sx={{ marginTop: "10px" }}
            >
              <Button variant="contained" type="submit">
                Guardar
              </Button>
            </Box>
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
