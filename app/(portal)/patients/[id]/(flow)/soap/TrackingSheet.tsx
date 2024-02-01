"use client";

import { PicoMedicine } from "../nes/PicoMedicine";
import { DiagnosisNotRelated, DiagnosisRelated } from "../nes/page";
import { PharmaceuticHistoryRow } from "../pharmacotherapy/PharmacotherapyTable";

export type TrackingSheet = {
  history: PharmaceuticHistoryRow[];
  diagnosisRelated: DiagnosisRelated[];
  diagnosisNotRelated: DiagnosisNotRelated[];
  soapRows: {
    problem: string;
    subjective: string;
    objective: string;
    analysis: string;
    plan: string;
  }[];
  picoSheets: PicoMedicine[];
  createDate: Date;
  interviewDate: Date | null;
};

export const emptySoapRow = {
  problem: "",
  subjective: "",
  objective: "",
  analysis: "",
  plan: "",
};
