import { Hono, Context } from 'hono';
import { BookForm } from '../components/books/BookForm';
import { SortedCRUDBookRows } from '../components/books/SortedCRUDBookRows';
import { CRUDBookRow } from '../components/books/CRUDBookRow';
import { Sonnet } from '../components/Sonnet';
import { booksDb } from '../database';
import { BookRow } from '../database/books/book-repository';
import { sonnetService } from '../services';
import { diceService } from '../services';

let selectedCRUDBookId = '';

export const chapter3 = new Hono();

chapter3.get('/crud-form', async (context: Context) => {
  const attrs: { [key: string]: string } = {
    'hx-on:htmx:after-request': 'this.reset()',
  };

  if (selectedCRUDBookId) {
    // Update an existing row
    attrs['hx-put'] = `/crud-book/${selectedCRUDBookId}`;
  } else {
    // Create a new row
    attrs['hx-post'] = '/crud-book';
    attrs['hx-target'] = 'tbody';
    attrs['hx-swap'] = 'afterbegin';
  }

  const selectedBook = booksDb.read(selectedCRUDBookId) as BookRow;

  return context.html(BookForm({ selectedCRUDBookId, selectedBook, attrs }));
});

chapter3.get('/crud-table-rows', (context: Context) => {
  const books = booksDb.readAll();
  const sortedBooks = Array.from(books.values()).sort((a, b) =>
    a.title.localeCompare(b.title),
  );

  return context.html(SortedCRUDBookRows({ rows: sortedBooks }));
});

chapter3.post('/crud-book', async (context: Context) => {
  const formData = await context.req.formData();
  const title = (formData.get('title') as string) || '';
  const author = (formData.get('author') as string) || '';
  const year = parseInt(formData.get('year') as string) || 0;
  const bookId = booksDb.create({ title, author, year });
  const book = booksDb.read(bookId);

  return context.html(CRUDBookRow(book!), 201);
});

chapter3.put('/crud-select/:id', (context: Context) => {
  selectedCRUDBookId = context.req.param('id');
  console.log(`crud-select id: ${selectedCRUDBookId}`);
  context.header('HX-Trigger', 'selection-change');
  return context.body(null);
});

chapter3.put('/crud-deselect', (context: Context) => {
  console.log('crud-deselect');
  selectedCRUDBookId = '';
  context.header('HX-Trigger', 'selection-change');
  return context.body(null);
});

chapter3.put('crud-book/:id', async (context: Context) => {
  const id = context.req.param('id');
  const formData = await context.req.formData();
  const title = (formData.get('title') as string) || '';
  const author = (formData.get('author') as string) || '';
  const year = parseInt(formData.get('year') as string) || 0;
  const updatedBook = { id, title, author, year };
  booksDb.update(updatedBook);
  selectedCRUDBookId = '';
  context.header('HX-Trigger', 'selection-change');

  return context.html(CRUDBookRow(updatedBook, true));
});

chapter3.delete('/book/:id', async (c: Context) => {
  const id = c.req.param('id');
  booksDb.delete(id);

  return c.body(null);
});

chapter3.get('/sonnet', async (context: Context) => {
  const sonnet = await sonnetService.getRandom();

  return context.html(Sonnet(sonnet));
});

chapter3.get('/roll-die', (context: Context) => {
  const result = diceService.rollDie(6);
  const trigger = { roll: result.toString() };
  context.header('HX-Trigger', JSON.stringify(trigger));

  return context.text('The die is cast!');
});
