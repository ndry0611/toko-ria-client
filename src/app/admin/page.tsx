"use client";
import { Flex, Grid } from "@mantine/core";
import { useEffect } from "react";
import React from "react";
import { callApi } from "../../utils/api";
import { Category } from "../../modules/category/type";
import CategoryCard from "../../modules/category/component/card-view";

export default function HomePage() {
  const [catalog, setCatalog] = React.useState<Category[]>([]);
  useEffect(() => {
    try {
      const getCatalog = async () => {
        const result = await callApi({ url: "/category" });
        const data = await result.json();
        setCatalog(data);
      };
      getCatalog();
    } catch (error) {
      //Sent user/admin to 500 page (?)
    }
  }, []);
  return (
    <Flex w={"100%"} justify="center">
      <Grid m={"xs"}>
        {catalog.map((item) => {
          return (
            <Grid.Col span={4} key={item.id}>
              <CategoryCard {...item} />
            </Grid.Col>
          );
        })}
      </Grid>
    </Flex>
  );
}
