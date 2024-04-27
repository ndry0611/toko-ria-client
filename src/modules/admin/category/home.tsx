import React from "react";
import { Flex, SimpleGrid } from "@mantine/core";
import CategoryCard from "./component/card-view";
import { useGetCategories } from "../../../api-hooks/category-api";
import LoaderView from "../component/loader-view";

export default function HomePageAdmin() {
  const query = useGetCategories();
  const { data = [] } = query;
  return (
    <LoaderView query={query}>
      {(data) => (
        <Flex w={"100%"} justify="center">
          <SimpleGrid cols={data.length >= 3 ? 3 : data.length} spacing={"lg"}>
            {data.map((item) => {
              return (
                <CategoryCard
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  description={item.description}
                  file_name={item.file_name || null}
                />
              );
            })}
          </SimpleGrid>
        </Flex>
      )}
    </LoaderView>
  );
}
