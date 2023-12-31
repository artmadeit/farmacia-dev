"use client";
import { defaultDate } from "@/app/(components)/InexactDatePicker";

export const emptyHistoryRow = {
  administration: "",
  difficulty: "",
  difficultyJustification: "",
  acceptance: "",
  reasonForUse: "",
  restartDate: { ...defaultDate },
  startDate: { ...defaultDate },
  suspensionDate: { ...defaultDate },
  hasSuspensionDate: true,
  dose: "",
  mode: "",
  drug: "",
};
