import { useLoaderData } from "react-router-dom";

import { useCartItems } from "#/context/cart-context.jsx";
import { css } from "#/styled/css/index.mjs";
import ProductCard from "#/components/product-card.jsx";

export function ShopCategoryPage() {
  const { title, products } = useLoaderData();
  const { addItem } = useCartItems();

  const handleAddToCart = (product) => {
    addItem(product);
  };

  return (
    <>
      <h2
        className={css({
          fontSize: "2rem",
          fontWeight: "bold",
          textTransform: "uppercase",
          textAlign: "center",
        })}
      >
        {title}
      </h2>
      <div
        className={css({
          marginTop: "1rem",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "50px 10px",
        })}
      >
        {products.map((product) => {
          return (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          );
        })}
      </div>
    </>
  );
}
