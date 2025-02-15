import { describe, expect, test } from 'bun:test';
import { DiceService } from './dice-service';

describe('DiceService', () => {
  const diceService = new DiceService();

  describe('rollDie', () => {
    test('should return a number between 1 and 6 when passed 6 faces', () => {
      // Arrange
      const faces = 6;

      // Act
      const result = diceService.rollDie(faces);

      // Assert
      expect(result).toBeGreaterThanOrEqual(1);
      expect(result).toBeLessThanOrEqual(faces);
    });
  });
});
