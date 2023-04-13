import { User } from "../../contexts/AuthProvider";

export const githubInputPlaceholder = "Signed in with GitHub";
export const gitlabInputPlaceholder = "Signed in with GitLab";
export const googleInputPlaceholder = "Signed in with Google";
export const redditInputPlaceholder = "Signed in with Reddit";
export const discordInputPlaceholder = "Signed in with Discord";

export const getInputPlaceholder = (user: User): string | undefined => {
  if (!user) {
    return undefined;
  }

  if (user.email === null) {
    switch (user.oauth_provider) {
      case "GITHUB":
        return githubInputPlaceholder;

      case "GITLAB":
        return gitlabInputPlaceholder;

      case "GOOGLE":
        return googleInputPlaceholder;

      case "REDDIT":
        return redditInputPlaceholder;

      case "DISCORD":
        return discordInputPlaceholder;

      default:
        // NOTE: Should never reach here
        console.error("Something went wrong.");
        return undefined;
    }
  }

  return user.email;
};
