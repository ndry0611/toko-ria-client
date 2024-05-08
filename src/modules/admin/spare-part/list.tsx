import { Flex, SimpleGrid, Space } from "@mantine/core";
import { useGetSpareParts } from "../../../api-hooks/spare-part-api";
import ItemPaper from "./component/item-paper";
import TitleText from "../component/title";
import LoaderView from "../component/loader-view";
import CreateButton from "../component/create-button";
import FindButton from "../component/find-button";
import { useForm, useWatch } from "react-hook-form";
import Form from "../../../component/form";
import Input from "../../../component/input";
import React from "react";
import CarSelect from "../select/car-select";
import CategorySelect from "../select/category-select";
import { SparePartsFilter } from "./component/type";
import CarBrandSelect from "../select/car-brand-select";
import { useRouter } from "next/router";

export default function SparePartList() {
  const {query} = useRouter()
  const [sparepartFilter, setSparepartFilter] = React.useState<SparePartsFilter>({
    id_category: query.id_category as string
  });
  const methods = useForm({
    defaultValues: sparepartFilter
  });

  const [id_car_brand] = useWatch({
    control: methods.control,
    name: ["id_car_brand"],
  });

  const querySparePart = useGetSpareParts(sparepartFilter);
  const { data: sparePartData = [] } = querySparePart;
  return (
    <>
      <TitleText>Barang</TitleText>
      <Space h={"sm"} />
      <Form
        methods={methods}
        onSubmit={(values) => {
          setSparepartFilter(values);
        }}
      >
        <SimpleGrid cols={3}>
          <CategorySelect name="id_category" label="Kategori" />
          <CarBrandSelect name="id_car_brand" label="Merk Mobil" />
          <CarSelect
            filtering={{
              id_car_brand,
            }}
            name="id_car"
            label="Nama Mobil"
          />
          <Input type='text' name="name" label="Name" />
        </SimpleGrid>
        <Flex justify={"right"} gap={15} m={"5px 0px"}>
          <FindButton />
          <CreateButton />
        </Flex>
      </Form>
      <Flex direction={"column"} gap={15}>
        <LoaderView query={querySparePart}>
          {(sparePartData) =>
            sparePartData.map((item) => {
              return (
                <ItemPaper
                  key={item.id}
                  id={item.id}
                  SparePartBrand={item.SparePartBrand}
                  name={item.name}
                  part_no={item.part_no}
                  stock={item.stock}
                  is_available={item.is_available}
                  sale_price={item.sale_price}
                  file_name={item.file_name}
                />
              );
            })
          }
        </LoaderView>
      </Flex>
    </>
  );
}
