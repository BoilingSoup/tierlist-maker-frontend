import { TextInput, useMantineTheme } from "@mantine/core";
import { getTextInputStyles } from "./styles";

type Props = {
  label: string;
  placeholder: string | undefined;
  isLoading: boolean;
  editable?: boolean;
};

export const SettingTextInput = ({ label, placeholder, isLoading }: Props) => {
  const theme = useMantineTheme();

  return (
    <TextInput
      label={label}
      styles={getTextInputStyles({ theme, isLoading })}
      disabled
      placeholder={placeholder}
      mr={isLoading ? undefined : "md"}
    />
  );
};
