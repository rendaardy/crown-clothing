import { redirect, json } from "react-router-dom";

import { signUp, signIn, signInWithGooglePopup } from "#/lib/auth.js";
import { createUserFromAuth } from "#/lib/user.js";

export async function action({ request }) {
  const formData = await request.formData();
  const provider = formData.get("provider");
  const type = formData.get("type");

  switch (provider) {
    case "email": {
      switch (type) {
        case "register": {
          const displayName = formData.get("displayName");
          const email = formData.get("email");
          const password = formData.get("password");
          const confirmPassword = formData.get("confirmPassword");

          if (password !== confirmPassword) {
            return json(
              {
                status: "error",
                code: "auth/passwords-dont-match",
                message: "Passwords do not match",
              },
              { status: 400 },
            );
          }

          try {
            const user = await signUp(email, password);

            await createUserFromAuth({
              uid: user.uid,
              displayName: user.displayName ?? displayName,
              email: user.email,
            });

            return json(
              {
                status: "success",
                code: "auth/email-sign-in-success",
                message: "Signed up successfully",
              },
              { status: 201 },
            );
          } catch (error) {
            if (error.cause.code === "auth/email-already-in-use") {
              return json(
                {
                  status: "error",
                  code: "auth/email-already-in-use",
                  message: "Email already in use",
                },
                { status: 400 },
              );
            } else {
              return json(
                {
                  status: "error",
                  code: "something-went-wrong",
                  message: "Something went wrong",
                },
                { status: 400 },
              );
            }
          }
        }
        case "login": {
          const email = formData.get("email");
          const password = formData.get("password");

          try {
            await signIn(email, password);

            return redirect("/");
          } catch (error) {
            if (error.cause.code === "auth/wrong-password") {
              return json(
                {
                  status: "error",
                  code: "auth/wrong-password",
                  message: "Wrong password",
                },
                { status: 400 },
              );
            } else if (error.cause.code === "auth/user-not-found") {
              return json(
                {
                  status: "error",
                  code: "auth/user-not-found",
                  message: "User not found",
                },
                { status: 400 },
              );
            } else {
              return json(
                {
                  status: "error",
                  code: "something-went-wrong",
                  message: "Something went wrong",
                },
                { status: 400 },
              );
            }
          }
        }
      }
    }
    case "google": {
      try {
        const user = await signInWithGooglePopup();

        await createUserFromAuth({
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
        });

        return redirect("/");
      } catch (error) {
        return json(
          {
            status: "error",
            code: "something-went-wrong",
            message: "Something went wrong",
          },
          { status: 400 },
        );
      }
    }
  }

  return redirect("/");
}
