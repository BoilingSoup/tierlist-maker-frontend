import { TextInput } from "@mantine/core";
import { useFloatingInputLabel } from "../../hooks/styles/useFloatingInputLabel";
import { FancyInputProps } from "./types";

// If floating = undefined, render regular TextInput.

// If floating = true, float label above the input.
// If floating = false, label is inside input.
export const FancyInput = ({ floating, ...textInputProps }: FancyInputProps) => {
  const label = useFloatingInputLabel({
    floating,
  });

  if (label !== undefined && typeof floating === "boolean") {
    return <TextInput {...textInputProps} classNames={label({ floating }).classes} />;
  }

  return <TextInput {...textInputProps} classNames={undefined} />;
};
