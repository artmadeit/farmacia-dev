import { format } from "date-fns/fp";

export const formatDate = format("dd/MM/yyyy");
import { subYears } from "date-fns";

export const minYear = subYears(new Date(), 103);

export const today = new Date();
