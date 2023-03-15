import { Flex, Text } from "@mantine/core";
import { IconBrandGithub } from "@tabler/icons-react";

export const Footer = () => {
  return (
    <Flex
      sx={{
        height: "70px",
        marginTop: "120px",
        color: "white",
        justifyContent: "flex-end",
        alignItems: "center",
        marginRight: "20px",
      }}
    >
      <Text component="p">
        &copy; 2023 tierlist.lol &nbsp;&nbsp;{" "}
        <Text
          component="a"
          href="https://github.com/tierlistlol"
          target="_blank"
          sx={{
            ":hover": {
              textDecoration: "underline",
            },
          }}
        >
          view source on GitHub
          <IconBrandGithub
            style={{
              display: "inline-block",
              verticalAlign: "middle",
              marginLeft: "1ch"
            }}
          />
        </Text>
      </Text>
    </Flex>
  );
};
