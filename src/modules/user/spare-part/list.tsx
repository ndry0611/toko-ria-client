import { useRouter } from "next/router";
import PhoneLayout from "../../../component/phone-layout/phone-layout";
import { Flex, SimpleGrid, Text } from "@mantine/core";
import React from "react";
import { SparePartsFilter } from "../../admin/spare-part/component/type";
import { useForm, useWatch } from "react-hook-form";
import { useGetSpareParts } from "../../../api-hooks/spare-part-api";
import Form from "../../../component/form";
import CategorySelect from "../../admin/select/category-select";
import Input from "../../../component/input";
import CarBrandSelect from "../../admin/select/car-brand-select";
import CarSelect from "../../admin/select/car-select";
import NavigationBar from "../../../component/navigation-bar/navigation-bar";
import FindButton from "../../admin/component/find-button";
import LoaderView from "../../admin/component/loader-view";
import ItemPaper from "../component/item-paper";

export default function SparePartPage() {
  return (
    <PhoneLayout
      centerComponent={
        <Text ta={"center"} fw={700} w={"100%"}>
          List Barang
        </Text>
      }
      bottomContainer={<NavigationBar />}
    >
      <SparePartList />
    </PhoneLayout>
  );
}

function SparePartList() {
  const { query, push, pathname } = useRouter();
  const [sparepartFilter, setSparepartFilter] =
    React.useState<SparePartsFilter>({
      id_category: query.id_category as string,
      available: "true",
    });

  const methods = useForm({
    defaultValues: sparepartFilter,
  });

  const [id_car_brand] = useWatch({
    control: methods.control,
    name: ["id_car_brand"],
  });

  const updateQueryString = (values: SparePartsFilter) => {
    if (!values.id_category) {
      push(
        {
          pathname: pathname,
        },
        undefined,
        { shallow: true }
      );
    } else {
      push(
        {
          pathname: pathname,
          query: { ...query, id_category: values.id_category },
        },
        undefined,
        { shallow: true }
      );
    }
  };

  const querySparePart = useGetSpareParts(sparepartFilter);
  const { data: sparePartData = [] } = querySparePart;
  return (
    <>
      <Form
        methods={methods}
        onSubmit={(values) => {
          setSparepartFilter(values);
          updateQueryString(values);
        }}
      >
        <SimpleGrid cols={2}>
          <CategorySelect name="id_category" label="Kategori" />
          <Input type="text" name="name" label="Nama Barang" />
          <CarBrandSelect name="id_car_brand" label="Merk Mobil" />
          <CarSelect
            filtering={{
              id_car_brand,
            }}
            name="id_car"
            label="Nama Mobil"
          />
        </SimpleGrid>
        <Flex gap={16} m={"8px 0px"}>
          <FindButton fullWidth />
        </Flex>
      </Form>
      <Flex direction={"column"} gap={16} mt={8}>
        <LoaderView query={querySparePart}>
          {(sparePartData) =>
            sparePartData.map((item) => {
              return <ItemPaper key={item.id} item={item} />;
            })
          }
        </LoaderView>
      </Flex>
    </>
  );
}
