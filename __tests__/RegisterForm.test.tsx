import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RegisterForm } from "../components/forms/RegisterForm";
import {
  registerFormInitialValues,
  useRegisterFormStore,
} from "../hooks/store/useRegisterFormStore";
import { renderWithContexts } from "../test-utils/render";

const emailValidationError = /invalid email/i;
const usernameValidationError = /username must be between 4-20 characters/i;
const passwordValidationError =
  /password length must be at least 8 characters/i;
const passwordConfirmationValidationError = /password does not match/i;

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

const getFormByRole = () => {
  return screen.getByRole("form", { name: /registration form/i });
};

beforeEach(() => {
  // reset zustand state between tests
  useRegisterFormStore.setState(
    (state) => ({ ...state, values: { ...registerFormInitialValues } }),
    true
  );
});

describe("Register form", () => {
  test("has accessible role", () => {
    renderWithContexts(<RegisterForm />);

    const form = getFormByRole();

    expect(form).toBeInTheDocument();
  });

  test("initially does not show any validation errors", () => {
    renderWithContexts(<RegisterForm />);
    const form = getFormByRole();
    const allValidationErrors = [
      emailValidationError,
      usernameValidationError,
      passwordValidationError,
      passwordConfirmationValidationError,
    ];

    for (const validationError of allValidationErrors) {
      const errorText = within(form).queryByText(validationError);

      expect(errorText).not.toBeInTheDocument();
    }
  });

  test("shows 3 validation errors when empty form is submitted", async () => {
    const user = userEvent.setup();
    renderWithContexts(<RegisterForm />);
    const form = getFormByRole();
    const submitBtn = within(form).getByRole("button", {
      name: /register/i,
    });
    const validationErrors = [
      emailValidationError,
      usernameValidationError,
      passwordValidationError,
    ];

    await user.click(submitBtn);

    for (const validationError of validationErrors) {
      const errorText = within(form).getByText(validationError);

      expect(errorText).toBeInTheDocument();
    }
  });

  describe("E-mail input", () => {
    test("has accessible label", () => {
      renderWithContexts(<RegisterForm />);
      const form = getFormByRole();

      const inputField = within(form).getByLabelText(/e-mail/i);

      expect(inputField).toBeInTheDocument();
    });

    test("shows validation error when input is not a valid email", async () => {
      const user = userEvent.setup();
      renderWithContexts(<RegisterForm />);
      const form = getFormByRole();
      const inputField = within(form).getByLabelText(/e-mail/i);
      const invalidInput = "invalid input";

      await user.click(inputField);
      await user.keyboard(invalidInput);
      await user.click(form); // blur input to trigger validation

      const validationText = within(form).getByText(emailValidationError);
      expect(validationText).toBeInTheDocument();
    });

    test("does not show validation error when input is valid email", async () => {
      const user = userEvent.setup();
      renderWithContexts(<RegisterForm />);
      const form = getFormByRole();
      const inputField = within(form).getByLabelText(/e-mail/i);
      const validInput = "test@test.com";

      await user.click(inputField);
      await user.keyboard(validInput);
      await user.click(form);

      const validationText = within(form).queryByText(emailValidationError);
      expect(validationText).not.toBeInTheDocument();
    });
  });

  describe("Username input", () => {
    test("has accessible label", () => {
      renderWithContexts(<RegisterForm />);
      const form = getFormByRole();

      const inputField = within(form).getByLabelText(/username/i);

      expect(inputField).toBeInTheDocument();
    });

    test("shows validation error when input is less than 4 characters", async () => {
      const user = userEvent.setup();
      renderWithContexts(<RegisterForm />);
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
      renderWithContexts(<RegisterForm />);
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
      renderWithContexts(<RegisterForm />);
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
      renderWithContexts(<RegisterForm />);
      const form = getFormByRole();

      const inputField = within(form).getByLabelText(/^password/i);

      expect(inputField).toBeInTheDocument();
    });

    test("shows validation error when input is less than 8 characters", async () => {
      const user = userEvent.setup();
      renderWithContexts(<RegisterForm />);
      const form = getFormByRole();
      const inputField = within(form).getByLabelText(/^password/i);
      const invalidInput = "7charss";

      await user.click(inputField);
      await user.keyboard(invalidInput);
      await user.click(form);

      const validationText = within(form).getByText(passwordValidationError);
      expect(validationText).toBeInTheDocument();
    });

    test("does not show validation error when input is 8 or more characters", async () => {
      const user = userEvent.setup();
      renderWithContexts(<RegisterForm />);
      const form = getFormByRole();
      const inputField = within(form).getByLabelText(/^password/i);
      const validInput = "validPasswordLength";

      await user.click(inputField);
      await user.keyboard(validInput);
      await user.click(form);

      const validationText = within(form).queryByText(passwordValidationError);
      expect(validationText).not.toBeInTheDocument();
    });
  });

  describe("Confirm Password input", () => {
    test("has accessible label", () => {
      renderWithContexts(<RegisterForm />);
      const form = getFormByRole();

      const inputField = within(form).getByLabelText(/^confirm password/i);

      expect(inputField).toBeInTheDocument();
    });

    test("shows validation error when input does not match password input field", async () => {
      const user = userEvent.setup();
      renderWithContexts(<RegisterForm />);
      const form = getFormByRole();
      const inputField = within(form).getByLabelText(/^confirm password/i);
      const invalidInput = "invalid";

      await user.click(inputField);
      await user.keyboard(invalidInput);
      await user.click(form);

      const validationText = within(form).getByText(
        passwordConfirmationValidationError
      );
      expect(validationText).toBeInTheDocument();
    });

    test("does not show validation error when input matches password input field", async () => {
      const user = userEvent.setup();
      renderWithContexts(<RegisterForm />);
      const form = getFormByRole();
      const passwordInputField = within(form).getByLabelText(/^password/i);
      const confirmPasswordInputField =
        within(form).getByLabelText(/^confirm password/i);
      const validInput = "validPasswordLength";

      await user.click(passwordInputField);
      await user.keyboard(validInput);

      await user.click(confirmPasswordInputField);
      await user.keyboard(validInput);
      await user.click(form);

      const validationText = within(form).queryByText(
        passwordConfirmationValidationError
      );
      expect(validationText).not.toBeInTheDocument();
    });
  });
});
