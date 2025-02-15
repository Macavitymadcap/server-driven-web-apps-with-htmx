import { BookFormProps } from './books.model';

export const BookForm = ({
  selectedCRUDBookId: selectedId,
  selectedBook,
  attrs,
}: BookFormProps) => {
  return (
    <div
      hx-trigger="selection-change from:body"
      hx-get="/chapter-4/crud-form"
      hx-swap="outerHTML"
    >
      <h3>{`${selectedId ? 'Update' : 'Add'} Book`}</h3>
      <form class="flex-column" hx-disabled-elt="#submit-button" {...attrs}>
        <div class="flex-row">
          <label for="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            required
            value={selectedBook ? selectedBook.title : ''}
          />
        </div>
        <div class="flex-row">
          <label for="author">Author</label>
          <input
            type="text"
            id="author"
            name="author"
            required
            value={selectedBook ? selectedBook.author : ''}
          />
        </div>
        <div class="flex-row">
          <label for="year">Year</label>
          <input
            type="number"
            name="year"
            id="year"
            required
            value={selectedBook ? selectedBook.year : ''}
          />
        </div>
        <div class="flex-row">
          <button id="submit-button" class="text">
            {selectedId ? 'Update' : 'Add'}
          </button>
          {selectedId && (
            <button
              class="destructive text"
              hx-put="/chapter-4/crud-deselect"
              hx-swap="none"
              type="button"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
