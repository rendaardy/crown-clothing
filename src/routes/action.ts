import { redirect } from "react-router-dom";

import { signOutUser } from "#/lib/auth.js";

export async function action() {
  await signOutUser();

  return redirect("/");
}
