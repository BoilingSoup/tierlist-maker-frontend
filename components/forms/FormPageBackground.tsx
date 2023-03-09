import { Box } from "@mantine/core";
import { backdropBoxSx } from "../auth/styles";

export const FormPageBackground = () => (
  <>
    <Box top={10} left={-300} sx={backdropBoxSx} />
    <Box top={200} right={-300} sx={backdropBoxSx} />
    <Box bottom={-300} left={200} sx={backdropBoxSx} />
  </>
);
