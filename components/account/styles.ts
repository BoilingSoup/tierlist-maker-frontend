import {
  CSSObject,
  MantineTheme,
  NavLinkStylesParams,
  Styles,
} from "@mantine/core";
import { NAVBAR_HEIGHT } from "../common/styles";

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
  // height: "100%",
  overflowY: "auto",
};
