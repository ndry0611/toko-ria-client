import { differenceInDays, format } from "date-fns";
import { customAlphabet } from "nanoid";

export function stringToMoney(input: string | number): string {
  const value = typeof input === "number" ? input : parseFloat(input);
  if (isNaN(value)) return "";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(value);
}

export function formatDate(date: string | Date, stringFormat?: string) {
  try {
    const result = new Date(date);
    return format(result, stringFormat ?? "dd/MMMM/yyyy, HH:mm");
  } catch (error: any) {
    return error.message;
  }
}

export function calculateDayDifference(date: string, days: number) {
  const dueDate = new Date(date);
  dueDate.setDate(dueDate.getDate() + days);
  const dayDifference = differenceInDays(dueDate, new Date());
  return dayDifference >= 0 ? `${dayDifference} Hari` : "Overdue";
}

export function generateCode() {
  const date = format(new Date(), "d/MM/yy");
  const alphabet =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const code = `${date}/` + customAlphabet(alphabet, 10)();
  return code;
}
