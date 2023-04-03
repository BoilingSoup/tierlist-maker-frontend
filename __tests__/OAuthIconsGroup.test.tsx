import { screen } from "@testing-library/react";
import { OAuthIconsGroup } from "../components/forms/OAuthIconsGroup";
import {
  OAUTH_DISCORD_REDIRECT,
  OAUTH_GITHUB_REDIRECT,
  OAUTH_GITLAB_REDIRECT,
  OAUTH_GOOGLE_REDIRECT,
  OAUTH_REDDIT_REDIRECT,
} from "../config/config";
import { renderWithContexts } from "../test-utils/render";

const labelBase = "Sign in with";

describe("OAuth links group", () => {
  test("has GitHub redirect link", () => {
    renderWithContexts(<OAuthIconsGroup />);

    const link = screen.getByLabelText(`${labelBase} GitHub`);

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", OAUTH_GITHUB_REDIRECT);
  });

  test("has GitLab redirect link", () => {
    renderWithContexts(<OAuthIconsGroup />);

    const link = screen.getByLabelText(`${labelBase} GitLab`);

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", OAUTH_GITLAB_REDIRECT);
  });

  test("has Discord redirect link", () => {
    renderWithContexts(<OAuthIconsGroup />);

    const link = screen.getByLabelText(`${labelBase} Discord`);

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", OAUTH_DISCORD_REDIRECT);
  });

  test("has Google redirect link", () => {
    renderWithContexts(<OAuthIconsGroup />);

    const link = screen.getByLabelText(`${labelBase} Google`);

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", OAUTH_GOOGLE_REDIRECT);
  });

  test("has Reddit redirect link", () => {
    renderWithContexts(<OAuthIconsGroup />);

    const link = screen.getByLabelText(`${labelBase} Reddit`);

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", OAUTH_REDDIT_REDIRECT);
  });
});
