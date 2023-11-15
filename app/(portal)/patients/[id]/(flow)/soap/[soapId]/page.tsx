"use client";
import React from "react";
import useSWR from "swr";
import { TrackingSheetForm } from "../TrackingSheetForm";
import { TrackingSheet } from "../TrackingSheet";

export default function EditSoap({
  params,
}: {
  params: { id: number; soapId: number };
}) {
  const { id: patientId, soapId } = params;

  const { data } = useSWR<TrackingSheet>(soapId ? `/soap/${soapId}` : null);

  const handleSubmit = async () => {
    // TODO:
  };

  if (!data) return <div>Loading...</div>;
  return <TrackingSheetForm initialValues={data} onSubmit={handleSubmit} />;
}
