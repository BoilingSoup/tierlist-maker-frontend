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

const getAccountNavShellBorder = (colors: MantineTheme["colors"]) => `1px solid ${colors.dark[4]}`;

export const mainContainerSx = ({ colors }: MantineTheme): CSSObject => ({
  flexDirection: "column",
  height: `calc(100vh - ${NAVBAR_HEIGHT})`,
  width: "100%",
  background: colors.dark[7],
  borderTop: getAccountNavShellBorder(colors),
  "@media (min-width: 62em)": {
    flexDirection: "row",
  },
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
  "children" | "body" | "label" | "root" | "icon" | "rightSection" | "description",
  NavLinkStylesParams
> = {
  label: {
    fontSize: "1.0rem",
  },
};

export const mainContentContainerSx = (): CSSObject => ({
  width: "100%",
  overflowY: "auto",
  "@media (min-width: 62em)": {
    width: "80%",
  },
});

export const accountSettingsTitleSx = (): CSSObject => ({
  fontSize: "2rem",
  textAlign: "center",
  color: "white",
  [`@media (max-width: ${XXXXS_BREAKPOINT})`]: {
    fontSize: "1.6rem",
  },
});

export const settingDividerColor: DefaultMantineColor = "dark.4";

const settingContainerWidth: PxSize = "500px";
const labelWidthLg: PxSize = "200px";
const labelMarginRight: RemSize = "3rem";

const SM_BREAKPOINT = "590px";
const XS_BREAKPOINT = "510px";
const XXS_BREAKPOINT = "470px";
const XXXS_BREAKPOINT = "410px";
const XXXXS_BREAKPOINT = "360px";
const XXXXXS_BREAKPOINT = "345px";
const XXXXXXS_BREAKPOINT = "300px";

const labelStylesSm = {
  width: "160px",
  marginRight: "1rem",
  fontSize: "0.8rem",
};

const labelStylesXs = {
  width: "120px",
  marginRight: "1rem",
  fontSize: "0.8rem",
};

const labelStylesXxs = {
  width: "110px",
  marginRight: "0.9rem",
  fontSize: "0.7rem",
};

const labelStylesXxxs = {
  width: "100px",
  marginRight: "0.9rem",
  fontSize: "0.7rem",
};

const labelStylesXxxxs = {
  width: "80px",
  marginRight: "0.9rem",
  fontSize: "0.7rem",
};

const labelStylesXxxxxs = {
  width: "90px",
  marginRight: "0.9rem",
  fontSize: "0.7rem",
};

const labelStylesXxxxxxs = {
  width: "80px",
  marginRight: "0.8rem",
  fontSize: "0.7rem",
};

export const accountSettingContainerSx = (): CSSObject => ({
  justifyContent: "space-between",
  alignItems: "center",
});

const inputLabelStyles: CSSObject = {
  color: "white",
  display: "inline-block",
  width: labelWidthLg,
  fontSize: "1rem",
  marginRight: labelMarginRight,
  [`@media(max-width: ${SM_BREAKPOINT})`]: labelStylesSm,
  [`@media(max-width: ${XS_BREAKPOINT})`]: labelStylesXs,
  [`@media(max-width: ${XXS_BREAKPOINT})`]: labelStylesXxs,
  [`@media(max-width: ${XXXS_BREAKPOINT})`]: labelStylesXxxs,
  [`@media(max-width: ${XXXXS_BREAKPOINT})`]: labelStylesXxxxs,
  [`@media(max-width: ${XXXXXS_BREAKPOINT})`]: labelStylesXxxxs,
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
      textOverflow: "ellipsis",
    },
    fontStyle: user?.oauth_provider ? "italic" : "default",
    [`@media (max-width: ${XXXS_BREAKPOINT})`]: {
      width: "140px",
    },
    [`@media (max-width: ${XXXXS_BREAKPOINT})`]: {
      fontSize: "0.8rem",
      width: "120px",
    },
    [`@media (max-width: ${XXXXXS_BREAKPOINT})`]: {
      width: "90px",
    },
    [`@media (max-width: ${XXXXXXS_BREAKPOINT})`]: {
      width: "80px",
    },
  },
  error: {
    marginLeft: `calc(${labelWidthLg} + ${labelMarginRight})`,
  },
  root: {
    display: "flex",
    alignItems: "center",
  },
});

