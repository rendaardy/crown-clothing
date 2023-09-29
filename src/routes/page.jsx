import { useLoaderData } from "react-router-dom";

import CategoryList from "#/components/category-list.jsx";

export function HomePage() {
  const { categories } = useLoaderData();

  return <CategoryList categories={categories} />;
}
