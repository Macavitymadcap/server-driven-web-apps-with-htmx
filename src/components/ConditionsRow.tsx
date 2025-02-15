interface Condition {
  id: string;
  name: string;
}

interface ConditionsRowProps {
  conditions: Condition[];
}

export const ConditionsRow = ({ conditions }: ConditionsRowProps) => {
  return (
    <>
      {Array.from(conditions).map((condition: Condition) => {
        return (
          <span class="chip" key={condition.id}>
            <span class="chip-label">{condition.name}</span>
            <button
              class="destructive"
              hx-confirm={`Delete ${condition.name}?`}
              hx-delete={`/chapter-4/condition/${condition.id}`}
              hx-swap="delete"
              hx-target="closest <span.chip/>"
            >
              &#128465;
            </button>
          </span>
        );
      })}
    </>
  );
};
