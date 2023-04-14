import { useAuth } from "../../../contexts/AuthProvider";
import { EditableUserSetting } from "../EditableUserSetting";

export const UsernameForm = () => {
  const { user, isLoading } = useAuth();
  return (
    <EditableUserSetting
      skeleton={isLoading}
      label="Username"
      placeholder={user?.username}
    />
  );
};
