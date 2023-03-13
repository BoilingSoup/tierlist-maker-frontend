import { create } from "zustand";
import { SignInFormFields, SignInFormValues } from "../auth/types";

type SignInFormStore = {
  values: SignInFormValues;
  update(data: SignInFormUpdate): void;
  reset(): void;
};

type SignInFormUpdate = { input: SignInFormFields; value: string };

export const signInFormInitialValues: SignInFormValues = {
  username: "",
  password: "",
};

export const useSignInFormStore = create<SignInFormStore>((set) => ({
  values: { ...signInFormInitialValues },
  update: ({ input, value }: SignInFormUpdate) => {
    set((state) => ({ values: { ...state.values, [input]: value } }));
  },
  reset: () => {
    set((state) => ({ ...state, values: signInFormInitialValues }));
  },
}));
