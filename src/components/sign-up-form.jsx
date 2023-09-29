import { useState, useRef, useEffect } from "react";
import { useNavigation, useActionData, useFetcher } from "react-router-dom";
import { toast } from "react-hot-toast";

import { css } from "#/styled/css/index.mjs";
import Button from "#/components/button.jsx";
import { FormControl, FormLabel, FormInput } from "#/components/form.jsx";

export default function SignUpForm() {
  const fetcher = useFetcher();
  const navigation = useNavigation();
  const data = useActionData();
  const [formState, setFormState] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const confirmPasswordRef = useRef(null);

  const handleClick = () => {
    if (formState.password !== formState.confirmPassword) {
      confirmPasswordRef.current?.setCustomValidity("Passwords do not match");
    } else {
      confirmPasswordRef.current?.setCustomValidity("");
    }
  };

  useEffect(() => {
    if (data && data.status) {
      switch (data.status) {
        case "error": {
          switch (data.code) {
            case "auth/passwords-dont-match":
              confirmPasswordRef.current?.setCustomValidity(data.message);
              break;
            case "auth/email-already-in-use":
              toast.error(data.message);
              break;
            case "something-went-wrong":
              toast.error(data.message);
              break;
            default:
              confirmPasswordRef.current?.setCustomValidity("");
              break;
          }
          break;
        }
        case "success": {
          toast.success(data.message);
          break;
        }
      }
    }
  }, [data]);

  return (
    <div
      className={css({
        width: "380px",
        display: "flex",
        flexDirection: "column",
      })}
    >
      <h2
        className={css({
          margin: "10px 0",
          fontWeight: "bold",
          fontSize: "28px",
        })}
      >
        Don&apos;t have an account?
      </h2>
      <span>Sign up with your email and password</span>
      <fetcher.Form method="POST">
        <fieldset disabled={navigation.state === "submitting"}>
          <FormControl>
            <FormInput
              type="text"
              id="display-name"
              name="displayName"
              minLength="2"
              maxLength="20"
              pattern="^[a-zA-Z0-9]{2,20}$"
              title="Display Name must be between 2 and 20 characters long and can only contain letters and numbers."
              value={formState.displayName}
              onChange={(e) =>
                setFormState({ ...formState, displayName: e.target.value })
              }
              required
            />
            <FormLabel
              data-shrink={formState.displayName.length > 0}
              htmlFor="display-name"
            >
              Display Name
            </FormLabel>
          </FormControl>
          <FormControl>
            <FormInput
              type="email"
              id="email"
              name="email"
              value={formState.email}
              onChange={(e) =>
                setFormState({ ...formState, email: e.target.value })
              }
              required
            />
            <FormLabel data-shrink={formState.email.length > 0} htmlFor="email">
              Email
            </FormLabel>
          </FormControl>
          <FormControl>
            <FormInput
              type="password"
              id="password"
              name="password"
              minLength="8"
              value={formState.password}
              onChange={(e) =>
                setFormState({ ...formState, password: e.target.value })
              }
              required
            />
            <FormLabel
              data-shrink={formState.password.length > 0}
              htmlFor="password"
            >
              Password
            </FormLabel>
          </FormControl>
          <FormControl>
            <FormInput
              ref={confirmPasswordRef}
              type="password"
              id="confirm-password"
              name="confirmPassword"
              minLength="8"
              value={formState.confirmPassword}
              onChange={(e) =>
                setFormState({ ...formState, confirmPassword: e.target.value })
              }
              required
            />
            <FormLabel
              data-shrink={formState.confirmPassword.length > 0}
              htmlFor="confirm-password"
            >
              Confirm Password
            </FormLabel>
          </FormControl>
          <input type="hidden" name="type" value="register" />
          <input type="hidden" name="provider" value="email" />
          <Button type="submit" onClick={handleClick}>
            Sign Up
          </Button>
        </fieldset>
      </fetcher.Form>
    </div>
  );
}
