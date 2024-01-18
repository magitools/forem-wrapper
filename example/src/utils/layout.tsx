import type { FC } from "hono/jsx";

export const Layout: FC = (props) => {
  return (
    <html data-theme="dark">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@picocss/pico@1/css/pico.min.css"
        />
      </head>
      <body>
        <main class="container">{props.children}</main>
        <footer></footer>
      </body>
    </html>
  );
};
