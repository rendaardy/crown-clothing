import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";

import { center } from "#/styled/patterns/index.mjs";
import { CartProvider } from "./context/cart-context.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    async lazy() {
      const { HomeLayout } = await import("./routes/layout.jsx");
      const { HomeErrorPage } = await import("./routes/error.jsx");
      const { loader } = await import("./routes/loader.ts");
      const { action } = await import("./routes/action.ts");

      return {
        Component: HomeLayout,
        ErrorBoundary: HomeErrorPage,
        loader,
        action,
      };
    },
    children: [
      {
        index: true,
        async lazy() {
          const { HomePage } = await import("./routes/page.jsx");
          const { loader } = await import("./routes/loader.ts");

          return { Component: HomePage, loader };
        },
      },
      {
        path: "shop",
        async lazy() {
          const { ShopLayout } = await import("./routes/shop/layout.jsx");

          return { Component: ShopLayout };
        },
        children: [
          {
            index: true,
            async lazy() {
              const { ShopPage } = await import("./routes/shop/page.jsx");
              const { loader } = await import("./routes/shop/loader.ts");

              return { Component: ShopPage, loader };
            },
          },
          {
            path: ":categoryItem",
            async lazy() {
              const { ShopCategoryPage } = await import(
                "./routes/shop/$categoryItem/page.jsx"
              );
              const { loader } = await import(
                "./routes/shop/$categoryItem/loader.js"
              );

              return { Component: ShopCategoryPage, loader };
            },
          },
        ],
      },
      {
        path: "contact",
        async lazy() {
          const { ContactPage } = await import("./routes/contact/page.jsx");

          return { Component: ContactPage };
        },
      },
      {
        path: "sign-in",
        async lazy() {
          const { SignInPage } = await import("./routes/sign-in/page.jsx");
          const { action } = await import("./routes/sign-in/action.ts");

          return {
            Component: SignInPage,
            action,
          };
        },
      },
      {
        path: "checkout",
        async lazy() {
          const { CheckoutPage } = await import("./routes/checkout/page.jsx");

          return {
            Component: CheckoutPage,
          };
        },
      },
    ],
  },
]);

export default function App() {
  return (
    <>
      <Toaster />
      <CartProvider>
        <RouterProvider
          router={router}
          future={{ v7_startTransition: true }}
          fallbackElement={
            <div className={center({ w: "100vw", h: "100vh" })}>
              <ThreeDots
                width="80"
                height="80"
                radius="9"
                color="black"
                ariaLabel="three-dots-loading"
                visible={true}
              />
            </div>
          }
        />
      </CartProvider>
    </>
  );
}
