import { css } from "#/styled/css/index.mjs";
import SignUpForm from "#/components/sign-up-form.jsx";
import SignInForm from "#/components/sign-in-form.jsx";

export function SignInPage() {
  return (
    <section
      className={css({
        width: "900px",
        margin: "30px auto",
        display: "flex",
        justifyContent: "space-between",
      })}
    >
      <SignInForm />
      <SignUpForm />
    </section>
  );
}
