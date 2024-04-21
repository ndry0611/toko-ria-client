import React from "react";
import { Flex, Grid, Text } from "@mantine/core";
import CategoryCard from "./component/card-view";
import { CategoryType } from "./component/type";
import { callApi } from "../../../utils/api";
import { useGetCategories } from "../../../api-hooks/category-api";

export default function HomePageAdmin() {
  const query = useGetCategories();
  const { data = [] } = query;
  return (
    <Flex w={"100%"} justify="center">
      <Grid m={"xs"}>
        {data.map((item) => {
          return (
            <Grid.Col span={4} key={item.id}>
              <CategoryCard
                id={item.id}
                name={item.name}
                description={item.description}
                file_name={item.file_name || null}
              />
            </Grid.Col>
          );
        })}
      </Grid>
    </Flex>
  );
}
