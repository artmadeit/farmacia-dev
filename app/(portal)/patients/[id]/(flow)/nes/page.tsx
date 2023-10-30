"use client";

import { formatDate } from "@/app/date";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
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

const emptyEvaluationRow = {
  diagnosis: "",
  symptoms: "",
  ...emptyDrugNesEvaluation,
};

const emptyPharmaceuticInterventionRow = {
  pharmaceuticIntervention: "",
  commentaries: "",
};

type NesForm = {
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
    symptoms: string;
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
  pharmaceuticIntervention: {
    pharmaceuticIntervention: string;
    commentaries: string;
  }[];
};

const initialValues: NesForm = {
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
  pharmaceuticIntervention: [
    {
      ...emptyPharmaceuticInterventionRow,
    },
  ],
};

// type NesForm = typeof initialValues;

export default function NesPage({ params }: { params: { id: number } }) {
  const { id: patientId } = params;
  const getApi = useAuthApi();
  const router = useRouter();

  return (
    <div>
      <Title date={new Date()}>
        Para la evaluación y el análisis de datos e identificación del PRM
      </Title>

      <Formik
        initialValues={initialValues}
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
          };
          const response = getApi().then((api) =>
            api.post(`patients/${patientId}/nes`, data)
          );

          router.push(`/patients/${patientId}/soap`);
        }}
      >
        {({ values }) => (
          <Form>
            <EvaluationNesTable name="diagnosisRelated" />
            <EvaluationNesTable name="diagnosisNotRelated" />
            <Grid container pt={4}>
              <Grid xs={10} paddingBottom={2}>
                <strong>Plan de intervención farmaceutica</strong>
              </Grid>
              <FieldArray name="pharmaceuticIntervention">
                {(arrayHelpers: ArrayHelpers) => (
                  <Grid container>
                    {values.pharmaceuticIntervention.map((x, index) => (
                      <Grid container key={index} paddingBottom={2}>
                        {values.pharmaceuticIntervention.length > 1 && (
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
                            name={`pharmaceuticIntervention.${index}.pharmaceuticIntervention`}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <Field
                            component={TextField}
                            name={`pharmaceuticIntervention.${index}.commentaries`}
                            label="Comentarios"
                            variant="outlined"
                            multiline
                            rows={4}
                            fullWidth
                          />
                        </Grid>
                      </Grid>
                    ))}
                    {values.pharmaceuticIntervention.length > 0 && (
                      <Box textAlign="center">
                        <Button
                          startIcon={<AddIcon />}
                          onClick={() =>
                            arrayHelpers.push(emptyPharmaceuticInterventionRow)
                          }
                        >
                          Agregar otra intervención farmaceutica
                        </Button>
                      </Box>
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

const EvaluationNesTable = ({
  name,
}: {
  name: "diagnosisRelated" | "diagnosisNotRelated";
}) => {
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
                <TableCell sx={{ fontWeight: "bold" }}>
                  Evaluación de datos de salud
                </TableCell>
                {nesTableCellsHead1}
              </TableRow>
              <TableRow>
                {name === "diagnosisRelated" && (
                  <TableCell rowSpan={2} sx={{ minWidth: 300 }}>
                    Diagnóstico(s)
                  </TableCell>
                )}
                <TableCell rowSpan={2} sx={{ minWidth: 300 }}>
                  Signos y sintomas que {name === "diagnosisNotRelated" && "no"}{" "}
                  se relacionan con el diagnóstico
                </TableCell>
                {nesTableCellsHead2}
              </TableRow>
              <TableRow>{nesTableCellsHead3}</TableRow>
            </TableHead>
            <TableBody>
              {values[name].map((x, index) => (
                <TableRow key={index}>
                  {name === "diagnosisRelated" && (
                    <TableCell sx={{ verticalAlign: "top" }}>
                      {/* <Field
                        component={TextField}
                        fullWidth
                        name={`${name}.${index}.diagnosis`}
                        label="Diagnóstico"
                      /> */}
                      <AsyncAutocomplete
                        label="Diagnóstico"
                        field={`${name}.${index}.diagnosis`}
                        filter={searchDiseases}
                      />
                    </TableCell>
                  )}
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
