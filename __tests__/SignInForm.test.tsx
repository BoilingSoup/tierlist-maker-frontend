import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SignInForm } from "../components/forms/SignInForm";
import {
  signInFormInitialValues,
  useSignInFormStore,
} from "../hooks/store/useSignInFormStore";
import { renderWithContexts } from "../test-utils/render";

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

const emailValidationError = /invalid email/i;
const passwordValidationError =
  /password length must be at least 8 characters/i;

const getFormByRole = () => {
  return screen.getByRole("form", { name: /sign in form/i });
};

beforeEach(() => {
  // reset zustand state between tests
  useSignInFormStore.setState(
    (state) => ({ ...state, values: { ...signInFormInitialValues } }),
    true
  );
});

describe("Sign in form", () => {
  test("has accessible role", () => {
    renderWithContexts(<SignInForm />);

    const form = getFormByRole();

    expect(form).toBeInTheDocument();
  });

  test("initially does not show any validation errors", () => {
    renderWithContexts(<SignInForm />);
    const form = getFormByRole();
    const allValidationErrors = [emailValidationError, passwordValidationError];

    for (const validationError of allValidationErrors) {
      const errorText = within(form).queryByText(validationError);

      expect(errorText).not.toBeInTheDocument();
    }
  });

  test("shows 2 validation errors when empty form is submitted", async () => {
    const user = userEvent.setup();
    renderWithContexts(<SignInForm />);
    const form = getFormByRole();
    const submitBtn = within(form).getByRole("button", {
      name: /sign in/i,
    });
    const validationErrors = [emailValidationError, passwordValidationError];

    await user.click(submitBtn);

    for (const validationError of validationErrors) {
      const errorText = within(form).getByText(validationError);

      expect(errorText).toBeInTheDocument();
    }
  });

  describe("Email input", () => {
    test("has accessible label", () => {
      renderWithContexts(<SignInForm />);
      const form = getFormByRole();

      const inputField = within(form).getByLabelText(/email/i);

      expect(inputField).toBeInTheDocument();
    });

    test("shows validation error when input is not a valid email", async () => {
      const user = userEvent.setup();
      renderWithContexts(<SignInForm />);
      const form = getFormByRole();
      const inputField = within(form).getByLabelText(/email/i);
      const invalidInput = "invalid";

      await user.click(inputField);
      await user.keyboard(invalidInput);
      await user.click(form);

      const validationText = within(form).getByText(emailValidationError);
      expect(validationText).toBeInTheDocument();
    });

    test("does not show validation error when input is a valid email", async () => {
      const user = userEvent.setup();
      renderWithContexts(<SignInForm />);
      const form = getFormByRole();
      const inputField = within(form).getByLabelText(/email/i);
      const validInput = "validEmail@test.com";

      await user.click(inputField);
      await user.keyboard(validInput);
      await user.click(form);

      const validationText = within(form).queryByText(validInput);
      expect(validationText).not.toBeInTheDocument();
    });
  });

  describe("Password input", () => {
    test("has accessible label", () => {
      renderWithContexts(<SignInForm />);
      const form = getFormByRole();

      const inputField = within(form).getByLabelText(/password/i);

      expect(inputField).toBeInTheDocument();
    });

    test("shows validation error when input is less than 8 characters", async () => {
      const user = userEvent.setup();
      renderWithContexts(<SignInForm />);
      const form = getFormByRole();
      const inputField = within(form).getByLabelText(/password/i);
      const invalidInput = "7charss";

      await user.click(inputField);
      await user.keyboard(invalidInput);
      await user.click(form);

      const validationText = within(form).getByText(passwordValidationError);
      expect(validationText).toBeInTheDocument();
    });

    test("does not show validation error when input is 8 or more characters", async () => {
      const user = userEvent.setup();
      renderWithContexts(<SignInForm />);
      const form = getFormByRole();
      const inputField = within(form).getByLabelText(/password/i);
      const validInput = "validPasswordLength";

      await user.click(inputField);
      await user.keyboard(validInput);
      await user.click(form);

      const validationText = within(form).queryByText(passwordValidationError);
      expect(validationText).not.toBeInTheDocument();
    });
  });
});
