import { useFormContext, useWatch } from "react-hook-form";
import { SaleFormType } from "./type";
import React from "react";

export default function GrandTotalHandler() {
  const { control, setValue } = useFormContext<SaleFormType>();
  const [sale_detail] = useWatch({
    control,
    name: ["sale_detail"],
  });
  React.useEffect(() => {
    const grandTotal = sale_detail.reduce((total, item) => {
      return total + item.total_price;
    }, 0);
    setValue("grand_total", grandTotal);
  }, [sale_detail, setValue]);
  return null;
}
