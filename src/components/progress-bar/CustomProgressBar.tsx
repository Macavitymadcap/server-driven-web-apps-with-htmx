interface CustomProgressBarProps {
  percentCompleteCustom: number;
}

export const CustomProgressBar = ({
  percentCompleteCustom,
}: CustomProgressBarProps) => {
  return (
    <div
      id="progress-container"
      hx-get="/chapter-4/custom-progress"
      hx-trigger={percentCompleteCustom < 100 ? 'load delay:1s' : ''}
      hx-swap="outerHTML"
      role="progressbar"
      aria-valuenow={percentCompleteCustom}
    >
      <div id="progress-text">{percentCompleteCustom.toFixed(1)}%</div>
      {/* This div MUST have an id for the CSS transition to work */}
      <div id="progress-bar" style={{ width: `${percentCompleteCustom}%` }} />
    </div>
  );
};
