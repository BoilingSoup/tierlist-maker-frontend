import { create } from "zustand";
import { SignInFormFields, SignInFormValues } from "../auth/types";

type SignInFormStore = {
  values: SignInFormValues;
  update(data: SignInFormUpdate): void;
};

type SignInFormUpdate = { input: SignInFormFields; value: string };

export const useSignInFormStore = create<SignInFormStore>((set) => ({
  values: {
    username: "",
    password: "",
  },
  update: ({ input, value }: SignInFormUpdate) => {
    set((state) => ({ values: { ...state.values, [input]: value } }));
  },
}));
