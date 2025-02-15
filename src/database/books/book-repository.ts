import { BaseRepository, BaseEntity } from '../base/base-repository';
import data from '../books/books.json';

// Types
interface AuthorRow {
  id: string;
  name: string;
}

interface Book {
  title: string;
  year: number;
  author: string;
}

export interface BookRow extends Book, BaseEntity {}

export class BookRepository extends BaseRepository<BookRow> {
  protected initDb(): void {
    this.createTables();
    this.insertInitialData();
  }

  protected createTables(): void {
    this.createBooksTable();
    this.createAuthorsTable();
    this.createBookAuthorsTable();
  }

  private createBooksTable(): void {
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS books (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        year INTEGER NOT NULL
      );
    `);
  }

  private createAuthorsTable(): void {
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS authors (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL
      );
    `);
  }

  private createBookAuthorsTable(): void {
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS book_authors (
        book_id TEXT NOT NULL,
        author_id TEXT NOT NULL,
        PRIMARY KEY (book_id, author_id),
        FOREIGN KEY (book_id) REFERENCES books(id),
        FOREIGN KEY (author_id) REFERENCES authors(id)
      );
    `);
  }

  protected insertInitialData(): void {
    data.forEach(book => {
      const existingBook = this.prepareAndExecuteOne(
        'SELECT id FROM books WHERE title = $title AND year = $year',
        { $title: book.title, $year: book.year },
      );
      if (!existingBook) {
        this.create(book);
      }
    });
  }

  private updateBookAuthors(bookId: string, author: AuthorRow): void {
    this.db.run('INSERT OR REPLACE INTO authors (id, name) VALUES (?, ?)', [
      author.id,
      author.name,
    ]);

    this.db.run(
      'INSERT OR REPLACE INTO book_authors (book_id, author_id) VALUES (?, ?)',
      [bookId, author.id],
    );
  }

  private getAuthorIdFromBookId(bookId: string): string {
    const result = this.prepareAndExecuteOne(
      'SELECT author_id FROM book_authors WHERE book_id = $bookId',
      { $bookId: bookId },
    ) as { author_id: string };
    return result.author_id;
  }

  create(book: Omit<BookRow, 'id'>): string {
    return this.executeInTransaction(() => {
      const bookId = crypto.randomUUID();
      const authorId = crypto.randomUUID();

      this.db.run(
        'INSERT OR IGNORE INTO books (id, title, year) VALUES (?, ?, ?)',
        [bookId, book.title, book.year],
      );

      this.updateBookAuthors(bookId, { id: authorId, name: book.author });
      return bookId;
    });
  }

  read(bookId: string): BookRow | null {
    const result = this.prepareAndExecuteOne(
      `SELECT books.id as id, books.title as title, books.year as year, authors.name as author
       FROM books
       JOIN book_authors ON books.id = book_authors.book_id 
       JOIN authors ON book_authors.author_id = authors.id
       WHERE books.id = $bookId`,
      { $bookId: bookId },
    ) as BookRow | null;
    return result;
  }

  readAll(): BookRow[] {
    return this.prepareAndExecute(
      `SELECT books.id as id, books.title as title, books.year as year, authors.name as author
       FROM books
       JOIN book_authors ON books.id = book_authors.book_id 
       JOIN authors ON book_authors.author_id = authors.id`,
    ) as BookRow[];
  }

  update(book: BookRow): void {
    this.executeInTransaction(() => {
      this.db.run('UPDATE books SET title = ?, year = ? WHERE id = ?', [
        book.title,
        book.year,
        book.id,
      ]);

      const authorId = this.getAuthorIdFromBookId(book.id);
      this.updateBookAuthors(book.id, { id: authorId, name: book.author });
    });
  }

  delete(bookId: string): void {
    this.executeInTransaction(() => {
      const authorId = this.getAuthorIdFromBookId(bookId);

      this.db.run('DELETE FROM book_authors WHERE book_id = ?', [bookId]);
      this.db.run('DELETE FROM books WHERE id = ?', [bookId]);

      this.db.run(
        `DELETE FROM authors 
         WHERE id = ?
         AND NOT EXISTS (
           SELECT 1 FROM book_authors 
           WHERE author_id = ?
         )`,
        [authorId, authorId],
      );
    });
  }
}
