import {
  AccordionStylesNames,
  AccordionStylesParams,
  CSSObject,
  DefaultMantineColor,
  MantineTheme,
  NavLinkStylesParams,
  Styles,
  TextInputStylesNames,
} from "@mantine/core";
import { User } from "../../contexts/AuthProvider";
import { NAVBAR_HEIGHT } from "../common/styles";
import { CalcSize, PxSize, RemSize } from "../tierlist/types";

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

export const accountSettingsTitleSx = (): CSSObject => ({
  fontSize: "2rem",
  textAlign: "center",
  color: "white",
});

export const settingDividerColor: DefaultMantineColor = "dark.4";

const settingContainerWidth: PxSize = "500px";
const labelWidth: PxSize = "200px";
const labelMarginRight: RemSize = "3rem";

export const accountSettingContainerSx = (): CSSObject => ({
  justifyContent: "space-between",
  alignItems: "flex-start",
});

const inputLabelStyles: CSSObject = {
  color: "white",
  display: "inline-block",
  width: labelWidth,
  fontSize: "1rem",
  marginRight: labelMarginRight,
};

const inputWrapperStyles = {
  display: "inline-block",
};

export const getTextInputStyles = ({
  theme,
  isLoading,
  user,
}: {
  theme: MantineTheme;
  isLoading: boolean;
  user: User;
}): Styles<TextInputStylesNames, Record<string, any>> => ({
  label: inputLabelStyles,
  wrapper: inputWrapperStyles,
  input: {
    display: isLoading ? "none" : "default",
    width: "180px",
    padding: 0,
    border: "none",
    background: theme.colors.dark[7],
    color: "white",
    ":disabled": {
      background: theme.colors.dark[7],
      cursor: "default",
    },
    fontStyle: user?.oauth_provider ? "italic" : "default",
  },
});

export const skeletonBarHeight: PxSize = "16px";

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
  ":disabled": {
    background: colors.dark[7],
    border: "none",
    color: colors.dark[4],
  },
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

export const compactButtonHeight: PxSize = "26px";

export const settingButtonContainerSx = (): CSSObject => ({
  display: "flex",
  justifyContent: "flex-end",
});

export const emailVerifiedButtonWidth: PxSize = "95.98px";

export const getEmailVerificationButtonWidth = ({
  user,
  isLoading,
}: {
  user: User;
  isLoading: boolean;
}) => {
  if (!isLoading && !user?.email_verified) {
    return "default";
  }

  return emailVerifiedButtonWidth;
};

export const settingButtonSx = ({ colors }: MantineTheme): CSSObject => ({
  border: `1px solid ${colors.dark[4]}`,
  background: colors.dark[6],
  ":hover": {
    background: colors.dark[5],
  },
  ":disabled": {
    color: colors.dark[3],
    background: colors.dark[6],
  },
});

export const getEmailVerificationButtonSx =
  ({ user, isLoading }: { user: User; isLoading: boolean }) =>
  (theme: MantineTheme): CSSObject => {
    if (isLoading || user?.email_verified) {
      const { colors } = theme;

      return {
        border: "none",
        background: colors.dark[6],
        ":hover": {
          background: colors.dark[6],
        },
        ":disabled": {
          background: colors.dark[6],
        },
      };
    }

    return settingButtonSx(theme);
  };

export const emailVerifiedButtonContentsSx = ({
  colors,
}: MantineTheme): CSSObject => ({
  alignItems: "flex-end",
  color: colors.lime[4],
});

export const verifiedCheckSize: PxSize = "20px";

export const accordionCollapsedHeight: PxSize = "151px";

export const getAccountSettingsAccordionStyles = (
  theme: MantineTheme
): Styles<AccordionStylesNames, AccordionStylesParams> => ({
  label: {
    color: "white",
  },
  chevron: {
    color: "white",
  },
  item: {
    margin: "3rem 0",
    border: "none",
    // borderBottom: `1px solid ${theme.colors.dark[4]}`,
  },
  control: {
    background: theme.colors.dark[7],
    borderBottom: `1px solid ${theme.colors.dark[4]}`,
    ":hover": {
      background: theme.colors.dark[7],
    },
  },
  panel: {
    color: "white",
  },
});

export const passwordInputContainerSx = (): CSSObject => ({
  alignItems: "center",
});

export const getPasswordTextInputStyles = ({
  theme,
}: {
  theme: MantineTheme;
}): Styles<TextInputStylesNames, Record<string, any>> => ({
  label: inputLabelStyles,
  wrapper: {
    ...inputWrapperStyles,
    width: `calc(${settingContainerWidth} - ${labelWidth} - ${labelMarginRight})`,
  },
  input: {
    // display: isLoading ? "none" : "default",
    color: "white",
    border: "none",
    background: theme.colors.dark[6],
    ":disabled": {
      cursor: "default",
      background: theme.colors.dark[7],
    },
  },
});

export const changePasswordButtonWidth: PxSize = "140px";

export const passwordInputSkeletonWidth: CalcSize = `calc(${settingContainerWidth} - ${labelWidth} - ${labelMarginRight})`;

export const inputHeight: PxSize = "36px";

export const changeEmailWarningSx = ({ colors }: MantineTheme): CSSObject => ({
  color: colors.yellow[6],
  alignItems: "center",
});

export const loaderSize: PxSize = "20px";
