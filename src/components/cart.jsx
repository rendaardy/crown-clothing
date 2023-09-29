import { useCartItems } from "#/context/cart-context.jsx";
import { css } from "#/styled/css/index.mjs";
import shoppingBagIcon from "#/assets/shopping-bag.svg";

export default function Cart({ onToggle }) {
  const { items } = useCartItems();

  return (
    <button
      id="cart"
      type="button"
      aria-label="cart"
      className={css({
        width: "45px",
        height: "45px",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
      })}
      onClick={(event) => {
        event.stopPropagation();

        onToggle();
      }}
    >
      <img
        src={shoppingBagIcon}
        alt="shopping bag"
        className={css({ width: "24px", height: "24px" })}
      />
      <span
        className={css({
          position: "absolute",
          bottom: "12px",
          fontSize: "10px",
          fontWeight: "bold",
        })}
      >
        {items.reduce((acc, item) => acc + item.quantity, 0)}
      </span>
    </button>
  );
}
