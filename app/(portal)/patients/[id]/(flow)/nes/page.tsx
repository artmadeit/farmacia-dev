"use client";

import { formatDate } from "@/app/date";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Fab,
  Grid,
  ListSubheader,
  MenuItem,
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
import {
  ArrayHelpers,
  Field,
  FieldArray,
  Form,
  Formik,
  useFormikContext,
} from "formik";
import { Select, TextField } from "formik-mui";
import { PI_GROUPS } from "./pi-groups";
import {
  NesTableCells,
  nesTableCellsHead1,
  nesTableCellsHead2,
  nesTableCellsHead3,
  emptyDrugNesEvaluation,
} from "./table";
import { DrugProduct } from "@/app/(portal)/drugs/pharmaceutical-product/Drug";
import { isString } from "lodash";
import { DiseaseCie10 } from "@/app/(portal)/cie10/DiseaseCie10";
import { AsyncAutocomplete } from "@/app/(components)/autocomplete";
import { useAuthApi } from "@/app/(api)/api";
import { Page } from "@/app/(api)/pagination";
import { useRouter } from "next/navigation";
import { Title } from "@/app/(components)/Title";
import useSWR from "swr";
import React from "react";
import { PicoRow } from "./PicoRow";

const emptyEvaluationRow = {
  diagnosis: "",
  symptoms: "",
  ...emptyDrugNesEvaluation,
};

const emptyPharmaceuticInterventionRow = {
  pharmaceuticIntervention: "",
  commentaries: "",
};

const emptyPicoRow = {
  patient: {
    spanish: "",
    english: "",
    meshTerm: "",
  },
  intervention: {
    spanish: "",
    english: "",
    meshTerm: "",
  },
  comparison: {
    spanish: "",
    english: "",
    meshTerm: "",
  },
  outcome: {
    spanish: "",
    english: "",
    meshTerm: "",
  },
  clinicalQ: "",
  strategy: "",
};

type NesForm = {
  diagnosis: {
    diagnosis: string | DiseaseCie10;
    symptoms: string;
  }[];
  diagnosisRelated: {
    medicine: string | DrugProduct;
    necessity: {
      evaluation: string;
      justification: string;
      prm: string;
    };
    effectivity: {
      evaluation: string;
      justification: string;
      prm: string;
    };
    security: {
      evaluation: string;
      justification: string;
      prm: string;
    };
    diagnosis: string | DiseaseCie10;
  }[];
  diagnosisNotRelated: {
    medicine: string | DrugProduct;
    necessity: {
      evaluation: string;
      justification: string;
      prm: string;
    };
    effectivity: {
      evaluation: string;
      justification: string;
      prm: string;
    };
    security: {
      evaluation: string;
      justification: string;
      prm: string;
    };
    symptoms: string;
  }[];
  pharmaceuticInterventions: {
    pharmaceuticIntervention: string;
    commentaries: string;
  }[];
  pico: {
    patient: PicoRow;
    intervention: PicoRow;
    comparison: PicoRow;
    outcome: PicoRow;
    clinicalQ: string;
    strategy: string;
  }[];
};

// type NesForm = typeof initialValues;

