"use client";

import { apiUrl } from "@/app/(api)/api";
import { useConfirmableRouter } from "@/app/(components)/hook-customization/useConfirmableRouter";
import Loading from "@/app/(components)/Loading";
import EditIcon from "@mui/icons-material/Edit";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import useSWR from "swr";
import { Patient } from "../../create/Patient";
import { HorizontalStepper } from "./HorizontalStepper";
import { NavigationGuardProvider } from "./unsaved-changes/NavigationGuard";

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

  const router = useConfirmableRouter();

  return (
    <NavigationGuardProvider>
      {isLoading || !patient ?
        <Loading /> :
        <div>
          <Box display="flex" alignItems="center">
            <Typography variant="h6" gutterBottom>
              Paciente: {patient.firstName} {patient.lastName}, código:{" "}
              {patient.code}
            </Typography>
            <Tooltip title="Editar">
              <IconButton
                aria-label="edit"
                sx={{ marginLeft: 1, marginBottom: "0.35em" }}
                onClick={() => router.push(`/patients/${id}`)}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
          </Box>
          <HorizontalStepper patientId={id} />
          {children}
        </div>
      }
    </NavigationGuardProvider>
  );
}
