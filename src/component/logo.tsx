import { Center, Image, ImageProps } from "@mantine/core";

interface LogoProps extends ImageProps {}

export default function Logo(props: LogoProps) {
  return (
      <Image src={"/logo.svg"} alt="Logo" w={180} {...props} />
  );
}
