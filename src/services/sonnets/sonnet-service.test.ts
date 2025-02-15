import { expect, test, describe } from 'bun:test';
import { SonnetService } from './sonnet-service';

describe('SonnetsService', () => {
  const sonnetsService = new SonnetService();

  describe('getRandom', () => {
    test('should return a promise of a random sonnet comprising a number and text', async () => {
      // Arrange & Act
      const sonnet = await sonnetsService.getRandom();

      // Assert
      expect(sonnet).toHaveProperty('number');
      expect(sonnet).toHaveProperty('text');
    });
  });
});
