import {
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

export default function NesPage() {
  return (
    <div>
      <Typography variant="h6">
        PARA LA EVALUACIÓN Y EL ANÁLISIS DE DATOS E IDENTIFICACIÓN DEL PRM.
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Datos de Salud</TableCell>
              <TableCell>Evaluación de datos de salud</TableCell>
              <TableCell>Datos de farmacoterapia</TableCell>
              <TableCell>Evaluación de datos de farmacoterapia</TableCell>
              <TableCell>PRM identificado</TableCell>
            </TableRow>
          </TableHead>
          <TableHead>
            <TableRow>
              <TableCell>Diagnóstico(s)</TableCell>
              <TableCell>
                Signos y sintomas que se relacionan con el Dx
              </TableCell>
              <TableCell>Medicamentos que consume el paciente</TableCell>
              <TableCell>Evaluación de datos de farmacoterapia</TableCell>
              <TableCell>
                De acuerdo a la evaluación realizada determinar el o los PRM
                identificados en el paciente
              </TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
    </div>
  );
}
