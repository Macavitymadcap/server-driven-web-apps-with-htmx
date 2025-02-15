import { SelectableButton } from './SelectableButton';

interface SelectableButtonRowProps {
  buttons: string[];
  togglePath: string;
}
export const SelectableButtonRow = ({
  buttons,
  togglePath,
}: SelectableButtonRowProps) => {
  return (
    <>
      {buttons.map(button => (
        <SelectableButton name={button} togglePath={togglePath} />
      ))}
    </>
  );
};
