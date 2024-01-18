import { FC } from "hono/jsx";

export const Card: FC = (props) => {
  return (
    <article>
      {props.children}
      <footer>
        {props.link && props.linkText ? (
          <a href={props.link}>{props.linkText}</a>
        ) : null}
        {props?.footerButtons}
      </footer>
    </article>
  );
};
