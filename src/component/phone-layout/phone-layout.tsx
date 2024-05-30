import { Button, ButtonProps, Card, CardProps, Flex } from "@mantine/core";
import { useRouter } from "next/router";
import React from "react";
import BackButton from "../../modules/admin/component/back-button";

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
  return (
    <>
      <Card shadow="sm" withBorder>
        <Flex
          direction={"row"}
          w={"100%"}
          maw={768}
          m="auto"
          justify={"space-between"}
          align={"center"}
        >
          {!!props.back || !!backButtonProps ? <BackButton /> : <span />}
          <Flex direction={"row"} flex={1} w={"100%"}>
            {props.centerComponent}
          </Flex>
        </Flex>
      </Card>
      <Card
        h={"calc(100dvh - 55px)"}
        style={{
          overflow: "auto",
        }}
        p={0}
        {...props.mainContainerProps}
      >
        <div style={{
          margin: "0px auto",
          width: "100%",
          maxWidth: 768
        }}>{children}</div>
      </Card>
      {bottomContainer}
    </>
  );
}
