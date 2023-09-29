import { json } from "react-router-dom";

import { getCurrentUser } from "#/lib/auth.js";

export async function loader() {
  const user = getCurrentUser();
  const response = await fetch("/api/categories");
  const { data } = await response.json();

  return json({ user, categories: data.categories });
}
