import { serve } from "@hono/node-server";
import { Hono } from "hono";
import articles from "./routers/articles";
import { Layout } from "./utils/layout";
import { Card } from "./utils/Card";
import { getCookie, setCookie } from "hono/cookie";
import { validator } from "hono/validator";

const app = new Hono();

app.get("/", (c) => {
  return c.html(
    <Layout>
      <h3 style={{ textAlign: "center" }}>
        Welcome to @magitools/forem-wrapper's example app
      </h3>
      <div class="grid">
        <Card link="/articles" linkText="Learn More">
          Articles
        </Card>
      </div>
    </Layout>
  );
});

app.post(
  "/key",
  validator("form", (value, c) => {
    if (!value["apiKey"]) return c.text("invalid input data");
    return {
      apiKey: value["apiKey"].toString(),
      redirectTo: value["redirectTo"].toString(),
    };
  }),
  async (c) => {
    const { apiKey, redirectTo } = c.req.valid("form");
    setCookie(c, "api_key", apiKey, { path: "/" });
    return c.redirect(redirectTo);
  }
);

app.get("/key", async (c) => {
  if (getCookie(c, "api_key")) {
    return c.redirect(c.req.queries("redirectTo")![0], 301);
  } else {
    return c.html(
      <Layout>
        <p>For this endpoint, you need to have an api key</p>
        <form method="post">
          <input
            type="hidden"
            name="redirectTo"
            value={c.req.queries("redirectTo")![0]}
          />
          <label htmlFor="apiKey">
            Api Key
            <input
              type="text"
              required
              placeholder="Api Key here"
              name="apiKey"
              id="apiKey"
            />
          </label>
          <button type="submit">Send</button>
        </form>
      </Layout>
    );
  }
});

app.route("/articles", articles);
const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
