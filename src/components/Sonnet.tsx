interface SonnetProps {
  number: number;
  text: string;
}

export const Sonnet = ({ number, text }: SonnetProps) => {
  return (
    <>
      <h3 id="title" hx-swap-oob="true">
        {`Sonnet ${number}`}
      </h3>
      <pre id="sonnet" class="sonnet" hx-swap-oob="true">
        {text}
      </pre>
    </>
  );
};
