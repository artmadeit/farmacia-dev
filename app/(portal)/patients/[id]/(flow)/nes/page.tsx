"use client";

import { useAuthApi } from "@/app/(api)/api";
import { Page } from "@/app/(api)/pagination";
import { AsyncAutocomplete } from "@/app/(components)/autocomplete";
import { Drug } from "@/app/(portal)/drugs/pharmaceutical-product/Drug";
import { formatDate } from "@/app/date";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  Fab,
  Grid,
  IconButton,
  ListSubheader,
  MenuItem,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
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
import { PRM_GROUP, getItemsPerGroup } from "../selection/prm-groups";
import {
  nesTableCellsHead1,
  nesTableCellsHead2,
  nesTableCellsHead3,
} from "./table";

const emptyEvaluationRow = {
  diagnosis: "",
  symptoms: "",
  medicine: "",
  necessity: {
    evaluation: "",
    justification: "",
    prm: "",
  },
  effectivity: {
    evaluation: "",
    justification: "",
    prm: "",
  },
  security: {
    evaluation: "",
    justification: "",
    prm: "",
  },
};

const emptyPharmaceuticInterventionRow = {
  pharmaceuticIntervention: "",
  commentaries: "",
};

const initialValues = {
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

type NesForm = typeof initialValues;

export default function NesPage() {
  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={() => {}}>
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
              </Grid>
            </Grid>

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
              <Button variant="contained">Guardar</Button>
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
                  <TableCell rowSpan={2}>Diagnóstico(s)</TableCell>
                )}
                <TableCell rowSpan={2}>
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
                      <Field
                        component={TextField}
                        fullWidth
                        name={`${name}.${index}.diagnosis`}
                        label="Diagnóstico"
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
                  <TableCell sx={{ verticalAlign: "top" }}>
                    <AsyncAutocomplete
                      label="Medicina"
                      field={`${name}.${index}.medicine`}
                      filter={searchMedicine}
                    />
                  </TableCell>
                  <TableCell sx={{ verticalAlign: "top" }}>
                    <Field
                      formControl={{ fullWidth: true }}
                      component={Select}
                      fullWidth
                      id={`${name}.${index}.necessity`}
                      name={`${name}.${index}.necessity.evaluation`}
                    >
                      <MenuItem value={"yes real"}>Si real</MenuItem>
                      <MenuItem value={"yes potential"}>Si potencial</MenuItem>
                      <MenuItem value={"no real"}>No real</MenuItem>
                      <MenuItem value={"no potential"}>No potencial</MenuItem>
                    </Field>
                    {(values[name][index].necessity.evaluation == "yes real" ||
                      values[name][index].necessity.evaluation ==
                        "yes potential") && (
                      <Justification name={`${name}.${index}.necessity`} />
                    )}
                  </TableCell>
                  <TableCell sx={{ verticalAlign: "top" }}>
                    <Field
                      component={Select}
                      formControl={{ fullWidth: true }}
                      id={`${name}.${index}.effectivity`}
                      name={`${name}.${index}.effectivity.evaluation`}
                    >
                      <MenuItem value={"yes"}>Si</MenuItem>
                      <MenuItem value={"no real"}>No real</MenuItem>
                      <MenuItem value={"no potential"}>No potencial</MenuItem>
                    </Field>
                    {values[name][index].effectivity.evaluation &&
                      values[name][index].effectivity.evaluation !== "yes" && (
                        <Justification name={`${name}.${index}.effectivity`} />
                      )}
                  </TableCell>
                  <TableCell sx={{ verticalAlign: "top" }}>
                    <Field
                      component={Select}
                      formControl={{ fullWidth: true }}
                      id={`${name}.${index}.security`}
                      name={`${name}.${index}.security.evaluation`}
                    >
                      <MenuItem value={"yes"}>Si</MenuItem>
                      <MenuItem value={"no real"}>No real</MenuItem>
                      <MenuItem value={"no potential"}>No potencial</MenuItem>
                    </Field>
                    {values[name][index].security.evaluation &&
                      values[name][index].security.evaluation !== "yes" && (
                        <Justification name={`${name}.${index}.security`} />
                      )}
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

const Justification = ({ name }: { name: string }) => {
  const groupName = name.includes("effectivity")
    ? PRM_GROUP.EFFECTIVITY
    : name.includes("security")
    ? PRM_GROUP.SECURITY
    : PRM_GROUP.NECESSITY;

  const items = getItemsPerGroup(groupName);

  return (
    <Stack gap={2} pt={2}>
      <Field
        formControl={{ sx: { width: 200 } }}
        component={Select}
        id={`${name}.prm`}
        name={`${name}.prm`}
        label="PRM identificado"
      >
        {items.map((item) => (
          <MenuItem value={item.name} key={item.name}>
            {item.name}: {item.description}
          </MenuItem>
        ))}
      </Field>
      <Field
        component={TextField}
        label="Justifique"
        name={`${name}.justification`}
        variant="outlined"
        multiline
        rows={4}
        fullWidth
      />
    </Stack>
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
