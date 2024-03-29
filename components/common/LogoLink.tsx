import { Flex, Image, Text } from "@mantine/core";
import Link from "next/link";
import { homeLinkStyle, logoFlexSx, logoTextSx } from "./styles";

type Props = {
  src: string;
  alt: string;
  text: string;
  href: string;
  width?: number;
  height?: number;
};

export const LogoLink = ({ src, alt, text, href, width = 40, height = 32 }: Props) => {
  return (
    <Link style={homeLinkStyle} href={href} aria-label="Go to home page">
      <Flex sx={logoFlexSx}>
        <Image src={src} alt={alt} width={width} height={height} />
        <Text sx={logoTextSx} component="h1">
          {text}
        </Text>
      </Flex>
    </Link>
  );
};
