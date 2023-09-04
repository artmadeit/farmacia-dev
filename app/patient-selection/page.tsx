"use client";

import {
  Box,
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import * as React from "react";
import { PRM_GROUPS } from "./prm-groups";
import { Form, Formik } from "formik";
import { AsyncAutocomplete } from "../(components)/autocomplete";
import { api } from "../(api)/api";
import { Page } from "../(api)/pagination";
import { useRouter } from "next/navigation";

type Criterio = {
  id: number;
  name: string;
  score: number;
};

const rows: Criterio[] = [
  {
    id: 1,
    name: "Pacientes que reciben medicamentos de estrecho margen terapéutico",
    score: 5,
  },
  {
    id: 2,
    name: "Pacientes que son vulnerables a los efectos adversos por estar en situación fisiológicamente delicada (Con diagnóstico de insuficiencia renal, hepática)",
    score: 4,
  },
  {
    id: 8,
    name: "Pacientes que presentan algún problema relacionado al medicamento (de necesidad, efictividad, o seguridad)",
    score: 4,
  },
];

const PrmSelect = () => {
  return (
    <FormControl sx={{ m: 1, width: "100%" }}>
      <InputLabel htmlFor="grouped-select">PRM</InputLabel>
      <Select defaultValue="" id="grouped-select" label="Grouping">
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
      </Select>
    </FormControl>
  );
};

type Drug = {
  name: string;
  description: string;
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

const helpReferences = [
  { criteriaId: 1, component: DrugAutocomplete },
  { criteriaId: 8, component: PrmSelect },
];

export default function PatientSelectionPage() {
  const router = useRouter();

  return (
    <div>
      <h1>Criterios de selección de pacientes</h1>
      <Formik
        initialValues={{
          drug: null,
        }}
        onSubmit={() => {
          // TODO:
        }}
      >
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
                {rows.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>
                      <Checkbox
                        inputProps={{ "aria-label": "Checkbox demo" }}
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
          <Box display="flex" justifyContent="end" paddingTop={2}>
            <Button
              onClick={() => {
                // TODO: remove this when submit is done
                console.log("redireccionando a patient interview");
                router.push("patient-interview");
              }}
              variant="contained"
            >
              Continuar
            </Button>
          </Box>
        </Form>
      </Formik>
    </div>
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