export default function NesPage({ params }: { params: { id: number } }) {
  const { id: patientId } = params;
  const getApi = useAuthApi();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const { data: anamnesis } = useSWR(`/patients/${patientId}/anamnesis`);
  const { data, mutate } = useSWR(
    anamnesis ? `/patients/${patientId}/nes` : null
  );

  if (!anamnesis) {
    return <div>Complete hoja de anamnesis</div>;
  }

  const initialValues: NesForm = {
    diagnosis: anamnesis.diseases.map((disease: any) => ({
      disease,
      symptoms: "",
    })),
    diagnosisRelated: [
      {
        ...emptyEvaluationRow,
      },
    ],
    diagnosisNotRelated: [
      {
        ...emptyEvaluationRow,
      },
    ],
    pharmaceuticInterventions: [
      {
        ...emptyPharmaceuticInterventionRow,
      },
    ],
    pico: [
      {
        ...emptyPicoRow,
      },
    ],
  };

  const formInitialValues: NesForm = data
    ? {
        diagnosis: data.diagnosis,
        diagnosisRelated: data.diagnosisRelated.map((diagnosisR: any) => {
          return {
            ...diagnosisR,
            diagnosis: diagnosisR.disease,
          };
        }),
        diagnosisNotRelated: data.diagnosisNotRelated,
        pharmaceuticInterventions: data.pharmaceuticInterventions,
        pico: data.pico,
      }
    : initialValues;

  return (
    <div>
      <Title date={new Date()}>
        Para la evaluación y el análisis de datos e identificación del PRM
      </Title>
      <Formik
        initialValues={formInitialValues}
        enableReinitialize
        onSubmit={async (values) => {
          const data = {
            diagnosisRelated: values.diagnosisRelated.map(
              ({ medicine, diagnosis, ...rest }) => {
                if (isString(medicine)) {
                  throw "Medicina inválida";
                }

                if (isString(diagnosis)) {
                  throw "Diagnóstico inválido";
                }

                return {
                  ...rest,
                  diseaseId: diagnosis.id,
                  medicineId: medicine.id,
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
          };
          const response = getApi().then((api) =>
            api.post(`patients/${patientId}/nes`, data)
          );

          router.push(`/patients/${patientId}/soap`);
        }}
      >
        {({ values }) => (
          <Form>
            <DiagnosisTable />
            <EvaluationNesTable name="diagnosisRelated" anamnesis={anamnesis} />
            <EvaluationNesTable
              name="diagnosisNotRelated"
              anamnesis={anamnesis}
            />
            <Grid container pt={4}>
              <Grid xs={10} paddingBottom={2}>
                <strong>Plan de intervención farmaceutica</strong>
              </Grid>
              <FieldArray name="pharmaceuticInterventions">
                {(arrayHelpers: ArrayHelpers) => (
                  <Grid container>
                    {values.pharmaceuticInterventions.map((x, index) => (
                      <Grid container key={index} paddingBottom={2}>
                        {values.pharmaceuticInterventions.length > 1 && (
                          <Grid
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
                          <Field
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
                        <Box sx={{ mt: 2 }}>
                          <Button
                            startIcon={<AddIcon />}
                            onClick={() => setOpen(true)}
                          >
                            Agregar pico
                          </Button>
                        </Box>
                      </div>
                    )}
                    <Dialog open={open} onClose={handleClose}>
                      <DialogTitle>PREGUNTA CLINÍCA:</DialogTitle>
                      <DialogContent>
                        <FieldArray name="pico">
                          {(arrayHelpers: ArrayHelpers) => (
                            <>
                              {values.pico.map((x, index) => (
                                <>
                                  {values.pico.length > 1 && (
                                    <Grid
                                      xs={12}
                                      display="flex"
                                      justifyContent="end"
                                    >
                                      <Tooltip title="Eliminar">
                                        <Fab
                                          aria-label="delete"
                                          sx={{ margin: "10px 0px" }}
                                          color="primary"
                                          onClick={arrayHelpers.handleRemove(
                                            index
                                          )}
                                        >
                                          <CloseIcon />
                                        </Fab>
                                      </Tooltip>
                                    </Grid>
                                  )}

                                  <TableContainer component={Paper}>
                                    <Table>
                                      <TableHead>
                                        <TableRow>
                                          <TableCell></TableCell>
                                          <TableCell>Español</TableCell>
                                          <TableCell>Inglés</TableCell>
                                          <TableCell>Término Mesh</TableCell>
                                        </TableRow>
                                      </TableHead>
                                      <TableBody>
                                        <React.Fragment key={index}>
                                          <TableRow>
                                            <TableCell>P</TableCell>
                                            <TableCell>
                                              <Field
                                                component={TextField}
                                                name={`pico.${index}.patient.spanish`}
                                                variant="outlined"
                                              />
                                            </TableCell>
                                            <TableCell>
                                              <Field
                                                component={TextField}
                                                name="pi"
                                                variant="outlined"
                                              />
                                            </TableCell>
                                            <TableCell>
                                              <Field
                                                component={TextField}
                                                name="pm"
                                                variant="outlined"
                                              />
                                            </TableCell>
                                          </TableRow>
                                          <TableRow>
                                            <TableCell>I</TableCell>
                                            <TableCell>
                                              <Field
                                                component={TextField}
                                                name="ie"
                                                variant="outlined"
                                              />
                                            </TableCell>
                                            <TableCell>
                                              <Field
                                                component={TextField}
                                                name="ii"
                                                variant="outlined"
                                              />
                                            </TableCell>
                                            <TableCell>
                                              <Field
                                                component={TextField}
                                                name="im"
                                                variant="outlined"
                                              />
                                            </TableCell>
                                          </TableRow>
                                          <TableRow>
                                            <TableCell>C</TableCell>
                                            <TableCell>
                                              <Field
                                                component={TextField}
                                                name="ce"
                                                variant="outlined"
                                              />
                                            </TableCell>
                                            <TableCell>
                                              <Field
                                                component={TextField}
                                                name="ci"
                                                variant="outlined"
                                              />
                                            </TableCell>
                                            <TableCell>
                                              <Field
                                                component={TextField}
                                                name="cm"
                                                variant="outlined"
                                              />
                                            </TableCell>
                                          </TableRow>
                                          <TableRow>
                                            <TableCell>O</TableCell>
                                            <TableCell>
                                              <Field
                                                component={TextField}
                                                name="oe"
                                                variant="outlined"
                                              />
                                            </TableCell>
                                            <TableCell>
                                              <Field
                                                component={TextField}
                                                name="oi"
                                                variant="outlined"
                                              />
                                            </TableCell>
                                            <TableCell>
                                              <Field
                                                component={TextField}
                                                name="om"
                                                variant="outlined"
                                              />
                                            </TableCell>
                                          </TableRow>
                                        </React.Fragment>
                                      </TableBody>
                                    </Table>
                                  </TableContainer>
                                  <Box>
                                    <Field
                                      component={TextField}
                                      name={`pico.${index}.clinicalQ`}
                                      label="Pregunta clínica"
                                      variant="outlined"
                                      fullWidth
                                      sx={{ margin: "10px 0px" }}
                                    />
                                    <Field
                                      component={TextField}
                                      name={`pico.${index}.strategy`}
                                      multiline
                                      variant="outlined"
                                      label="Estrategia(s) Búsqueda"
                                      placeholder="Describa las palabras claves y los motores de búsqueda que utilizó"
                                      rows={4}
                                      fullWidth
                                    />
                                  </Box>
                                </>
                              ))}

                              <Box>
                                <Button
                                  startIcon={<AddIcon />}
                                  onClick={() =>
                                    arrayHelpers.push(emptyPicoRow)
                                  }
                                >
                                  Agregar otra fila
                                </Button>
                              </Box>
                            </>
                          )}
                        </FieldArray>
                      </DialogContent>
                    </Dialog>
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

const DiagnosisTable = () => {
  const { values } = useFormikContext<NesForm>();
  const getApi = useAuthApi();

  const searchDiseases = (searchText: string) => {
    return getApi().then((api) =>
      api
        .get<Page<DiseaseCie10>>(
          "/diseases/search/findByNameContainingIgnoringCase",
          {
            params: { page: 0, searchText },
          }
        )
        .then((x) => x.data._embedded.diseases)
    );
  };

  return (
    <TableContainer component={Paper} sx={{ pt: 2 }}>
      <FieldArray name="diagnosis">
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
              </TableRow>
              <TableRow>
                <TableCell rowSpan={2} sx={{ minWidth: 300 }}>
                  Diagnóstico(s)
                </TableCell>
                <TableCell rowSpan={2} sx={{ minWidth: 300 }}>
                  Signos y sintomas que se relacionan con el diagnóstico
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {values.diagnosis.map((x, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ verticalAlign: "top" }}>
                    <AsyncAutocomplete
                      label="Diagnóstico"
                      name={`diagnosis.${index}.disease`}
                      filter={searchDiseases}
                      disabled
                    />
                  </TableCell>
                  <TableCell sx={{ verticalAlign: "top" }}>
                    <Field
                      component={TextField}
                      fullWidth
                      name={`diagnosis.${index}.symptoms`}
                      label="Sintomas"
                      multiline
                      rows={4}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </FieldArray>
    </TableContainer>
  );
};

const EvaluationNesTable = ({
  name,
  anamnesis,
}: {
  name: "diagnosisRelated" | "diagnosisNotRelated";
  anamnesis: any;
}) => {
  const { values } = useFormikContext<NesForm>();

  const searchDiseases = (searchText: string) => {
    return anamnesis.diseases.filter((x: any) =>
      x.name.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  return (
    <TableContainer component={Paper} sx={{ pt: 2 }}>
      <FieldArray name={name}>
        {(arrayHelpers: ArrayHelpers) => (
          <Table>
            <TableHead>
              <TableRow>
                {name === "diagnosisRelated" && (
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Datos de Salud
                  </TableCell>
                )}
                {name === "diagnosisNotRelated" && (
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Evaluación de datos de salud
                  </TableCell>
                )}
                {nesTableCellsHead1}
              </TableRow>
              <TableRow>
                {name === "diagnosisRelated" && (
                  <TableCell rowSpan={2} sx={{ minWidth: 300 }}>
                    Diagnóstico(s)
                  </TableCell>
                )}
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
              {values[name].map((x, index) => (
                <TableRow key={index}>
                  {name === "diagnosisRelated" && (
                    <TableCell sx={{ verticalAlign: "top" }}>
                      <AsyncAutocomplete
                        label="Diagnóstico"
                        name={`${name}.${index}.diagnosis`}
                        filter={searchDiseases}
                      />
                    </TableCell>
                  )}
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
                    Agregar fila
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

const PiSelect = ({ name }: any) => {
  return (
    <Field
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
    </Field>
  );
};
