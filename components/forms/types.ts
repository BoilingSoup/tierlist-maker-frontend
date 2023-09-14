import { TextInputProps } from "@mantine/core";

const propKey = "floating";

// Minimum type definition for FancyInput component, these props are always acceptable
export type FancyInputBaseProps = Omit<
  TextInputProps & React.RefAttributes<HTMLInputElement>,
  "className" | "classNames"
>;

// This is the main public prop type definition used in FancyInput.tsx
// floating prop is optional
export type FancyInputProps = FancyInputBaseProps & Partial<Record<typeof propKey, boolean>>; // i.e. floating prop is optional

// This is an internal type definition used by getter functions when floating prop is set to true.
// floating prop is not optional here because the getter knows that it's enabled.
export type FancyInputExtendedProps = FancyInputBaseProps & Record<typeof propKey, boolean>;
