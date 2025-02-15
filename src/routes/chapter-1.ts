import { Hono, Context } from 'hono';
import { CRDBookRow } from '../components/books/CRDBookRow';
import { SortedCRDBookRows } from '../components/books/SortedCRDBookRows';
import { booksDb } from '../database';
import { Version } from '../components/Version';

export const chapter1 = new Hono();

chapter1.get('/version', (c: Context) => {
  return c.html(Version());
});

chapter1.get('/crd-table-rows', async (c: Context) => {
  const books = booksDb.readAll();
  const sortedBooks = Array.from(books.values()).sort((a, b) =>
    a.title.localeCompare(b.title),
  );
  return c.html(SortedCRDBookRows({ rows: sortedBooks }));
});

chapter1.post('/crd-book', async (c: Context) => {
  const formData = await c.req.formData();
  const title = (formData.get('title') as string) || '';
  const author = (formData.get('author') as string) || '';
  const year = parseInt(formData.get('year') as string) || 0;
  const bookId = booksDb.create({ title, author, year });
  const book = booksDb.read(bookId);

  return c.html(CRDBookRow(book!), 201);
});

chapter1.delete('/book/:id', async (c: Context) => {
  const id = c.req.param('id');
  booksDb.delete(id);

  return c.body(null);
});
