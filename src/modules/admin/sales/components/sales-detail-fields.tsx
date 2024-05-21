import {
  useController,
  useFieldArray,
  useFormContext,
  useWatch,
} from "react-hook-form";
import { SaleDetailFormType, SaleFormType } from "./type";
import { useFormState } from "../../../../component/form";
import { ActionIcon, Button, Flex, Text } from "@mantine/core";
import { Plus, Trash } from "@phosphor-icons/react";
import { color } from "../../../../common/constants/color";
import React from "react";
import SparePartSelect from "../../select/spare-part-select";
import Input from "../../../../component/input";
import { PhotoPreview } from "../../../../component/photo-input";
import { PublicImageRoutes } from "../../../../common/constants/route";

const name = "sale_detail" as const;

export function SalesDetailField({
  index,
  remove,
}: {
  index: number;
  remove: () => void;
}) {
  const miw = 180;
  const { disabled } = useFormState();
  const { getValues, setValue, control } = useFormContext<SaleFormType>();
  const parentName = `${name}.${index}` as const;
  const detail = useWatch({
    control,
    name: parentName,
  });
  const isEdit = !!getValues("data");

  const sparepartSelect = React.useMemo(() => {
    const isFirst = index === 0;
    return (
      <SparePartSelect
        miw={miw}
        label={isFirst ? "Barang" : " "}
        name={`${parentName}.id_spare_part`}
        onAfterChange={(value) => {
          setValue(`${parentName}.part_no`, value?.item.part_no || "");
          setValue(
            `${parentName}.file_name`,
            value?.item.file_name || undefined
          );
          setValue(`${parentName}.sell_method`, value?.item.sell_method || "");
          const specialPrices = getValues("specialPrices");
          const specialPrice = specialPrices.find((sPrice) => {
            return sPrice.id_spare_part === value?.item.id;
          });
          const price = specialPrice?.price || value?.item?.sale_price || 0;
          const quantity = getValues(`${parentName}.quantity`);
          setValue(`${parentName}.price`, price);
          setValue(`${parentName}.total_price`, price * quantity);
        }}
        disabled={isEdit}
      />
    );
  }, [getValues, index, isEdit, parentName, setValue]);

  const imageComponent = React.useMemo(() => {
    return (
      <PhotoPreview
        size={64}
        imageUrl={
          detail.file_name
            ? `${PublicImageRoutes.spareParts}${detail.file_name}`
            : ""
        }
      />
    );
  }, [detail.file_name]);

  const partNumberInput = React.useMemo(() => {
    const isFirst = index === 0;
    return (
      <Input
        type="text"
        miw={miw}
        label={isFirst ? "Part Number" : " "}
        name={`${parentName}.part_no`}
        disabled
      />
    );
  }, [index, parentName]);

  const quantityInput = React.useMemo(() => {
    const isFirst = index === 0;
    return (
      <Input
        type="number"
        miw={95}
        label={isFirst ? "Quantity" : " "}
        name={`${parentName}.quantity`}
        rightSection={
          <Text c="gray" fz={12} mr={16}>
            {detail.sell_method}
          </Text>
        }
        disabled={isEdit}
        onAfterChange={(value) => {
          if (typeof value === "number") {
            const price = getValues(`${parentName}.price`);
            const totalPrice = value * price;
            setValue(`${parentName}.total_price`, totalPrice);
          }
        }}
      />
    );
  }, [detail.sell_method, getValues, index, isEdit, parentName, setValue]);

  const priceInput = React.useMemo(() => {
    const isFirst = index === 0;
    return (
      <Input
        type="number"
        miw={miw}
        leftSection="Rp"
        label={isFirst ? "Harga" : " "}
        name={`${parentName}.price`}
        disabled={isEdit}
        onAfterChange={(value) => {
          if (typeof value === "number") {
            const qty = getValues(`${parentName}.quantity`);
            const totalPrice = value * qty;
            setValue(`${parentName}.total_price`, totalPrice);
          }
        }}
      />
    );
  }, [getValues, index, isEdit, parentName, setValue]);

  const totalPriceInput = React.useMemo(() => {
    const isFirst = index === 0;
    return (
      <Input
        type="number"
        miw={miw}
        leftSection="Rp"
        label={isFirst ? "Subtotal" : " "}
        name={`${parentName}.total_price`}
        disabled
      />
    );
  }, [index, parentName]);

  const deleteButton = React.useMemo(() => {
    if (disabled || isEdit) return null;

    return (
      <ActionIcon
        variant="outline"
        onClick={remove}
        style={{
          alignSelf: "center",
        }}
        c={color.mainRed}
      >
        <Trash size={24} />
      </ActionIcon>
    );
  }, [disabled, isEdit, remove]);

  return (
    <>
      {sparepartSelect}
      {partNumberInput}
      {imageComponent}
      {quantityInput}
      {priceInput}
      {totalPriceInput}
      {deleteButton}
    </>
  );
}

export default function SalesDetailFields() {
  const { control, getValues } = useFormContext<SaleFormType>();

  const defaultSaleDetailItem: SaleDetailFormType = {
    id_spare_part: "",
    price: 0,
    quantity: 0,
    total_price: 0,
    file_name: "",
    part_no: "",
    sell_method: "",
  };

  const { disabled } = useFormState();
  const isEdit = !!getValues("data");

  const { fields, append, remove } = useFieldArray({
    name,
    control,
    keyName: "customId",
  });

  const addButton = !isEdit && !disabled && (
    <Button
      mt={16}
      onClick={() => {
        append(defaultSaleDetailItem);
      }}
      variant="outline"
      leftSection={<Plus />}
    >
      Tambah
    </Button>
  );

  return (
    <>
      <Flex
        direction="column"
        gap={16}
        style={{
          overflow: "auto",
          maxHeight: "calc(100dvh - 420px)",
        }}
      >
        {fields.map((field, index) => {
          return (
            <React.Fragment key={field.customId}>
              <Flex direction="row" align="flex-start" gap={16}>
                <SalesDetailField
                  index={index}
                  remove={() => {
                    remove(index);
                  }}
                />
              </Flex>
            </React.Fragment>
          );
        })}
      </Flex>
      <Flex justify={"right"}>{addButton}</Flex>
    </>
  );
}
