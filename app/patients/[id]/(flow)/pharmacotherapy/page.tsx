"use client";
import { Title } from "@/app/(components)/Title";
import {
  Button,
  Divider,
  FormControlLabel,
  IconButton,
  Paper,
  Radio,
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
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";

const emptyHistoryRow = {
  administration: "",
  difficulties: "",
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

export default function Pharmacotherapy() {
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
                        <TableCell style={{ minWidth: 200 }} align="center">
                          Fecha rein.
                        </TableCell>
                        <TableCell style={{ minWidth: 200 }} align="center">
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
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {values.history.map((x, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <Field
                              name={`history.${index}.drug`}
                              component={TextField}
                              variant="outlined"
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
                          <TableCell>
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
                          </TableCell>
                          <TableCell>
                            <Field
                              name={`history.${index}.reasonForUse`}
                              component={TextField}
                              variant="outlined"
                            />
                          </TableCell>
                          <TableCell>
                            <Field
                              name={`history.${index}.acceptance`}
                              component={TextField}
                              variant="outlined"
                            />
                          </TableCell>
                          <TableCell>
                            <Field
                              name={`history.${index}.administration`}
                              component={TextField}
                              variant="outlined"
                            />
                          </TableCell>
                          <TableCell>
                            <Field
                              name={`history.${index}.difficulties`}
                              component={TextField}
                              variant="outlined"
                            />
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
              <Grid xs={10}>
                <em>
                  <strong>Plan de Seguimiento Farmacoterapéutico:</strong>
                </em>
              </Grid>
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
                        <TableCell>Medicamento</TableCell>
                        <TableCell style={{ minWidth: 500 }}>
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
                            <Field
                              name={`allergies.${index}.drug`}
                              component={TextField}
                              variant="outlined"
                              fullWidth
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
                              name={`food.${index}.description`}
                              variant="outlined"
                              fullWidth
                            />
                          </TableCell>
                          <TableCell>
                            <Field
                              component={DatePicker}
                              fullWidth
                              name={`food.${index}.date`}
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

            {/* ¿se realizaron examenes de laboratorio u otra prueba diagnostica? si no

examen de laboratorio o prueba diagnostica	fecha	resultado
rango de valor normal	evaluacion/comentarios */}
          </Form>
        )}
      </Formik>
    </div>
  );
}
