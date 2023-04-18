import { create } from "zustand";
import { SignInFormFields, SignInFormValues } from "../auth/types";

type SignInFormStore = {
  values: SignInFormValues;
  update(data: SignInFormUpdate): void;
  reset(): void;
  rememberMe: boolean;
  setRememberMe(data: boolean): void;
};

type SignInFormUpdate = { input: SignInFormFields; value: string };

export const signInFormInitialValues: SignInFormValues = {
  email: "",
  password: "",
};

export const useSignInFormStore = create<SignInFormStore>((set) => ({
  values: { ...signInFormInitialValues },
  update: ({ input, value }: SignInFormUpdate) => {
    set((state) => ({ values: { ...state.values, [input]: value } }));
  },
  reset: () => {
    set((state) => ({
      ...state,
      values: signInFormInitialValues,
      rememberMe: true,
    }));
  },
  rememberMe: true,
  setRememberMe: (rememberMe: boolean) => {
    set((state) => ({ ...state, rememberMe }));
  },
}));
