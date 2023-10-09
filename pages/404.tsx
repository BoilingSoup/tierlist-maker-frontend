import { Center, Group, Image, Text } from "@mantine/core";
import Head from "next/head";
import { container404Content, page404Sx, text404Sx } from "../components/common/styles";
import { ERROR_404_IMG, SITE_NAME } from "../config/config";

const img404Dimensions = 200;

const Custom404 = () => {
  return (
    <>
      <Head>
        <title>404 - {SITE_NAME}</title>
        <meta
          name="description"
          content="The content you are searching for is not found. Try looking for another tier list."
        />
      </Head>

      <Center sx={page404Sx}>
        <Group sx={container404Content}>
          <Image src={ERROR_404_IMG} alt="404 error image" height={img404Dimensions} width={img404Dimensions} />
          <Text sx={text404Sx}>404 Not Found</Text>
        </Group>
      </Center>
    </>
  );
};

export default Custom404;
