import { useFormContext, useWatch } from "react-hook-form";
import { SaleFormType } from "./type";
import { useGetSpecialPrices } from "../../../../api-hooks/special-price-api";
import React from "react";

export default function SpecialPriceHandler() {
  const { control, setValue } = useFormContext<SaleFormType>();
  const [id_user] = useWatch({
    control,
    name: ["id_user"],
  });
  const { data } = useGetSpecialPrices({ id_user });

  React.useEffect(() => {
    setValue("specialPrices", data || []);
  }, [data, setValue]);

  return null;
}
