import {
  Box,
  Button,
  Stack,
  Styles,
  TextInputStylesNames,
} from "@mantine/core";
import { useSignInForm } from "../../hooks/auth/useSignInForm";
import { formContentsContainerSx, formStyle } from "../auth/styles";
import { FancyInput } from "./FancyInput";

const fancyInputSx = {
  width: "100%",
  margin: "auto",
};
const inputBoxShadow: Styles<TextInputStylesNames, Record<string, any>> = {
  input: {
    boxShadow: "3px 3px 4px -4px rgba(0,0,0,0.80)",
  },
};
const formControlSx = {
  width: "80%",
  height: "85px",
};

export const SignInForm = () => {
  const form = useSignInForm({ enableFloatingLabel: true });

  return (
    <form style={formStyle} onSubmit={form.onSubmit(console.log)}>
      <Stack sx={formContentsContainerSx}>
        <Box sx={formControlSx}>
          <FancyInput
            withAsterisk
            label="Username"
            sx={fancyInputSx}
            styles={inputBoxShadow}
            {...form.getInputProps("username")}
          />
        </Box>
        <Box sx={formControlSx}>
          <FancyInput
            withAsterisk
            label="Password"
            type="password"
            sx={fancyInputSx}
            styles={inputBoxShadow}
            {...form.getInputProps("password")}
          />
        </Box>
        <Box>
          <Button type="submit">Submit</Button>
        </Box>
        {/* <Center mt={60} sx={{ fontSize: "2rem" }}> */}
        {/*   Oauth stuff goes here */}
        {/* </Center> */}
      </Stack>
    </form>
  );
};
