import React from "react";
import { Box, Center, Container, Flex, Loader, Text } from "@mantine/core";
import notification from "../../../component/notification";
import { UseQueryResult } from "@tanstack/react-query";
import { X } from "@phosphor-icons/react";
import { color } from "../../../common/constants/color";

export default function LoaderView<T>(props: {
  query: UseQueryResult<T, Error>;
  children: (data: T) => any;
}) {
  const { query, children } = props;
  const { error, data, isFetching } = query;
  React.useEffect(() => {
    const message = error?.message;
    message &&
      notification.error({
        message,
      });
  }, [error?.message]);

  if (isFetching) {
    return (
      <Container style={{ display: "flex", justifyContent: "center" }}>
        <Loader size={48} mb={24} color={color.mainTheme} />
      </Container>
    );
  }
  if (error?.message)
    return (
      <Center>
        <Flex direction={"column"} justify={"center"}>
          <Center>
            <X size={48} color={color.sentimentNegative} />
            <Text fw={600} fz={24}>
              Error
            </Text>
          </Center>
          <Text fw={400} fz={16}>
            {error.message}
          </Text>
        </Flex>
      </Center>
    );

  if (data === undefined) return data;

  return children(data);
}
