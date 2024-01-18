import { serve } from "@hono/node-server";
import { Hono } from "hono";
import articles from "./routers/articles";
import { Layout } from "./utils/layout";
import { Card } from "./utils/Card";

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

app.route("/articles", articles);
const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
