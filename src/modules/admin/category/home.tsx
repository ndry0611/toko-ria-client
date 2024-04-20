import React from "react";
import { Flex, Grid, Text } from "@mantine/core";
import CategoryCard from "./component/card-view";
import { CategoryType } from "./component/type";
import { callApi } from "../../../utils/api";

export default function HomePageAdmin() {
  const [catalog, setCatalog] = React.useState<CategoryType[]>([]);
  React.useEffect(() => {
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
        {catalog.length > 0
          ? catalog.map((item) => {
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
            })
          : <Text>Catalog is empty</Text>}
      </Grid>
    </Flex>
  );
}
