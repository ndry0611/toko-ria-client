import React from "react";
import { Flex, SimpleGrid } from "@mantine/core";
import CategoryCard from "../../../component/category-card";
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
                  item={item}
                  type="admin"
                  
                />
              );
            })}
          </SimpleGrid>
        </Flex>
      )}
    </LoaderView>
  );
}
