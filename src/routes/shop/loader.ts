import { json } from "react-router-dom";

import { getCategoriesAndDocuments } from "#/lib/products.js";

export async function loader() {
  const categoryMap = await getCategoriesAndDocuments();

  return json({ categoryMap: Object.fromEntries(categoryMap) });
}
