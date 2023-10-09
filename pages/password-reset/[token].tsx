import { Box, Button, Center, Flex, Loader, Title } from "@mantine/core";
import { NextPage } from "next";
import Head from "next/head";
import { useQueryParams } from "../../components/common/hooks/useQueryParams";
import { FancyInput } from "../../components/forms/FancyInput";
import { FormPageBackground } from "../../components/forms/FormPageBackground";
import {
  authTitleSx,
  fancyInputSx,
  formContainerSx,
  formContentsContainerSx,
  formControlSx,
  formPageContainerSx,
  formStyle,
  formSubmitControlSx,
  formSubmitGradient,
  formSubmitSx,
  inputStyles,
} from "../../components/forms/styles";
import { usePasswordResetMutation } from "../../hooks/api/usePasswordResetMutation";
import { usePasswordResetForm } from "../../hooks/auth/usePasswordResetFrom";

const PasswordReset: NextPage = () => {
  const { token, email } = useQueryParams(["token", "email"]);
  const form = usePasswordResetForm({ enableFloatingLabel: true });
  const { mutate: passwordReset, isLoading: isMutating } = usePasswordResetMutation();

  return (
    <>
      <Head>
        <title>Reset Password - tierlist.lol</title>
      </Head>
      <Center sx={formPageContainerSx}>
        <FormPageBackground />
        <Flex
          sx={{
            ...formContainerSx(),
            height: "420px",
          }}
        >
          <Title sx={authTitleSx}>Reset Password</Title>
          <form style={formStyle} onSubmit={form.onSubmit((values) => passwordReset({ ...values, token, email }))}>
            <Flex sx={formContentsContainerSx}>
              <Box sx={formControlSx}>
                <FancyInput
                  withAsterisk
                  label="New Password"
                  type="password"
                  sx={fancyInputSx}
                  styles={inputStyles}
                  {...form.getInputProps("password")}
                />
              </Box>
              <Box sx={formControlSx}>
                <FancyInput
                  withAsterisk
                  label="Confirm New Password"
                  type="password"
                  sx={fancyInputSx}
                  styles={inputStyles}
                  {...form.getInputProps("password_confirmation")}
                />
              </Box>
              <Box sx={formSubmitControlSx}>
                <Button
                  type="submit"
                  sx={formSubmitSx}
                  variant="gradient"
                  gradient={formSubmitGradient}
                  disabled={isMutating}
                >
                  {isMutating ? <Loader size="xs" /> : "Confirm Reset Password"}
                </Button>
              </Box>
            </Flex>
          </form>
        </Flex>
      </Center>
    </>
  );
};

export default PasswordReset;
