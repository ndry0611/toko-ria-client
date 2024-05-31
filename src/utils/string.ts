import { format } from "date-fns";

export function stringToMoney(input: string | number): string {
  const value = typeof input === "number" ? input : parseFloat(input);
  if (isNaN(value)) return "";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR"
  }).format(value);
}

export function formatDate(date: string) {
  try {
    const result = new Date(date);
    return format(result, "dd/MMMM/yyyy, HH:mm");
  } catch (error: any) {
    console.log("test")
    return error.message;
  }
}
