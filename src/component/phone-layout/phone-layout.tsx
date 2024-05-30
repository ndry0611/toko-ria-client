import { ButtonProps } from "@mantine/core";
import React from "react";

interface PhoneLayoutProps {
  children?: React.ReactNode;
  backButtonProps?: ButtonProps;
  back?: boolean;
  bottomContainer?: React.ReactNode;
}

export default function PhoneLayout(props: PhoneLayoutProps) {}
