import { useState, useEffect } from "react";
import {
  Form,
  useNavigation,
  useActionData,
  useSubmit,
} from "react-router-dom";
import { toast } from "react-hot-toast";

import { css } from "#/styled/css/index.mjs";
import Button from "#/components/button.jsx";
import { FormControl, FormLabel, FormInput } from "#/components/form.jsx";

export default function SignInForm() {
  const submit = useSubmit();
  const navigation = useNavigation();
  const data = useActionData();
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (data && data.status && data.status === "error") {
      console.log(data);
      switch (data.code) {
        case "auth/wrong-password":
          toast.error(data.message);
          break;
        case "auth/user-not-found":
          toast.error(data.message);
          break;
        case "something-went-wrong":
          toast.error(data.message);
          break;
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
        Already have an account?
      </h2>
      <span>Sign in with your email and password</span>
      <Form method="POST">
        <fieldset disabled={navigation.state === "submitting"}>
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
              value={formState.password}
              onChange={(e) =>
                setFormState({ ...formState, password: e.target.value })
              }
              minLength="8"
              required
            />
            <FormLabel
              data-shrink={formState.password.length > 0}
              htmlFor="password"
            >
              Password
            </FormLabel>
          </FormControl>
          <input type="hidden" name="type" value="login" />
          <input type="hidden" name="provider" value="email" />
          <div
            className={css({
              display: "flex",
              justifyContent: "space-between",
            })}
          >
            <Button type="submit">Sign In</Button>
            <Button
              type="button"
              variant="google"
              onClick={() => {
                submit({ provider: "google" }, { method: "POST" });
              }}
            >
              Google Sign In
            </Button>
          </div>
        </fieldset>
      </Form>
    </div>
  );
}
