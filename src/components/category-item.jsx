import { Link } from "react-router-dom";

import { css, cx } from "#/styled/css/index.mjs";

export default function CategoryItem({ title, imageUrl, route }) {
  return (
    <article
      className={cx(
        "group",
        css({
          minWidth: "30%",
          height: "240px",
          flex: "1 1 auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: "1px solid black",
          margin: "0 7.5px 15px",
          overflow: "hidden",
          "&.large": {
            height: "380px",
          },
          _hover: {
            cursor: "pointer",
          },
          _first: {
            marginRight: "7.5px",
          },
          _last: {
            marginLeft: "7.5px",
          },
        }),
      )}
    >
      <img
        src={imageUrl}
        alt={title}
        className={css({
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
          _groupHover: {
            transform: "scale(1.1)",
            transition: "transform 6s cubic-bezier(0.25, 0.45, 0.45, 0.95)",
          },
        })}
      />
      <Link
        to={route}
        className={css({
          height: "90px",
          padding: "0 25px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          border: "1px solid black",
          backgroundColor: "white",
          opacity: { base: "0.7", _groupHover: "0.9" },
          position: "absolute",
        })}
      >
        <h2
          className={css({
            textTransform: "uppercase",
            fontSize: "22px",
            fontWeight: "bold",
            margin: "0 6px 0",
            color: "#4a4a4a",
          })}
        >
          {title}
        </h2>
        <p className={css({ fontSize: "16px", fontWeight: "lighter" })}>
          Shop Now
        </p>
      </Link>
    </article>
  );
}
