import { useForm } from "@mantine/form";
import { useAuth } from "../../../../contexts/AuthProvider";
import { validationRules } from "../../../../hooks/auth/constants";
import { EmailFormValues } from "../types";

export const useEmailForm = () => {
  const { user } = useAuth();

  return useForm<EmailFormValues>({
    initialValues: {
      email: user?.email ?? "",
    },

    validate: {
      email: validationRules.email,
    },
  });
};
