"use client";

import {
  Box,
  Button,
  ListSubheader,
  MenuItem,
  Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Field, Form, Formik } from "formik";
import { Checkbox, Select } from "formik-mui";
import { useRouter } from "next/navigation";
import { api } from "../../../(api)/api";
import { Page } from "../../../(api)/pagination";
import { AsyncAutocomplete } from "../../../(components)/autocomplete";
import { Drug } from "../../../(portal)/drugs/Drug";
import { patientSelectionCriteriaList } from "./patientSelectionCriteriaList";
import { PRM_GROUPS } from "./prm-groups";
import { sum } from "lodash";
import yup from "../../../validation";
import { Title } from "@/app/(components)/Title";

import { HorizontalStepper } from "../HorizontalStepper";
const PrmSelect = () => {
  return (
    <Field
      component={Select}
      formControl={{ sx: { m: 1, width: "100%" } }}
      id="prm"
      name="prm"
      label="PRM"
    >
      <MenuItem value="">
        <em>Ninguno</em>
      </MenuItem>
      {PRM_GROUPS.map((x) => [
        <ListSubheader key={x.group}>{x.group}</ListSubheader>,
        ...x.items.map((item) => (
          <MenuItem key={item.name} value={item.name}>
            {item.name}: {item.description}
          </MenuItem>
        )),
      ])}
    </Field>
  );
};

const DrugAutocomplete = () => {
  return (
    <AsyncAutocomplete
      label="Medicamento"
      field="drug"
      filter={(searchText) =>
        api
          .get<Page<Drug>>("drugs/search/findByNameContaining", {
            params: { page: 0, searchText },
          })
          .then((x) => x.data._embedded.drugs)
      }
    />
  );
};

const CRITERIA_DRUG = 1;
const CRITERIA_PRM = 8;

const helpReferences = [
  { criteriaId: CRITERIA_DRUG, component: DrugAutocomplete },
  { criteriaId: CRITERIA_PRM, component: PrmSelect },
];

const getTotalScore = (criterionList: string[]) => {
  return sum(
    criterionList
      .map((x) => Number(x))
      .map((x) =>
        patientSelectionCriteriaList.find((criterion) => criterion.id === x)
      )
      .map((criterion) => criterion?.score || 0)
  );
};

export default function PatientSelectionPage() {
  const router = useRouter();

  return (
    <HorizontalStepper activeStep={0}>
      <Title>Criterios de selección de pacientes</Title>
      <Formik
        initialValues={{
          criterionList: [],
          drug: null,
          prm: "",
        }}
        validationSchema={yup.object({
          drug: yup
            .mixed()
            .nullable()
            .label("Medicamento")
            .when("criterionList", {
              is: (val: string[]) => val.includes(String(CRITERIA_DRUG)),
              then: (schema) => schema.required(),
              otherwise: (schema) => schema,
            }),
          prm: yup.string().when("criterionList", {
            is: (val: string[]) => val.includes(String(CRITERIA_PRM)),
            then: (schema) => schema.required(),
            otherwise: (schema) => schema,
          }),
        })}
        onSubmit={() => {
          // TODO: save data
          router.push("/patients/1/interview");
        }}
      >
        {({ values, errors }) => (
          <Form>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>N°</TableCell>
                    <TableCell>Criterios</TableCell>
                    <TableCell align="right">Puntaje</TableCell>
                    <TableCell>Referencias de ayuda</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {patientSelectionCriteriaList.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>
                        <Field
                          component={Checkbox}
                          type="checkbox"
                          name="criterionList"
                          value={String(row.id)}
                        />
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.id}
                      </TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell align="right">{row.score}</TableCell>
                      <TableCell sx={{ width: "500px" }}>
                        <HelpReference criteriaId={row.id} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box display="flex" justifyContent="space-between" paddingTop={2}>
              <Typography>
                Puntaje total: {getTotalScore(values.criterionList)}
                {getTotalScore(values.criterionList) >= 4 &&
                  ", puntaje >= 4, considere SFT!"}
              </Typography>
              <Button variant="contained" type="submit">
                Continuar
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </HorizontalStepper>
  );
}

const HelpReference = ({ criteriaId }: { criteriaId: number }) => {
  const data = helpReferences.find((x) => x.criteriaId == criteriaId);
  if (!data) return "";
  const Component = data.component;

  return (
    <div>
      <Component />
    </div>
  );
};
