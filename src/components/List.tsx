interface ListProps {
  items: string[];
  ordered?: boolean;
}

export const List = ({ items, ordered = false }: ListProps) => {
  if (ordered) {
    return (
      <ol>
        {items.map(item => (
          <li>{item}</li>
        ))}
      </ol>
    );
  }

  return (
    <ul>
      {items.map(item => (
        <li>{item}</li>
      ))}
    </ul>
  );
};
