import { Typography } from "@mui/material";
import { HorizontalStepper } from "./HorizontalStepper";
import { apiUrl } from "@/app/(api)/api";
import { Patient } from "../../create/Patient";

export default async function MedicalFlowLayout({
  params,
  children,
}: {
  children: React.ReactNode;
  params: { id: number };
}) {
  const { id } = params;
  const response = await fetch(`${apiUrl}/patients/${id}`, {
    cache: "no-cache",
  });
  const patient: Patient = await response.json();

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Paciente: {patient.firstName} {patient.lastName}
      </Typography>
      <HorizontalStepper />

      {children}
    </div>
  );
}
