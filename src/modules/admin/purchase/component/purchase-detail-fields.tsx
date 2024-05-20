import {
  useFieldArray,
  useFormContext,
  useWatch,
} from "react-hook-form";
import { PurchaseDetailFormType, PurchaseFormType } from "./type";
import { useFormState } from "../../../../component/form";
import { ActionIcon, Button, Flex, Text } from "@mantine/core";
import { Plus, Trash } from "@phosphor-icons/react";
import { color } from "../../../../common/constants/color";
import React from "react";
import SparePartSelect from "../../select/spare-part-select";
import Input from "../../../../component/input";
import { PhotoPreview } from "../../../../component/photo-input";
import { PublicImageRoutes } from "../../../../common/constants/route";

const name = "purchase_detail" as const;

export function PurchasesDetailField({
  index,
  remove,
}: {
  index: number;
  remove: () => void;
}) {
  const miw = 180;
  const { disabled } = useFormState();
  const { getValues, setValue, control } = useFormContext<PurchaseFormType>();
  const parentName = `${name}.${index}` as const;
  const detail = useWatch({
    control,
    name: parentName,
  });
  const isEdit = !!getValues("data");
  console.log(detail)

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
            value?.item.file_name
              ? `${PublicImageRoutes.spareParts}${value.item.file_name}`
              : ""
          );
          setValue(`${parentName}.sell_method`, value?.item.sell_method || "");
          const price = getValues(`${parentName}.price`);
          const discount = getValues(`${parentName}.discount`);
          const priceAfterDiscount = price * ((100 - discount) / 100);

          const quantity = getValues(`${parentName}.quantity`);

          setValue(`${parentName}.total_price`, priceAfterDiscount * quantity);
        }}
        disabled={isEdit}
      />
    );
  }, [getValues, index, isEdit, parentName, setValue]);

  const imageComponent = React.useMemo(() => {
    return <PhotoPreview size={64} imageUrl={detail.file_name || ""} />;
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
        miw={miw}
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
            const discount = getValues(`${parentName}.discount`);
            const priceAfterDiscount = price * ((100 - discount) / 100);
            setValue(`${parentName}.total_price`, priceAfterDiscount * value);
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
            const discount = getValues(`${parentName}.discount`);
            const priceAfterDiscount = value * ((100 - discount) / 100);
            const quantity = getValues(`${parentName}.quantity`);
            setValue(
              `${parentName}.total_price`,
              priceAfterDiscount * quantity
            );
          }
        }}
      />
    );
  }, [getValues, index, isEdit, parentName, setValue]);

  const discountInput = React.useMemo(() => {
    const isFirst = index === 0;
    return (
      <Input
        type="number"
        miw={miw}
        label={isFirst ? "Discount" : " "}
        name={`${parentName}.discount`}
        disabled={isEdit}
        rightSection={<Text mr={16}>%</Text>}
        onAfterChange={(value) => {
          if (typeof value === "number") {
            const price = getValues(`${parentName}.price`);
            const priceAfterDiscount = price * ((100 - value) / 100);
            const quantity = getValues(`${parentName}.quantity`);
            setValue(
              `${parentName}.total_price`,
              priceAfterDiscount * quantity
            );
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
        variant="subtle"
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
      {discountInput}
      {totalPriceInput}
      {deleteButton}
    </>
  );
}

export default function PurchasesDetailFields() {
  const { control, getValues } = useFormContext<PurchaseFormType>();

  const defaultPurchaseDetailItem: PurchaseDetailFormType = {
    id_spare_part: "",
    price: 0,
    quantity: 0,
    total_price: 0,
    file_name: "",
    part_no: "",
    sell_method: "",
    discount: 0,
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
        append(defaultPurchaseDetailItem);
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
                <PurchasesDetailField
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
