import { User } from "../../contexts/AuthProvider";

export const githubInputPlaceholder = "GitHub Account";
export const gitlabInputPlaceholder = "GitLab Account";
export const googleInputPlaceholder = "Google Account";
export const redditInputPlaceholder = "Reddit Account";
export const discordInputPlaceholder = "Discord Account";

export const getEmailPlaceholder = (user: User): string | undefined => {
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
