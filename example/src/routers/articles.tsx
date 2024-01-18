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
          <li>
            <a href="/articles/user/unpublished">User's unpublished articles</a>
          </li>
          <li>
            <a href="/articles/create">New Article</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

app.get("/", async (c) => {
  try {
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
  } catch (error) {
    return c.text("something went wrong");
  }
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
  "/create",
  validator("form", (value, c) => {
    const title = value["title"];
    const content = value["content"];
    const published = value["published"] ?? "off";
    if (!title || !content) return c.text("invalid data");
    return { title, content, published };
  }),
  async (c) => {
    const key = getCookie(c, "api_key");
    if (!key) return c.redirect("/key?redirectTo=/articles/create");
    const { title, published, content } = c.req.valid("form");
    await new ForemClient().setApiKey(key).article.publishArticle({
      title: title.toString(),
      body_markdown: content.toString(),
      published: published.toString() === "on",
    });
    return c.redirect("/articles/create");
  }
);

app.get("/create", async (c) => {
  const key = getCookie(c, "api_key");
  if (!key) return c.redirect("/key?redirectTo=/articles/create");
  return c.html(
    <Layout>
      <ArticleHeader />
      <form method="post">
        <label htmlFor="title">
          Title
          <input type="text" name="title" placeholder="article title" />
        </label>
        <label htmlFor="published">
          Published
          <input
            role="switch"
            type="checkbox"
            name="published"
            id="published"
          />
        </label>
        <label htmlFor="content">Content</label>
        <textarea name="content" id="content" cols="30" rows="10"></textarea>
        <button type="submit">Create Article</button>
      </form>
    </Layout>
  );
});

app.get("/user", async (c) => {
  const key = getCookie(c, "api_key");
  if (!key) return c.redirect("/key?redirectTo=/articles/user");
  const articles = await new ForemClient()
    .setApiKey(key)
    .article.getArticlesForUser({});
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
        <Card
          footerButtons={[
            <a href={`/articles/edit/${e.id}`} class="secondary">
              Edit
            </a>,
          ]}
          link={`/articles/${e.id}`}
          linkText="details"
        >
          {e.title}
        </Card>
      ))}
    </Layout>
  );
});

app.get("/user/unpublished", async (c) => {
  const key = getCookie(c, "api_key");
  if (!key) return c.redirect("/key?redirectTo=/articles/user/unpublished");
  const articles = await new ForemClient()
    .setApiKey(key)
    .article.getUnpublishedArticlesForUser({});
  return c.html(
    <Layout>
      <ArticleHeader />
      <p>
        this example calls{" "}
        <pre>
          new
          ForemClient().setApiKey(key).article.getUnpublishedArticlesForUser({}
          );
        </pre>{" "}
      </p>
      {articles.map((e) => (
        <Card>{e.title}</Card>
      ))}
    </Layout>
  );
});

app.post(
  "/edit/:id",
  validator("form", (value, c) => {
    const title = value["title"];
    const content = value["content"];
    const published = value["published"] ?? "off";
    if (!title || !content) return c.text("invalid data");
    return { title, content, published };
  }),
  async (c) => {
    const key = getCookie(c, "api_key");
    if (!key)
      return c.redirect(`/key?redirectTo=/articles/edit/${c.req.param("id")}`);
    const { title, published, content } = c.req.valid("form");
    await new ForemClient()
      .setApiKey(key)
      .article.updateArticleById(parseInt(c.req.param("id")), {
        title: title.toString(),
        body_markdown: content.toString(),
        published: published.toString() === "on",
      });
    return c.redirect("/articles/create");
  }
);

app.get("/edit/:id", async (c) => {
  const key = getCookie(c, "api_key");
  if (!key)
    return c.redirect(`/key?redirectTo=/articles/edit/${c.req.param("id")}`);
  const article = await new ForemClient()
    .setApiKey(key)
    .article.getArticleById(parseInt(c.req.param("id")));
  console.log(article);
  return c.html(
    <Layout>
      <ArticleHeader />
      <form method="post">
        <label htmlFor="title">
          Title
          <input
            type="text"
            name="title"
            placeholder="article title"
            value={article.title}
          />
        </label>
        <label htmlFor="published">
          Published
          <input
            role="switch"
            type="checkbox"
            name="published"
            id="published"
          />
        </label>
        <label htmlFor="content">Content</label>
        <textarea
          value={article.body_markdown}
          name="content"
          id="content"
          cols="30"
          rows="10"
        ></textarea>
        <button type="submit">Create Article</button>
      </form>
    </Layout>
  );
});

app.get("/:id", async (c) => {
  const article = await new ForemClient().article.getArticleById(
    parseInt(c.req.param("id"))
  );
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
