import { describe, expect, test } from 'bun:test';
import { QuoteService } from './quote-service';

describe('QuoteService', () => {
  const quoteService = new QuoteService();

  describe('fetch', () => {
    test('should return a quote comprising a quote and an author', async () => {
      // Act
      const result = await quoteService.fetch();

      // Assert
      expect(result).toHaveProperty('text');
      expect(result).toHaveProperty('author');
    });
  });
});
