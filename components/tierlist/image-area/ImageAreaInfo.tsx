import { Center, Text, List, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import {
  imageAreaInfoContainerSx,
  imageAreaInfoHeaderSx,
  imageAreaInfoListStyles,
  imageAreaInfoListSx,
} from "../styles";

export const ImageAreaInfo = () => {
  const { breakpoints } = useMantineTheme();
  const desktopScreen = useMediaQuery(`(min-width: ${breakpoints.lg})`);

  return (
    <Center sx={imageAreaInfoContainerSx}>
      <Text component="h2" sx={imageAreaInfoHeaderSx}>
        Add Images Here!
      </Text>
      {desktopScreen && (
        <>
          <br />
          <List sx={imageAreaInfoListSx} styles={imageAreaInfoListStyles}>
            <List.Item>Copy/Paste images or URLs</List.Item>
            <List.Item>Use the button below to add files</List.Item>
          </List>
        </>
      )}
    </Center>
  );
};
