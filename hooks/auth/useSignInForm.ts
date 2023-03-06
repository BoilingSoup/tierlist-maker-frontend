import { useForm } from "@mantine/form";
import { passwordError, usernameError } from "./errorMessages";

export default function useSignInForm() {
  return useForm({
    initialValues: {
      username: '',
      password: '',
    },

    validate: {
      username: (value) => (value !== '' ? null : usernameError),
      password: (value) => (value.length > 2 ? null : passwordError),
    }
  });
}
