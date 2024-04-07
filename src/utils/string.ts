export function stringToMoney(input: string | number): string {
  const value = typeof input === "number" ? input : parseFloat(input);
  if (isNaN(value)) return "";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
  }).format(value);
}
