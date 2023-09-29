import { useLoaderData, Link } from "react-router-dom";

import { useCartItems } from "#/context/cart-context.jsx";
import { css } from "#/styled/css/index.mjs";
import ProductCard from "#/components/product-card.jsx";

export function ShopPage() {
  const { categoryMap } = useLoaderData();
  const { addItem } = useCartItems();

  const handleAddToCart = (product) => {
    addItem(product);
  };

  return (
    <>
      {Object.entries(categoryMap).map(([categoryTitle, products]) => {
        return (
          <section
            key={categoryTitle}
            className={css({ marginBottom: { base: "4rem", _last: "0" } })}
          >
            <h2
              className={css({
                fontSize: "2rem",
                fontWeight: "bold",
                textTransform: "uppercase",
              })}
            >
              <Link to={`/shop/${categoryTitle}`}>{categoryTitle}</Link>
            </h2>
            <div
              className={css({
                marginTop: "1rem",
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "50px 10px",
              })}
            >
              {products.slice(0, 4).map((product) => {
                return (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                );
              })}
            </div>
          </section>
        );
      })}
    </>
  );
}
