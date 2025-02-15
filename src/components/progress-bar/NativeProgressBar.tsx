interface NativeProgressBarProps {
  percentCompleteNative: number;
}

export const NativeProgressBar = ({
  percentCompleteNative,
}: NativeProgressBarProps) => {
  return (
    <progress
      id="native-progress"
      value={percentCompleteNative}
      max="100"
      hx-get="/chapter-4/native-progress"
      hx-trigger={percentCompleteNative < 100 ? 'load delay:1s' : ''}
      hx-swap="outerHTML"
    ></progress>
  );
};
