import { useForm } from "@mantine/form";
import { usernameError, emailError, passwordError } from "./errorMessages";

export default function useRegisterForm() {
  return useForm({
    initialValues: {
      email: '',
      username: '',
      password: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : emailError),
      username: (value) => (value !== '' ? null : usernameError),
      password: (value) => (value.length > 2 ? null : passwordError),
    }
  });
}
