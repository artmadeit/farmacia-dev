import { Typography } from "@mui/material";
import { HorizontalStepper } from "./HorizontalStepper";

export default function MedicalFlowLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Paciente: Arthur Mauricio
      </Typography>
      <HorizontalStepper />

      {children}
    </div>
  );
}
