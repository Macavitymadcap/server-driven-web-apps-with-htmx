interface CountdownProps {
  count: number;
  swap: string;
}

export const Countdown = ({ count, swap }: CountdownProps) => {
  return (
    <fieldset class="flex-column" hx-swap-oob={swap}>
      <legend>Countdown</legend>
      <div id="countdown">{count}</div>
    </fieldset>
  );
};
