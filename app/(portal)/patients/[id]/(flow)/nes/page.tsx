"use client";

import {
  Box,
  Button,
  Fab,
  FormControlLabel,
  Grid,
  IconButton,
  ListSubheader,
  MenuItem,
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
import { ArrayHelpers, Field, FieldArray, Form, Formik } from "formik";
import { RadioGroup, TextField } from "formik-mui";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { DatePicker } from "formik-mui-x-date-pickers";
import { formatDate } from "@/app/date";
import { Select } from "formik-mui";
import { PI_GROUPS } from "./pi-groups";
import CloseIcon from "@mui/icons-material/Close";
import { AsyncAutocomplete } from "@/app/(components)/autocomplete";
import { useAuthApi } from "@/app/(api)/api";
import { Page } from "@/app/(api)/pagination";
import { Drug } from "@/app/(portal)/drugs/pharmaceutical-product/Drug";

const emptyTestingRow = {
  diagnosis: "",
  symptoms: "",
  medicine: "",
  necessity: "",
  effectivity: "",
  security: "",
  prm: "",
};

const emptyPharmaceuticInterventionRow = {
  pharmaceuticIntervention: "",
  commentaries: "",
};

export default function NesPage() {
  const getApi = useAuthApi();

  const searchMedicine = (searchText: string) => {
    return getApi().then((api) =>
      api
        .get<Page<Drug>>("drugDcis/search/findByNameContainingIgnoringCase", {
          params: { page: 0, searchText },
        })
        .then((x) => x.data._embedded.drugDcis)
    );
  };

  return (
    <div>
      {/* <Typography variant="h6" style={{ paddingBottom: "10px" }}>
        PARA LA EVALUACIÓN Y EL ANÁLISIS DE DATOS E IDENTIFICACIÓN DEL PRM.
      </Typography> */}
      <Formik
        initialValues={{
          testing: [
            {
              ...emptyTestingRow,
            },
          ],
          pharmaceuticIntervention: [
            {
              ...emptyPharmaceuticInterventionRow,
            },
          ],
        }}
        onSubmit={() => {}}
      >
        {({ values }) => (
          <Form>
            <Grid container>
              <Grid
                xs={8}
                style={{
                  marginBottom: "10px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <strong>
                  PARA LA EVALUACIÓN Y EL ANÁLISIS DE DATOS E IDENTIFICACIÓN DEL
                  PRM.
                </strong>
              </Grid>
              <Grid
                xs={4}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                sx={{ pb: 1 }}
              >
                <span style={{ fontSize: "14px" }}>
                  Fecha: {formatDate(new Date())}
                </span>
                {/* <Field component={DatePicker} sx={{ width: "180px" }} /> */}
              </Grid>
            </Grid>

            <TableContainer component={Paper}>
              <FieldArray name="testing">
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
                        <TableCell sx={{ fontWeight: "bold" }}>
                          Datos de farmacoterapia
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold" }} colSpan={3}>
                          Evaluación de datos de farmacoterapia
                        </TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell rowSpan={2}>Diagnóstico(s)</TableCell>
                        <TableCell rowSpan={2}>
                          Signos y sintomas que se relacionan con el Dx
                        </TableCell>
                        <TableCell rowSpan={2}>
                          Medicamentos que consume el paciente
                        </TableCell>
                        <TableCell colSpan={3}>
                          Evaluar c/u de los medicamentos si son:
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Necesidad</TableCell>
                        <TableCell>Efectividad</TableCell>
                        <TableCell>Seguridad</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {values.testing.map((x, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <Field
                              component={TextField}
                              fullWidth
                              name={`testing.${index}.diagnosis`}
                              label="Diagnóstico"
                            />
                          </TableCell>
                          <TableCell>
                            <Field
                              component={TextField}
                              fullWidth
                              name={`testing.${index}.symptoms`}
                              label="Sintomas"
                            />
                          </TableCell>
                          <TableCell>
                            <AsyncAutocomplete
                              label="Medicina"
                              field={`testing.${index}.medicine`}
                              filter={searchMedicine}
                            />
                          </TableCell>
                          <TableCell>
                            <Field
                              formControl={{ sx: { m: 1, minWidth: 140 } }}
                              component={Select}
                              id={`testing.${index}.necessity`}
                              name={`testing.${index}.necessity`}
                            >
                              <MenuItem value={"yes real"}>Si real</MenuItem>
                              <MenuItem value={"yes potential"}>
                                Si potencial
                              </MenuItem>
                              <MenuItem value={"no real"}>No real</MenuItem>
                              <MenuItem value={"no potencial"}>
                                No potencial
                              </MenuItem>
                            </Field>
                          </TableCell>
                          <TableCell>
                            <Field
                              component={Select}
                              formControl={{ sx: { m: 1, minWidth: 140 } }}
                              id={`testing.${index}.effectivity`}
                              name={`testing.${index}.effectivity`}
                            >
                              <MenuItem value={"yes"}>Si</MenuItem>
                              <MenuItem value={"no real"}>No real</MenuItem>
                              <MenuItem value={"no potencial"}>
                                No potencial
                              </MenuItem>
                            </Field>
                          </TableCell>
                          <TableCell>
                            <Field
                              component={Select}
                              formControl={{ sx: { m: 1, minWidth: 140 } }}
                              id={`testing.${index}.security`}
                              name={`testing.${index}.security`}
                            >
                              <MenuItem value={"yes"}>Si</MenuItem>
                              <MenuItem value={"no real"}>No real</MenuItem>
                              <MenuItem value={"no potencial"}>
                                No potencial
                              </MenuItem>
                            </Field>

                            {/* <Field
                              component={TextField}
                              name={`testing.${index}.prm`}
                              label="PRM identificado"
                            /> */}
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
                            onClick={() => arrayHelpers.push(emptyTestingRow)}
                          >
                            Agrega Columna
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableFooter>
                  </Table>
                )}
              </FieldArray>
            </TableContainer>
            <Grid container pt={4}>
              <Grid xs={10} paddingBottom={2}>
                <strong>Plan de intervención farmaceutica</strong>
              </Grid>
              {/* <Grid container> */}
              <FieldArray name="pharmaceuticIntervention">
                {(arrayHelpers: ArrayHelpers) => (
                  // <Stack>
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
                  // </Stack>
                )}
              </FieldArray>
              {/* </Grid> */}
            </Grid>
            <Box
              display="flex"
              justifyContent="flex-end"
              sx={{ marginTop: "10px" }}
            >
              <Button variant="contained">Guardar</Button>
            </Box>
          </Form>
        )}
      </Formik>
    </div>
  );
}

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
