export class BaseHandler {
  protected _apiUrl: string;
  protected _apiKey?: string;
  constructor(apiUrl: string) {
    this._apiUrl = apiUrl;
  }

  setApiKey(key: string) {
    this._apiKey = key;
  }
}
