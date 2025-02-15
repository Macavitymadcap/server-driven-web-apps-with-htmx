import { HtmlEscapedString } from 'hono/utils/html';

interface ToggleSelectedButtonProps {
  previous: HtmlEscapedString | null;
  current: HtmlEscapedString;
}

export const ToggleSelectedButton = ({
  previous,
  current,
}: ToggleSelectedButtonProps) => {
  return (
    <>
      {previous}
      {current}
    </>
  );
};
