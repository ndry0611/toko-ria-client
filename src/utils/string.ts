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

export function formatPhone(input: string) {
  // Remove any non-digit characters
  const digits = input.replace(/\D/g, '');

  // Slice the string into parts and join them with hyphens
  const part1 = digits.slice(0, 4);
  const part2 = digits.slice(4, 8);
  const part3 = digits.slice(8, 12);
  const part4 = digits.slice(12, 13);

  let formattedNumber = part1;
  if (part2) {
    formattedNumber += `-${part2}`;
  }
  if (part3) {
    formattedNumber += `-${part3}`;
  }
  if (part4) {
    formattedNumber += `-${part4}`;
  }

  return formattedNumber;
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
