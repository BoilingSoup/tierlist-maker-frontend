export type RegisterFormFields =
  | "email"
  | "username"
  | "password"
  | "confirmPassword";
export type RegisterFormValues = Record<RegisterFormFields, string>;

export type SignInFormFields = "username" | "password";
export type SignInFormValues = Record<SignInFormFields, string>;
