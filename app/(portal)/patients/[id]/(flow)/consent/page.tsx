"use client";

import { Title } from "@/app/(components)/Title";
import Uppy from "@uppy/core";
import { DragDrop, StatusBar } from "@uppy/react";

import "@uppy/core/dist/style.min.css";
import "@uppy/status-bar/dist/style.min.css";
import "@uppy/drag-drop/dist/style.min.css";
import Spanish from "@uppy/locales/lib/es_ES";
import Transloadit from "@uppy/transloadit";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { useState } from "react";
import useSWR from "swr";
import { api } from "@/app/(api)/api";
import { Box, Button, IconButton, Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/navigation";

function createUppy(patientId: number) {
  return new Uppy({
    locale: Spanish,
    restrictions: {
      maxNumberOfFiles: 1,
    },
  }).use(Transloadit, {
    assemblyOptions: {
      params: {
        auth: { key: "36304df90e3b489090286f719c6aa245" },
        template_id: "7403cb05d1bb436a9995a3914ab8f238",
      },
      fields: { patientId },
    },
    waitForEncoding: true,
  });
}

const height = 400;

export default function ConsentPage({ params }: { params: { id: number } }) {
  const { id: patientId } = params;
  const [uppy] = useState(() => createUppy(patientId));
  const router = useRouter();

  const { data: signedUrl, mutate } = useSWR(`patients/${patientId}/consent`, {
    revalidateOnFocus: false,
  });

  uppy.on("transloadit:result", (stepName, result: any) => {
    const file = uppy.getFile(result.localId);

    const reader = new FileReader();
    reader.onload = async function (e) {
      if (e.target) {
        await api.post(`patients/${patientId}/consent`);
        mutate();
        // Useful if we want to save the url, setUploadUrl(e.target.result); check console.log(file) and result

        // remove file so user can upload again
        // replacing the file
        uppy.removeFile(result.localId);
      }
    };
    reader.readAsDataURL(file.data);
  });

  const deleteConsent = async () => {
    await api.delete(`patients/${patientId}/consent`);
    mutate();
  };

  return (
    <div>
      <Title>Firma de consentimiento</Title>
      <Grid container spacing={4}>
        <Grid xs={6} pt={8}>
          <DragDrop uppy={uppy} height={height} />
          <StatusBar uppy={uppy} />
        </Grid>
        <Grid xs={6}>
          {signedUrl && (
            <Stack>
              <Box display="flex" justifyContent="end">
                <IconButton aria-label="delete" onClick={deleteConsent}>
                  <CloseIcon />
                </IconButton>
              </Box>
              <embed src={signedUrl} height={height} type="application/pdf" />
            </Stack>
          )}
        </Grid>
      </Grid>
      <Box display="flex" justifyContent="end" paddingTop={2}>
        <Button
          variant="contained"
          onClick={() => {
            router.push(`/patients/${patientId}/medical-history`);
          }}
        >
          Continuar
        </Button>
      </Box>
    </div>
  );
}