export const emailWarnTextSx = ({ fontSizes }: MantineTheme): CSSObject => ({
  fontSize: fontSizes.sm,
  [`@media (max-width: ${XXXS_BREAKPOINT})`]: {
    fontSize: fontSizes.xs,
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

export const disabledSettingEditIconSx = ({ colors }: MantineTheme): CSSObject => ({
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

export const getEmailVerificationButtonWidth = ({ user, isLoading }: { user: User; isLoading: boolean }) => {
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

export const emailVerifiedButtonContentsSx = ({ colors }: MantineTheme): CSSObject => ({
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
  content: {
    padding: 0,
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
    width: `calc(${settingContainerWidth} - ${labelWidthLg} - ${labelMarginRight})`,
    [`@media (max-width: ${SM_BREAKPOINT})`]: {
      width: "290px",
    },
    [`@media (max-width: ${XXS_BREAKPOINT})`]: {
      width: "240px",
    },
    [`@media (max-width: ${XXXS_BREAKPOINT})`]: {
      width: "200px",
    },
    [`@media (max-width: ${XXXXS_BREAKPOINT})`]: {
      width: "160px",
    },
    [`@media (max-width: ${XXXXXS_BREAKPOINT})`]: {
      width: "160px",
    },
    [`@media (max-width: ${XXXXXXS_BREAKPOINT})`]: {
      width: "140px",
    },
  },
  input: {
    color: "white",
    border: "none",
    background: theme.colors.dark[6],
    ":disabled": {
      cursor: "default",
      background: theme.colors.dark[7],
    },
  },
  error: {
    marginLeft: `calc(${labelWidthLg} + ${labelMarginRight})`,
    [`@media (max-width: ${SM_BREAKPOINT})`]: {
      marginLeft: `calc(${labelStylesSm.width} + ${labelStylesSm.marginRight})`,
    },
    [`@media(max-width: ${XS_BREAKPOINT})`]: {
      marginLeft: `calc(${labelStylesXs.width} + ${labelStylesXs.marginRight})`,
    },
    [`@media(max-width: ${XXS_BREAKPOINT})`]: {
      marginLeft: `calc(${labelStylesXxs.width} + ${labelStylesXxs.marginRight})`,
    },
    [`@media(max-width: ${XXXS_BREAKPOINT})`]: {
      marginLeft: `calc(${labelStylesXxxs.width} + ${labelStylesXxxs.marginRight})`,
    },
    [`@media(max-width: ${XXXXS_BREAKPOINT})`]: {
      marginLeft: `calc(${labelStylesXxxxs.width} + ${labelStylesXxxxs.marginRight})`,
    },
    [`@media(max-width: ${XXXXXS_BREAKPOINT})`]: {
      marginLeft: `calc(${labelStylesXxxxxs.width} + ${labelStylesXxxxxs.marginRight})`,
    },
    [`@media(max-width: ${XXXXXXS_BREAKPOINT})`]: {
      marginLeft: `calc(${labelStylesXxxxxxs.width} + ${labelStylesXxxxxxs.marginRight})`,
    },
  },
});

export const changePasswordButtonWidth: PxSize = "140px";

export const passwordInputSkeletonWidth: CalcSize = `calc(${settingContainerWidth} - ${labelWidthLg} - ${labelMarginRight})`;

export const inputHeight: PxSize = "36px";

export const changeEmailWarningSx = ({ colors }: MantineTheme): CSSObject => ({
  color: colors.yellow[6],
  alignItems: "center",
});

export const loaderSize: PxSize = "20px";
