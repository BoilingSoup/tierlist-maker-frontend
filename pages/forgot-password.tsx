import { Box, Button, Center, Flex, Loader, Title } from "@mantine/core";
import { NextPage } from "next";
import { FancyInput } from "../components/forms/FancyInput";
import { FormPageBackground } from "../components/forms/FormPageBackground";
import {
  authTitleSx,
  fancyInputSx,
  formContainerSx,
  formControlSx,
  formPageContainerSx,
  formStyle,
  formSubmitControlSx,
  formSubmitGradient,
  formSubmitSx,
  inputStyles,
} from "../components/forms/styles";
import { useSendPasswordResetLinkMutation } from "../hooks/api/useSendPasswordResetLinkMuation";
import { useForgotPasswordForm } from "../hooks/auth/useForgotPasswordForm";

const ForgotPassword: NextPage = () => {
  const form = useForgotPasswordForm({ enableFloatingLabel: true });
  const { mutate: sendPasswordResetLink, isLoading: isMutating } =
    useSendPasswordResetLinkMutation(form);

  return (
    <Center sx={formPageContainerSx}>
      <FormPageBackground />
      <Flex
        sx={{
          ...formContainerSx(),
          height: "clamp(350px, 35%, 420px)",
        }}
      >
        <Title sx={authTitleSx}>Forgot Password</Title>
        <form
          style={{ ...formStyle, margin: "auto" }}
          onSubmit={form.onSubmit((values) => sendPasswordResetLink(values))}
        >
          <Box sx={formControlSx}>
            <FancyInput
              withAsterisk
              label="Email"
              sx={fancyInputSx}
              styles={inputStyles}
              {...form.getInputProps("email")}
              disabled={isMutating}
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
              {isMutating ? <Loader size="xs" /> : "Send Reset Link"}
            </Button>
          </Box>
        </form>
      </Flex>
    </Center>
  );
};

export default ForgotPassword;