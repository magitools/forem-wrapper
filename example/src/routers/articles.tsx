import { Hono } from "hono";
import { getCookie, setCookie } from "hono/cookie";
import { validator } from "hono/validator";
import { FC } from "hono/jsx";
import { Layout } from "../utils/layout";
import ForemClient from "@magitools/forem-wrapper";
import { Card } from "../utils/Card";

const app = new Hono();

const ArticleHeader: FC = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>@magitools/forem-wrapper</li>
        </ul>
        <ul>
          <li>
            <a href="/articles">All Articles</a>
          </li>
          <li>
            <a href="/articles/latest">Latest Articles</a>
          </li>
          <li>
            <a href="/articles/user">User's articles</a>
          </li>
          <li>And Many More...</li>
        </ul>
      </nav>
    </header>
  );
};

app.get("/", async (c) => {
  const articles = await new ForemClient().article.getPublishedArticles({});
  return c.html(
    <Layout>
      <ArticleHeader />
      <p>
        this example calls{" "}
        <pre>new ForemClient().article.getPublishedArticles({})</pre>{" "}
      </p>
      {articles.map((e) => (
        <Card link={`/articles/${e.id}`} linkText="details">
          {e.title}
        </Card>
      ))}
    </Layout>
  );
});

app.get("/latest", async (c) => {
  const articles =
    await new ForemClient().article.getPublishedArticlesByPublishedData({});

  return c.html(
    <Layout>
      <ArticleHeader />
      <p>
        this example calls{" "}
        <pre>
          {" "}
          new ForemClient().article.getPublishedArticlesByPublishedData({});
        </pre>{" "}
      </p>
      {articles.map((e) => (
        <Card link={`/articles/${e.id}`} linkText="details">
          {e.title}
        </Card>
      ))}
    </Layout>
  );
});

app.post(
  "/user",
  validator("form", (value, c) => {
    if (!value["apiKey"]) return c.text("invalid input data");
    return { apiKey: value["apiKey"].toString() };
  }),
  async (c) => {
    const { apiKey } = c.req.valid("form");
    setCookie(c, "api_key", apiKey, { path: "/" });
    return c.redirect("/articles/user");
  }
);

app.get("/user", async (c) => {
  const key = getCookie(c, "api_key");
  if (key) {
    const articles = await new ForemClient()
      .setApiKey(key)
      .article.getArticlesForUser({});
    console.log(articles);
    return c.html(
      <Layout>
        <ArticleHeader />
        <p>
          this example calls{" "}
          <pre>
            new ForemClient().setApiKey(key).article.getArticlesForUser({});
          </pre>{" "}
        </p>
        {articles.map((e) => (
          <Card link={`/articles/${e.id}`} linkText="details">
            {e.title}
          </Card>
        ))}
      </Layout>
    );
  } else {
    return c.html(
      <Layout>
        <ArticleHeader />
        <p>For this endpoint, you need to have an api key</p>
        <form method="post">
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

app.get("/:id", async (c) => {
  const article = await new ForemClient().article.getArticleById(
    parseInt(c.req.param("id"))
  );
  console.log(article);
  return c.html(
    <Layout>
      <ArticleHeader />
      <p>
        this example calls{" "}
        <pre>
          await new ForemClient().article.getArticleById(c.req.param("id"))
        </pre>{" "}
      </p>
      <h1>{article.title}</h1>
      <ul>{article.tag_list && article.tags.map((e) => <li>{e}</li>)}</ul>
      <div dangerouslySetInnerHTML={{ __html: article.body_html }}></div>
    </Layout>
  );
});

export default app;
