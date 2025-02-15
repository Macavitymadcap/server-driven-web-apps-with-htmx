import { expect, test, describe } from 'bun:test';
import { MonsterService } from './monster-service';

describe('MonstersService', () => {
  const monstersService = new MonsterService();

  describe('search', () => {
    test('should return monsters that match the search term', () => {
      // Arrange
      const searchTerm = 'Orc';

      // Act
      const result = monstersService.search(searchTerm);

      // Assert
      expect(result).toContain('Orc');
      expect(result).toContain('Orc War Chief');
      expect(result).toContain('Orc Eye of Gruumsh');
    });

    test('should return an empty array if no monsters match the search term', () => {
      // Arrange
      const searchTerm = 'Dragonborn';

      // Act
      const result = monstersService.search(searchTerm);

      // Assert
      expect(result).toEqual([]);
    });

    test('should return all monsters if the search term is an empty string', () => {
      // Arrange
      const searchTerm = '';

      // Act
      const result = monstersService.search(searchTerm);

      // Assert
      expect(result.length).toBe(monstersService['_monsters'].length);
    });

    test('should be case insensitive', () => {
      // Arrange
      const searchTerm = 'orc';

      // Act
      const result = monstersService.search(searchTerm);

      // Assert
      expect(result).toContain('Orc');
      expect(result).toContain('Orc War Chief');
      expect(result).toContain('Orc Eye of Gruumsh');
    });
  });
});
