"use client";

import { Title } from "@/app/(components)/Title";
import Uppy from "@uppy/core";
import { DragDrop } from "@uppy/react";

import "@uppy/core/dist/style.min.css";
import "@uppy/drag-drop/dist/style.min.css";
import Spanish from "@uppy/locales/lib/es_ES";

const uppy = new Uppy({
  locale: Spanish,
});

export default function ConsentPage() {
  return (
    <div>
      <Title>Firma de consentimiento</Title>
      <DragDrop uppy={uppy} />
    </div>
  );
}
