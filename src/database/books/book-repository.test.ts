import { expect, test, describe, beforeEach, afterEach } from 'bun:test';
import { BookRepository } from './book-repository';

describe('BookRepository', () => {
  let repository: BookRepository;

  beforeEach(() => {
    repository = new BookRepository(':memory:');
  });

  afterEach(() => {
    repository.close();
  });

  test('should create and read a book', () => {
    const id = repository.create({
      title: 'Test Book',
      author: 'Test Author',
      year: 2024,
    });

    const book = repository.read(id);
    expect(book).toBeDefined();
    expect(book?.id).toBe(id);
    expect(book?.title).toBe('Test Book');
    expect(book?.author).toBe('Test Author');
    expect(book?.year).toBe(2024);
  });

  test('should read all books including initial data', () => {
    const books = repository.readAll();
    expect(books.length).toBeGreaterThan(0);
  });

  test('should update a book', () => {
    const id = repository.create({
      title: 'Test Book',
      author: 'Test Author',
      year: 2024,
    });

    const book = repository.read(id)!;
    repository.update({
      ...book,
      title: 'Updated Book',
      author: 'Updated Author',
      year: 2025,
    });

    const updated = repository.read(id);
    expect(updated?.title).toBe('Updated Book');
    expect(updated?.author).toBe('Updated Author');
    expect(updated?.year).toBe(2025);
  });

  test('should delete a book and its relationships', () => {
    const id = repository.create({
      title: 'Test Book',
      author: 'Test Author',
      year: 2024,
    });

    repository.delete(id);
    const book = repository.read(id);
    expect(book).toBeNull();
  });

  test('should not create duplicate books during initialization', () => {
    const initialBooks = repository.readAll();
    const newRepository = new BookRepository(':memory:');
    const booksAfterSecondInit = newRepository.readAll();

    expect(booksAfterSecondInit.length).toBe(initialBooks.length);
    newRepository.close();
  });

  test('should maintain author relationships', () => {
    // Create two books by the same author
    const author = 'Same Author';
    const id1 = repository.create({
      title: 'Book 1',
      author,
      year: 2024,
    });

    const id2 = repository.create({
      title: 'Book 2',
      author,
      year: 2024,
    });

    // Delete one book
    repository.delete(id1);

    // Check that the second book still exists with the same author
    const book2 = repository.read(id2);
    expect(book2?.author).toBe(author);
  });
});
