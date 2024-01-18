# @magitools/forem-wrapper

A Forem API(v1) wrapper.

## Current Features:

- articles (see list of endpoint [here](https://developers.forem.com/api/v1#tag/articles))

## Usage

To use this package, simply install it in your project by using npm, yarn or pnpm

```bash
npm install @magitools/forem-wrapper
```

You can then instatiate it like so:

```ts
import ForemClient from "@magitools/forem-wrapper";

const client = new ForemClient();
```

you can specify a different forem instance in the constructor if you don't want to send requests to dev.to

```ts
const client = new ForemClient("https://your-forem.com/api");
```

if you need to use endpoints requiring an api-key, you can add one like so:

```ts
const client = new ForemClient().setApiKey("your_api_key");
```

you can view a usage example in the **example** folder
