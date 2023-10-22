"use client";
import { useAuthApi } from "@/app/(api)/api";
import { Page } from "@/app/(api)/pagination";
import {
  InexactDatePicker,
  defaultDate,
} from "@/app/(components)/InexactDatePicker";
import { Title } from "@/app/(components)/Title";
import { AsyncAutocomplete } from "@/app/(components)/autocomplete";
import { Drug } from "@/app/(portal)/drugs/pharmaceutical-product/Drug";
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
import React from "react";
import { PharmacotherapyTable, emptyHistoryRow } from "./PharmacotherapyTable";

const emptyMedicineAllergyRow = {
  drug: "",
  description: "",
  date: defaultDate,
};

const emptyFoodsAllergy = {
  food: "",
  description: "",
  date: defaultDate,
};

const emptyAdverseReactionRow = {
  date: defaultDate,
  medicine: "",
  dose: "",
  adverseReactionOfDrug: "",
};

export const TABLE_WIDTH_DATE = 180;
export const TABLE_WIDTH_ACTION = 60;
export default function Pharmacotherapy() {
  const getApi = useAuthApi();

  const searchDrugDcis = (searchText: string) =>
    getApi().then((api) =>
      api
        .get<Page<Drug>>("drugDcis/search/findByNameContainingIgnoringCase", {
          params: { page: 0, searchText },
        })
        .then((x) => x.data._embedded.drugDcis)
    );

  return (
    <div>
      <Title>Hoja Farmacoterapéutica</Title>
      <Divider />
      <Formik
        initialValues={{
          history: [{ ...emptyHistoryRow }],
          drugAllergies: [
            {
              ...emptyMedicineAllergyRow,
            },
          ],
          foodAllergies: [
            {
              ...emptyFoodsAllergy,
            },
          ],
          adverseReactions: [
            {
              ...emptyAdverseReactionRow,
            },
          ],
        }}
        onSubmit={() => {}}
      >
        {({ values, errors }) => (
          <Form>
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
              <FieldArray name="allergies">
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
                              field={`drugAllergies.${index}.drug`}
                              filter={searchDrugDcis}
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
              <FieldArray name="foods">
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
                              name={`adverseReactions.${index}.date`}
                            />
                          </TableCell>
                          <TableCell>
                            <AsyncAutocomplete
                              label="Medicamento"
                              field={`adverseReactions.${index}.medicine`}
                              filter={searchDrugDcis}
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
                                aria-labelledby="delete"
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
