import { Center, Group, Image, Text } from "@mantine/core";
import {
  container404Content,
  page404Sx,
  text404Sx,
} from "../components/common/styles";
import { ERROR_404_IMG } from "../config/config";

const img404Dimensions = 200;

const Custom404 = () => {
  return (
    <Center sx={page404Sx}>
      <Group sx={container404Content}>
        <Image
          src={ERROR_404_IMG}
          height={img404Dimensions}
          width={img404Dimensions}
        />
        <Text sx={text404Sx}>404 Not Found</Text>
      </Group>
    </Center>
  );
};

export default Custom404;
