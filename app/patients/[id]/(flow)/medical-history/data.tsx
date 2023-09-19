export const antecedents = [
  { label: "IMA", name: "IMA" },
  { label: "Diabetes", name: "DIABETES" },
  { label: "Enf. Hepática", name: "ENF_HEPÁTICA" },
  { label: "ACV", name: "ACV" },
  { label: "Enf. Renal", name: "ENF_RENAL" },
  { label: "Úlcera", name: "ÚLCERA" },
  { label: "ICC", name: "ICC" },
  { label: "Obesidad", name: "OBESIDAD" },
  { label: "Enf. tiroides", name: "ENF_TIROIDES" },
];

export const problems = [
  {
    id: "problems_snc",
    label: "SNC",
    items: [
      { label: "Tos", name: "TOS" },
      { label: "Mareos", name: "MAREOS" },
      { label: "Sueño", name: "SUEÑO" },
      { label: "Desvanecimiento", name: "DESVANECIMIENTO" },
      { label: "Visión borrosa", name: "VISIÓN_BORROSA" },
      { label: "Pérdida de apetito", name: "PÉRDIDA_DE_APETITO" },
      { label: "Dolor de cabeza", name: "DOLOR_DE_CABEZA" },
    ],
  },
  {
    label: "Digestivo",
    id: "problems_digestive",
    items: [
      {
        label: "Dolor y/o ardor de estómago",
        name: "DOLOR_ARDOR_ESTOMAGO",
      },
      { label: "Náuseas y/o vómitos", name: "NAUSEAS_VOMITOS" },
      { label: "Diarreas", name: "DIARREAS" },
      { label: "Estreñimiento", name: "ESTREÑIMIENTO" },
      { label: "Sequedad bucal", name: "SEQUEDAD_BUCAL" },
    ],
  },
  {
    label: "Cardiovascular",
    id: "problems_cardio",
    items: [
      { label: "Palpitaciones", name: "PALPITACIONES" },
      { label: "Taquicardia", name: "TAQUICARDIA" },
      { label: "Hipotensión", name: "HIPOTENSIÓN" },
      { label: "Arritmias", name: "ARRITMIAS" },
      { label: "Angina", name: "ANGINA" },
      { label: "Bradicardia", name: "BRADICARDIA" },
      { label: "Hipotensión ortostática", name: "HIPOTENSIÓN_ORTOSTÁTICA" },
    ],
  },
  {
    label: "Otros",
    id: "problems_others",
    items: [
      { label: "Broncoespasmo", name: "BRONCOESPASMO" },
      { label: "Disgeusia", name: "DISGEUSIA" },
      { label: "Angioedema", name: "ANGIOEDEMA" },
      { label: "Neutropenia", name: "NEUTROPENIA" },
      { label: "Proteinuria", name: "PROTEINURIA" },
      { label: "Leucopenia", name: "LEUCOPENIA" },
      { label: "Fatiga", name: "FATIGA" },
      { label: "Impotencia", name: "IMPOTENCIA" },
      { label: "Astenia", name: "ASTENIA" },
    ],
  },
  {
    label: "Ap. Locomotor",
    id: "problems_loc",
    items: [
      { label: "Debilidad muscular", name: "DEBILIDAD MUSCULAR" },
      { label: "Dolores articulares", name: "DOLORES ARTICULARES" },
      { label: "Calambres", name: "CALAMBRES" },
      { label: "Dolor/rigidez de cuello", name: "DOLOR/RIGIDEZ DE CUELLO" },
    ],
  },
  {
    label: "Metabólicas",
    id: "problems_metabolics",
    items: [
      { label: "Hiponatremia", name: "HIPONATREMIA" },
      { label: "Hipopotasemia", name: "HIPOPOTASEMIA" },
      { label: "Hiperglicemia", name: "HIPERGLICEMIA" },
      { label: "Hipercalcemia", name: "HIPERCALCEMIA" },
      { label: "Hipercolesterolemia", name: "HIPERCOLESTEROLEMIA" },
      { label: "Edema", name: "EDEMA" },
      { label: "Hiperpotasemia", name: "HIPERPOTASEMIA" },
    ],
  },
  {
    label: "Piel",
    id: "problems_piel",
    items: [
      { label: "Erupciones", name: "ERUPCIONES" },
      { label: "Prurito", name: "PRURITO" },
      { label: "Rubefacción", name: "RUBEFACCIÓN" },
    ],
  },
];

export const consumptionHabits = [
  {
    label: "Alcohol",
    id: "consumptions_alcohol",
    no: { label: "No", name: "NO" },
    types: [
      { label: "Eventual", name: "EVENTUALLY" },
      { label: "1/4-1/2 vasos/día", name: "1/4-1/2 VASOS/DIA" },
      { label: "1 o más vasos/día", name: "1 O MAS VASOS/DIA" },
    ],
  },
  {
    label: "Tabaco",
    id: "consumptions_tobacco",
    no: { label: "No", name: "NO" },
    types: [
      { label: "Eventual", name: "EVENTUALLY" },
      { label: "1/2 cajetilla/día", name: "1/2 CAJETILLA/DIA" },
      { label: "1 cajetilla/día", name: "1 CAJETILLA/DIA" },
      { label: "Más de 1 cajetilla/día", name: "MAS DE 1 CAJETILLA/DIA" },
    ],
  },
  {
    label: "Té",
    id: "consumptions_tea",
    no: { label: "No", name: "NO" },
    types: [
      { label: "Eventual", name: "EVENTUALLY" },
      { label: "1/2 tazas/día", name: "1/2 TAZAS/DÍA" },
      { label: "Más de 3 tazas/día", name: "MAS DE 3 TAZAS/DÍA" },
    ],
  },
];
