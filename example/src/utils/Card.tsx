import { FC } from "hono/jsx";

export const Card: FC = (props) => {
  return (
    <article>
      {props.children}
      <footer>
        <a href={props.link}>{props.linkText}</a>
      </footer>
    </article>
  );
};
