"use client";
import { useAuthApi } from "@/app/(api)/api";
import { Page } from "@/app/(api)/pagination";
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
import { DatePicker } from "formik-mui-x-date-pickers";
import React from "react";

const emptyHistoryRow = {
  administration: "",
  difficulty: "",
  difficultyJustification: "",
  acceptance: "",
  reasonForUse: "",
  suspensionDate: null,
  restartDate: null,
  startDate: null,
  dose: "",
  mode: "",
  drug: "",
};

const emptyAllergyRow = {
  drug: "",
  description: "",
  date: null,
};

const emptyFoodsRow = {
  food: "",
  description: "",
  date: null,
};

const emptyAdverseReactionRow = {
  date: null,
  medicine: "",
  dose: "",
  adverseReactionOfDrug: "",
};

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
              ...emptyAllergyRow,
            },
          ],
          foods: [
            {
              ...emptyFoodsRow,
            },
          ],
          adverseReaction: [
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
                        <TableCell style={{ minWidth: 200 }}>
                          Medicamento
                        </TableCell>
                        <TableCell>P/A</TableCell>
                        <TableCell style={{ minWidth: 200 }} align="center">
                          Dosis
                        </TableCell>
                        <TableCell style={{ minWidth: 200 }} align="center">
                          Fecha inicio
                        </TableCell>
                        <TableCell style={{ minWidth: 200 }} align="center">
                          Fecha susp
                        </TableCell>
                        {/* <TableCell style={{ minWidth: 200 }} align="center">
                          Fecha rein.
                        </TableCell> */}
                        {/* <TableCell style={{ minWidth: 200 }} align="center">
                          Motivo de uso
                        </TableCell>
                        <TableCell style={{ minWidth: 200 }} align="center">
                          Aceptación
                        </TableCell>
                        <TableCell style={{ minWidth: 200 }} align="center">
                          Administración
                        </TableCell>
                        <TableCell style={{ minWidth: 200 }} align="center">
                          Dificultades para tomarlo y/o tolerarlo
                        </TableCell> */}
                        <TableCell></TableCell>
                        <TableCell></TableCell>
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
                              />
                            </TableCell>
                            <TableCell>
                              <Field
                                component={DatePicker}
                                // slotProps={{
                                //   textField: {
                                //     helperText: errors.history[index].startDate
                                //       ? errors.history[index].startDate
                                //       : "",
                                //   },
                                // }}
                                name={`history.${index}.startDate`}
                              />
                            </TableCell>
                            <TableCell>
                              <Field
                                component={DatePicker}
                                // slotProps={{
                                //   textField: {
                                //     helperText: errors.suspensionDate
                                //       ? errors.suspensionDate
                                //       : "",
                                //   },
                                // }}
                                name={`history.${index}.suspensionDate`}
                              />
                            </TableCell>
                            {/* 
                          
                          
                          <TableCell>
                            <Field
                              component={RadioGroup}
                              name={`history.${index}.difficulty`}
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
                                component={TextField}
                                variant="outlined"
                              />
                            )}
                          </TableCell> */}
                            <TableCell>
                              <Tooltip title="Eliminar">
                                <IconButton
                                  aria-labelledby="eliminar"
                                  onClick={() => arrayHelpers.remove(index)}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </Tooltip>
                            </TableCell>
                            <TableCell>
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
                                <Field
                                  component={DatePicker}
                                  // slotProps={{
                                  //   textField: {
                                  //     helperText: errors.restartDate
                                  //       ? errors.restartDate
                                  //       : "",
                                  //   },
                                  // }}
                                  name={`history.${index}.restartDate`}
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
                                      component={TextField}
                                      label="comentenos"
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
                            Agregar columna
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
                        <TableCell>Fecha</TableCell>
                        <TableCell></TableCell>
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
                            <Field
                              component={DatePicker}
                              fullWidth
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
                              arrayHelpers.push(emptyAllergyRow);
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
                        <TableCell>Fecha</TableCell>
                        <TableCell></TableCell>
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
                            <Field
                              component={DatePicker}
                              name={`foods.${index}.date`}
                              fullWidth
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
                            onClick={() => arrayHelpers.push(emptyFoodsRow)}
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
              <FieldArray name="adverseReaction">
                {(arrayHelpers: ArrayHelpers) => (
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Fecha</TableCell>
                        <TableCell>Medicamento</TableCell>
                        <TableCell>Dosis</TableCell>
                        <TableCell>Reacción adversa medicamentosa</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {values.adverseReaction.map((x, index) => (
                        <TableRow key={index}>
                          <TableCell style={{ maxWidth: 200 }}>
                            <Field
                              component={DatePicker}
                              name={`adverseReaction.${index}.date`}
                              fullWidth
                            />
                          </TableCell>
                          <TableCell>
                            <AsyncAutocomplete
                              label="Medicamento"
                              field={`adverseReaction.${index}.medicine`}
                              filter={searchDrugDcis}
                            />
                          </TableCell>
                          <TableCell>
                            <Field
                              component={TextField}
                              name={`adverseReaction.${index}.dose`}
                              variant="outlined"
                              fullWidth
                            />
                          </TableCell>
                          <TableCell style={{ minWidth: 300 }}>
                            <Field
                              component={TextField}
                              name={`adverseReaction.${index}.adverseReactionOfDrug`}
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

            {/* ¿se realizaron examenes de laboratorio u otra prueba diagnostica? si no
examen de laboratorio o prueba diagnostica	fecha	resultado
rango de valor normal	evaluacion/comentarios */}
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
