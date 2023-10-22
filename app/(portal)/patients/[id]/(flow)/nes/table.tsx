import { TableCell } from "@mui/material";

export const nesTableCellsHead1 = [
  <TableCell key={1} sx={{ fontWeight: "bold" }}>
    Datos de farmacoterapia
  </TableCell>,
  <TableCell key={2} sx={{ fontWeight: "bold" }} colSpan={3}>
    Evaluación de datos de farmacoterapia
  </TableCell>,
  <TableCell key={3}></TableCell>,
];

export const nesTableCellsHead2 = [
  <TableCell key={1} rowSpan={2}>
    Medicamentos que consume el paciente
  </TableCell>,
  <TableCell key={2} colSpan={3}>
    Evaluar c/u de los medicamentos si son:
  </TableCell>,
];

export const nesTableCellsHead3 = [
  <TableCell key={1} sx={{ minWidth: 200 }}>
    Necesidad
  </TableCell>,
  <TableCell key={2} sx={{ minWidth: 200 }}>
    Efectividad
  </TableCell>,
  <TableCell key={3} sx={{ minWidth: 200 }}>
    Seguridad
  </TableCell>,
];
