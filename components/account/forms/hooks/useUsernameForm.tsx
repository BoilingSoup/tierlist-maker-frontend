import { useForm } from "@mantine/form";
import { useAuth } from "../../../../contexts/AuthProvider";
import { validationRules } from "../../../../hooks/auth/constants";
import { UsernameFormValues } from "../types";

export const useUsernameForm = () => {
  const { user } = useAuth();

  return useForm<UsernameFormValues>({
    initialValues: {
      username: user?.username ?? "",
    },

    validate: {
      username: validationRules.username,
    },
  });
};
