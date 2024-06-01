import { Flex, SimpleGrid } from "@mantine/core";
import { useGetCategories } from "../../api-hooks/category-api";
import Logo from "../../component/logo";
import NavigationBar from "../../component/navigation-bar/navigation-bar";
import PhoneLayout from "../../component/phone-layout/phone-layout";
import LoaderView from "../admin/component/loader-view";
import CategoryCard from "../../component/category-card";


export default function UserHome() {
  const query = useGetCategories();
  const {data = []} = query;
  return (
    <PhoneLayout
      centerComponent={<Logo w={100} />}
      bottomContainer={<NavigationBar />}
    >
      <LoaderView query={query}>
        {(data) => {
          return (
            <Flex w={"100%"} justify={"center"}>
              <SimpleGrid cols={2}>
                {data.map((item) => {
                  return (
                    <CategoryCard item={item} key={item.id} type="user"  />
                  )
                })}
              </SimpleGrid>
            </Flex>
          )
        }}
      </LoaderView>
      
    </PhoneLayout>
  );
}
