"use client";

import React from "react";
import useSWR from "swr";
import DrugForm from "../drugsForm";

const EditDrugs = ({ params }: { params: { id: number } }) => {
  const { id } = params;

  const { data: drugs} = useSWR(id ? `drugs/${id}` : null);

  // if (isLoading) return <h1>Loading 1</h1>;
  if (!drugs) return <h1>Loading 2</h1>;
  return <DrugForm drugs={drugs} />;
};

export default EditDrugs;
