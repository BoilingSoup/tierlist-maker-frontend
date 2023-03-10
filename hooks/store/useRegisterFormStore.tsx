import { create } from "zustand";
import { RegisterFormFields, RegisterFormValues } from "../auth/types";

type RegisterFormStore = {
  values: RegisterFormValues;
  update(data: RegisterFormUpdate): void;
};

type RegisterFormUpdate = { input: RegisterFormFields; value: string };

export const useRegisterFormStore = create<RegisterFormStore>((set) => ({
  values: {
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  },
  update: ({ input, value }: RegisterFormUpdate) => {
    set((state) => ({ values: { ...state.values, [input]: value } }));
  },
}));
