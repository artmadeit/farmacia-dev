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
  waitForEncoding: true,
});

export default function ConsentPage() {
  const [uploadUrl, setUploadUrl] = useState<string | ArrayBuffer | null>("");

  // uppy.on("upload-success", (file, response) => {
  //   console.log(file);
  //   console.log(response);

  //   if (response.uploadURL) {
  //     setUploadUrl(response.uploadURL);
  //   }
  // });

  uppy.on("transloadit:result", (stepName, result: any) => {
    console.log("lalala");
    const file = uppy.getFile(result.localId);
    console.log({ file });

    var reader = new FileReader();
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
