import { useRouteError } from "react-router-dom";

import { css } from "#/styled/css/index.mjs";

export function HomeErrorPage() {
  const error = useRouteError();

  return (
    <section
      className={css({
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      })}
    >
      <h1 className={css({ fontSize: "4rem", fontWeight: "bold" })}>Oops!</h1>
      <p className={css({ fontSize: "2rem" })}>
        Sorry, an unexpected error has occurred.
      </p>
      <p>
        <i>{error.statusText ?? error.message}</i>
      </p>
    </section>
  );
}
