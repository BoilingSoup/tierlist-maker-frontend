export type RegisterFormFields =
  | "email"
  | "username"
  | "password"
  | "password_confirmation";
export type RegisterFormValues = Record<RegisterFormFields, string>;

export type SignInFormFields = "username" | "password";
export type SignInFormValues = Record<SignInFormFields, string>;
