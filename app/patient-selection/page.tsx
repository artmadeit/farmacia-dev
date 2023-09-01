import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Item, PRM_LIST } from "./prm-groups";

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

const helpReferences = [{ criteriaId: 8, items: PRM_LIST }];

export default function PatientSelectionPage() {
  return (
    <div>
      <h1>Criterios de selección de pacientes</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
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
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell align="right">{row.score}</TableCell>
                <TableCell>
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
  return (
    <div>
      <dl>
        {data.items.map((x) => (
          <>
            <dt>{x.name}</dt>
            <dd>{x.description}</dd>
          </>
        ))}
      </dl>
    </div>
  );
};
