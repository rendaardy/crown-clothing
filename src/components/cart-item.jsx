import { css } from "#/styled/css/index.mjs";

export default function CartItem({ item }) {
  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <li
      className={css({
        width: "100%",
        height: "80px",
        display: "flex",
        marginBottom: "15px",
      })}
    >
      <img
        src={item.imageUrl}
        alt={item.name}
        className={css({ width: "30%" })}
      />
      <div
        className={css({
          width: "70%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "10px 20px",
        })}
      >
        <span className={css({ fontSize: "16px" })}>{item.name}</span>
        <span>
          {item.quantity} &times; {currencyFormatter.format(item.price)}
        </span>
      </div>
    </li>
  );
}
