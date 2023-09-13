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

export default function ConsentPage({ params }: { params: { id: number } }) {
  const { id: patientId } = params;
  const [uppy] = useState(() => createUppy(patientId));
  const [uploadUrl, setUploadUrl] = useState<string | ArrayBuffer | null>("");

  uppy.on("transloadit:result", (stepName, result: any) => {
    const file = uppy.getFile(result.localId);
    console.log({ file });
    console.log({ result });

    const reader = new FileReader();
    reader.onload = function (e) {
      if (e.target) {
        setUploadUrl(e.target.result);
      }
    };
    reader.readAsDataURL(file.data);
  });

  return (
    <div>
      <Title>Firma de consentimiento</Title>
      <Grid container spacing={4}>
        <Grid xs={6}>
          <DragDrop uppy={uppy} />
          <StatusBar uppy={uppy} />
        </Grid>
        <Grid xs={6}>
          {uploadUrl && (
            <embed
              src={uploadUrl as any}
              width="500"
              height="375"
              type="application/pdf"
            />
          )}
        </Grid>
      </Grid>
    </div>
  );
}
