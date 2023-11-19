"use client";

import { useAuthApi } from "@/app/(api)/api";
import { isString } from "lodash";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { emptyDrugNesEvaluation } from "../../nes/table";
import { emptyHistoryRow } from "../../pharmacotherapy/emptyHistoryRow";
import { TrackingSheet, emptySoapRow } from "../TrackingSheet";
import { TrackingSheetForm } from "../TrackingSheetForm";

export default function CreateTrackingSheet({
  params,
}: {
  params: { id: number };
}) {
  const { id: patientId } = params;

  const { data: pharmacoterapy } = useSWR(
    patientId ? `/patients/${patientId}/pharmacoterapy` : null
  );
  const { data: nes } = useSWR(patientId ? `/patients/${patientId}/nes` : null);

  const { data: lastInterview } = useSWR<TrackingSheet>(
    pharmacoterapy && nes ? `/patients/${patientId}/soap/last` : null
  );
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

  if (!lastInterview) {
    return <div>Complete las hojas de farmacoterapia y NES</div>;
  }
  return (
    <TrackingSheetForm
      initialValues={{ ...lastInterview, createDate: new Date() }}
      onSubmit={handleSubmit}
    />
  );
}
