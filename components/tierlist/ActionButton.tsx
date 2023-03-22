import { Center, Text } from "@mantine/core";
import { actionButtonsSx } from "./styles";

type Props = {
  icon: JSX.Element;
  text: string;
  onClick?: () => Promise<void>;
};

export const ActionButton = ({ icon, text, onClick: clickHandler }: Props) => {
  return (
    <Center component="button" sx={actionButtonsSx} onClick={clickHandler}>
      {icon}
      <Text>{text}</Text>
    </Center>
  );
};
