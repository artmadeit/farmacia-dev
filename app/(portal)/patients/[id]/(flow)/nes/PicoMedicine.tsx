import { PicoRow } from "./PicoRow";

export type PicoMedicine = {
  patient: PicoRow;
  intervention: PicoRow;
  comparison: PicoRow;
  outcome: PicoRow;
  clinicalQ: string;
  strategy: string;
};
