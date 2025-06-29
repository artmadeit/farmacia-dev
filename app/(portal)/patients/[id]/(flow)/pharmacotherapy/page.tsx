"use client";
import { useAuthApi } from "@/app/(api)/api";
import { Page, SpringPage } from "@/app/(api)/pagination";
import {
  InexactDatePicker,
  InexactDateType,
  defaultDate,
  inexactDateSchema,
} from "@/app/(components)/InexactDatePicker";
import { Title } from "@/app/(components)/Title";
import { AsyncAutocomplete } from "@/app/(components)/autocomplete";
import { DrugProduct } from "@/app/(portal)/drugs/pharmaceutical-product/Drug";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  Divider,
  IconButton,
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
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { ArrayHelpers, Field, FieldArray, Form, Formik } from "formik";
import { TextField } from "formik-mui";
import { isString } from "lodash";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import {
  PharmaceuticHistoryRow,
  PharmacotherapyTable,
} from "./PharmacotherapyTable";
import { emptyHistoryRow } from "./emptyHistoryRow";
import yup, { typeErrorMessage } from "@/app/validation";
import { requiredMessage } from "@/app/(components)/helpers/requiredMessage";
import { historySchema } from "./historySchema";
import { TABLE_WIDTH_ACTION, TABLE_WIDTH_DATE } from "./table";
import { SnackbarContext } from "@/app/(components)/SnackbarContext";
import React from "react";
import { today } from "@/app/date";

const emptyMedicineAllergyRow = {
  drug: "",
  description: "",
  date: { ...defaultDate },
};

const emptyFoodsAllergy = {
  food: "",
  description: "",
  date: { ...defaultDate },
};

const emptyAdverseReactionRow = {
  date: { ...defaultDate },
  medicine: "",
  dose: "",
  adverseReactionOfDrug: "",
};

type Pharmacoterapy = {
  history: PharmaceuticHistoryRow[];
  drugAllergies: {
    drug: string | DrugProduct;
    description: string;
    date: InexactDateType;
  }[];
  foodAllergies: {
    food: string;
    description: string;
    date: InexactDateType;
  }[];
  adverseReactions: {
    date: InexactDateType;
    medicine: string | DrugProduct;
    dose: string;
    adverseReactionOfDrug: string;
  }[];
  interviewDate: Date | null;
};

const emptyInitialValues: Pharmacoterapy = {
  history: [{ ...emptyHistoryRow }],
  drugAllergies: [],
  foodAllergies: [],
  adverseReactions: [],
  interviewDate: new Date(),
};

