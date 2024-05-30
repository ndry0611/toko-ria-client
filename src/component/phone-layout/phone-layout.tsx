import {
  Button,
  ButtonProps,
  Card,
  CardProps,
  Flex,
  SimpleGrid,
} from "@mantine/core";
import React from "react";
import SimpleBackButton from "../simple-back-button";

interface PhoneLayoutProps {
  children?: React.ReactNode;
  backButtonProps?: ButtonProps;
  back?: boolean;
  bottomContainer?: React.ReactNode;
  centerComponent?: React.ReactNode;
  mainContainerProps?: CardProps;
}

export default function PhoneLayout(props: PhoneLayoutProps) {
  const { children, backButtonProps, bottomContainer } = props;
  const h =!!bottomContainer ?`calc(100dvh - 70px - 70px)` : `calc(100dvh - 70px)`
  return (
    <>
      <Card padding={0} shadow="sm" withBorder mah={70} mih={70}>
        <SimpleGrid
          cols={3}
          w={"100%"}
          maw={768}
          m="auto"
          px={16}
        >
          {!!props.back || !!backButtonProps ? <SimpleBackButton /> : <span />}
          <Flex direction={"row"} justify='center' flex={1} w={"100%"}>
            {props.centerComponent}
          </Flex>
        </SimpleGrid>
      </Card>
      <Card
        mih={h}
        mah={h}
        style={{
          overflow: "auto",
        }}
        p={16}
        {...props.mainContainerProps}
      >
        <div
          style={{
            margin: "0px auto",
            width: "100%",
            maxWidth: 768,
          }}
        >
          {children}
        </div>
      </Card>
      {bottomContainer}
    </>
  );
}
