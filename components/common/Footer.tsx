import { ActionIcon, Center, Flex, Image, Stack, Text } from "@mantine/core";
import { IconBrandGithub, IconBrandTwitter } from "@tabler/icons-react";
import { LOGO_IMG } from "../../config/config";
import { footerContainerSx, footerLinkSx } from "./styles";

export const Footer = () => {
  return (
    <Stack sx={footerContainerSx}>
      <Center>
        <Image src={LOGO_IMG} width={40} alt="tierlist.lol logo" />
        <Text ml="md" weight="bold">
          &copy; 2023 tierlist.lol &nbsp; &#128056; &nbsp;
          <Text span size="xs" color="green.4" sx={{ verticalAlign: "middle" }}>
            BoilingSoup
          </Text>
        </Text>
      </Center>
      <Flex sx={{ gap: "10px" }}>
        <ActionIcon component="a" target="_blank" href="https://twitter.com/BoilingSoupDev" sx={footerLinkSx}>
          <IconBrandTwitter color="white" size={20} />
        </ActionIcon>
        <ActionIcon component="a" target="_blank" href="https://github.com/BoilingSoup" sx={footerLinkSx}>
          <IconBrandGithub color="white" size={20} />
        </ActionIcon>
      </Flex>
    </Stack>
  );
};
