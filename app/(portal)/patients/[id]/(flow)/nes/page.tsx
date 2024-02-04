"use client";

import { useAuthApi } from "@/app/(api)/api";
import { Title } from "@/app/(components)/Title";
import { DiseaseCie10 } from "@/app/(portal)/cie10/DiseaseCie10";
import { DrugProduct } from "@/app/(portal)/drugs/pharmaceutical-product/Drug";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Fab,
  Grid,
  ListSubheader,
  MenuItem,
  Typography,
} from "@mui/material";
import {
  ArrayHelpers,
  FastField,
  Field,
  FieldArray,
  Form,
  Formik,
} from "formik";
import { Select, TextField } from "formik-mui";
import { isString } from "lodash";
import { useRouter } from "next/navigation";
import React from "react";
import useSWR from "swr";
import { PI_GROUPS } from "./pi-groups";

import { SnackbarContext } from "@/app/(components)/SnackbarContext";
import { requiredMessage } from "@/app/(components)/helpers/requiredMessage";
import yup from "@/app/validation";
import { DrugEvaluations, emptyEvaluationRow } from "./DrugEvaluations";
import PicoDialog from "./PicoDialog";
import { PicoMedicine } from "./PicoMedicine";
import { drugEvaluationSchema } from "./drugEvaluationSchema";
import { picoSheetsSchema } from "./picoSheetsSchema";

const emptyPharmaceuticInterventionRow = {
  pharmaceuticIntervention: "",
  commentaries: "",
};

export type NesRow = {
  evaluation: string;
  prms: {
    name: string;
    justification: string;
  }[];
};

export type DiagnosisRelated = {
  disease: string | DiseaseCie10;
  symptoms: string;
  drugEvaluations: DrugEvaluation[];
};

export type DiagnosisNotRelated = { symptoms: string } & DrugEvaluation;

export type NesForm = {
  diagnosisRelated: DiagnosisRelated[];
  diagnosisNotRelated: DiagnosisNotRelated[];
  pharmaceuticInterventions: {
    pharmaceuticIntervention: string;
    commentaries: string;
  }[];
  picoSheets: PicoMedicine[];
  interviewDate: Date | null;
};

type DrugEvaluation = {
  medicine: string | DrugProduct;
  necessity: NesRow;
  effectivity: NesRow;
  security: NesRow;
};

// type NesForm = typeof initialValues;

