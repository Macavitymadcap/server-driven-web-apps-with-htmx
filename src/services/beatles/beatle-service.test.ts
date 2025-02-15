import { describe, expect, test } from 'bun:test';
import { BeatleService } from './beatle-service';

describe('BeatleService', () => {
  const beatleService = new BeatleService();

  describe('beatles', () => {
    test('should return the list of beatles', () => {
      // Arrange
      const beatles = ['John', 'Paul', 'George', 'Ringo'] as const;

      // Act
      const result = beatleService.beatles;

      // Assert
      expect(result).toEqual(beatles);
    });
  });

  describe('selectedBeatle', () => {
    test('should be empty by default', () => {
      // Arrange & Act
      const selectedBeatle = beatleService.selectedBeatle;

      // Assert
      expect(selectedBeatle).toBe('');
    });

    test.each(['John', 'Paul', 'George', 'Ringo'])(
      'should set selected beatle to %s',
      beatle => {
        // Arrange & Act
        beatleService.selectedBeatle = beatle;

        // Assert
        expect(beatleService.selectedBeatle).toBe(beatle);
      },
    );

    test('should throw an error if trying to set an invalid beatle', () => {
      // Arrange
      const invalidBeatle = 'Pete';

      // Act
      const act = () => (beatleService.selectedBeatle = invalidBeatle);

      // Assert
      expect(act).toThrowError(`Invalid beatle: ${invalidBeatle}`);
    });
  });
});
