import { Center, Text, List } from "@mantine/core";
import { useIsDesktopScreen } from "../../common/hooks/useIsDesktopScreen";
import {
  imageAreaInfoContainerSx,
  imageAreaInfoHeaderSx,
  imageAreaInfoListStyles,
  imageAreaInfoListSx,
} from "../styles";

export const ImageAreaInfo = () => {
  const isDesktopScreen = useIsDesktopScreen();

  return (
    <Center sx={imageAreaInfoContainerSx}>
      <Text component="h2" sx={imageAreaInfoHeaderSx}>
        Add Images Here!
      </Text>
      {isDesktopScreen && (
        <>
          <br />
          <List sx={imageAreaInfoListSx} styles={imageAreaInfoListStyles}>
            <List.Item>Copy/Paste images</List.Item>
            <List.Item>Use the button below to add files</List.Item>
          </List>
        </>
      )}
    </Center>
  );
};
