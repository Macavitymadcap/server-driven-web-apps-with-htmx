import { expect, test, describe } from 'bun:test';
import { UsersService } from './user-service';

describe('UsersService', () => {
  const usersService = new UsersService();

  describe('fetch', () => {
    test('should return an array of users', async () => {
      // Act
      const users = await usersService.fetch();

      // Assert
      expect(Array.isArray(users)).toBe(true);
    });

    test('should return users with correct structure', async () => {
      // Act
      const users = await usersService.fetch();

      // Assert
      users.forEach(user => {
        expect(user).toHaveProperty('id');
        expect(user).toHaveProperty('name');
        expect(user).toHaveProperty('email');
        expect(user).toHaveProperty('company');
        expect(user.company).toHaveProperty('name');
      });
    });
  });
});
