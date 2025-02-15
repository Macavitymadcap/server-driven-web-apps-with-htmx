interface SelectableButtonProps {
  name: string;
  togglePath: string;
  toggle?: boolean;
  isSelected?: boolean;
}

export const SelectableButton = ({
  name,
  togglePath,
  toggle = false,
  isSelected = false,
}: SelectableButtonProps) => {
  const classes = 'text' + (isSelected ? ' selected' : '');
  const attrs = toggle ? { 'hx-swap-oob': 'true' } : {};
  return (
    <button
      class={classes}
      hx-get={`/${togglePath}/${name}`}
      id={name}
      {...attrs}
    >
      {name}
    </button>
  );
};
