"use client";

import { Title } from "@/app/(components)/Title";
import Uppy from "@uppy/core";
import { DragDrop } from "@uppy/react";

import "@uppy/core/dist/style.min.css";
import "@uppy/drag-drop/dist/style.min.css";

const uppy = new Uppy();

export default function ConsentPage() {
  return (
    <div>
      <Title>Firma de consentimiento</Title>
      <DragDrop uppy={uppy} />
    </div>
  );
}
