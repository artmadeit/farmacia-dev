export type Item = { name: string; description: string };

// PRM: es Problema Relacionado com Medicamento
export const PRM_GROUPS = [
  {
    group: "Por Necesidad",
    items: [
      { name: "PRM 1", description: "Necesita medicamento que no usa" },
      { name: "PRM 2", description: "Usa medicamento que no necesita" },
    ],
  },
  {
    group: "Por Efectividad",
    items: [
      {
        name: "PRM 3",
        description: "Inefectividad independiente de la dosis.",
      },
      {
        name: "PRM 4",
        description: "Dosis, intervalo o duración inferior a la necesaria",
      },
    ],
  },
  {
    group: "Por Seguridad",
    items: [
      {
        name: "PRM 5",
        description: "Dosis, intervalo o duración superior a la necesaria.",
      },
      {
        name: "PRM 6",
        description: "Provoca una reacción adversa al medicamento",
      },
    ],
  },
];

const PRM_LIST: Item[] = PRM_GROUPS.flatMap((x) => x.items);
