"use client";

import React from "react";
import { api } from "@/app/(api)/api";
import { Title } from "@/app/(components)/Title";
import { Button, FormLabel, Grid, Stack } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-mui";
import { useRouter } from "next/navigation";
import PatientForm from "./PatientForm";

export default function CreatePatient() {
  return <PatientForm patient={{ firstName: "", lastName: "", code: "" }} />;
}
