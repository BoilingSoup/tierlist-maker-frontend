import {
  CSSObject,
  DefaultMantineColor,
  MantineTheme,
  NavLinkStylesParams,
  Styles,
  TextInputStylesNames,
} from "@mantine/core";
import { NAVBAR_HEIGHT } from "../common/styles";
import { PxSize } from "../tierlist/types";

const getAccountNavShellBorder = (colors: MantineTheme["colors"]) =>
  `1px solid ${colors.dark[4]}`;

export const mainContainerSx = ({ colors }: MantineTheme): CSSObject => ({
  height: `calc(100vh - ${NAVBAR_HEIGHT})`,
  width: "100%",
  background: colors.dark[7],
  borderTop: getAccountNavShellBorder(colors),
});

export const accountSideNavSx = ({ colors }: MantineTheme): CSSObject => ({
  height: "100%",
  color: "white",
  width: "20%",
  flexDirection: "column",
  borderRight: getAccountNavShellBorder(colors),
});

export const accountNavLinkSx = ({ colors }: MantineTheme): CSSObject => ({
  height: "70px",
  color: "white",
  "&[data-active]": {
    background: colors.dark[4],
    color: "white",
    ":hover": {
      background: colors.dark[4],
    },
  },
  ":hover": {
    background: colors.dark[6],
  },
});

export const accountNavLinkStyles: Styles<
  | "children"
  | "body"
  | "label"
  | "root"
  | "icon"
  | "rightSection"
  | "description",
  NavLinkStylesParams
> = {
  label: {
    fontSize: "1.0rem",
  },
};

export const mainContentContainerSx: CSSObject = {
  width: "80%",
  overflowY: "auto",
};

export const settingsTitleSx = (): CSSObject => ({
  fontSize: "2rem",
  textAlign: "center",
  color: "white",
});

export const settingsDividerColor: DefaultMantineColor = "dark.4";

export const settingContainerWidth: PxSize = "500px";
export const labelWidth: PxSize = "200px";

export const accountSettingContainerSx = (): CSSObject => ({
  justifyContent: "space-between",
  alignItems: "center",
});

export const getTextInputStyles = ({
  theme,
  isLoading,
  editable,
}: {
  theme: MantineTheme;
  isLoading: boolean;
  editable: boolean;
}): Styles<TextInputStylesNames, Record<string, any>> => ({
  label: {
    color: "white",
    display: "inline-block",
    width: labelWidth,
    fontSize: "1rem",
    marginRight: "3rem",
  },
  wrapper: {
    display: "inline-block",
  },
  input: {
    display: isLoading ? "none" : "default",
    width: "180px",
    padding: 0,
    border: "none",
    ":disabled": {
      background: theme.colors.dark[7],
      cursor: "default",
    },
    fontStyle: editable ? "default" : "italic",
  },
});

export const settingSkeletonSx = ({ colors }: MantineTheme): CSSObject => ({
  ":before": {
    background: colors.dark[5],
  },
  ":after": {
    background: colors.dark[7],
  },
});

export const settingEditIconSx = ({ colors }: MantineTheme): CSSObject => ({
  color: colors.dark[2],
  ":hover": { background: colors.dark[5] },
});

export const disabledSettingEditIconSx = ({
  colors,
}: MantineTheme): CSSObject => ({
  ":disabled": {
    color: colors.dark[2],
    background: colors.dark[7],
    border: "none",
  },
});

export const buttonSkeletonHeight: PxSize = "26px";
