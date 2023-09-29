import { css, cx } from "#/styled/css/index.mjs";
import Button from "#/components/button.jsx";

export default function ProductCard({
  product: { id, name, price, imageUrl },
  onAddToCart,
}) {
  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <article
      className={cx(
        "group",
        css({
          width: "100%",
          height: "350px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
        }),
      )}
    >
      <img
        src={imageUrl}
        alt={name}
        className={css({
          width: "100%",
          height: "95%",
          objectFit: "cover",
          marginBottom: "5px",
          _groupHover: {
            opacity: "0.8",
          },
        })}
      />
      <div
        className={css({
          width: "100%",
          height: "5%",
          display: "flex",
          justifyContent: "space-between",
          fontSize: "18px",
        })}
      >
        <span className={css({ width: "81%", marginBottom: "15px" })}>
          {name}
        </span>
        <span className={css({ width: "19%" })}>
          {currencyFormatter.format(price)}
        </span>
      </div>
      <Button
        variant="inverted"
        css={{
          width: "80%",
          display: "none",
          opacity: "0.7",
          position: "absolute",
          top: "255px",
          _groupHover: {
            display: "flex",
            opacity: "0.85",
          },
        }}
        onClick={() => onAddToCart({ id, name, price, imageUrl })}
      >
        Add to Cart
      </Button>
    </article>
  );
}
