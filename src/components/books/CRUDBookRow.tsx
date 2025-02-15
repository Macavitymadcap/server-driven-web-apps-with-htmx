import { BookRowProps } from './books.model';

export const CRUDBookRow = (book: BookRowProps, updating = false) => {
  // If the book is being updated we want to perform an out of bounds swap,
  // so a new table row can replace the exisiting one.
  const attrs: { [key: string]: string } = {};
  if (updating) attrs['hx-swap-oob'] = 'true';

  return (
    <tr id={`row-${book.id}`} {...attrs}>
      <td>{book.title}</td>
      <td>{book.author}</td>
      <td>{book.year}</td>
      <td>
        <div class="flex-row centred">
          <button
            class="destructive"
            title="Delete"
            hx-delete={`/chapter-4/book/${book.id}`}
            hx-confirm={`Delete ${book.title}?`}
            hx-target="closest tr"
            hx-swap="outerHTML"
            type="button"
          >
            &#x2715;
          </button>
          <button
            title="Edit"
            hx-put={`/chapter-4/crud-select/${book.id}`}
            hx-swap="none"
            class="primary"
            type="button"
          >
            &#x270E;
          </button>
        </div>
      </td>
    </tr>
  );
};