export default function Pharmacotherapy({
  params,
}: {
  params: { id: number };
}) {
  const { id: patientId } = params;
  const getApi = useAuthApi();
  const router = useRouter();
  const alert = React.useContext(SnackbarContext);

  const { data, mutate } = useSWR(`/patients/${patientId}/pharmacoterapy`);

  const searchDrugs = (searchText: string) =>
    getApi().then((api) =>
      api
        .get<SpringPage<DrugProduct>>("drugs", {
          params: { page: 0, searchText },
        })
        .then((x) => x.data.content)
    );
  const initialValues: Pharmacoterapy = data || emptyInitialValues;

  return (
    <div>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={yup.object({
          history: historySchema,
          drugAllergies: yup.array().of(
            yup.object({
              drug: yup.object().typeError(typeErrorMessage).required(requiredMessage),
              description: yup.string().required(requiredMessage),
              date: inexactDateSchema((value) =>
                value.required(requiredMessage)
              ),
            })
          ),
          foodAllergies: yup.array().of(
            yup.object({
              food: yup.string().required(requiredMessage),
              description: yup.string().required(requiredMessage),
              date: inexactDateSchema((value) =>
                value.required(requiredMessage)
              ),
            })
          ),
          adverseReactions: yup.array().of(
            yup.object({
              date: inexactDateSchema((value) =>
                value.required(requiredMessage)
              ),
              medicine: yup.object().typeError(typeErrorMessage).required(requiredMessage),
              dose: yup.string().required(requiredMessage),
              adverseReactionOfDrug: yup.string().required(requiredMessage),
            })
          ),
        })}
        onSubmit={async (values) => {
          const data = {
            adverseReactions: values.adverseReactions.map((x) => {
              if (isString(x.medicine)) {
                throw "Medicina incorrecta";
              }

              return {
                medicineId: x.medicine.id,
                date: x.date,
                dose: x.dose,
                adverseReactionOfDrug: x.adverseReactionOfDrug,
              };
            }),

            drugAllergies: values.drugAllergies.map((x) => {
              if (isString(x.drug)) {
                throw "Medicina no válida";
              }

              return {
                drugId: x.drug.id,
                description: x.description,
                date: x.date,
              };
            }),

            foodAllergies: values.foodAllergies,

            history: values.history.map(({ drug, ...rest }) => {
              if (isString(drug)) {
                throw "Medicina incorrecta";
              }

              return {
                ...rest,
                drugId: drug.id,
              };
            }),
            interviewDate: values.interviewDate,
          };

          const response = await getApi().then((api) =>
            api.post(`patients/${patientId}/pharmacoterapy`, data)
          );
          mutate();
          alert.showMessage("Información guardada exitosamente");
          router.push(`/patients/${patientId}/nes`);
        }}
      >
        {({ values, errors, touched }) => (
          <Form>
            <Title date={data?.createDate || new Date()}>
              Hoja Farmacoterapéutica
            </Title>
            <Grid container spacing={2}>
              <Grid xs={10} style={{ margin: "10px 0px" }}>
                <strong>
                  3. Historia Farmacoterapéutica (P) Prescrito (A) Automedicado{" "}
                </strong>
              </Grid>
            </Grid>
            <PharmacotherapyTable name="history" values={values} />
            <Grid container spacing={2} pt={4}>
              <Grid xs={10} style={{ margin: "10px 0px" }}>
                <strong>3.1 Alergias</strong>
              </Grid>
            </Grid>
            <TableContainer component={Paper}>
              <FieldArray name="drugAllergies">
                {(arrayHelpers: ArrayHelpers) => (
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell style={{ minWidth: 200 }}>
                          Medicamento
                        </TableCell>
                        <TableCell style={{ minWidth: 200 }}>
                          Descripción
                        </TableCell>
                        <TableCell style={{ width: TABLE_WIDTH_DATE }}>
                          Fecha
                        </TableCell>
                        <TableCell
                          style={{ width: TABLE_WIDTH_ACTION }}
                        ></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {values.drugAllergies.map((x, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <AsyncAutocomplete
                              label="Medicamento"
                              name={`drugAllergies.${index}.drug`}
                              getLabel={(option) => option.fullName}
                              filter={searchDrugs}
                            />
                          </TableCell>
                          <TableCell>
                            <Field
                              name={`drugAllergies.${index}.description`}
                              component={TextField}
                              variant="outlined"
                              fullWidth
                            />
                          </TableCell>
                          <TableCell>
                            <InexactDatePicker
                              maxDate={today}
                              name={`drugAllergies.${index}.date`}
                            />
                          </TableCell>
                          <TableCell>
                            <Tooltip title="Eliminar">
                              <IconButton
                                aria-label="delete"
                                onClick={() => arrayHelpers.remove(index)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TableCell colSpan={3}>
                          <Button
                            startIcon={<AddIcon />}
                            onClick={() => {
                              arrayHelpers.push(emptyMedicineAllergyRow);
                            }}
                          >
                            Agregar alergia
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableFooter>
                  </Table>
                )}
              </FieldArray>
            </TableContainer>
            <Grid container spacing={2} pt={4}>
              <Grid xs={10} style={{ margin: "10px 0px" }}>
                <strong>Alimentos u otros</strong>
              </Grid>
            </Grid>
            <TableContainer component={Paper}>
              <FieldArray name="foodAllergies">
                {(arrayHelpers: ArrayHelpers) => (
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Alimento/otro</TableCell>
                        <TableCell style={{ minWidth: 500 }}>
                          Descripción
                        </TableCell>
                        <TableCell style={{ width: TABLE_WIDTH_DATE }}>
                          Fecha
                        </TableCell>
                        <TableCell
                          sx={{ width: TABLE_WIDTH_ACTION }}
                        ></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {values.foodAllergies.map((x, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <Field
                              component={TextField}
                              name={`foodAllergies.${index}.food`}
                              variant="outlined"
                              fullWidth
                            />
                          </TableCell>
                          <TableCell>
                            <Field
                              component={TextField}
                              name={`foodAllergies.${index}.description`}
                              variant="outlined"
                              fullWidth
                            />
                          </TableCell>
                          <TableCell>
                            <InexactDatePicker
                              maxDate={today}
                              name={`foodAllergies.${index}.date`}
                            />
                          </TableCell>
                          <TableCell>
                            <Tooltip title="Eliminar">
                              <IconButton
                                aria-label="delete"
                                onClick={() => {
                                  arrayHelpers.remove(index);
                                }}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TableCell colSpan={3}>
                          <Button
                            startIcon={<AddIcon />}
                            onClick={() => arrayHelpers.push(emptyFoodsAllergy)}
                          >
                            Agregar alimento
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableFooter>
                  </Table>
                )}
              </FieldArray>
            </TableContainer>
            <Grid container spacing={2} pt={4}>
              <Grid xs={10} style={{ margin: "10px 0px" }}>
                <strong>
                  3.2 Antecedentes de reacción adversa medicamentosa (RAM)
                </strong>
              </Grid>
            </Grid>
            <TableContainer component={Paper}>
              <FieldArray name="adverseReactions">
                {(arrayHelpers: ArrayHelpers) => (
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell style={{ width: TABLE_WIDTH_DATE }}>
                          Fecha
                        </TableCell>
                        <TableCell style={{ minWidth: 200 }}>
                          Medicamento
                        </TableCell>
                        <TableCell>Dosis</TableCell>
                        <TableCell>Reacción adversa medicamentosa</TableCell>
                        <TableCell
                          sx={{ width: TABLE_WIDTH_ACTION }}
                        ></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {values.adverseReactions.map((x, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <InexactDatePicker
                              maxDate={today}
                              name={`adverseReactions.${index}.date`}
                            />
                          </TableCell>
                          <TableCell>
                            <AsyncAutocomplete
                              label="Medicamento"
                              name={`adverseReactions.${index}.medicine`}
                              getLabel={(option) => option.fullName}
                              filter={searchDrugs}
                            />
                          </TableCell>
                          <TableCell>
                            <Field
                              component={TextField}
                              name={`adverseReactions.${index}.dose`}
                              variant="outlined"
                              fullWidth
                            />
                          </TableCell>
                          <TableCell>
                            <Field
                              component={TextField}
                              name={`adverseReactions.${index}.adverseReactionOfDrug`}
                              variant="outlined"
                              fullWidth
                            />
                          </TableCell>
                          <TableCell>
                            <Tooltip title="Eliminar">
                              <IconButton
                                aria-label="delete"
                                onClick={() => arrayHelpers.remove(index)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TableCell colSpan={3}>
                          <Button
                            startIcon={<AddIcon />}
                            onClick={() =>
                              arrayHelpers.push(emptyAdverseReactionRow)
                            }
                          >
                            Agregar reacción adversa
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableFooter>
                  </Table>
                )}
              </FieldArray>
            </TableContainer>
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
