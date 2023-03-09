import { TextInput } from "@mantine/core";
import { useFloatingInputLabel } from "../../hooks/styles/useFloatingInputLabel";
import { FancyInputProps } from "./types";

// If floating prop is undefined, render regular TextInput.
// Else, use floating label animation.
export const FancyInput = ({
  floating,
  ...textInputProps
}: FancyInputProps) => {
  const label = useFloatingInputLabel({
    floating,
  });

  if (label !== undefined && typeof floating === "boolean") {
    return (
      <TextInput {...textInputProps} classNames={label({ floating }).classes} />
    );
  }

  return <TextInput {...textInputProps} classNames={undefined} />;
};
