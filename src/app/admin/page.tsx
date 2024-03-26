"use client";
import { Flex, Grid } from "@mantine/core";
import { useEffect } from "react";
import { getTokenStorage } from "../../hooks/use-token";
import React from "react";
import { callApi } from "../../utils/api";

export interface Category {
  id: number;
  name: string;
  description: string;
  file_name: string | null;
}

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
      <Grid>
        {catalog.map((item) => {
          return (
            <Grid.Col span={4} key={item.id}>
              {item.name}
            </Grid.Col>
          );
        })}
      </Grid>
    </Flex>
  );
}
