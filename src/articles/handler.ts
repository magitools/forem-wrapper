import { formatError } from "../utils/errors";
import { BaseHandler } from "../utils/handler";
import {
  IArticle,
  IArticleDetails,
  IPaginationInput,
  IPublishArticleInput,
  IPublishedByOrganizationInput,
  IPublishedByPathInput,
  IPublishedInput,
  IVideoArticle,
} from "./types";

export class ArticleHandler extends BaseHandler {
  async getPublishedArticles(args: IPublishedInput): Promise<IArticle[]> {
    const url = new URL(`${this._apiUrl}/articles`);
    if (args) {
      Object.keys(args).forEach((e) =>
        url.searchParams.append(e, String(args[e as keyof IPublishedInput]))
      );
    }
    const res = await fetch(url, {
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(
        formatError("article", data.status, data.error ?? "unknown")
      );
    }
    return data;
  }

  public async getPublishedArticlesByPublishedData(
    args: IPaginationInput
  ): Promise<IArticle[]> {
    const url = new URL(`${this._apiUrl}/articles/latest`);
    if (args) {
      Object.keys(args).forEach((e) =>
        url.searchParams.append(e, String(args[e as keyof IPaginationInput]))
      );
    }
    const res = await fetch(url, {
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(
        formatError("article", data.status, data.error ?? "unknown")
      );
    }
    return data;
  }

  public async getArticleById(id: number): Promise<IArticleDetails> {
    const url = new URL(`${this._apiUrl}/articles/${id}`);
    const res = await fetch(url, {
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(
        formatError("article", data.status, data.error ?? "unknown")
      );
    }
    return data;
  }

  public async getArticleByPath(
    args: IPublishedByPathInput
  ): Promise<IArticleDetails> {
    const url = new URL(
      `${this._apiUrl}/articles/${args.username}/${args.slug}`
    );
    const res = await fetch(url, {
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(
        formatError("article", data.status, data.error ?? "unknown")
      );
    }
    return data;
  }

  public async getArticlesForUser(args: IPaginationInput): Promise<IArticle[]> {
    if (!this._apiKey) {
      throw new Error("method getArticlesForUser requires an API key");
    }
    const url = new URL(`${this._apiUrl}/articles/me`);
    if (args) {
      Object.keys(args).forEach((e) =>
        url.searchParams.append(e, String(args[e as keyof IPaginationInput]))
      );
    }
    const res = await fetch(url, {
      headers: { "Content-Type": "application/json", "api-key": this._apiKey },
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(
        formatError("article", data.status, data.error ?? "unknown")
      );
    }
    return data;
  }
  public async getPublishedArticlesForUser(
    args: IPaginationInput
  ): Promise<IArticle[]> {
    if (!this._apiKey) {
      throw new Error("method getArticlesForUser requires an API key");
    }
    const url = new URL(`${this._apiUrl}/articles/me/published`);
    if (args) {
      Object.keys(args).forEach((e) =>
        url.searchParams.append(e, String(args[e as keyof IPaginationInput]))
      );
    }
    const res = await fetch(url, {
      headers: { "Content-Type": "application/json", "api-key": this._apiKey },
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(
        formatError("article", data.status, data.error ?? "unknown")
      );
    }
    return data;
  }
  public async getUnpublishedArticlesForUser(
    args: IPaginationInput
  ): Promise<IArticle[]> {
    if (!this._apiKey) {
      throw new Error("method getArticlesForUser requires an API key");
    }
    const url = new URL(`${this._apiUrl}/articles/me/unpublished`);
    if (args) {
      Object.keys(args).forEach((e) =>
        url.searchParams.append(e, String(args[e as keyof IPaginationInput]))
      );
    }
    const res = await fetch(url, {
      headers: { "Content-Type": "application/json", "api-key": this._apiKey },
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(
        formatError("article", data.status, data.error ?? "unknown")
      );
    }
    return data;
  }
  public async getAllArticlesForUser(
    args: IPaginationInput
  ): Promise<IArticle[]> {
    if (!this._apiKey) {
      throw new Error("method getArticlesForUser requires an API key");
    }
    const url = new URL(`${this._apiUrl}/articles/me/all`);
    if (args) {
      Object.keys(args).forEach((e) =>
        url.searchParams.append(e, String(args[e as keyof IPaginationInput]))
      );
    }
    const res = await fetch(url, {
      headers: { "Content-Type": "application/json", "api-key": this._apiKey },
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(
        formatError("article", data.status, data.error ?? "unknown")
      );
    }
    return data;
  }
  public async getArticlesForOrganization(
    args: IPublishedByOrganizationInput
  ): Promise<IArticle[]> {
    const url = new URL(
      `${this._apiUrl}/organizations/${args.username}/articles`
    );
    if (args) {
      Object.keys(args)
        .filter((e) => e !== "username")
        .forEach((e) =>
          url.searchParams.append(e, String(args[e as keyof IPaginationInput]))
        );
    }
    const res = await fetch(url, {
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(
        formatError("article", data.status, data.error ?? "unknown")
      );
    }
    return data;
  }
  public async getArticlesWithVideo(
    args: IPaginationInput
  ): Promise<IVideoArticle[]> {
    const url = new URL(`${this._apiUrl}/videos`);
    if (args) {
      Object.keys(args).forEach((e) =>
        url.searchParams.append(e, String(args[e as keyof IPaginationInput]))
      );
    }
    const res = await fetch(url, {
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(
        formatError("article", data.status, data.error ?? "unknown")
      );
    }
    return data;
  }
  public async publishArticle(
    article: IPublishArticleInput
  ): Promise<IArticle> {
    const url = new URL(`${this._apiUrl}/articles`);
    if (!this._apiKey) {
      throw new Error("method getArticlesForUser requires an API key");
    }
    const res = await fetch(url, {
      method: "post",
      body: JSON.stringify({ article }),
      headers: {
        accept: "application/vnd.forem.api-v1+json",
        "Content-Type": "application/json",
        "api-key": this._apiKey,
      },
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(
        formatError("article", data.status, data.error ?? "unknown")
      );
    }
    return data;
  }
  public async updateArticleById(id: number, article: IPublishArticleInput) {
    const url = new URL(`${this._apiUrl}/articles/${id}`);
    if (!this._apiKey) {
      throw new Error("method getArticlesForUser requires an API key");
    }
    const res = await fetch(url, {
      method: "put",
      body: JSON.stringify({ article }),
      headers: {
        accept: "application/vnd.forem.api-v1+json",
        "Content-Type": "application/json",
        "api-key": this._apiKey,
      },
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(
        formatError("article", data.status, data.error ?? "unknown")
      );
    }
    return data;
  }
}
