import { Link } from "react-router-dom";

import { css } from "#/styled/css/index.mjs";
import Button from "#/components/button.jsx";
import CartItem from "./cart-item.jsx";

const emptyMessage = css({
  fontSize: "18px",
  margin: "50px auto",
});

export default function CartDropdown({ items }) {
  return (
    <div
      aria-owns="cart"
      className={css({
        width: "240px",
        height: "340px",
        display: "flex",
        flexDirection: "column",
        position: "absolute",
        top: "60px",
        right: "40px",
        zIndex: "5",
        padding: "20px",
        border: "1px solid black",
        backgroundColor: "white",
      })}
    >
      <ul
        className={css({
          height: "240px",
          display: "flex",
          flexDirection: "column",
          overflow: "scroll",
        })}
      >
        {items.length > 0 ? (
          items.map((item) => <CartItem key={item.id} item={item} />)
        ) : (
          <li className={emptyMessage}>Your cart is empty</li>
        )}
      </ul>
      <Button
        component={Link}
        to="/checkout"
        css={{ textTransform: "uppercase" }}
      >
        Checkout
      </Button>
    </div>
  );
}
