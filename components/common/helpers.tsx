import { MantineTheme } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconAlertOctagon, IconCheck, IconInfoCircle } from "@tabler/icons-react";
import { formatDistance } from "date-fns";
import { ReactNode } from "react";
import { User } from "../../contexts/AuthProvider";
import { PxSize } from "../tierlist/types";
import { getNotificationStyles } from "./styles";

const emToPx = 16; // 1em === 16px

export const convertThemeBreakpointToPx = (breakpoint: string): number => {
  const smBreakpointEmInt = +breakpoint.split("em").shift()!;
  return smBreakpointEmInt * emToPx;
};

export const pxToNumber = (pxSize: PxSize): number => +pxSize.split("px").shift()!;

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

/** append returns a copy of arr with the provided data inserted at the end of the array */
export const append = <T,>(arr: T[], ...data: T[]) => [...arr, ...data];

type Notification = {
  theme: MantineTheme;
  title: string;
  message: ReactNode;
};

export const showErrorNotification = ({ theme, title, message }: Notification) =>
  showNotification({
    color: "red.9",
    title,
    message,
    styles: getNotificationStyles(theme.colors.red[9]),
    icon: <IconAlertOctagon />,
  });

export const showInfoNotification = ({ theme, title, message }: Notification) =>
  showNotification({
    color: "blue.9",
    title,
    message,
    styles: getNotificationStyles(theme.colors.blue[9]),
    icon: <IconInfoCircle />,
  });

export const showSuccessNotification = ({ theme, title, message }: Notification) =>
  showNotification({
    color: "lime.9",
    title,
    message,
    styles: getNotificationStyles(theme.colors.lime[9]),
    icon: <IconCheck />,
  });

export const showSomethingWentWrongNotification = (theme: MantineTheme) =>
  showErrorNotification({
    theme,
    title: "Error",
    message: "Something went wrong.",
  });

export const showVerifyAccountNotification = ({ theme, user }: { theme: MantineTheme; user: User }) =>
  showInfoNotification({
    theme,
    title: "Verify Account",
    message: `Please verify your account with the email sent to ${user?.email}`,
  });

export const getTimeDiff = (createdAt: string): string => {
  return formatDistance(new Date(createdAt), new Date(), { addSuffix: true });
};

export const capitalize = (input: string) => {
  if (input.length === 0) {
    return "";
  }

  if (input.length === 1) {
    return input[0].toUpperCase();
  }

  return input[0].toUpperCase() + input.slice(1);
};
