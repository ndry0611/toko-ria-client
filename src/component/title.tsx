import { Text } from "@mantine/core";
import React from "react";


export interface TitleTextProps extends React.ComponentProps<typeof Text<'p'>> {}

export default function TitleText(props: TitleTextProps) {
  return <Text fz={26} fw={700} {...props} />;
}
