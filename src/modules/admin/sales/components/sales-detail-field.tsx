import { useController, useFieldArray, useFormContext } from "react-hook-form";
import { SaleDetailFormType, SaleFormType } from "./type";
import { useFormState } from "../../../../component/form";
import { ActionIcon, Button, Flex } from "@mantine/core";
import { Plus, Trash } from "@phosphor-icons/react";
import { color } from "../../../../common/constants/color";
import React from "react";
import SparePartSelect from "../../select/spare-part-select";
import Input from "../../../../component/input";
import { PhotoPreview } from "../../../../component/photo-input";
import { PublicImageRoutes } from "../../../../common/constants/route";

function SaleDetailImage({ name }: { name: string }) {
  const { field } = useController({
    name,
  });

  return (
    <PhotoPreview
      size={64}
      imageUrl={
        field.value ? `${PublicImageRoutes.spareParts}${field.value}` : ""
      }
    />
  );
}

export default function SalesDetailField() {
  const { control, setValue, getValues } = useFormContext<SaleFormType>();

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
  const name = "sale_detail" as const;
  const isEdit = !!getValues("data");
  const miw = 180;

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

  const sparepartSelect = React.useCallback(
    (field: SaleDetailFormType, index: number) => {
      const isFirst = index === 0;
      return (
        <SparePartSelect
          miw={miw}
          label={isFirst ? "Barang" : " "}
          name={`${name}.${index}.id_spare_part`}
          onAfterChange={(value) => {
            setValue(`${name}.${index}.part_no`, value?.item.part_no || "");
            setValue(
              `${name}.${index}.file_name`,
              value?.item.file_name
                ? `${PublicImageRoutes.spareParts}${value.item.file_name}`
                : ""
            );
            setValue(
              `${name}.${index}.sell_method`,
              value?.item.sell_method || ""
            );
            const specialPrices = getValues("specialPrices");
            const specialPrice = specialPrices.find((sPrice) => {
              return sPrice.id_spare_part === value?.item.id;
            });
            const price = specialPrice?.price || value?.item?.sale_price || 0;
            const quantity = getValues(`${name}.${index}.quantity`);
            setValue(`${name}.${index}.price`, price);
            setValue(`${name}.${index}.total_price`, price * quantity);
          }}
          disabled={isEdit}
        />
      );
    },
    [getValues, isEdit, setValue]
  );

  const imageComponent = (index: number) => {
    return <SaleDetailImage name={`${name}.${index}.file_name`} />;
  };

  const partNumberInput = React.useCallback(
    (field: SaleDetailFormType, index: number) => {
      const isFirst = index === 0;
      return (
        <Input
          type="text"
          miw={miw}
          label={isFirst ? "Part Number" : " "}
          name={`${name}.${index}.part_no`}
          disabled
        />
      );
    },
    []
  );

  const quantityInput = React.useCallback(
    (field: SaleDetailFormType, index: number) => {
      const isFirst = index === 0;
      return (
        <Input
          type="number"
          miw={miw}
          label={isFirst ? "Quantity" : " "}
          name={`${name}.${index}.quantity`}
          rightSection={field.sell_method}
          disabled={isEdit}
          onAfterChange={(value) => {
            if (typeof value === "number") {
              const price = getValues(`${name}.${index}.price`);
              const totalPrice = value * price;
              setValue(`${name}.${index}.total_price`, totalPrice);
            }
          }}
        />
      );
    },
    [getValues, isEdit, setValue]
  );

  const priceInput = React.useCallback(
    (field: SaleDetailFormType, index: number) => {
      const isFirst = index === 0;
      return (
        <Input
          type="number"
          miw={miw}
          leftSection="Rp"
          label={isFirst ? "Harga" : " "}
          name={`${name}.${index}.price`}
          disabled={isEdit}
          onAfterChange={(value) => {
            if (typeof value === "number") {
              const qty = getValues(`${name}.${index}.quantity`);
              const totalPrice = value * qty;
              setValue(`${name}.${index}.total_price`, totalPrice);
            }
          }}
        />
      );
    },
    [getValues, isEdit, setValue]
  );

  const totalPriceInput = React.useCallback(
    (field: SaleDetailFormType, index: number) => {
      const isFirst = index === 0;
      return (
        <Input
          type="number"
          miw={miw}
          leftSection="Rp"
          label={isFirst ? "Subtotal" : " "}
          name={`${name}.${index}.total_price`}
          disabled
        />
      );
    },
    []
  );

  const deleteButton = React.useCallback(
    (index: number) => {
      if (disabled || isEdit) return null;

      return (
        <ActionIcon
          variant="subtle"
          onClick={() => {
            remove(index);
          }}
          style={{
            alignSelf: "center",
          }}
          c={color.mainRed}
        >
          <Trash size={24} />
        </ActionIcon>
      );
    },
    [disabled, isEdit, remove]
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
                {sparepartSelect(field, index)}
                {imageComponent(index)}
                {partNumberInput(field, index)}
                {quantityInput(field, index)}
                {priceInput(field, index)}
                {totalPriceInput(field, index)}
                {deleteButton(index)}
              </Flex>
            </React.Fragment>
          );
        })}
      </Flex>
      <Flex justify={"right"}>{addButton}</Flex>
    </>
  );
}
