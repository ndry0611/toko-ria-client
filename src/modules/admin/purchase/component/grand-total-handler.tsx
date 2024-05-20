import { useFormContext, useWatch } from "react-hook-form";
import { PurchaseFormType } from "./type";
import React from "react";

export default function GrandTotalHandler() {
  const { control, setValue } = useFormContext<PurchaseFormType>();
  const [purchase_detail] = useWatch({
    control,
    name: ["purchase_detail"],
  });
  React.useEffect(() => {
    const grandTotal = purchase_detail.reduce((total, item) => {
      return total + item.total_price;
    }, 0);
    setValue("grand_total", grandTotal);
  }, [purchase_detail, setValue]);
  return null;
}
