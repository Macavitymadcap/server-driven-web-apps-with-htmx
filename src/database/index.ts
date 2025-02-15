import { BookRepository } from './books/book-repository';
import { ConditionRepository } from './conditions/conditions-repository';

export const booksDb = new BookRepository(__dirname + '/books/books.db');
export const conditionsDb = new ConditionRepository(
  __dirname + '/conditions/conditions.db',
);
