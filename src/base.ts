import { ArticleHandler } from "./articles/handler";

export class ForemClient {
  private _apiUrl: string;
  private _apiKey?: string;
  public article: ArticleHandler;
  constructor(url = "https://dev.to/api") {
    this._apiUrl = url;
    this.article = new ArticleHandler(this._apiUrl);
  }

  setApiKey(apiKey: string) {
    this._apiKey = apiKey;
    this.article.setApiKey(apiKey);
    return this;
  }
}
