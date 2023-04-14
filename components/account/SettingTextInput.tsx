import { TextInput, useMantineTheme } from "@mantine/core";
import { getTextInputStyles } from "./styles";

type Props = {
  label: string;
  placeholder: string | undefined;
  isLoading: boolean;
  editable?: boolean;
};

export const SettingTextInput = ({
  label,
  placeholder,
  isLoading,
  editable = true,
}: Props) => {
  const theme = useMantineTheme();

  return (
    <TextInput
      label={label}
      styles={getTextInputStyles({ theme, isLoading, editable })}
      disabled
      placeholder={placeholder}
      mr={isLoading ? undefined : "md"}
    />
  );
};
