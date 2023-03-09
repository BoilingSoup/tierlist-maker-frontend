import { screen, within } from "@testing-library/react";
import { renderWithContexts } from "../test-utils/render";
import { Navbar } from "../components/common/Navbar";
import { SITE_NAME } from "../config/config";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: "",
      asPath: "",
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null),
    };
  },
}));

const getHomeLinkByRole = () => {
  return screen.getByRole("link", { name: /go to home page/i });
};

describe("link to home page", () => {
  test("exists in Navbar", () => {
    renderWithContexts(<Navbar />);

    const linkToHome = getHomeLinkByRole();

    expect(linkToHome).toBeInTheDocument();
  });

  test(`contains site name (${SITE_NAME}) as visible header text`, () => {
    renderWithContexts(<Navbar />);

    // sticking to lowercase throughout the app, so using a case sensitive search
    const siteNameHeading = within(getHomeLinkByRole()).getByRole("heading", {
      name: SITE_NAME,
    });

    expect(siteNameHeading).toBeInTheDocument();
  });

  test("contains logo as visible image", () => {
    renderWithContexts(<Navbar />);

    const logoImg = within(getHomeLinkByRole()).getByRole("img", {
      name: /logo image/i,
    });

    expect(logoImg).toBeInTheDocument();
  });
});
