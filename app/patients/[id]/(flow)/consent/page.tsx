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

const uppy = new Uppy({
  locale: Spanish,
  restrictions: {
    maxNumberOfFiles: 1,
  },
}).use(Transloadit, {
  assemblyOptions: {
    params: {
      auth: { key: "4a5c4913aceb43ce8df170cf343874db" },
      template_id: "99d5c10e242049c8a089a4306d30698c",
    },
  },
});

export default function ConsentPage() {
  return (
    <div>
      <Title>Firma de consentimiento</Title>
      <Grid container spacing={4}>
        <Grid xs={6}>
          <DragDrop uppy={uppy} />
          <StatusBar uppy={uppy} />
        </Grid>
        <Grid xs={6}>
          <embed
            src="/lala.pdf"
            width="500"
            height="375"
            type="application/pdf"
          />
        </Grid>
      </Grid>
    </div>
  );
}
