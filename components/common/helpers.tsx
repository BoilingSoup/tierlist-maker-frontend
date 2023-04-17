import { MantineTheme } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";
import { getNotificationStyles } from "./styles";

const emToPx = 16; // 1em === 16px

export const convertThemeBreakpointToPx = (breakpoint: string): number => {
  const smBreakpointEmInt = +breakpoint.split("em").shift()!;
  return smBreakpointEmInt * emToPx;
};

/**
 * filterByID accepts an arr of objects that has a property of ["id"], and an id.
 * A new array is returned, excluding all elements in the original array that match the provided id.
 **/
export const filterByID = <T extends { id: U }, U>(arr: T[], id: U): T[] => {
  return arr.filter((item) => item.id !== id);
};

/**
 * findIndexByID accepts an arr of objects that has a property of ["id"], and an id.
 * The index of the first element in the array that matches the provided id will be returned.
 * Otherwise, -1 will be returned.
 */
export const findIndexByID = <T extends { id: U }, U>(arr: T[], id: U) => {
  return arr.findIndex((el) => el.id === id);
};

/** insertAtIndex returns a copy of arr with the provided data inserted at the specified index */
export const insertAtIndex = <T,>(arr: T[], data: T, index: number) => {
  return [...arr.slice(0, index), data, ...arr.slice(index)];
};

/** arrayPush returns a copy of arr with the provided data inserted at the end of the array */
export const append = <T,>(arr: T[], ...data: T[]) => [...arr, ...data];

export const showSomethingWentWrongNotification = () =>
  showNotification({
    color: "red",
    title: "Error",
    message: "Something went wrong.",
  });

export const showSuccessNotification = ({
  theme,
  title,
  message,
}: {
  theme: MantineTheme;
  title: string;
  message: string;
}) =>
  showNotification({
    color: "lime.9",
    title,
    message,
    styles: getNotificationStyles(theme.colors.lime[9]),
    icon: <IconCheck />,
  });
