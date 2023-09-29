import { forwardRef } from "react";

import { css, cx } from "#/styled/css/index.mjs";

const formControl = css({
  position: "relative",
  margin: "45px 0",
});

const input = cx(
  "peer",
  css({
    backgroundColor: "white",
    color: "gray",
    fontSize: "18px",
    padding: "10px 10px 10px 5px",
    display: "block",
    width: "100%",
    borderRadius: "0",
    borderBottom: "1px solid #757575",
    margin: "25px 0",
    _focus: {
      outline: "none",
    },
  }),
);

const inputPassword = css({
  letterSpacing: "0.3em",
});

const label = css({
  color: "gray",
  fontSize: "16px",
  fontWeight: "normal",
  position: "absolute",
  pointerEvents: "none",
  left: "5px",
  top: "10px",
  transition:
    "transform 300ms ease-out, color 300ms ease-out, font-size 300ms ease-out",
  _peerFocus: {
    transform: "translateY(-14px)",
    fontSize: "12px",
    color: "black",
  },
  "&[data-shrink='true']": {
    transform: "translateY(-14px)",
    fontSize: "12px",
    color: "black",
  },
});

function FormControl({ children }) {
  return <div className={formControl}>{children}</div>;
}

const FormInput = forwardRef(function FormInput({ className, ...props }, ref) {
  return (
    <input
      {...props}
      ref={ref}
      className={cx(
        input,
        props.type === "password" && inputPassword,
        className,
      )}
    />
  );
});

const FormLabel = forwardRef(function FormLabel(
  { className, children, ...props },
  ref,
) {
  return (
    <label {...props} className={cx(label, className)} ref={ref}>
      {children}
    </label>
  );
});

export { FormControl, FormLabel, FormInput };
