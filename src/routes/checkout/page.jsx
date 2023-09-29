import { useCartItems } from "#/context/cart-context.jsx";
import { css } from "#/styled/css/index.mjs";

export function CheckoutPage() {
  const { items, incrementQuantity, decrementQuantity, removeItem } =
    useCartItems();
  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  const totalPrice = items.reduce(
    (total, item) => total + item.quantity * item.price,
    0,
  );

  return (
    <section>
      <table
        className={css({
          width: "55%",
          minHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "50px auto 0",
        })}
      >
        <thead
          className={css({
            width: "100%",
            padding: "10px 0",
            borderBottom: "1px solid darkgray",
            fontWeight: "bold",
          })}
        >
          <tr
            className={css({
              display: "flex",
              justifyContent: "space-between",
              textAlign: "left",
            })}
          >
            <th className={css({ textTransform: "capitalize", width: "23%" })}>
              Product
            </th>
            <th className={css({ textTransform: "capitalize", width: "23%" })}>
              Description
            </th>
            <th className={css({ textTransform: "capitalize", width: "23%" })}>
              Quantity
            </th>
            <th className={css({ textTransform: "capitalize", width: "23%" })}>
              Price
            </th>
            <th
              className={css({
                textTransform: "capitalize",
                width: "9%",
                textAlign: "right",
              })}
            >
              Remove
            </th>
          </tr>
        </thead>
        <tbody className={css({ width: "100%" })}>
          {items.map((item) => (
            <tr
              key={item.id}
              className={css({
                width: "100%",
                minHeight: "100px",
                display: "flex",
                alignItems: "center",
                padding: "15px 0",
                borderBottom: "1px solid darkgray",
                fontSize: "20px",
              })}
            >
              <td className={css({ width: "23%", paddingRight: "15px" })}>
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className={css({ width: "100%", height: "100%" })}
                />
              </td>
              <td className={css({ width: "23%" })}>{item.name}</td>
              <td className={css({ width: "23%", display: "flex" })}>
                <div
                  className={css({ cursor: "pointer" })}
                  role="button"
                  aria-label="Decrease"
                  onClick={() => decrementQuantity(item)}
                >
                  &#10094;
                </div>
                <span className={css({ margin: "0 10px" })}>
                  {item.quantity}
                </span>
                <div
                  className={css({ cursor: "pointer" })}
                  role="button"
                  aria-label="Increase"
                  onClick={() => incrementQuantity(item)}
                >
                  &#10095;
                </div>
              </td>
              <td className={css({ width: "23%" })}>
                {currencyFormatter.format(item.price)}
              </td>
              <td className={css({ paddingLeft: "12px" })}>
                <button
                  aria-label="Remove"
                  className={css({ cursor: "pointer" })}
                  onClick={() => removeItem(item)}
                >
                  &#10005;
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfooter
          className={css({
            width: "100%",
            marginTop: "30px",
            fontSize: "36px",
            display: "flex",
            justifyContent: "flex-end",
          })}
        >
          <tr>
            <td colSpan="4">Total: {currencyFormatter.format(totalPrice)}</td>
          </tr>
        </tfooter>
      </table>
    </section>
  );
}
