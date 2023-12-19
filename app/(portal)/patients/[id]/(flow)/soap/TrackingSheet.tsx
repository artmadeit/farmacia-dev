"use client";

import { DrugProduct } from "@/app/(portal)/drugs/pharmaceutical-product/Drug";
import { PicoMedicine } from "../nes/PicoMedicine";
import { DrugTest } from "./create/DrugTest";
import { PharmaceuticHistoryRow } from "../pharmacotherapy/PharmacotherapyTable";

export type TrackingSheet = {
  history: PharmaceuticHistoryRow[];
  drugEvaluations: {
    medicine: string | DrugProduct;
    necessity: DrugTest;
    effectivity: DrugTest;
    security: DrugTest;
  }[];
  soapRows: {
    problem: string;
    subjective: string;
    objective: string;
    analysis: string;
    plan: string;
  }[];
  picoSheets: PicoMedicine[];
  createDate: Date;
};

export const emptySoapRow = {
  problem: "",
  subjective: "",
  objective: "",
  analysis: "",
  plan: "",
};
