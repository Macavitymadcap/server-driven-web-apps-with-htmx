interface InfinitePokeRowProps {
  page: number;
  url: string;
  name: string;
  isLast: boolean;
}

interface InfinitePokeRowsProps {
  pokeList: { name: string; url: string }[];
  page: number;
  rowsPerPage: number;
}

const InfinitePokeRow = async ({
  page,
  url,
  name,
  isLast,
}: InfinitePokeRowProps) => {
  const id = url.split('/')[6];
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  const attrs = isLast
    ? {
        'hx-trigger': 'revealed',
        'hx-get': `/chapter-4/infinite-poke-rows?page=${page + 1}`,
        'hx-indicator': '#poke-indicator',
        'hx-swap': 'beforeend',
        'hx-target': 'closest tbody',
      }
    : {};

  return (
    <tr {...attrs}>
      <td>{id}</td>
      <td>{name}</td>
      <td>
        <img alt={name} src={imageUrl} />
      </td>
    </tr>
  );
};

export const InfinitePokeRows = ({
  pokeList,
  page,
  rowsPerPage,
}: InfinitePokeRowsProps) => {
  return (
    <>
      {pokeList.map((pokemon, index) => {
        const isLast = index === rowsPerPage - 1;
        const infinitPokeRowProps: InfinitePokeRowProps = {
          page: page,
          name: pokemon.name,
          url: pokemon.url,
          isLast: isLast,
        };
        return InfinitePokeRow(infinitPokeRowProps);
      })}
    </>
  );
};
