import {
  CSSObject,
  ListStylesNames,
  MantineTheme,
  Styles,
} from "@mantine/core";

export const sidebarContainerSx = ({ colors }: MantineTheme): CSSObject => ({
  width: "25%",
  backgroundColor: colors.dark[6],
  color: "white",
  flexDirection: "column",
});

export const imageAreaMaxBoundsSx = (): CSSObject => ({
  height: "85%",
  width: "100%",
  flexDirection: "column",
  position: "relative",
});

export const imageAreaContainerSx = ({ colors }: MantineTheme): CSSObject => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: "94%",
  width: "92%",
  border: `2px solid ${colors.dark[2]}`,
  borderRadius: "8px",
  flexDirection: "column",
});

export const scrollContainerSx = (): CSSObject => ({
  height: "100%",
  width: "100%",
  overflow: "auto",
});

export const imagesFlexContainerSx = (): CSSObject => ({
  height: "96%",
  width: "96%",
  flexWrap: "wrap",
  alignContent: "flex-start",
  caretColor: "transparent",
  cursor: "default",
  ":focus-visible": {
    outline: "none",
  },
});

export const imageAreaInfoContainerSx = (): CSSObject => ({
  height: "100%",
  width: "100%",
  flexDirection: "column",
});

export const imageAreaInfoHeaderSx = (): CSSObject => ({ fontSize: "1.8rem" });

export const imageAreaInfoListSx = (): CSSObject => ({
  color: "white",
  fontSize: "1.3rem",
});

export const sidebarImageContainerSx = (): CSSObject => ({
  width: "100px",
  height: "100px",
  overflow: "hidden",
  border: "2px solid white",
  margin: "1px",
});

export const imageAreaInfoListStyles: Styles<
  ListStylesNames,
  Record<string, any>
> = { itemWrapper: { marginTop: "30px" } };

export const addFileButtonAreaSx = (): CSSObject => ({ width: "100%" });

export const addFileButtonSx = ({ colors }: MantineTheme): CSSObject => ({
  width: "100%",
  border: `1px solid ${colors.dark[3]}`,
});

export const actionButtonsGroupSx = (): CSSObject => ({
  width: "100%",
  height: "15%",
  flexWrap: "wrap",
});

export const actionButtonsSx = (theme: MantineTheme): CSSObject => ({
  width: "50%",
  height: "50%",
  color: "white",
  backgroundColor: theme.colors.dark[5],
  borderRadius: "8px",
});
