import { useEffect, useCallback } from "react";
import { Outlet, Link, useLoaderData, useSubmit } from "react-router-dom";

import { useCartState, useCartItems } from "#/context/cart-context.jsx";
import { css } from "#/styled/css/index.mjs";
import Cart from "#/components/cart.jsx";
import CartDropdown from "#/components/cart-dropdown.jsx";
import crownLogo from "#/assets/crown.svg";

export function HomeLayout() {
  const data = useLoaderData();
  const submit = useSubmit();
  const [open, setOpen] = useCartState();
  const { items } = useCartItems();

  const handleBodyClick = useCallback(() => {
    setOpen(() => false);
  }, []);

  useEffect(() => {
    document.body.addEventListener("click", handleBodyClick);

    return () => {
      document.body.removeEventListener("click", handleBodyClick);
    };
  }, [handleBodyClick]);

  return (
    <>
      <header
        className={css({
          height: "70px",
          display: "flex",
          justifyContent: "space-between",
          padding: "20px 40px 0",
          marginBottom: "36px",
        })}
      >
        <Link
          to="/"
          aria-label="Home logo"
          className={css({ pl: "25px", width: "70px" })}
        >
          <img
            src={crownLogo}
            className={css({
              width: "100%",
              height: "100%",
              objectFit: "contain",
            })}
            alt="Crown logo"
          />
        </Link>
        <nav className={css({ height: "100%" })}>
          <ul
            className={css({
              height: "100%",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              textTransform: "uppercase",
            })}
          >
            <li className={css({ padding: "10px 15px", cursor: "pointer" })}>
              <Link to="/shop">Shop</Link>
            </li>
            <li className={css({ padding: "10px 15px", cursor: "pointer" })}>
              <Link to="/contact">Contact</Link>
            </li>
            <li className={css({ padding: "10px 15px", cursor: "pointer" })}>
              {data.user === null ? (
                <Link to="/sign-in">Sign In</Link>
              ) : (
                <button
                  type="button"
                  className={css({ textTransform: "inherit" })}
                  onClick={() => {
                    submit(null, { method: "POST" });
                  }}
                >
                  Sign Out
                </button>
              )}
            </li>
            <li className={css({ padding: "10px 15px", cursor: "pointer" })}>
              <Cart onToggle={() => setOpen((prev) => !prev)} />
            </li>
          </ul>
          {open && <CartDropdown items={items} />}
        </nav>
      </header>
      <main className={css({ padding: "0 40px 40px" })}>
        <Outlet />
      </main>
    </>
  );
}
