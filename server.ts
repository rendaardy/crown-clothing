import { Hono } from "https://deno.land/x/hono@v3.7.2/mod.ts";
import { serveStatic } from "https://deno.land/x/hono@v3.7.2/middleware.ts";
import { assertEquals } from "https://deno.land/std@0.203.0/assert/mod.ts";

import { getMimeType } from "./src/utils/mime.ts";

const app = new Hono();

app.get("/api/categories", (c) => {
  const categories = [
    {
      id: 1,
      title: "hats",
      imageUrl: "https://i.ibb.co/cvpntL1/hats.png",
      route: "shop/hats",
    },
    {
      id: 2,
      title: "jackets",
      imageUrl: "https://i.ibb.co/px2tCc3/jackets.png",
      route: "shop/jackets",
    },
    {
      id: 3,
      title: "sneakers",
      imageUrl: "https://i.ibb.co/0jqHpnp/sneakers.png",
      route: "shop/sneakers",
    },
    {
      id: 4,
      title: "womens",
      imageUrl: "https://i.ibb.co/GCCdy8t/womens.png",
      route: "shop/womens",
    },
    {
      id: 5,
      title: "mens",
      imageUrl: "https://i.ibb.co/R70vBrQ/men.png",
      route: "shop/mens",
    },
  ];

  return c.json({
    status: "success",
    message: "categories fetched successfully",
    data: {
      categories,
    },
  });
});

app.get("/", async (c) => {
  const url = new URL(c.req.url);

  const filename = decodeURI(url.pathname) + "index.html";
  const path = `./dist${filename}`;
  const file = await Deno.open(path);

  if (file) {
    c.header("Content-Type", getMimeType(filename));

    return c.body(file.readable);
  } else {
    c.status(404);

    return c.text("file not found");
  }
});

app.get("/*", async (c) => {
  const url = new URL(c.req.url);

  const filename = decodeURI(url.pathname);
  const path = `./dist${filename}`;

  try {
    // Serve static files
    const file = await Deno.open(path);

    if (file) {
      c.header("Content-Type", getMimeType(filename));

      return c.body(file.readable);
    } else {
      return c.redirect("/");
    }
  } catch (_error) {
    // If the file doesn't exist, serve the index and let the client router handle the rest
    const file = await Deno.open("./dist/index.html");

    c.header("Content-Type", getMimeType("index.html"));
    return c.body(file.readable);
  }
});

Deno.serve(app.fetch);

Deno.test("test app", async () => {
  const response = await app.request("/");
  const body = await response.text();

  assertEquals(response.status, 200);
  assertEquals(
    response.headers.get("content-type"),
    "text/html; charset=utf-8",
  );
});

Deno.test("GET /api/categories", async () => {
  const response = await app.request("/api/categories");
  const body = await response.json();

  assertEquals(response.status, 200);
  assertEquals(body.status, "success");
  assertEquals(body.message, "categories fetched successfully");
  assertEquals(body.data.categories.length, 5);
});
