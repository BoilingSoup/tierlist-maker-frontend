/** logo image src path, relative to /public directory */
export const LOGO_IMG = "./trollol.png";

/** site name to be displayed in document.title */
export const SITE_NAME = "tierlist.lol";

/** API endpoint */
export const BASE_API = process.env.BASE_API || "localhost/v1";

/** tier list thumbnail image dimensions (px) */
export const THUMBNAIL_WIDTH = 600;
export const THUMBNAIL_HEIGHT = 420;

/** OAuth redirect links */
export const OAUTH_GITHUB_REDIRECT = "http://localhost/github/redirect";
export const OAUTH_GITLAB_REDIRECT = "http://localhost/gitlab/redirect";
export const OAUTH_GOOGLE_REDIRECT = "http://localhost/google/redirect";
export const OAUTH_REDDIT_REDIRECT = "http://localhost/reddit/redirect";
export const OAUTH_DISCORD_REDIRECT = "http://localhost/discord/redirect";

export type OAuthHref =
  | typeof OAUTH_GITHUB_REDIRECT
  | typeof OAUTH_GITLAB_REDIRECT
  | typeof OAUTH_GOOGLE_REDIRECT
  | typeof OAUTH_REDDIT_REDIRECT
  | typeof OAUTH_DISCORD_REDIRECT;
