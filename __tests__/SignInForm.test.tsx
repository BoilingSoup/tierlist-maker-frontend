import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SignInForm } from "../components/forms/SignInForm";
import {
  signInFormInitialValues,
  useSignInFormStore,
} from "../hooks/store/useSignInFormStore";
import { renderWithContexts } from "../test-utils/render";

const usernameValidationError = /username must be between 4-20 characters/i;
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
    const allValidationErrors = [
      usernameValidationError,
      passwordValidationError,
    ];

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
    const validationErrors = [usernameValidationError, passwordValidationError];

    await user.click(submitBtn);

    for (const validationError of validationErrors) {
      const errorText = within(form).getByText(validationError);

      expect(errorText).toBeInTheDocument();
    }
  });

  describe("Username input", () => {
    test("has accessible label", () => {
      renderWithContexts(<SignInForm />);
      const form = getFormByRole();

      const inputField = within(form).getByLabelText(/username/i);

      expect(inputField).toBeInTheDocument();
    });

    test("shows validation error when input is less than 4 characters", async () => {
      const user = userEvent.setup();
      renderWithContexts(<SignInForm />);
      const form = getFormByRole();
      const inputField = within(form).getByLabelText(/username/i);
      const invalidInput = "3ch";

      await user.click(inputField);
      await user.keyboard(invalidInput);
      await user.click(form);

      const validationText = within(form).getByText(usernameValidationError);
      expect(validationText).toBeInTheDocument();
    });

    test("shows validation error when input is more than 20 characters", async () => {
      const user = userEvent.setup();
      renderWithContexts(<SignInForm />);
      const form = getFormByRole();
      const inputField = within(form).getByLabelText(/username/i);
      const invalidInput = "21characterssssssssss"; // 21 chars

      await user.click(inputField);
      await user.keyboard(invalidInput);
      await user.click(form);

      const validationText = within(form).getByText(usernameValidationError);
      expect(validationText).toBeInTheDocument();
    });

    test("does not show validation error when input is between 4-20 characters", async () => {
      const user = userEvent.setup();
      renderWithContexts(<SignInForm />);
      const form = getFormByRole();
      const inputField = within(form).getByLabelText(/username/i);
      const validInput = "validUsername";

      await user.click(inputField);
      await user.keyboard(validInput);
      await user.click(form);

      const validationText = within(form).queryByText(usernameValidationError);
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
