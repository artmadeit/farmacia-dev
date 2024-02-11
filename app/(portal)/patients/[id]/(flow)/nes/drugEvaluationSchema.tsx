"use client";
import { requiredMessage } from "@/app/(components)/helpers/requiredMessage";
import yup from "@/app/validation";
import { nesRowSchema } from "./newsRowSchema";
import { NesRow } from "./page";

const includesPrm1 = (val: NesRow) =>
  val.prms.map((x) => x.prm).includes("PRM 1");

export const drugEvaluationSchema = () => {
  return {
    medicine: yup.object().when("necessity", {
      is: includesPrm1,
      then: (schema) => schema.notRequired(),
      otherwise: (schema) => schema.required(requiredMessage),
    }),
    necessity: nesRowSchema(),
    effectivity: yup.object().when("necessity", {
      is: includesPrm1,
      then: (schema) =>
        schema.shape({
          evaluation: yup.string().notRequired(),
          prms: yup.array(),
        }),
      otherwise: (schema) =>
        schema.shape({
          evaluation: yup.string().required(requiredMessage),
          prms: yup.array(),
        }),
    }),
    security: yup.object().when("necessity", {
      is: includesPrm1,
      then: (schema) =>
        schema.shape({
          evaluation: yup.string().notRequired(),
          prms: yup.array(),
        }),
      otherwise: (schema) =>
        schema.shape({
          evaluation: yup.string().required(requiredMessage),
          prms: yup.array(),
        }),
    }),
  };
};
