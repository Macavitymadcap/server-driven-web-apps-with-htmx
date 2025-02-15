interface PaginatedPokeRowProps {
  url: string;
  name: string;
  isLast?: boolean;
}

interface PaginatedPokeTableProps {
  pokeList: PaginatedPokeRowProps[];
  rowsPerPage: number;
  page: number;
}

export const PaginatedPokeRow = ({ url, name }: PaginatedPokeRowProps) => {
  const id = url.split('/')[6];
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>
        <img alt={name} src={imageUrl} />
      </td>
    </tr>
  );
};

export const PaginatedPokeTable = ({
  pokeList,
  rowsPerPage,
  page,
}: PaginatedPokeTableProps) => {
  return (
    <>
      <table id="pokemon-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {pokeList.map((pokemon, index) => {
            const isLast = index === rowsPerPage - 1;
            return PaginatedPokeRow({ ...pokemon, isLast });
          })}
        </tbody>
      </table>
      <span
        id="pagination-buttons"
        hx-swap-oob="true"
        hx-indicator="#poke-indicator"
        hx-target="#pokemon-table"
        class="flex-row"
      >
        <button
          class="text"
          disabled={page === 1}
          hx-get={`/chapter-4/poke-rows?page=${page - 1}`}
        >
          Previous
        </button>
        <button
          class="text"
          hx-get={`/chapter-4/paginated-poke-rows?page=${page + 1}`}
        >
          Next
        </button>
        <img
          src="/assets/spinner.gif"
          alt="loading"
          id="poke-indicator"
          class="htmx-indicator"
        />
      </span>
    </>
  );
};
