"use client";
import React from "react";
import useSWR from "swr";
import { TrackingSheetForm } from "../TrackingSheetForm";
import { TrackingSheet } from "../TrackingSheet";
import { isString } from "lodash";
import { useAuthApi } from "@/app/(api)/api";
import { useRouter } from "next/navigation";
import Loading from "@/app/(components)/Loading";
import { SnackbarContext } from "@/app/(components)/SnackbarContext";

export default function EditSoap({
  params,
}: {
  params: { id: number; soapId: number };
}) {
  const { id: patientId, soapId } = params;
  const getApi = useAuthApi();
  const router = useRouter();
  const alert = React.useContext(SnackbarContext);
  const { data, mutate } = useSWR<TrackingSheet>(
    soapId ? `/soap/${soapId}` : null
  );

  const handleSubmit = async (values: TrackingSheet) => {
    const data = {
      history: values.history.map(({ drug, ...rest }) => {
        if (isString(drug)) {
          throw "Medicina incorrecta";
        }

        return {
          ...rest,
          drugId: drug.id,
        };
      }),
      diagnosisRelated: values.diagnosisRelated.map(
        ({ disease, drugEvaluations, ...rest }) => {
          return {
            ...rest,
            disease,
            drugEvaluations: drugEvaluations.map((drugEvaluation) => {
              return {
                ...drugEvaluation,
                medicineId: isString(drugEvaluation.medicine)
                  ? drugEvaluation.medicine
                  : drugEvaluation.medicine?.id,
              };
            }),
          };
        }
      ),
      diagnosisNotRelated: values.diagnosisNotRelated.map(
        ({ medicine, ...rest }) => {
          return {
            ...rest,
            medicineId: isString(medicine) ? medicine : medicine?.id,
          };
        }
      ),
      soapRows: values.soapRows,
      picoSheets: values.picoSheets,
      patientId: patientId,
      interviewDate: values.interviewDate,
    };
    const response = await getApi().then((api) =>
      api.put(`soap/${soapId}`, data)
    );
    mutate();
    alert.showMessage("Información correctamente editada");
    router.push(`/patients/${patientId}/soap`);
  };

  if (!data) return <Loading />;
  return <TrackingSheetForm initialValues={data} onSubmit={handleSubmit} />;
}
