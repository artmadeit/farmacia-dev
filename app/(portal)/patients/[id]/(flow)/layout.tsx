"use client";

import { Typography } from "@mui/material";
import { HorizontalStepper } from "./HorizontalStepper";
import { apiUrl } from "@/app/(api)/api";
import { Patient } from "../../create/Patient";
import useSWR from "swr";

export default function MedicalFlowLayout({
  params,
  children,
}: {
  children: React.ReactNode;
  params: { id: number };
}) {
  const { id } = params;
  const { data: patient, isLoading } = useSWR<Patient>(
    `${apiUrl}/patients/${id}`
  );

  if (isLoading || !patient) return <div>Loading</div>;
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Paciente: {patient.firstName} {patient.lastName}, código: {patient.code}
      </Typography>
      <HorizontalStepper patientId={id} />
      {children}
    </div>
  );
}
