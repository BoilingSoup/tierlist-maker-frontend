import { create } from "zustand";
import { RegisterFormFields, RegisterFormValues } from "../auth/types";

type RegisterFormStore = {
  values: RegisterFormValues;
  update(data: RegisterFormUpdate): void;
  reset(): void;
};

type RegisterFormUpdate = { input: RegisterFormFields; value: string };

export const initialValues: RegisterFormValues = {
  email: "",
  username: "",
  password: "",
  confirmPassword: "",
};

export const useRegisterFormStore = create<RegisterFormStore>((set) => ({
  values: { ...initialValues },
  update: ({ input, value }: RegisterFormUpdate) => {
    set((state) => ({ values: { ...state.values, [input]: value } }));
  },
  reset: () => {
    set((state) => ({ ...state, values: initialValues }));
  },
}));
