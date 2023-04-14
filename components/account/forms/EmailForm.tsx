import { useAuth } from "../../../contexts/AuthProvider";
import { EditableUserSetting } from "../EditableUserSetting";
import { getInputPlaceholder } from "../helpers";

export const EmailForm = () => {
  const { user, isLoading } = useAuth();

  const userIsLoaded = !isLoading && user !== null;
  const emailIsEditable = userIsLoaded && user.email !== null;

  return (
    <EditableUserSetting
      skeleton={isLoading}
      label="E-mail"
      placeholder={getInputPlaceholder(user)}
      editable={emailIsEditable}
    />
  );
};
