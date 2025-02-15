import { describe, expect, test } from 'bun:test';
import { PokemonService } from './pokemon-service';

describe('PokemonService', () => {
  const pokemonService = new PokemonService();

  describe('fetch', () => {
    test('should return a list of pokemon comprising a name an url', async () => {
      // Arrange
      const page = 1;
      const rowsPerPage = 5;

      // Act
      const result = await pokemonService.fetch(page, rowsPerPage);

      // Assert
      result.forEach(pokemon => {
        expect(pokemon).toHaveProperty('name');
        expect(pokemon).toHaveProperty('url');
      });
    });

    test.each([5, 10, 42, 69, 100])(
      'should return a list of %d pokemon when passed that many rowsPerPage',
      async rowsPerPage => {
        // Arrange
        const page = 1;

        // Act
        const result = await pokemonService.fetch(page, rowsPerPage);

        // Assert
        expect(result.length).toBe(rowsPerPage);
      },
    );
  });
});
