import { describe, expect, test } from 'bun:test';
import { DogService } from './dog-service';

describe('DogService', () => {
  const dogService = new DogService();

  describe('breeds', () => {
    test('should return an array of dog breeds', () => {
      // Arrange
      const expected = [
        'Beagle',
        'Bulldog',
        'Daschund',
        'French Bulldog',
        'German Shepard',
        'German Shorthaired Pointer',
        'Golden Retriever',
        'Labrador',
        'Poodle',
        'Rottweiler',
        'Whippet',
      ];

      // Act
      const result = dogService.breeds;

      // Assert
      expect(result).toEqual(expect.arrayContaining(expected));
    });
  });

  describe('dogs', () => {
    test('should return a map of dog breeds with likes', () => {
      // Arrange
      const expected = new Map<string, boolean>([
        ['Beagle', false],
        ['Bulldog', false],
        ['Daschund', false],
        ['French Bulldog', false],
        ['German Shepard', false],
        ['German Shorthaired Pointer', false],
        ['Golden Retriever', false],
        ['Labrador', false],
        ['Poodle', false],
        ['Rottweiler', false],
        ['Whippet', false],
      ]);

      // Act
      const result = dogService.dogs;

      // Assert
      expect(result).toEqual(expected);
    });
  });

  describe('getHeart', () => {
    test('should return ❤️ when passed true', () => {
      // Arrange
      const like = true;

      // Act
      const result = dogService.getHeart(like);

      // Assert
      expect(result).toBe('❤️');
    });

    test('should return 🤍 when passed false', () => {
      // Arrange
      const like = false;

      // Act
      const result = dogService.getHeart(like);

      // Assert
      expect(result).toBe('🤍');
    });
  });
});
