import { Center, Text, List } from "@mantine/core";
import {
  imageAreaInfoContainerSx,
  imageAreaInfoHeaderSx,
  imageAreaInfoListStyles,
  imageAreaInfoListSx,
} from "../styles";

export const ImageAreaInfo = () => {
  return (
    <Center
      sx={imageAreaInfoContainerSx}
    >
      <Text component="h2" sx={imageAreaInfoHeaderSx}>
        Add Images Here!
      </Text>
      <br />
      <List sx={imageAreaInfoListSx} styles={imageAreaInfoListStyles}>
        <List.Item>Copy/Paste images or URLs</List.Item>
        <List.Item>Use the button below to add files</List.Item>
      </List>
    </Center>
  );
};
