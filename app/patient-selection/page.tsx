import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

type Criterio = {
  name: string;
  score: number;
};

const rows: Criterio[] = [
  {
    name: " Pacientes que reciben medicamentos de estrecho margen terapéutico",
    score: 5,
  },
  {
    name: "Pacientes que son vulnerables a los efectos adversos por estar en situación fisiológicamente delicada (Con diagnóstico de insuficiencia renal, hepática)",
    score: 4,
  },
];

export default function PatientSelectionPage() {
  return (
    <div>
      <h1>CRITERIOS DE SELECCIÓN DE PACIENTES</h1>
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
            {rows.map((row, index) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell align="right">{row.score}</TableCell>
                <TableCell>.</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
