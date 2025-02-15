import { expect, test, describe, beforeEach } from 'bun:test';
import { ProgessService } from './progress-service';

describe('ProgessService', () => {
  let progressService: ProgessService;

  beforeEach(() => {
    progressService = new ProgessService();
  });

  describe('customCompletionPercentage', () => {
    test('should set and get customCompletionPercentage', () => {
      // Arrange
      const percentage = 50;

      // Act
      progressService.customCompletionPercentage = percentage;

      // Assert
      expect(progressService.customCompletionPercentage).toBe(percentage);
    });
  });

  describe('nativeCompletionPercentage', () => {
    test('should set and get nativeCompletionPercentage', () => {
      // Arrange
      const percentage = 75;

      // Act
      progressService.nativeCompletionPercentage = percentage;

      // Assert
      expect(progressService.nativeCompletionPercentage).toBe(percentage);
    });
  });

  describe('updateCustomCompletionPercentage', () => {
    test('should update customCompletionPercentage with a delta', () => {
      // Arrange
      progressService.customCompletionPercentage = 40;

      // Act
      progressService.updateCustomCompletionPercentage();

      // Assert
      expect(progressService.customCompletionPercentage).toBeGreaterThanOrEqual(
        40,
      );
      expect(progressService.customCompletionPercentage).toBeLessThanOrEqual(
        70,
      );
    });
  });

  describe('updateNativeCompletionPercentage', () => {
    test('should update nativeCompletionPercentage with a delta', () => {
      // Arrange
      progressService.nativeCompletionPercentage = 60;

      // Act
      progressService.updateNativeCompletionPercentage();

      // Assert
      expect(progressService.nativeCompletionPercentage).toBeGreaterThanOrEqual(
        60,
      );
      expect(progressService.nativeCompletionPercentage).toBeLessThanOrEqual(
        90,
      );
    });
  });
});
