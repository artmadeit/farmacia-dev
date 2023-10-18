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
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Paper,
  Radio,
  Stack,
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
import { RadioGroup, TextField } from "formik-mui";
import React from "react";

const emptyHistoryRow = {
  administration: "",
  difficulty: "",
  difficultyJustification: "",
  acceptance: "",
  reasonForUse: "",
  restartDate: defaultDate,
  startDate: defaultDate,
  suspensionDate: defaultDate,
  dose: "",
  mode: "",
  drug: "",
};

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

const TABLE_WIDTH_DATE = 180;
const TABLE_WIDTH_ACTION = 60;
export default function Pharmacotherapy() {
  const getApi = useAuthApi();
  const [open, setOpen] = React.useState(false);

  const onClose = () => {
    setOpen(false);
  };

  const searchDrugDcis = (searchText: string) =>
    getApi().then((api) =>
      api
        .get<Page<Drug>>("drugDcis/search/findByNameContainingIgnoringCase", {
          params: { page: 0, searchText },
        })
        .then((x) => x.data._embedded.drugDcis)
    );

  const searchDrugPharmaceuticalProducts = (searchText: string) =>
    getApi().then((api) =>
      api
        .get<Page<Drug>>("drugPharmaceuticalProducts/search/findByFullName", {
          params: { page: 0, searchText },
        })
        .then((x) => x.data._embedded.drugPharmaceuticalProducts)
    );

  return (
    <div>
      <Title>Hoja Farmacoterapéutica</Title>
      <Divider />
      <Formik
        initialValues={{
          history: [{ ...emptyHistoryRow }],
          allergies: [
            {
              ...emptyMedicineAllergyRow,
            },
          ],
          foods: [
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
              <Grid xs={10} style={{ marginTop: "10px" }}>
                <strong>
                  3. Historia Farmacoterapéutica (P) Prescrito (A) Automedicado{" "}
                </strong>
              </Grid>
            </Grid>
            <TableContainer component={Paper}>
              <FieldArray name="history">
                {(arrayHelpers: ArrayHelpers) => (
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell style={{ minWidth: 300 }}>
                          Medicamento
                        </TableCell>
                        <TableCell style={{ width: 50 }}>P/A</TableCell>
                        <TableCell style={{ minWidth: 200 }} align="center">
                          Dosis
                        </TableCell>
                        <TableCell
                          style={{ width: TABLE_WIDTH_DATE }}
                          align="center"
                        >
                          Fecha inicio
                        </TableCell>
                        <TableCell
                          style={{ width: TABLE_WIDTH_DATE }}
                          align="center"
                        >
                          Fecha susp
                        </TableCell>
                        <TableCell
                          sx={{ width: 2 * TABLE_WIDTH_ACTION }}
                        ></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {values.history.map((history, index) => (
                        <React.Fragment key={index}>
                          <TableRow>
                            <TableCell>
                              <AsyncAutocomplete
                                label="Medicamento"
                                field={`history.${index}.drug`}
                                getLabel={(option) => option.fullName}
                                filter={searchDrugPharmaceuticalProducts}
                              />
                            </TableCell>
                            <TableCell>
                              <Field
                                component={RadioGroup}
                                name={`history.${index}.mode`}
                                row
                              >
                                <FormControlLabel
                                  value="P"
                                  control={<Radio />}
                                  label="P"
                                />
                                <FormControlLabel
                                  value="A"
                                  control={<Radio />}
                                  label="A"
                                />
                              </Field>
                            </TableCell>
                            <TableCell>
                              <Field
                                name={`history.${index}.dose`}
                                component={TextField}
                                variant="outlined"
                                fullWidth
                              />
                            </TableCell>
                            <TableCell>
                              <InexactDatePicker
                                name={`history.${index}.startDate`}
                              />
                            </TableCell>
                            <TableCell>
                              <InexactDatePicker
                                name={`history.${index}.suspensionDate`}
                              />
                            </TableCell>
                            <TableCell>
                              <Tooltip title="Eliminar">
                                <IconButton
                                  aria-labelledby="eliminar"
                                  onClick={() => arrayHelpers.remove(index)}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Ver más">
                                <IconButton
                                  aria-labelledby="Ver"
                                  onClick={() => setOpen(true)}
                                >
                                  <SearchIcon />
                                </IconButton>
                              </Tooltip>
                            </TableCell>
                          </TableRow>
                          <Dialog open={open} onClose={onClose}>
                            <DialogTitle style={{ fontSize: "1rem" }}>
                              Otra información
                            </DialogTitle>
                            <DialogContent>
                              <Stack spacing={2}>
                                <InexactDatePicker
                                  name={`history.${index}.restartDate`}
                                  label="Fecha rein."
                                />
                                <Field
                                  name={`history.${index}.reasonForUse`}
                                  component={TextField}
                                  variant="outlined"
                                  label="Motivo de uso"
                                />
                                <FormControl>
                                  <FormLabel id="acceptance-radio-group">
                                    Aceptación
                                  </FormLabel>
                                  <Field
                                    component={RadioGroup}
                                    name={`history.${index}.acceptance`}
                                    row
                                  >
                                    <FormControlLabel
                                      value="Si"
                                      control={<Radio />}
                                      label="Si"
                                    />
                                    <FormControlLabel
                                      value="No"
                                      control={<Radio />}
                                      label="No"
                                    />
                                    <FormControlLabel
                                      value="No aplica"
                                      control={<Radio />}
                                      label="No aplica"
                                    />
                                  </Field>
                                </FormControl>
                                <Field
                                  name={`history.${index}.administration`}
                                  component={TextField}
                                  label="Administración"
                                  variant="outlined"
                                />
                                <FormControl>
                                  <FormLabel id="difficulty-radio-group">
                                    Dificultades para tomarlo y/o tolerarlo
                                  </FormLabel>
                                  <Field
                                    component={RadioGroup}
                                    name={`history.${index}.difficulty`}
                                    row
                                  >
                                    <FormControlLabel
                                      value="Si"
                                      control={<Radio />}
                                      label="Si"
                                    />
                                    <FormControlLabel
                                      value="No"
                                      control={<Radio />}
                                      label="No"
                                    />
                                  </Field>
                                  {history.difficulty === "Si" && (
                                    <Field
                                      name={`history.${index}.difficultyJustification`}
                                      multiline
                                      rows={4}
                                      component={TextField}
                                      label="Comentarios"
                                      variant="outlined"
                                    />
                                  )}
                                </FormControl>
                              </Stack>
                            </DialogContent>
                            <DialogActions sx={{ padding: "20px 24px" }}>
                              <Button variant="contained">Guardar</Button>
                            </DialogActions>
                          </Dialog>
                        </React.Fragment>
                      ))}
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TableCell colSpan={3}>
                          <Button
                            startIcon={<AddIcon />}
                            onClick={() => {
                              arrayHelpers.push(emptyHistoryRow);
                            }}
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
                      {values.allergies.map((x, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <AsyncAutocomplete
                              label="Medicamento"
                              field={`allergies.${index}.drug`}
                              filter={searchDrugDcis}
                            />
                          </TableCell>
                          <TableCell>
                            <Field
                              name={`allergies.${index}.description`}
                              component={TextField}
                              variant="outlined"
                              fullWidth
                            />
                          </TableCell>
                          <TableCell>
                            <InexactDatePicker
                              name={`allergies.${index}.date`}
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
                      {values.foods.map((x, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <Field
                              component={TextField}
                              name={`foods.${index}.food`}
                              variant="outlined"
                              fullWidth
                            />
                          </TableCell>
                          <TableCell>
                            <Field
                              component={TextField}
                              name={`foods.${index}.description`}
                              variant="outlined"
                              fullWidth
                            />
                          </TableCell>
                          <TableCell>
                            <InexactDatePicker name={`foods.${index}.date`} />
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
            <TableContainer>
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
