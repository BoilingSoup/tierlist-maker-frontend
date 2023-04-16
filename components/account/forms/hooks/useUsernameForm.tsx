import { useForm } from "@mantine/form";
import { useAuth } from "../../../../contexts/AuthProvider";
import { validationRules } from "../../../../hooks/auth/constants";

type FormValues = {
  username: string;
};

export const useUsernameForm = () => {
  const { user } = useAuth();

  return useForm<FormValues>({
    initialValues: {
      username: user?.username ?? "",
    },

    validate: {
      username: validationRules.username,
    },
  });
};
