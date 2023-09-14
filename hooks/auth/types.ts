export type RegisterFormFields = "email" | "username" | "password" | "password_confirmation";
export type RegisterFormValues = Record<RegisterFormFields, string>;

export type SignInFormFields = "email" | "password";
export type SignInFormValues = Record<SignInFormFields, string>;

export type ForgotPasswordFormFields = "email";
export type ForgotPasswordFormValues = {
  email: string;
};

export type PasswordResetFormFields = "password" | "password_confirmation";

export type PasswordResetFormValues = Record<PasswordResetFormFields, string>;

export type PasswordResetPayload = PasswordResetFormValues & {
  token: string;
  email: string;
};
