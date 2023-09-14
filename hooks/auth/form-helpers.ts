import { UseFormReturnType } from "@mantine/form";
import { Dispatch, SetStateAction } from "react";
import { FancyInputBaseProps, FancyInputExtendedProps, FancyInputProps } from "../../components/forms/types";

export type FormParam = {
  enableFloatingLabel: boolean;
};

type InputsFocusState = Record<string, boolean>;
type UseFormData<T extends string> = UseFormReturnType<Record<T, string>>;

type InputPropsParam<T extends string, F extends InputsFocusState> = {
  inputField: T;
  form: UseFormData<T>;
  inputsFocusState: F;
  setInputsFocusState: Dispatch<SetStateAction<F>>;
};

export const getInputProps = <T extends string, F extends InputsFocusState>({
  inputField,
  form,
  enableFloatingLabel,
  inputsFocusState,
  setInputsFocusState,
}: InputPropsParam<T, F> & FormParam): FancyInputProps => {
  if (!enableFloatingLabel) {
    return getBaseProps({ inputField, form });
  }

  return getExtendedProps({
    inputField,
    form,
    inputsFocusState,
    setInputsFocusState,
  });
};

// i.e. use default form.getInputProps implementation
const getBaseProps = <T extends string>({
  inputField,
  form,
}: {
  inputField: T;
  form: UseFormData<T>;
}): FancyInputBaseProps => ({
  ...form.getInputProps(inputField),
});

// i.e. override useForm's onBlur & onFocus callbacks and add a `floating` property
const getExtendedProps = <T extends string, F extends InputsFocusState>({
  inputField,
  form,
  setInputsFocusState,
  inputsFocusState,
}: InputPropsParam<T, F>): FancyInputExtendedProps => ({
  ...form.getInputProps(inputField),
  onBlur: blurHandler({ inputField, form, setInputsFocusState }),
  onFocus: focusHandler({ inputField, form, setInputsFocusState }),
  floating: inputsFocusState[inputField] || form.values[inputField] !== "", // i.e. enable floating label when input isFocused || isNotBlank
});

type HandlerParam<T extends string, F extends InputsFocusState> = {
  inputField: T;
  form: UseFormData<T>;
  setInputsFocusState: Dispatch<SetStateAction<F>>;
};

// Update the input field's focus state, then call its onBlur handler (provided by Mantine's useForm)
const blurHandler =
  <T extends string, F extends InputsFocusState>({ inputField, setInputsFocusState, form }: HandlerParam<T, F>) =>
  () => {
    setInputsFocusState((prev): F => ({ ...prev, [inputField]: false }));
    form.getInputProps<T>(inputField).onBlur();
  };

// Update the input field's focus state, then call onFocus handler (provided by Mantine's useForm)
const focusHandler =
  <T extends string, F extends InputsFocusState>({ inputField, setInputsFocusState, form }: HandlerParam<T, F>) =>
  () => {
    setInputsFocusState((prev): F => ({ ...prev, [inputField]: true }));
    form.getInputProps<T>(inputField).onFocus();
  };
