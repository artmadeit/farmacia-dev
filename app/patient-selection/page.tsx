import {
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
        {PRM_GROUPS.map((x) => (
          <React.Fragment key={x.group}>
            <ListSubheader>{x.group}</ListSubheader>
            {x.items.map((item) => (
              <MenuItem key={item.name} value={item.name}>
                {item.name}: {item.description}
              </MenuItem>
            ))}
          </React.Fragment>
        ))}
      </Select>
    </FormControl>
  );
};

const DrugAutocomplete = () => {
  return <div>hola</div>;
};

const helpReferences = [
  { criteriaId: 1, component: DrugAutocomplete },
  { criteriaId: 8, component: PrmSelect },
];

export default function PatientSelectionPage() {
  return (
    <div>
      <h1>Criterios de selección de pacientes</h1>
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
                  <Checkbox inputProps={{ "aria-label": "Checkbox demo" }} />
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
