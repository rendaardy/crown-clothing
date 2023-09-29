import { css, cx } from "#/styled/css/index.mjs";
import { button } from "#/styled/recipes/index.mjs";

export default function Button({
  component = "button",
  variant = "default",
  css: cssProp = {},
  children,
  ...props
}) {
  const classNameStyles = cx(button({ variant }), css(cssProp));
  const Component = component;

  return (
    <Component {...props} className={classNameStyles}>
      {children}
    </Component>
  );
}
