"use client";

import React from "react";
import useSWR from "swr";
import Cie10Form from "../cie10Form";
import Loading from "@/app/(components)/Loading";

const EditCie10Page = ({ params }: { params: { id: number } }) => {
  const { id } = params;

  const { data: disease } = useSWR(id ? `diseases/${id}` : null);

  if (!disease) return <Loading />;
  return <Cie10Form disease={disease} textName="Editar" />;
};

export default EditCie10Page;
