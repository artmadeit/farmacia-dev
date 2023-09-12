"use client";

import React from "react";
import useSWR from "swr";
import PatientForm from "../create/PatientForm";

const EditPatient = ({ params }: { params: { id: number } }) => {
  const { id } = params;
  const { data: patient } = useSWR(id ? `patients/${id}` : null);

  if(!patient) return <div>Loading</div>
  return <PatientForm patient={patient} />;
};

export default EditPatient;
