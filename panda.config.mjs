import { defineConfig, defineRecipe } from "@pandacss/dev";

const buttonRecipe = defineRecipe({
  className: "button",
  description: "The styles for the Button component",
  base: {
    minWidth: "165px",
    width: "auto",
    height: "50px",
    letterSpacing: "0.5px",
    lineHeight: "50px",
    paddingInline: "35px",
    fontSize: "15px",
    fontFamily: "Open Sans",
    fontWeight: "bold",
    textTransform: "uppercase",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  variants: {
    variant: {
      default: {
        backgroundColor: {
          base: "black",
          _hover: "white",
        },
        color: {
          base: "white",
          _hover: "black",
        },
        border: {
          base: "none",
          _hover: "1px solid black",
        },
      },
      inverted: {
        backgroundColor: {
          base: "white",
          _hover: "black",
        },
        color: {
          base: "black",
          _hover: "white",
        },
        border: {
          base: "1px solid black",
          _hover: "none",
        },
      },
      google: {
        backgroundColor: "#4285f4",
        color: "white",
        _hover: {
          backgroundColor: "#357ae8",
          border: "none",
        },
      },
    },
  },
  // jsx: ["button", "Link", "a", "Button"],
  defaultVariants: {
    variant: "default",
  },
});

export default defineConfig({
  preflight: true,
  include: ["./src/**/*.{js,jsx,ts,tsx}"],
  exclude: ["public", "dist"],
  jsxFramework: "react",
  globalCss: {
    "html, body": {
      fontFamily: "Open Sans, sans-serif",
    },
  },
  theme: {
    recipes: {
      button: buttonRecipe,
    },
  },
  outdir: "styled-system",
});
