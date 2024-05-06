import { Flex, SimpleGrid, Space } from "@mantine/core";
import { useGetSpareParts } from "../../../api-hooks/sparePart-api";
import ItemPaper from "./component/item-paper";
import TitleText from "../component/title";
import LoaderView from "../component/loader-view";
import CreateButton from "../component/create-button";
import FindButton from "../component/find-button";
import { useForm, useFormContext, useWatch } from "react-hook-form";
import Form from "../../../component/form";
import { useGetCategories } from "../../../api-hooks/category-api";
import Input from "../../../component/input";
import { useGetCarBrand } from "../../../api-hooks/carBrand-api";

export default function SparePartList() {
  const methods = useForm();
  const { getValues } = methods;

  const queryCategory = useGetCategories();
  const { data: categoryData = [] } = queryCategory;
  const categories = categoryData.map((obj) => ({
    value: obj.id.toString(),
    label: obj.name,
  }));

  const queryCarBrand = useGetCarBrand();
  const {data: carBrandData = []} = queryCarBrand;
  const carBrands = carBrandData.map((obj) => ({
    value: obj.id.toString(),
    label: obj.name
  }));

  const params = {
    id_category: getValues("id_category"),
    id_car_brand: getValues("id_car_brand")
  };

  const querySparePart = useGetSpareParts(params);
  const { data: sparePartData = [] } = querySparePart;
  return (
    <>
      <TitleText>Barang</TitleText>
      <Space h={"sm"} />
      <Form methods={methods} onSubmit={() => {}}>
        <SimpleGrid cols={3}>
          <Input type="select" name="id_category" label="Kategori" data={categories} />
          <Input type="select" name="id_car_brand" label="Merk Mobil" data={carBrands} />
        </SimpleGrid>
        <Flex justify={"right"} gap={15} m={5}>
          <FindButton qKey={["get-spare-parts"]} />
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
