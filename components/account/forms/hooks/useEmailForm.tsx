import { useForm } from "@mantine/form";
import { useAuth } from "../../../../contexts/AuthProvider";
import { validationRules } from "../../../../hooks/auth/constants";

type FormValues = {
  email: string;
};

export const useEmailForm = () => {
  const { user } = useAuth();

  return useForm<FormValues>({
    initialValues: {
      email: user?.email ?? "",
    },

    validate: {
      email: validationRules.email,
    },
  });
};
