import { css } from "#/styled/css/index.mjs";
import CategoryItem from "./category-item.jsx";

export default function CategoryList({ categories }) {
  return (
    <section
      className={css({
        width: "100%",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
      })}
    >
      {categories.map(({ id, title, imageUrl, route }) => {
        return (
          <CategoryItem
            key={id}
            title={title}
            imageUrl={imageUrl}
            route={route}
          />
        );
      })}
    </section>
  );
}
