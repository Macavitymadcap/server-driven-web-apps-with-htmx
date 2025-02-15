interface ChipProps {
  message: string;
  deleteable?: boolean;
  selfDestruct?: boolean;
}

export const Chip = ({ message, deleteable, selfDestruct }: ChipProps) => {
  const selfDestructAttribute = {
    _: 'init wait 5s transition opacity to 0 then remove me',
  };
  return (
    <span class="chip" {...(selfDestruct ? selfDestructAttribute : {})}>
      <span class="chip-label">{message}</span>
      {deleteable && (
        <button class="destructive" _="on click remove closest <span.chip/>">
          &#128465;
        </button>
      )}
    </span>
  );
};
