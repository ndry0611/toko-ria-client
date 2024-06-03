import { format } from "date-fns";
import { customAlphabet } from "nanoid";
import notification from "../component/notification";

export function stringToMoney(input: string | number): string {
  const value = typeof input === "number" ? input : parseFloat(input);
  if (isNaN(value)) return "";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(value);
}

export function formatDate(date: string | Date) {
  try {
    const result = new Date(date);
    return format(result, "dd/MMMM/yyyy, HH:mm");
  } catch (error: any) {
    return error.message;
  }
}

export function generateCode() {
  const date = format(new Date(), "d/MM/yy");
  const alphabet =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const code = `${date}/` + customAlphabet(alphabet, 10)()
  return code;
}
