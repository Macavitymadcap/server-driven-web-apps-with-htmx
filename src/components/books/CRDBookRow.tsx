import { BookRowProps } from './books.model';

export const CRDBookRow = ({ id, title, author, year }: BookRowProps) => {
  return (
    <tr>
      <td>{title}</td>
      <td>{author}</td>
      <td>{year}</td>
      <td>
        <div class="centred">
          <button
            class="destructive"
            title="Delete"
            hx-delete={`/chapter-1/book/${id}`}
            hx-confirm={`Delete ${title}?`}
            hx-target="closest tr"
            hx-swap="delete"
          >
            &#x2715;
          </button>
        </div>
      </td>
    </tr>
  );
};
