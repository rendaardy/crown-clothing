import { json } from "react-router-dom";

import { getCategoriesAndDocuments } from "#/lib/products.js";

export async function loader({ params }) {
  const categoryMap = await getCategoriesAndDocuments();
  const products = categoryMap.get(params.categoryItem);

  if (!products) {
    throw new Response("", {
      status: 404,
      statusText: "Products not found",
    });
  }

  return json({ title: params.categoryItem, products });
}