export default function NesPage({ params }: { params: { id: number } }) {
  const { id: patientId } = params;
  const getApi = useAuthApi();
  const router = useRouter();
  const alert = React.useContext(SnackbarContext);

  const { data: anamnesis } = useSWR(`/patients/${patientId}/anamnesis`);
  const { data, mutate } = useSWR(
    anamnesis ? `/patients/${patientId}/nes` : null
  );

  if (!anamnesis) {
    return <div>Complete hoja de anamnesis</div>;
  }

  const initialValues: NesForm = {
    diagnosisRelated: anamnesis.diseases.map((disease: string) => ({
      disease,
      symptoms: "",
      drugEvaluations: [
        {
          ...emptyEvaluationRow,
        },
      ],
    })),
    diagnosisNotRelated: [],
    pharmaceuticInterventions: [
      {
        ...emptyPharmaceuticInterventionRow,
      },
    ],
    picoSheets: [],
    interviewDate: new Date(),
  };

  const formInitialValues: NesForm = data
    ? {
        diagnosisRelated: anamnesis.diseases.map((disease: string) => {
          const diagnosisRow = data.diagnosisRelated.find(
            (x: any) => x.disease === disease
          );

          return diagnosisRow
            ? {
                ...diagnosisRow,
                disease: disease,
              }
            : {
                disease,
                symptoms: "",
                drugEvaluations: [
                  {
                    ...emptyEvaluationRow,
                  },
                ],
              };
        }),
        diagnosisNotRelated: data.diagnosisNotRelated,
        pharmaceuticInterventions: data.pharmaceuticInterventions,
        picoSheets: data.picoSheets,
        interviewDate: data.interviewDate,
      }
    : initialValues;

  return (
    <div>
      <Formik
        initialValues={formInitialValues}
        enableReinitialize
        validationSchema={yup.object({
          diagnosisRelated: yup.array().of(
            yup.object({
              disease: yup.string().required(requiredMessage),
              symptoms: yup.string().required(requiredMessage),
              drugEvaluations: yup
                .array()
                .of(yup.object(drugEvaluationSchema())),
            })
          ),
          diagnosisNotRelated: yup.array().of(
            yup.object({
              symptoms: yup.string().required(requiredMessage),
              ...drugEvaluationSchema(),
            })
          ),
          pharmaceuticInterventions: yup.array().of(
            yup.object({
              pharmaceuticIntervention: yup.string().required(requiredMessage),
              commentaries: yup.string().required(requiredMessage),
            })
          ),
          picoSheets: picoSheetsSchema,
        })}
        onSubmit={async (values) => {
          const data = {
            diagnosisRelated: values.diagnosisRelated.map(
              ({ disease, drugEvaluations, ...rest }) => {
                return {
                  ...rest,
                  disease,
                  drugEvaluations: drugEvaluations.map((drugEvaluation) => {
                    if (isString(drugEvaluation.medicine)) {
                      throw "Medicina inválida";
                    }

                    return {
                      ...drugEvaluation,
                      medicineId: drugEvaluation.medicine.id,
                    };
                  }),
                };
              }
            ),
            diagnosisNotRelated: values.diagnosisNotRelated.map(
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
            pharmaceuticInterventions: values.pharmaceuticInterventions,
            picoSheets: values.picoSheets,
          };
          const response = await getApi().then((api) =>
            api.post(`patients/${patientId}/nes`, data)
          );
          mutate();
          alert.showMessage("Información guardada exitosamente");
          router.push(`/patients/${patientId}/soap`);
        }}
      >
        {({ values }) => (
          <Form>
            <Title date={data?.createDate || new Date()}>
              Para la evaluación y el análisis de datos e identificación del PRM
            </Title>
            <DrugEvaluations diagnosisNotRelated={values.diagnosisNotRelated} />
            <Grid container pt={4}>
              <Grid item xs={10} paddingBottom={2}>
                <Typography variant="h6" pt={2}>
                  Plan de intervención farmaceutica
                </Typography>
              </Grid>
              <FieldArray name="pharmaceuticInterventions">
                {(arrayHelpers: ArrayHelpers) => (
                  <Grid container>
                    {values.pharmaceuticInterventions.map((x, index) => (
                      <Grid container key={index} paddingBottom={2}>
                        {values.pharmaceuticInterventions.length > 1 && (
                          <Grid
                            item
                            xs={12}
                            display="flex"
                            justifyContent="end"
                            paddingBottom={2}
                          >
                            <Fab
                              color="primary"
                              aria-label="delete"
                              onClick={arrayHelpers.handleRemove(index)}
                            >
                              <CloseIcon />
                            </Fab>
                          </Grid>
                        )}
                        <Grid item xs={6} sx={{ paddingRight: "20px" }}>
                          <PiSelect
                            name={`pharmaceuticInterventions.${index}.pharmaceuticIntervention`}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <FastField
                            component={TextField}
                            name={`pharmaceuticInterventions.${index}.commentaries`}
                            label="Comentarios"
                            variant="outlined"
                            multiline
                            rows={4}
                            fullWidth
                          />
                        </Grid>
                      </Grid>
                      // <Box key={index}>Hola</Box>
                    ))}
                    {values.pharmaceuticInterventions.length > 0 && (
                      <div>
                        <Box textAlign="center">
                          <Button
                            startIcon={<AddIcon />}
                            onClick={() =>
                              arrayHelpers.push(
                                emptyPharmaceuticInterventionRow
                              )
                            }
                          >
                            Agregar otra intervención farmaceutica
                          </Button>
                        </Box>
                        <PicoDialog />
                      </div>
                    )}
                  </Grid>
                )}
              </FieldArray>
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

const PiSelect = ({ name }: any) => {
  return (
    <FastField
      component={Select}
      formControl={{ sx: { width: "100%" } }}
      name={name}
      label="Intervenciones Farmaceuticas"
      fullWidth
    >
      <MenuItem value="">
        <em>Ninguno:</em>
      </MenuItem>
      {PI_GROUPS.map((x) => [
        <ListSubheader key={x.group}>{x.group}</ListSubheader>,
        ...x.items.map((item) => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        )),
      ])}
    </FastField>
  );
};
