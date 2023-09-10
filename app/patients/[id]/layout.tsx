import { Typography } from "@mui/material";

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

      {children}
    </div>
  );
}
