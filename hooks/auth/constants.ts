import { isEmail } from "@mantine/form";

const USERNAME_MIN_LENGTH = 4;
const USERNAME_MAX_LENGTH = 20;
const PASSWORD_MIN_LENGTH = 8;

interface FormWithPassword {
  password: string;
}

export const validationRules = {
  email: isEmail("Invalid email"),
  username: (value: string) =>
    value.length >= USERNAME_MIN_LENGTH && value.length <= USERNAME_MAX_LENGTH
      ? null
      : `username must be between ${USERNAME_MIN_LENGTH}-${USERNAME_MAX_LENGTH} characters long`,
  password: (value: string) =>
    value.length >= PASSWORD_MIN_LENGTH
      ? null
      : `Password length must be at least ${PASSWORD_MIN_LENGTH} characters`,
  confirmPassword: (value: string, allValues: FormWithPassword) =>
    value === allValues.password ? null : "Password does not match",
};
