"use client";

import { useAuthApi } from "@/app/(api)/api";
import { isString } from "lodash";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { emptyDrugNesEvaluation } from "../../nes/table";
import { emptyHistoryRow } from "../../pharmacotherapy/emptyHistoryRow";
import { TrackingSheet, emptySoapRow } from "../TrackingSheet";
import { TrackingSheetForm } from "../TrackingSheetForm";

const emptyInitialValues: TrackingSheet = {
  history: [{ ...emptyHistoryRow }],
  drugEvaluations: [{ ...emptyDrugNesEvaluation }],
  soapRows: [{ ...emptySoapRow }],
  picoSheets: [],
};
export default function CreateTrackingSheet({
  params,
}: {
  params: { id: number };
}) {
  const { id: patientId } = params;

  const { data: lastInterview } = useSWR<TrackingSheet>(
    patientId ? `/patients/${patientId}/soap/last` : null
  );
  const initialValues = lastInterview || emptyInitialValues;
  const getApi = useAuthApi();
  const router = useRouter();

  const handleSubmit = async (values: TrackingSheet) => {
    const data = {
      history: values.history.map(({ drug, ...rest }) => {
        if (isString(drug)) {
          throw "Medicina inválida";
        }

        return {
          ...rest,
          drugId: drug.id,
        };
      }),
      drugEvaluations: values.drugEvaluations.map(({ medicine, ...rest }) => {
        if (isString(medicine)) {
          throw "Medicina inválida";
        }

        return {
          ...rest,
          medicineId: medicine.id,
        };
      }),
      soapRows: values.soapRows,
      picoSheets: values.picoSheets,
      patientId: patientId,
    };
    const response = getApi().then((api) => api.post("soap", data));
    router.push(`/patients/${patientId}/soap`);
  };

  return (
    <TrackingSheetForm initialValues={initialValues} onSubmit={handleSubmit} />
  );
}
