import { useFieldArray, useFormContext } from "react-hook-form";
import { MultipleSpecialPriceFormType, PricesFormType } from "./type";
import { ActionIcon, Button, Flex } from "@mantine/core";
import { Plus, Trash } from "@phosphor-icons/react";
import React from "react";
import UserSelect from "../../select/user-select";
import Input from "../../../../component/input";
import { color } from "../../../../common/constants/color";

const name = "special_prices" as const;

export default function SpecialPricesFields() {
  const { control } = useFormContext<MultipleSpecialPriceFormType>();
  const defaultSpecialPrices: PricesFormType = {
    id_user: "",
    price: 0,
  };
  const { fields, append, remove } = useFieldArray({
    name,
    control,
    keyName: "customId",
  });

  const addButton = (
    <Button
      mt={16}
      onClick={() => append(defaultSpecialPrices)}
      variant="outline"
      leftSection={<Plus />}
    >
      Tambah
    </Button>
  );
  return (
    <>
      <Flex direction={"column"} gap={16}>
        {fields.map((field, index) => {
          return (
            <React.Fragment key={field.customId}>
              <Flex direction="row" align={"flex-start"} gap={16}>
                <SpecialPriceField
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
      <Flex>{addButton}</Flex>
    </>
  );
}

export function SpecialPriceField({
  index,
  remove,
}: {
  index: number;
  remove: () => void;
}) {
  const parentName = `${name}.${index}` as const;

  const userSelect = React.useMemo(() => {
    const isFirst = index === 0;
    return (
      <UserSelect
        label={isFirst ? "Pelanggan" : " "}
        filtering={{ id_role: "2", status: "ACTIVE" }}
        name={`${parentName}.id_user`}
        placeholder="Pilih User"
      />
    );
  }, [index, parentName]);

  const priceField = React.useMemo(() => {
    const isFirst = index === 0;
    return (
      <Input
        type="number"
        label={isFirst ? "Harga Khusus" : " "}
        name={`${parentName}.price`}
      />
    );
  }, [index, parentName]);

  const deleteButton = React.useMemo(() => {
    return (
      <ActionIcon
        variant="outline"
        onClick={remove}
        style={{ alignSelf: "center" }}
        c={color.mainRed}
      >
        <Trash size={24} />
      </ActionIcon>
    );
  }, [remove]);

  return (
    <>
      {userSelect}
      {priceField}
      {deleteButton}
    </>
  );
}
