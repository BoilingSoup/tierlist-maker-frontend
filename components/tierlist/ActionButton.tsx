import { Center, Text } from "@mantine/core";
import { actionButtonsSx } from "./styles";

type Props = {
  icon: JSX.Element;
  text: string;
  onClick?: () => any;
};

export const ActionButton = ({ icon, text, onClick: clickHandler }: Props) => {
  return (
    <Center component="button" sx={actionButtonsSx} onClick={clickHandler}>
      {icon}
      <Text
        weight={"bolder"}
        sx={(theme) => ({
          textTransform: "uppercase",
          [`@media (min-width: ${theme.breakpoints.sm})`]: {
            marginLeft: "1ch",
          },
        })}
      >
        {text}
      </Text>
    </Center>
  );
};
